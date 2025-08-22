import { DateTime, Duration } from 'luxon'
import {
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { dateTimeType } from '#helpers/migration-helper'
import _ from 'lodash'
import { fileTypeFromBuffer } from 'file-type'
import fs from 'fs'

@Entity()
export abstract class BaseTypeWithoutPrimaryKey {
  @UpdateDateColumn({ ...dateTimeType() })
  @Index()
  updatedAt: Date
  @CreateDateColumn({ ...dateTimeType() })
  @Index()
  createdAt: Date

  static sanitizeNumber(num: number | undefined | null) {
    if (num === undefined || num === null) {
      return undefined
    }
    if (num !== 0) {
      return num
    }
    return undefined
  }

  static async purge(durationAgo: Duration, trx: EntityManager) {
    const purgeCutoff = DateTime.now().toLocal().minus(durationAgo)

    const query = trx.createQueryBuilder().delete().from(this.name).where('updated_at <= :updated_at', {
      updated_at: purgeCutoff.toISO(),
    })

    return await query.execute()
  }

  static async find<T extends BaseTypeWithoutPrimaryKey>(
    this: {
      new (): T
    } & typeof BaseTypeWithoutPrimaryKey,
    db: DataSource | EntityManager,
    options?: FindManyOptions<T>
  ) {
    return await db.getRepository<T>(this).find(options)
  }

  static async findOne<T extends BaseTypeWithoutPrimaryKey>(
    this: {
      new (): T
    } & typeof BaseTypeWithoutPrimaryKey,
    db: DataSource | EntityManager,
    options: FindOneOptions<T>
  ) {
    return await db.getRepository<T>(this).findOne(options)
  }
}

@Entity()
export abstract class BaseType extends BaseTypeWithoutPrimaryKey {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number
}

export type DocumentExtension = 'pdf' | 'png' | 'jpg' | 'tif'

@Entity()
export abstract class Document extends BaseType {
  @Column({ type: 'bytea', select: false })
  document: Buffer

  @Column({ type: 'text' })
  extension: DocumentExtension

  private static extensionToContentTypeMap: Record<DocumentExtension, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    png: 'image/png',
    tif: 'image/tiff',
  }

  constructor(opts: Partial<Document> = {}) {
    super()
    _.assign(this, opts)
  }

  getContentType() {
    const contentType = Document.extensionToContentTypeMap[this.extension]
    if (!contentType) {
      throw `Unsupported file extension ${this.extension}`
    }
    return contentType
  }

  async updateWithDocument(filePath: string) {
    this.document = await fs.promises.readFile(filePath)
    this.extension = await this.getFileExtension(this.document)
    return this
  }

  private async getFileExtension(buffer: Buffer): Promise<DocumentExtension> {
    const fileType = await fileTypeFromBuffer(buffer)
    const extension = fileType?.ext as DocumentExtension
    if (Document.extensionToContentTypeMap[extension]) {
      return extension
    }
    throw `Unsupported file extension detected ${extension} with mime type (${fileType?.mime})`
  }

  static async byId<T extends Document>(this: { new (): T } & typeof Document, db: DataSource | EntityManager, id: number) {
    return (await this.findOne(db, {
      select: {
        extension: true,
        document: true,
        id: true,
      },
      where: {
        id: id,
      },
      relations: ['user'],
    })) as T
  }
}

import { Column, DataSource, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'

export interface PositionDTO {
  id: number
  latitude: number
  longitude: number
  altitude: number
  createdAt: Date
}

@Entity()
export default class MapReport extends BaseType {
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'text' })
  longName: string

  @Column({ type: 'text' })
  shortName: string

  @Column({ type: 'integer', nullable: true })
  role?: number

  @Column({ type: 'integer' })
  hardwareModel: number

  @Column({ type: 'text' })
  firmwareVersion: string

  @Column({ type: 'integer', nullable: true })
  region?: number

  @Column({ type: 'integer', nullable: true })
  modemPreset?: number

  @Column({ type: 'boolean', nullable: true })
  hasDefaultChannel?: boolean

  @Column({ type: 'integer', nullable: true })
  latitude?: number

  @Column({ type: 'integer', nullable: true })
  longitude?: number

  @Column({ type: 'integer', nullable: true })
  altitude?: number

  @Column({ type: 'integer', nullable: true })
  positionPrecision?: number

  @Column({ type: 'integer', nullable: true })
  numOnlineLocalNodes?: number

  constructor(opts: Partial<MapReport> = {}) {
    super()
    _.assign(this, opts)
  }

  static async forNode(db: EntityManager | DataSource, nodeId: number, since: Date) {
    return (await db.getRepository(this).find({
      select: ['createdAt', 'latitude', 'longitude', 'altitude', 'id'],
      where: {
        nodeId,
        createdAt: MoreThanOrEqual(since),
      },
      order: {
        createdAt: 'ASC',
      },
    })) as PositionDTO[]
  }
}

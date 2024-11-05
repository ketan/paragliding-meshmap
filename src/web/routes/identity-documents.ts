import { Request, Router } from 'express'
import { AppDataSource } from '#config/data-source'
import { IdentityDocument } from '#entity/identity_document'
import { User } from '#entity/user'
import formidable from 'formidable'
import _ from 'lodash'
import { insuranceDocumentsRouter } from '#web/routes/insurance-documents'
import { copyFormDataInto, HttpError } from '#web/helpers'

export const identityDocumentsRouter = Router()
const db = AppDataSource

identityDocumentsRouter.get('/identity-documents', async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  const documents = await db.getRepository(IdentityDocument).find({
    where: { user: { id: req.user.id } },
  })

  res.json(documents)
})

insuranceDocumentsRouter.get('/identity-documents/:id', async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  const documentId = parseIdParam(req)
  const document = await IdentityDocument.findOne(db, {
    select: {
      extension: true,
      document: true,
      id: true,
    },
    where: {
      id: documentId,
      user: {
        id: req.user.id,
      },
    },
  })

  if (!document) {
    return res.status(404).json({ error: 'Document not found' })
  } else {
    return res
      .status(200)
      .header('Content-Type', document.getContentType())
      .header('Content-Disposition', `attachment; filename="${_.kebabCase(req.user?.displayName)}-identity.${document.extension}"`)
      .send(document.document)
  }
})

identityDocumentsRouter.post('/identity-documents', async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  const user = await db.getRepository(User).findOne({
    where: { id: req.user.id },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const form = formidable({
    allowEmptyFiles: false,
    maxFiles: 1,
    maxFileSize: 10 * 1024 * 1024,
    multiples: false,
  })
  const doc = new IdentityDocument()

  const [formData, files] = await form.parse(req)

  const filteredAttributes = ['userId', 'id', 'createdAt', 'updatedAt'] as (keyof IdentityDocument)[]
  copyFormDataInto(formData, filteredAttributes, doc)
  doc.user = user
  if ('document' in files) {
    const uploadedFiles = files['document']
    if (uploadedFiles && uploadedFiles.length === 1) {
      const file = uploadedFiles[0]
      await doc.updateWithDocument(file.filepath)
    }
  }

  try {
    await db.getRepository(IdentityDocument).save(doc)
    res.status(200).json(_.omit(doc, 'document'))
  } catch (err) {
    res.status(400).json({ message: 'Unable to save document', err })
  }
})

function parseIdParam(req: Request) {
  const idParam = req.params.id

  const id = Number(idParam)
  if (!isNaN(id)) {
    return id
  }

  throw new HttpError(400, `Invalid ID ${idParam}`)
}

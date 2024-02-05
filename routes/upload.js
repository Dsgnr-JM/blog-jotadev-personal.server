import express from 'express'
import multer from 'multer'
import { dirname, extname, join } from 'path'
import { fileURLToPath } from 'url'


const dirUse = {
  ROOT_DIR_NAME: dirname(fileURLToPath(import.meta.url)),
  UPLOADS_DIR_NAME: './uploads'
}
const fileOptions = {
  maxSize: 5,
  MIMETYPES: ['image/jpeg', 'image/png']
}

const upload = multer({
  storage: multer.diskStorage({
    destination: join(dirUse.ROOT_DIR_NAME, dirUse.UPLOADS_DIR_NAME),
    filename: (req, file, cb) => {
      const fileOriginalName = file.originalname
      const fileExt = extname(fileOriginalName)
      const [fileName] = fileOriginalName.split(fileExt)
      cb(null, `${fileName}_${Date.now()}${fileExt}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (fileOptions.MIMETYPES.includes(file.mimetype)) cb(null, true)
    else cb(new Error(`Only ${fileOptions.M.join('')}`))
  },
  limits: {
    fieldSize: 1024000 * fileOptions.maxSize
  }
})

const app = express()

app.get('/public', (req, res) => {
  res.sendStatus(200)
})
app.use(
  '/public',
  express.static(join(dirUse.ROOT_DIR_NAME, dirUse.UPLOADS_DIR_NAME))
)

export { app, upload }

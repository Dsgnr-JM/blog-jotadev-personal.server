import express from 'express'
import dotenv from 'dotenv'
import connection from '../config.db.js'
import TABLES_DB from './dbTables.js'
import { app as upload, upload as fileSubmit } from './upload.js'

const app = express()
dotenv.config()

const getLanguage = (request, response) => {
    const id = request.params.id
    const sql = request.params.id ? `SELECT * FROM ${TABLES_DB.languages} WHERE id = ${id}` : `SELECT * FROM ${TABLES_DB.languages}` 
    connection.query(
        sql,
        (error, results) => {
            if (error) throw error
            response.status(200).json(results)
        }
    )
}

const getArticle = (request, response) => {
    const id = request.params.id
    const sql = request.params.id ? `SELECT * FROM ${TABLES_DB.articles} WHERE id = ${id}` : `SELECT * FROM ${TABLES_DB.languages}` 
    connection.query(
        sql,
        (error, results) => {
            if (error) throw error
            response.status(200).json(results)
        }
    )
}


app.get('/languages',getLanguage)
app.get('/languages/:id',getLanguage)
app.get('/languages',getArticle)
app.get('/languages/:id',getArticle)
app.use(upload)

const postLanguage = (request, response) => {
    const { language } = request.body
    connection.query(
        `INSERT INTO ${TABLES_DB.languages}(language) VALUES (?)`,
        [language],
        (error, results) => {
            if (error) throw error
            response
                .status(201)
                .json({ 'Item añadido correctamente': results.affectedRows })
        }
    )
}

app.post('/languages' ,postLanguage)

const delLanguage = (request, response) => {
    const id = request.params.id
    connection.query(
        `Delete from ${TABLES_DB.languages} where id = ?`,
        [id],
        (error, results) => {
            if (error) throw error
            response
                .status(201)
                .json({ 'Item eliminado': results.affectedRows })
        }
    )
}
app.delete('/languages/:id' ,delLanguage)

const postArticle = (request, response) => {
    const { language, title } = request.body
    const { filename } = request.file
    connection.query(
        `INSERT INTO ${TABLES_DB.articles}(language, title_article, filename) VALUES (?, ?, ?)`,
        [language, title, filename],
        (error, results) => {
            if (error) throw error
            response
                .status(201)
                .json({ 'Articulo añadido correctamente': results.affectedRows })
        }
    )
}

app.post('/articles', fileSubmit.single('file') ,postArticle)

const delArticle = (request, response) => {
    const id = request.params.id
    connection.query(
        `Delete from ${TABLES_DB.articles} where id = ?`,
        [id],
        (error, results) => {
            if (error) throw error
            response
                .status(201)
                .json({ 'Articulo eliminado': results.affectedRows })
        }
    )
}
app.delete('/articles/:id' ,delArticle)

export { app }

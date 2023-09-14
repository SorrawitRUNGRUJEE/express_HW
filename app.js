const fs = require('fs/promises')
const fsSync = require('fs')
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8000
const path = './products.json'
const path_delete = './delete.json'


const readData = (page = 1, limit = 10) => {
    return fs.readFile(path, 'utf8')
        .then(JSON.parse)
        .then(res => {
            {
                let start_index = (page - 1) * 5
                let end_index = start_index + limit
                return res.slice(start_index, end_index)
            }
        })
}

const deleteData = (id) => {
    return fs.readFile(path, 'utf8')
        .then(JSON.parse)
        .then(res => {
            const deleteIndex = res.findIndex(item => item.id == id)
            const [deleteditem] = res.splice(deleteIndex,1)
            fs.writeFile(path_delete, JSON.stringify(deleteditem,null,2))
            fs.writeFile(path, JSON.stringify(res))
        })
}
app.get(('/'), (req, res) => {
    res.json({ msg: "welcome to my backend project" })
})
app.get(('/products/'), (req, res) => {
    const { page, limit } = req.query
    readData(page, limit).then(result => res.json(result))
})
app.delete(('/products/:id'), (req, res) => {
    const { id } = req.query
    deleteData(id)
    res.send({msg:"success"})
})
app.listen(port, () => console.log("system operational on port :", port))

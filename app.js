const fs = require('fs/promises')
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8000
const path = './products.json'
const readData = (page = 1,limit = 10) => {
    return fs.readFile(path, 'utf8')
    .then(JSON.parse)
    .then(res=>{console.log(
        res.slice(page,page + limit)
        )
    })
}

app.get(('/'), (req, res) => {
    res.json({ msg: "welcome to my backend project" })
})

app.get(('/products'), (req, res) => {
    

    res.end()

})
   





app.listen(port, () => console.log("system operational on port :", port))
readData(0,5)
// console.log(readData().then(console.log))
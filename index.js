//Instanciando express, fileupload y el modulo fs
const express = require("express")
const app = express()
const expressFileUpload = require("express-fileupload")
const fs = require("fs")

// Configurando fileupload con sus parametros y objeto de configuracion
app.use(expressFileUpload({
    limits: {fileSize: 5000000},
    abortOnLimit: true,
    responseOnLimit: 'El peso del arhivo que intentar subir supera el limite permitido',
}))

//disponibilizando la carpeta public para el consumo de las imagenes
app.use(express.static("public"))

//ruta Get raíz que consume el "formulario.html"
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/formulario.html")
})

//Ruta GET /imagen para consumir el archivo "collage.html"
app.get("/imagen", (req, res) => {
    res.sendFile(__dirname + "/collage.html")
})

//Ruta POST para enviar la imagen a la ruta especificada extrayendo parametros del archivo y el body
app.post("/imagen", (req, res) => {
    const {target_file} = req.files
    const {posicion} = req.body
    const name = `imagen-${posicion}.jpg`
    target_file.mv(`${__dirname}/public/imgs/${name}`, (err) => {
        res.redirect("/imagen")
    })
})

//ruta GET para eliminar la imagen de la carpeta publica
app.get("/deleteImg/:imagen", (req, res) => {
    const {imagen} = req.params
    fs.unlink(`${__dirname}/public/imgs/${imagen}`, (err) => {
        res.redirect("/imagen")
    })
})

//Escuchando el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor levantado en puerto 3000"))
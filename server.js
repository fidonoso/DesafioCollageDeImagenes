const express=require('express'); //npm i express
const fs=require('fs');
const app = express();
const expressFileUpload = require('express-fileupload'); //npm i express-fileupload
const bodyParser = require('body-parser'); // npm i body-parser

app.listen(3000, ()=>{ console.log(`Servidor escuchando en el puerto 3000`)})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit:
    "El peso de la imagen que intentas subir supera el limite permitido",
    })
);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
    res.sendFile(__dirname +'/formulario.html')
});

app.get('/imagen', (req, res) =>{
    res.sendFile(__dirname +'/collage.html')
});

app.post("/imagen", (req, res) => {

    const { posicion }=req.body
    const { target_file } = req.files;
    const { name } = target_file;
    target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.${name.split('.').pop()}`, (err) => {
    res.sendFile(__dirname +'/collage.html')
    });
});

app.get("/deleteImg/:nombre", (req, res) => {
    const { nombre } = req.params;
    fs.unlink(`${__dirname}/public/imgs/${nombre}`, (err) => {
    res.redirect('/imagen')
    });
});

app.get('*', (req, res) => {
    res.send(`<h1>Acá no hay nada</h1>`)
})
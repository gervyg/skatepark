const express = require('express')
const exphbs = require('express-handlebars')
const front = require('./rutas/front')
const api = require('./rutas/api')

const app = express()
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars")
const { Router } = require("express")
const router = Router()
const axios = require("axios")
const expressFileUpload = require('express-fileupload');
const fs = require('fs');

app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(front)
app.use(api)


const port = process.env.PORT || 5000

app.use('/static', express.static('public'))

//app.engine('handlebars', handlebars());
app.engine(
    'handlebars',
    exphbs.engine({
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/'
    })
);
app.set('view engine', 'handlebars');

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const { Router } = require("express");
const db = require("../db");
const path = require('path');


const router = Router()

//**Rutas API*/
router.get('/skaters', async (req, res) => {
    const user = await db.getskaters()
    res.json(user);
})

//Crear
router.post('/skaters', async (req, res) => { 
    
    const { email, nombre, password, anos, especialidad } = req.body;    
    const { foto } = req.files;    

    let carpeta = path.join(__dirname,'../');    
    foto.mv(`${carpeta}/public/assets/img/${foto.name}`, (err) => {
        if(err) { console.log("err", err); res.send(false);  }
    });

    const user = await db.skatersCreate(email, nombre, password, anos, especialidad, foto.name)
    res.send(user);

})


//editar
router.put('/skaters/edit/:id', async (req, res) => {

    const { id, nombre, password, anos, especialidad } = req.body;    
    const respuesta = await db.editarSkaters(id, nombre, password, anos, especialidad);
    res.send(respuesta);
});

router.put('/check', async (req, res) => {   
    const { id, estado } = req.body;    
    const respuesta = await db.check(id, estado);
    res.send(respuesta);
});


//Eliminar
router.delete("/skaters/del/:id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await db.eliminarSkaters(id);
    res.send(respuesta);
});






module.exports = router
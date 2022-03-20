const { Router } = require("express");
const db = require("../db")

const jwt = require('jsonwebtoken')

const secretKey = "12346";
console.log(secretKey)

const router = Router()

//**Rutas handlebars*/
router.get('/', async (req, res) => {
    const user = await db.getskaters()
    res.render('index', { user });
})

router.get('/skaters-create', async (req, res) => {
    res.render("index", {
        layout: "registro"
    });
})


router.get('/login', async (req, res) => {
    res.render("index", {
        layout: "login",
        id: req.params.id
    });
})
//Verificando token
const Verificar = (req, res, next) => {
    let { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({
                error: "401 No Autorizado",
                message: err.message,
            })
        } else {
            req.user = decoded;
            next();
        };


    })
};

router.get('/admin', Verificar, async (req, res) => {
    const user = await db.getskaters()

    res.render("index", {
        layout: "admin",
        user: user
    });

})

router.get('/skaters-editar/:id', Verificar, async (req, res) => {
    res.render("index", {
        layout: "datos",
        id: req.params.id
    });
})

router.get('/skaters-delete/:id', async (req, res) => {
    res.render("index", {
        layout: "datos",
        id: req.params.id
    });
})

router.get('/check/:id', async (req, res) => {
    res.render("index", {
        layout: "admin",
        id: req.params.id
    });
})



router.get('/SignIn', async (req, res) => {
    const { email, password } = req.query;
    const user = await db.getSkatersLogin(email, password)

    if (user.length != 0) {
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 120, data: user[0], },
            secretKey

        );

        if (email == "admin@gmail.com") {
            res.send(` 
                <script>
                localStorage.setItem('token', JSON.stringify('${token}'))
                window.location.href = "/admin?token=${token}";
                </script>
            `);
        } else {
            res.send(` 
                <script>
                localStorage.setItem('token', JSON.stringify('${token}'))
                window.location.href = "/skaters-editar/:id?token=${token}";
                </script>
            `);
        }

    } else {
        res.send("Usuario o contraseña incorrecta");
    }
});







module.exports = router
require('dotenv').config()
const { Router } = require("express")

const { Client } = require('pg')


const connectionString = process.env.DATABASE_URL



const getskaters = async () => { 
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
        rejectUnauthorized: false
        }
        })
        
    await client.connect(); 
    const res = await client.query('SELECT * from skaters')
    await client.end()
    return res.rows
}

const getSkatersLogin = async (email, password) => { 
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
        rejectUnauthorized: false
        }
        })
        console.log(email, password)
    await client.connect(); 
    const res = await client.query(`SELECT * from skaters WHERE email='${email}' and password = '${password}'; `)
    await client.end()
    return res.rows
}

const skatersCreate = async (email, nombre, password, anos_experiencia, especialidad, foto) => {
       const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
        rejectUnauthorized: false
        }
        })

    await client.connect()
    const res = await client.query(`INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ('${email}', '${nombre}' , '${password}', '${anos_experiencia}', '${especialidad}', '${foto}', false);`);
    await client.end()
    return res.rows
}

// Editando 
async function editarSkaters(id, nombre, password, anos_experiencia, especialidad) {
    try {
        const res = {
            text: `UPDATE skaters SET nombre = $2, password = $3, anos_experiencia= $4, especialidad=$5 WHERE id = $1 RETURNING *`,
            values: [id, nombre, password, anos_experiencia, especialidad]
        }
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
            rejectUnauthorized: false
            }
            })
        await client.connect()

        const result = await client.query(res);
        await client.end()
        return result 
    } catch (e) {
        console.log(e);
    }
}


const eliminarSkaters = async (id) => {
    try {
        const consulta = {
            text: `DELETE FROM skaters WHERE id = $1`,
            values: [id]
        };
      
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
            rejectUnauthorized: false
            }
            })
        await client.connect()
        const res = await client.query(consulta);
        await client.end()
        return res.rows
        

    }
    catch (e) {
        return e;
    }

}

async function check(id, estado) {
    try {
        const res = {
            text: `UPDATE skaters SET estado = $2 WHERE id = $1 RETURNING *`,
            values: [id, estado]
        } 
      
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
            rejectUnauthorized: false
            }
            })
        await client.connect()

        const result = await client.query(res);
        await client.end()
        return result 
    } catch (e) {
        console.log(e);
    }
}






module.exports = { getskaters, skatersCreate, editarSkaters, eliminarSkaters, getSkatersLogin, check }
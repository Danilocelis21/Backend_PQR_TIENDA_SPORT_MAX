const express = require('express')
const app = express()
const port = 3000
const mysql = require ('mysql')

app.use(express.json())

const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proyecto'
})


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', (req, res) =>
    res.send('Hello World!'))


app.get('/PQRS', (req,res) =>{
    const sql = 'SELECT * FROM pqrs'

    conectBD.query(sql, (error, result) =>{
        if(error) throw error
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('No hay resultados')
        }
    })
})

app.get('/PQRS/:id', (req, res)=>{
    const id = req.params.id

    const sql = `SELECT * FROM pqrs WHERE idPQRS = ${id}` 

    conectBD.query(sql, (error, result)=>{
        
        if(error) throw error

        if(result.length > 0){
            res.json(result)
        }else{
            res.send('No hay resultados')
        }

    })
})

app.post('/agregar', (req,res) =>{

    const sql = 'INSERT INTO pqrs SET ?'

    const pqrObj = {

        idPQRS: req.body.idPQRS,
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        celular: req.body.celular,
        fijo: req.body.fijo,
        correo: req.body.correo,
        tituloPQR: req.body.tituloPQR,
        tipoTikect: req.body.tipoTikect,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    }

    conectBD.query(sql, pqrObj, error =>{
        if(error) throw error

        res.send('PQR agregada')
    })
})


app.put('/actualizar/:id', (req, res) => {
    const idPQRS = req.params.id;
    const { cedula, nombre, apellido, celular, fijo, correo, tituloPQR, tipoTikect, descripcion, estado } = req.body;

    const sql = `UPDATE pqrs SET cedula = ?, nombre = ?, apellido = ?, celular = ?, fijo = ?, correo = ?, tituloPQR = ?, tipoTikect = ?, descripcion = ?, estado = ? WHERE idPQRS = ?`;
    const values = [cedula, nombre, apellido, celular, fijo, correo, tituloPQR, tipoTikect, descripcion, estado, idPQRS];

    conectBD.query(sql, values, error => {
        if (error) throw error;

        res.send('PQR actualizada');
    });
});

app.delete('/eliminar/:id', (req,res) =>{
    
    const idPQRS = req.params.id
    const sql = `DELETE FROM pqrs where idPQRS = ${idPQRS}`
    
    conectBD.query(sql,err =>{
        if(err) throw err
    
        res.send('solicitud eliminada con éxito')
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
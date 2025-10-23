const express = require("express"); 
const cors = require("cors"); 
const { pool } = require("./db.js");
const usuarioRoutes = require("./routes.js");

const app = express();
const PUERTO = 3000; 

app.use(cors());
app.use(express.json());
app.use(usuarioRoutes);


app.get("/", (req, res) => {
    res.json({messagge: "Api funcionando correctamente"});
}); 

app.listen(PUERTO, () =>{
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})




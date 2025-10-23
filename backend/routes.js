const express = require("express");
const { pool } = require("./db.js");
const router = express.Router();


//Obtener todos los usuarios 
router.get("/api/data", async (req, res) => {
  try {
     const result  = await pool.query("SELECT * FROM usuarios")
     res.json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

//Obtener usuario por id
router.get("/api/data/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        if(result.rows.length === 0){
            return res.status(404).json({
                error: "Usuario no encontrado"
            })

        }
        res.json(result.rows);

    }catch(error){
        console.error("error en la colsulta", error);
        res.status(500).json({error: "Error al obtener los datos"});

    }
});

router.use(express.json())


//Crear un nuevo usuario
router.post("/api/data", async (req,res)=> {

    try{
        const {nombre,correo,edad} = req.body;
        await pool.query(
        "INSERT INTO usuarios (nombre, correo, edad) VALUES ($1, $2, $3)",
        [nombre, correo, edad]
        );

        res.status(201).json({
            succes:true,
            message: "usuario creado exitosamente"
        })

    }catch(error){
        console.error("Error al crear usuario:", error);
        res.status(500).json({ 
        success: false,
        error: "Error al crear el usuario" 
    });

    }
   
});

//Actualizar usuario
router.patch("/api/data/:id", async(req, res) => {
    try{
         const { id } = req.params;
    const {nombre, correo, edad} = req.body; 
    let query = "UPDATE usuarios SET ";
    const values = [];
    let paramCount = 1; 
    const updates = [];

    if (nombre !== undefined){
        updates.push(`nombre = $${paramCount}`);
        values.push(nombre);
        paramCount++; 
    } 

    if(correo !== undefined){
        updates.push(`correo = $${paramCount}`);
        values.push(correo);
        paramCount++;
    }

    if(edad !== undefined){
        updates.push(`edad = $${paramCount}`);
        values.push(edad);
        paramCount++;
    }

    if(updates.length === 0){
              return res.status(400).json({
        success: false,
        error: "No se proporcionaron campos para actualizar"
      });
    }

    query += updates.join(",") + ` WHERE id = $${paramCount}`;
    values.push(id);

    console.log("Query: ",  query)
    console.log("Valores:", values); 

     await pool.query(query, values);

     res.json({
      success: true,
      message: "Usuario actualizado exitosamente",
    });

    }catch(error){
         console.error("Error al actualizar usuario:", error);
    res.status(500).json({ 
      success: false,
      error: "Error al actualizar el usuario" 
    });

    }
   
});

//Eliminar usuario
router.delete("/api/data/:id", async(req, res) => {

    try{

        const { id } = req.params;

    const result = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING*", [id]);

    if(result.rows.length === 0){
         return res.status(404).json({
        success: false,
        error: "Usuario no encontrado"
        });
    }

    res.json({
        success:true,
        message: "Usuario eliminado exitosamente"
    });


    }catch(error){
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ 
      success: false,
      error: "Error al eliminar el usuario" 
    });
    }

});

module.exports = router;
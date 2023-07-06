import { conexion } from "../base_de_datos.js";

export const registroUsuario = (req, res) => {
    res.status(201).json({
        message: "usuario creado exitosamente"
    })
}
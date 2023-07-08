import jwt from 'jsonwebtoken';
import { conexion } from '../base_de_datos.js';

export function validarData({error, message, data }){
    // si hay un error ,emitiremos un error para detener el proceso
    if(error){
        throw new Error(JSON.stringify({ message, content: error.details}))
    }else{
        // si no hay error retornaremos la data
        return data
    }
}

export async function validarToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).json({
            message : 'se necesita un token para realizar esta peticion'
        })
    }

    const token = req.headers.authorization.split(' ')[1]

    if(!token){
        return res.status(400).json({
            message : 'el formato tiene q ser "Bearer <YOUR_TOKEN>"'
        })
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const usuario = await conexion.usuario.findUniqueOrThrow({where : {id: payload.id}})

        req.user = usuario

        next()

    }catch(error){
        return res.status(403).json({
            message : 'error en la token ',
            content : error.message
        })
    }


}
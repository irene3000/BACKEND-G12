import { conexion } from "../base_de_datos.js"
import { registroUsuarioDto, loginDto } from '../dtos/usuario.dto.js'
import bcrypt from 'bcryptjs'
import { validarData } from "../utils/validador.js"
import { Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const registroUsuario = async (req, res) => {
    const { body } = req
    const dataValidada = registroUsuarioDto.validate(body)
    try {
        const data = validarData({ error: dataValidada.error, data: dataValidada.value, message: 'Error al crear el usuario' })

        const salt = await bcrypt.genSalt()

        const password = await bcrypt.hash(dataValidada.value.password, salt)


        const usuarioCreado = await conexion.usuario.create({
            data: { ...data, password }
        })

        res.status(201).json({
            message: "usuario creado exitosamente",
            content: usuarioCreado
        })
    }
    catch (error) {
        console.log(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(500).json({
                message: 'Error el crear el usuario',
                content: 'El usuario ya existe'
            })
        }
        if (error instanceof Error) {
            return res.status(400).json(JSON.parse(error.message))
        }
    }
}

export const login = async (req, res) => {
    const dataValidada = loginDto.validate(req.body)

    try {
        const data = validarData({ error: dataValidada.error, data: dataValidada.value, message: 'Error al hacer el login' })

        const usuarioEncontrado = await conexion.usuario.findUniqueOrThrow({ where: { correo: data.correo } })
        console.log(usuarioEncontrado)

        const resultado = await bcrypt.compare(data.password,usuarioEncontrado.password)

        if(!resultado){
            return res.status(400).json({
                message : 'credenciales invalidas'
            })
        }

        const token = jwt.sign(
            {id: usuarioEncontrado.id, email: usuarioEncontrado.correo},
            process.env.JWT_SECRET,
            {expiresIn: '24h'})

        return res.json({
            content: token
        })
    } catch (error) {
        // console.log(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                message: 'usuario no existe',
                content: null
            })
        }
        return res.status(400).json(JSON.parse(error.message))
    }

}

export const perfil = async (req, res) =>{
    try{
        const usuarioEncontrado = await conexion.usuario.findUniqueOrThrow({ where : {id:req.user.id}})
        return res.json({
            content: usuarioEncontrado
        })
    }
    catch(error){
        return res.status(400).json({
            message: 'usuario no existe'
        })
    }
}
import * as UsuarioController from '../controllers/usuario.controller.js'
import { Router } from 'express'
import { validarToken } from '../utils/validador.js'

export const usuarioRouter = Router()

usuarioRouter.post('/registro', UsuarioController.registroUsuario)
usuarioRouter.post('/login', UsuarioController.login)
//porque si en el validarToken llega al next() pasara al controlador final (perfil)
usuarioRouter.get('/perfil', validarToken, UsuarioController.perfil)

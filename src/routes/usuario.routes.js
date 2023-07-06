import * as UsuarioController from '../controllers/usuario.controller.js'
import { Router } from 'express'

export const usuarioRouter = Router()

usuarioRouter.post('/registro', UsuarioController.registroUsuario)

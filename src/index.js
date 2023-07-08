import express from 'express'
import { usuarioRouter } from './routes/usuario.routes.js'
import { direccionRouter } from './routes/direccion.routes.js' 

const servidor = express()

servidor.use(express.json())

const puerto = process.env.PORT ?? 3000

servidor.use(usuarioRouter)
servidor.use(direccionRouter)

servidor.listen(puerto, ()=>{
    console.log(`Servidor corriendo exitosamente en el puerto ${puerto}`)
})
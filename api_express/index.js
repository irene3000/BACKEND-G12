import express from 'express';
import Joi from 'joi';
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from './swagger.json' assert {type : 'json'}

const servidor = express();
const productos = [];

const productoValidator = Joi.object({
    nombre : Joi.string().required().min(5).message('la longitud minima es de 5'),
    precio: Joi.number().min(0).required(),
    descripcion : Joi.string().optional()
});

servidor.use(express.json())
//servidor.use(express.urlencoded())

servidor.use('/docs', swaggerUI.serve,swaggerUI.setup(swaggerDoc))

servidor.get('/inicio',(req , res) =>{
    res.status(200).json({
        message : 'BIenvenido a mi API en Express'
    })
})

servidor.route('/productos').post((req,res) =>{
    console.log(req.body)
    const { body } = req;

    const validacion = productoValidator.validate(body);
    console.log(validacion);

    if (validacion.error) {
        return res.status(400).json({
            message : 'Error al crear el producto',
            content : validacion.error.details
        })
    }else{
        productos.push(validacion.value);
        return res.status(201).json({
            message : 'producto creado exitosamente'
        })
    }
    //productos.push()
  
}).get((req,res) => {
    res.json({
        content : productos
    })
})

servidor.route('/producto/:id').get((req,res) =>{
    console.log(req.params);
    const { id } = req.params
    const resultado = productos[id]
    console.log(resultado);
    if(!resultado) {
        return res.status(404).json({
            message : 'El producto no existe'
        })
    }else{
        return res.json({
            content: resultado
        })
    }
}).put((req,res)=> {
    const id = req.params.id
    const body = req.body
    const productoEncontrado = productos[id]

    if(!productoEncontrado) {
        return res.status(404).json({
            message : 'El producto no existe'
        })
    }

    const validacion = productoValidator.validate(body)

    if (validacion.error)
    {
        return res.status(400).json({
            message : 'error al acualizar el producto',
            content : validacion.error.details
        })
    }else{
        productos[id] = validacion.value

        return res.json({
            message : 'producto actualiado exitosamente'
        })
    }


}).delete((req,res) =>{
    const { id } = req.params
    const productoEncontrado = productos[id]

    if(!productoEncontrado) {
        return res.status(404).json({
            message : 'El producto no existe'
        })
    }
            
    productos[id] = null

    return res.json({
            message : 'producto eliminado exitosamente'
        })
})

servidor.listen(3000, ()=>{
    console.log('servidor corriendo exitosamente')
});
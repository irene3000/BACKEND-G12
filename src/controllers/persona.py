from flask_restful import Resource, request
from models.persona import Persona
from bd import conexion
from dtos.persona_dto import PersonaResponseDto, PersonaRequestDto
from os import path, getcwd, environ
from werkzeug.utils import secure_filename
from uuid import uuid4

from boto3 import Session

AWSSession = Session(aws_access_key_id=environ.get('AWS_ACCESS_KEY'),
                     aws_secret_access_key=environ.get('AWS_SECRET_KEY'),region_name=environ.get('AWS_BUCKET_REGION'))

class PersonasController(Resource):
    def get(self):
        personas = conexion.session.query(Persona).all()
        data = PersonaResponseDto().dump(personas, many=True)

        return {
            'content' : data
        }
    
    def post(self):
        print(request.form)
        print(request.files)
        foto = request.files.get('foto')
        portada = request.files.get('portada')
        directorioActual = getcwd()
        if foto:
            
            filename = secure_filename(foto.filename)
            filename = f'{uuid4()}-{filename}'
            foto.save(path.join(directorioActual,'imagenes',foto.filename))
        if portada:
            
            filename = secure_filename(portada.filename)
            filename = f'{uuid4()}-{filename}'
            portada.save(path.join(directorioActual,'imagenes',foto.filename))
        return {
            'message' : 'persona creada exitosamente'
        },201
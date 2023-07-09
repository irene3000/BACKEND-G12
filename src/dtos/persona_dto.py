from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models.persona import Persona

class PersonaResponseDto(SQLAlchemyAutoSchema):
    class Meta:
        model = Persona

class PersonaRequestDto(SQLAlchemyAutoSchema):
    class Meta:
        model = Persona
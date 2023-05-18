from datetime import datetime

class Persona:
    nombre = 'Juan'
    edad = 28
    correo = 'jperez@gmail.com'
    peso= 89.5

    def decir_hora(self):
        hora_actual = datetime.now()
        print(hora_actual.strftime('%I-%p'))
        hora,turno = data.split('-')
        print('SOn las 10 de la noche')

    def saludar(self):
        print('Hola soy {}'.format(self.nombre))

#variable pasa a llamarse instancia  (copia de la clase q sera alamacenada en esa variable)
persona1 = Persona()
persona1.nombre = 'Roberto'
persona1.saludar()
print(persona1.nombre)

persona2 = Persona()
print(persona2.nombre)
persona2.decir_hora()

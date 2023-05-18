try:
    print(5/0)
except ZeroDivisionError:
    print('Error al hacer la division entre 0')

except TypeError:
    print('Error por cuestiones de tipo de datos')

except Exception:
    print('Ya no se cual es el tipo de error')



print('YO soy el final del archivo')
meses=['Enero','Febrero','Marzo','Abril','Mayo']

for mes in meses:
    print('El mes es')
    print(mes)

for numero in range(5):
    print(numero)

for numero in range(2,10):
    print(numero)

for numero in range(2,10,3):
    print(numero)

#utilizando el metodo range empezar en 20 hasta 0 de 3 en 3

for numero in range(20,0,-3):
    print(numero)

print('-----------------------')
#while > mientras

tope = 0
while (tope<100):
    print('El tope es {}'.format(tope))
    # tope = tope + 1
    tope += 1

#condicionales
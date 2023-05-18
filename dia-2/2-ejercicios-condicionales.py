#edad= input('Ingresa tu edad : ')
#hace la conversion hacia un entero
#edad_numerica = int(edad)
#print

#Se ingresa

#edad= input('Ingresa tu edad : ')

#if edad >=18 :
    #print('Puedes ingresar a la discoteca')
#else:
    #print('No puedes ingresar a la discoteca, llamaremos a tus padres')
#si la persona tiene entre 40 y 60 años le ofreceremos un trago de cortesia aun asi no entre a la discoteca

#if edad >40 and edad<60 :
    #print('Se le ofrecera un trago de cortesia y no puede entrar a la disco')


#if edad >=18 :
    #print('Puedes ingresar a la discoteca')
    #if edad >40 and edad<60 :
     #   print('Se le ofrecera un trago de cortesia pero no puede entrar a la disco')
#elif edad>65:
    #print('No puede ingresar  xq es mayor')
#else:
   # print('No puedes ingresar a la discoteca, llamaremos a tus padres')

#----------------------------------
numeros = [1,10,40,50,55,3,4,9]
countmayores=0
countmenores=0
for numero in numeros:
    if numero <15:
        countmenores = countmenores+1
    else:
        countmayores= countmayores +1

print('Los menores de 15 son: ' + countmenores)
print('Los mayores de 15 son: ' + countmayores)

# la forma del profe para imprimir es esta:

print('Hay {} mayores que 15'.format(countmayores))
print(f'Hay {countmenores} menores que 15')
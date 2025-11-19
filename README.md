# Este Proyecto se hizo con un tp de backend del año pasado que se trataba de un login y register de usuarios

## Se le agrego la logica de jornadas

### Para levantar el proyecto:

````bash
npm i
````

- creen una base de datos postgres, asigenle un nombre y ajusten el .env en base a su coneccion a esa base de datos en su computadora

````bash
npm run start:dev
````

De base ya tendrían que tener en la base de datos un usuario superadmin,  de no ser asi corran el endpoint:
````bash
localhost:${PORT}/users/superadmin
````

### Correo y constraseña del superadmin en las variables de entorno

### No hay frontend de panel de control para superadmin por lo que las jornadas se tienen que crear desde Postman o alguna aplicación parecida

### Hay una variable de entorno que se llama CHECK_DISTANCE que sirve para deshabilitar el condicional que revisa la distancia, esto para poder testear mas facil




### Firebase no me dejaba tener las variables de entorno publicas por lo que se las deje en un .txt en la entrega del campus
### Le dejo tambien un archivo .sql para poder revisar rapido el funcionamiento de la app, una vez tenga levantado el front y el back con la base de datos creada importe ese archivo .sql a la base de datos.
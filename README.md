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

No hay panel de control para superadmin por lo que las jornadas se tienen que crear desde Postman o alguna aplicación parecida

Falta logica de imagenes
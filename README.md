## configurar conexion mysql ##

abrir el archivo `sequelize/config/database.json`

reemplazar `username`, `password` y `database`

## ejecutar migraciones de base de datos

crear la base de datos manualmente con el nombre que se haya colocado en el archivo `database.json`

y ejecutar en la terminal

~~~
npx sequelize-cli db:migrate
~~~
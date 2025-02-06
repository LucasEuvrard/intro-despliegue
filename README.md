# *Quienes somos*

Somos ***Aterrizar Ya*** y nos dedicamos a **ofrecer viajes** a lo largo de la **Argentina**. En **nuestra página** podrás encontrar las **ciudades** a donde nuestra **empresa** tiene sus **mejores viajes**. Dentro de cada ciudad hallarás **información** acerca de dicho **lugar** y los **mejores hoteles**. Ademas contamos con un **formulario** de **reservas** para que puedas **elegir** la **ciudad** y el **hotel** para tu **viaje**. 

Nuestra **página** consta de **3 pestañas**:

1) En la ***pestaña inicio***, se encuentra información de nuestra página y un carrusel de imágenes de la ciudades destinos que ofrecemos.

2) En ***pestaña alojamientos***, se pueden visualizar en forma de tarjeta las ciudades a las cuales se puede reservar un viaje, en cada tarjeta se encuentra el nombre de la ciudad con su foto y 2 botones uno para borrar dicha ciudad y otro para entrar a ver mas información de la ciudad. Ademas se encuentra un botón para crear una nueva ciudad. Una vez se entra a una ciudad en específico, se puede obtener información de dicho lugar y hay botón para editar datos de la ciudad en específico. Además se cuenta con 2 botones uno para ver los hoteles que pertenecen a esa ciudad y otro para crear hoteles que pertenezcan a esa ciudad. Dentro de ver los hoteles de una ciudad, estos están presentes en formas de tarjetas que tienen 2 botones, uno para editar la información del hotel y otro para borrarlo.

3) En la ***pestaña reservas*** se encuentra un formulario, para completar y realizar una reserva donde se puede seleccionar una ciudad y un hotel, para completar y realizar una reserva. Además cuenta con un botón para gestionar las reservas en donde en forma de tarjetas aparecen todas las reservas hechas. En caso de seleccionar una, se amplía para ver mas información y cuenta con 2 botones, uno para borrar la reserva y otro para editarla.

# *Forma local de uso*

# Servidor - Backend 

### En la carpeta "backend"

**Instalar** las **dependencias** del proyecto:

```sh
npm install
```

**Comenzar** la **ejecución** del **servidor**:
```sh
npm run dev
```

# Servidor - Frontend

### En la carpeta "frontend"

**Instalar** las **dependencias** del proyecto:

```sh
npm install
```

**Comenzar** la **ejecución** del **servidor**:

```sh
npm run start
```

# Base de datos

### En la carpeta "backend"

Para **realizar** las **migraciones** de las **tablas** de la **base de datos**:

```sh
npx prisma migrate dev
```

Para **iniciar** la **base de datos**:

```sh
docker-compose up -d
```

Para **detener** la **ejecución**:

```sh
docker-compose down
```

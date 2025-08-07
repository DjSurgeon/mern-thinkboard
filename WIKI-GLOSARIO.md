# Glosario

## Backend (Parte del Servidor)

El backend se refiere al código que se ejecuta en el servidor y que es invisible para el usuario final. Es la "parte de atrás" de una aplicación web, responsable de la lógica del negocio, la gestión de datos (interacción con bases de datos) y la seguridad. Por ejemplo, cuando te registras en una red social, el backend se encarga de verificar tus credenciales, crear tu cuenta en la base de datos y generar una sesión segura, todo sin que tú veas el proceso. Es el cerebro de la aplicación, el que se encarga de que todo funcione.

## Frontend (Interfaz de Usuario)

El frontend es la parte de la aplicación con la que el usuario interactúa directamente. Se ejecuta en el navegador del usuario (o en una aplicación móvil) y se encarga de todo lo que puedes ver y hacer: el diseño, los botones, los menús, las animaciones, y la forma en que se presentan los datos que provienen del backend. El frontend usa tecnologías como HTML, CSS y JavaScript para construir la interfaz. Es la cara de la aplicación, la que se asegura de que la experiencia del usuario sea agradable y funcional.

## RESTful (Estilo de Arquitectura de API)

RESTful es un estilo arquitectónico para diseñar APIs que se adhiere a los principios de REST (Representational State Transfer). Una API RESTful utiliza los métodos estándar del protocolo HTTP (GET, POST, PUT, DELETE) para realizar operaciones en los recursos del servidor. Estos métodos se corresponden directamente con las operaciones CRUD (Create, Read, Update, Delete) de una base de datos.

- GET: Obtener (Read) un recurso.
- POST: Crear (Create) un nuevo recurso.
- PUT: Actualizar (Update) un recurso existente.
- DELETE: Eliminar (Delete) un recurso.

Por ejemplo, para obtener la información de un usuario, harías una solicitud GET al endpoint /users/123. Para crear un nuevo usuario, harías un POST al endpoint /users. Este enfoque estandarizado hace que las APIs sean predecibles, fáciles de entender y de usar.

## Endpoint (Punto de Acceso de una API)

En el contexto de las APIs web (particularmente las RESTful), un endpoint es una URL específica que un cliente puede consultar para acceder a un recurso o realizar una operación en un servidor. Cada endpoint representa un punto de interacción con una API y se combina con un método HTTP (GET, POST, PUT, DELETE) para definir la acción deseada.

Piensa en una API como un edificio lleno de información y funcionalidades. Los endpoints son como las direcciones de las diferentes "oficinas" o "secciones" dentro de ese edificio. Por ejemplo, en una API de usuarios, https://api.ejemplo.com/users/123 sería un endpoint. Cuando un cliente hace una solicitud GET a esa dirección, está "llamando" a la oficina de usuarios para obtener la información del usuario con ID 123. Los endpoints son fundamentales para la estructura y el uso de cualquier API, ya que definen qué datos están disponibles y cómo se puede interactuar con ellos.

## MVC (Patrón de Diseño de Software)

MVC (Model-View-Controller) es un patrón de diseño de software muy popular que se utiliza para organizar el código de una aplicación, dividiéndolo en tres componentes interconectados. Su objetivo es separar la lógica de negocio de la interfaz de usuario, lo que facilita el desarrollo, la depuración y el mantenimiento.

- **Modelos (Models)**: Representan los datos y la lógica de negocio. Se encargan de la gestión de la información, interactuando directamente con la base de datos (por ejemplo, obtener datos de un usuario o actualizarlos).
- **Vistas (Views)**: Son la capa de presentación, es decir, la interfaz de usuario. Son las responsables de mostrar la información al usuario (por ejemplo, una página HTML con los datos del usuario).
- **Controladores (Controllers)**: Actúan como un intermediario entre los modelos y las vistas. Reciben las peticiones del usuario, deciden qué modelo y qué vista utilizar, procesan la información y devuelven la respuesta adecuada.

## **Node.js** (Entorno de Ejecución de JavaScript)

****Node.js**** es un entorno de ejecución de JavaScript de código abierto y multiplataforma que permite ejecutar código **JavaScript** fuera de un navegador web. Antes de **Node.js**, JavaScript se usaba casi exclusivamente para el desarrollo front-end. **Node.js**, que está construido sobre el motor V8 de Chrome, hizo posible usar JavaScript para el desarrollo de servidores (backend), herramientas de línea de comandos y otras aplicaciones de red.

## ``npm`` (Gestor de Paquetes de **Node.js**)

``npm`` (Node Package Manager) es el gestor de paquetes estándar para **Node.js**. Es una herramienta indispensable para cualquier proyecto de **Node.js**, ya que facilita la instalación, la gestión y el uso de librerías externas (llamadas "paquetes" o "dependencias"). `npm` consta de dos partes principales:

- Un registro online de millones de paquetes de código abierto.
- Una interfaz de línea de comandos (CLI) que te permite instalar, actualizar y eliminar esos paquetes en tu proyecto.

Por ejemplo, con un simple comando como `npm install express`, puedes añadir el framework **Express** a tu proyecto.

## `express`

`Express` es un framework web minimalista y flexible para ****Node.js**** que proporciona un conjunto robusto de características para desarrollar aplicaciones web y APIs de manera rápida y eficiente. Simplifica drásticamente el proceso de construir servidores y definir cómo responder a las diferentes solicitudes HTTP que llegan a tu aplicación. Sin Express, tendrías que manejar manualmente tareas complejas como el análisis de las solicitudes HTTP entrantes y el enrutamiento. Express te libera de esta complejidad, permitiéndote concentrarte en la lógica de negocio de tu aplicación.

## `dotenv`

`Dotenv` es una librería de carga de variables de entorno muy popular, especialmente en el ecosistema de ****Node.js****. Su función principal es cargar variables de entorno desde un archivo `.env` a la variable global `process.env`. Esto permite que información sensible o específica del entorno (como claves de API, credenciales de bases de datos, o URLs de servicios externos) se almacene en un archivo separado del código fuente de la aplicación, mejorando la seguridad y la portabilidad de tu proyecto.

## `nodemon`

**Nodemon** es una utilidad para ****Node.js**** que mejora significativamente la productividad durante el desarrollo. Su función principal es monitorear los cambios en los archivos de tu proyecto y, cada vez que detecta una modificación, reinicia automáticamente el servidor o la aplicación ****Node.js****. Esto elimina la tediosa tarea de tener que detener y volver a iniciar manualmente el servidor cada vez que realizas un cambio en tu código, agilizando enormemente el ciclo de desarrollo.

## `package.json`

El archivo `package.json` es el corazón de cualquier proyecto de ****Node.js****. Es un manifiesto que contiene metadatos clave sobre el proyecto, como su nombre, versión, una descripción, los autores y la licencia. Lo más importante, define los scripts de ejecución (como start o test) y gestiona la lista de todas las dependencias (librerías externas) que tu proyecto necesita para funcionar. Es la forma estandarizada de compartir y gestionar proyectos en el ecosistema de ****Node.js****.

## `type: "module"`

La propiedad `"type": "module"` en el archivo `package.json` es una configuración que le indica a ****Node.js**** que trate los archivos `.js` de tu proyecto como módulos **ECMAScript** (ESM). Esto te permite usar la sintaxis moderna de `import` y `export`, en lugar del sistema de módulos `require()` de CommonJS. Adoptar esta sintaxis hace que tu código sea más moderno y legible, alineándose con la forma en que los módulos son manejados en los navegadores.

## `.gitignore` (Ignorar Archivos en Git)

El archivo `.gitignore` es un archivo de texto que le dice a Git (un sistema de control de versiones) qué archivos o directorios debe ignorar y no incluir en el repositorio. Es una práctica de desarrollo fundamental para evitar que archivos temporales, dependencias (/node_modules), claves de API (.env) o archivos de registro se suban accidentalmente al repositorio. Esto mantiene el repositorio limpio, seguro y enfocado únicamente en el código fuente del proyecto.

## Middleware (Función Intermedia en Express)

En el contexto de un framework como Express, un middleware es una función que tiene acceso al objeto de solicitud (request), al objeto de respuesta (response) y a la siguiente función de middleware en el ciclo de solicitud-respuesta. Estas funciones pueden ejecutar código, modificar los objetos de solicitud y respuesta, finalizar el ciclo de solicitud-respuesta o llamar al siguiente middleware.

Piensa en un middleware como un filtro o una estación de procesamiento por la que pasa cada solicitud antes de llegar a su destino final. Por ejemplo:

- Un middleware podría autenticar al usuario, verificando si tiene un token válido.
- Otro middleware podría registrar la solicitud en la consola (como Morgan).
- Otro podría analizar el cuerpo de la solicitud (como express.json()).

El uso de middleware permite agregar funcionalidades de manera modular, sin tener que duplicar código en cada una de las rutas de tu API.

## HTTP Methods (Verbos HTTP)

Los HTTP Methods (Métodos HTTP), también conocidos como verbos HTTP, son una parte fundamental del protocolo HTTP. Indican la acción que un cliente desea realizar sobre un recurso en el servidor. Estos verbos le dan un significado semántico a la solicitud. Algunos de los más comunes son:

- **GET**: Para obtener o leer un recurso. No debe tener efectos secundarios en el servidor.
- **POST**: Para crear un nuevo recurso. Los datos del nuevo recurso se envían en el cuerpo de la solicitud.
- **PUT**: Para actualizar o reemplazar completamente un recurso existente.
- **DELETE**: Para eliminar un recurso específico.

Los métodos HTTP son esenciales para diseñar APIs RESTful, ya que asocian claramente las acciones del cliente con las operaciones CRUD del servidor.

## Status Codes (Códigos de Estado HTTP)

Los Status Codes (códigos de estado HTTP) son una serie de códigos numéricos estandarizados que un servidor web envía en la respuesta a una solicitud HTTP de un cliente. Estos códigos le indican al cliente si la solicitud ha sido procesada con éxito o si ha ocurrido algún problema. Son cruciales para la comunicación entre el cliente y el servidor. Los códigos se dividen en categorías:

- **2xx (Éxito)**: La solicitud fue recibida, entendida y aceptada con éxito. Por ejemplo, 200 OK (todo bien), 201 Created (recurso creado).
- **4xx (Error del cliente)**: La solicitud contiene una sintaxis incorrecta o no puede ser procesada. Por ejemplo, 404 Not Found (el recurso no existe), 400 Bad Request (solicitud inválida).
- **5xx (Error del servidor)**: El servidor falló en cumplir una solicitud aparentemente válida. Por ejemplo, 500 Internal Server Error (un error inesperado en el servidor).

## Request (Solicitud HTTP)

Una Request (solicitud HTTP) es un mensaje enviado por un cliente (como un navegador o una aplicación) a un servidor. Es el inicio de la comunicación en el modelo cliente-servidor. La solicitud está compuesta por varios elementos:

- **Método HTTP**: El verbo que indica la acción (ej. GET, POST).
- **URL**: La dirección del recurso que se solicita (ej. /api/users).
- **Headers**: Metadatos sobre la solicitud, como el tipo de contenido, la autenticación o el User-Agent.
- **Body**: El cuerpo de la solicitud, que contiene datos que se envían al servidor (común en POST y PUT).

## Response (Respuesta HTTP)

Una Response (respuesta HTTP) es el mensaje que un servidor envía de vuelta a un cliente como resultado de una solicitud HTTP. Es la parte final de la comunicación en el modelo cliente-servidor. La respuesta está compuesta por:

- **Código de estado**: El código numérico que indica el resultado de la solicitud (ej. 200, 404).
- **Headers**: Metadatos sobre la respuesta, como el tipo de contenido o la fecha.
- **Body**: El cuerpo de la respuesta, que contiene los datos solicitados (por ejemplo, un archivo HTML o un objeto JSON con los datos de un usuario).



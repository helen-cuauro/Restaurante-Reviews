[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/LFd7ICO0)
# Proyecto: API de Reseñas de Restaurantes

## Acerca del proyecto

El desafío consiste en crear una RESTful API para un sistema de reseñas de restaurantes. Los usuarios pueden registrar diferentes restaurantes, añadir reseñas y puntuaciones. Habrá roles de usuario que permitirán distintos niveles de acceso y funcionalidades.

## Esquema de Base de Datos

### Tabla `users`
- **id** (INTEGER): Primary Key, Autoincremental.
- **username** (VARCHAR(50)): Unique, Not Null.
- **password** (VARCHAR(255)): Not Null.
- **role** (VARCHAR(20)): Not Null, Default 'user', Valores posibles: 'admin', 'user'.

### Tabla `restaurants`
- **id** (INTEGER): Primary Key, Autoincremental.
- **name** (VARCHAR(100)): Not Null.
- **address** (VARCHAR(255)): Not Null.
- **category** (VARCHAR(50)): Not Null.

### Tabla `reviews`
- **id** (INTEGER): Primary Key, Autoincremental.
- **userId** (INTEGER): Foreign Key references `Users(id)`, Not Null.
- **restaurantId** (INTEGER): Foreign Key references `Restaurants(id)`, Not Null.
- **score** (INTEGER): Not Null, Rango 1-5.
- **title** (VARCHAR(100)): Not Null.
- **description** (TEXT): Not Null.

#### Relaciones Entre las Tablas
- Un usuario puede escribir varias reseñas, pero una reseña pertenece a un usuario
- Un restaurante puede tener varias reseñas, pero una reseña pertenece a un restaurante.

## Detalles de los endpoints

### Registro de Usuarios (`POST /register`):
- Acceso: público
- Body:
  - `username` (string)
  - `password` (string)
  - `role` (string, opcional, valores posibles: "user" | "admin", default: "user")
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Usuario registrado exitosamente",
    "data": { "id": 1, "username": "newUser", role: "user" }
  }
  ```

### Autenticación de Usuarios (`POST /login`):
- Acceso: público
- Body:
  - `username` (string)
  - `password` (string)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Login exitoso",
    "data": { "token": "jwt_token_here" }
  }
  ```

### Listado de Restaurantes (`GET /restaurants`):
- Acceso: público
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Lista de restaurantes",
    "data": [
      { "id": 1, "name": "Restaurante A", "address": "Calle 123", "category": "Italiana" },
      { "id": 2, "name": "Restaurante B", "address": "Avenida 456", "category": "Mexicana" }
    ]
  }
  ```

### Creación de Restaurante (`POST /restaurants`):
- Acceso: usuarios autenticados
- Body:
  - `name` (string)
  - `address` (string)
  - `category` (string)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Restaurante creado exitosamente",
    "data": { "id": 3, "name": "Restaurante C", "address": "Calle 789", "category": "Japonesa" }
  }
  ```

### Actualización de Restaurante (`PATCH /restaurants/{id}`):
- Acceso: usuarios autenticados
- Body:
  - `name` (string, opcional)
  - `address` (string, opcional)
  - `category` (string, opcional)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Restaurante actualizado exitosamente",
    "data": { "id": 1, "name": "Nuevo Nombre", "address": "Nueva Dirección", "category": "Nueva Categoría" }
  }
  ```

### Eliminación de Restaurante (`DELETE /restaurants/{id}`):
- Acceso: usuarios autenticados
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Restaurante eliminado exitosamente"
  }
  ```

### Listar Reseñas de un Restaurante (`GET /restaurants/{id}/reviews`):
- Acceso: público
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Lista de reseñas para el restaurante",
    "data": [
      { "id": 1, "userId": 2, "restaurantId": 1, "score": 4, "title": "Muy Bueno", "description": "Gran ambiente y comida deliciosa." },
      { "id": 2, "userId": 3, "restaurantId": 1, "score": 5, "title": "Excelente", "description": "Una experiencia inolvidable." }
      // ... más reseñas
    ]
  }
  ```

### Añadir Reseña a Restaurante (`POST /restaurants/{id}/reviews`):
- Acceso: usuarios autenticados
- Body:
  - `score` (integer, 1-5)
  - `title` (string)
  - `description` (string)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Reseña añadida exitosamente",
    "data": { "id": 1, "userId": 1, "restaurantId": 1, "score": 5, "title": "Excelente", "description": "La mejor experiencia" }
  }
  ```

### Actualizar Reseña (`PATCH /reviews/{id}`):
- Acceso: usuarios autenticados y autorizados
  - El usuario con rol "user" solo puede editar una reseña que pertenezca a su usuario.
  - El usuario con rol "admin" puede editar cualquier reseña.
- Body:
  - `score` (integer, 1-5, opcional)
  - `title` (string, opcional)
  - `description` (string, opcional)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Reseña actualizada exitosamente",
    "data": { "id": 1, "userId": 1, "restaurantId": 1, "score": 4, "title": "Muy Bueno", "description": "Excelente comida" }
  }
  ```

### Eliminar Reseña (`DELETE /reviews/{id}`):
- Acceso: usuarios autenticados y autorizados
  - El usuario con rol "user" solo puede eliminar una reseña que pertenezca a su usuario.
  - El usuario con rol "admin" puede eliminar cualquier reseña.
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Reseña eliminada exitosamente"
  }
  ```

### Listar Usuarios (`GET /users`):
- Acceso: usuarios autenticados y autorizados
  - Solo usuarios con rol "admin" pueden acceder.
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Lista de usuarios",
    "data": [
      { "id": 1, "username": "user1", "role": "user" },
      { "id": 2, "username": "user2", "role": "admin" }
      // ... más usuarios
    ]
  }
  ```

### Actualizar Usuario (`PATCH /users/{id}`):
- Acceso: usuarios autenticados y autorizados
  - Solo usuarios con rol "admin" pueden acceder.
- Body:
  - `username` (string, opcional)
  - `password` (string, opcional)
  - `role` (string, opcional)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Usuario actualizado exitosamente",
    "data": { "id": 1, "username": "updatedUser", "role": "editor" }
  }
  ```

### Eliminar Usuario (`DELETE /users/{id}`):
- Acceso: usuarios autenticados y autorizados
  - Solo usuarios con rol "admin" pueden acceder.
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Usuario eliminado exitosamente"
  }
  ```

## Mensajes de error

Los mensajes de error deben mantener una estructura estándar en todos los endpoints y utilizar códigos de estatus adecuados como 400, 401, 403 o 500.

```json
{
  "ok": false,
  "message": "Mensaje de error",
  "details": {
    // detalles del error
  }
}
```

## Requerimientos técnicos

- Utilizar `Express.js` con `TypeScript`.
- Implementar una arquitectura de 3 capas.
- Organizar la API utilizando rutas y routers modulares.
- Implementar middlewares para autenticación y autorización basada en roles.
- Usar autenticación basada en sesiones o tokens (decisión del equipo).
- Validar datos de entrada con `Zod`.
- Usar `PostgreSQL` para la persistencia de datos.
- Interactuar con la base de datos utilizando la librería `pg`.

## Metodología de trabajo

Seguiremos utilizando **GitHub Flow** para el desarrollo de las tareas.

- Cada equipo será responsable de crear sus tareas en el tablero Kanban.
- El nombre de la tarea deberá iniciar el su código de equipo, por ejemplo **T01 Nombre de tarea** para una tarea que le pertenece al equipo 1.
- Si todos respetamos esta convención podremos usar el filtro de la parte superior para filtrar solo las tareas de nuestro equipo. Por ejemplo:

<img src="https://res.cloudinary.com/dwdgpw20b/image/upload/v1693498163/illustrations/task-filter_fsxvwj.png" />

## Retroalimentación

Para dar por finalizado el Extended Project deberás completar el formulario de feedback para cada uno de tus compañeros de equipo y registrar la URL de su repositorio de GitHub.

## Fecha de entrega

**La fecha máxima de entrega es sábado a las 23:59:59 EST (media noche)**. Si tu equipo necesita tiempo adicional deberás comunicarte con tu Asistente Académico.

Happy coding! 🧑‍💻🧑‍💻🧑‍💻

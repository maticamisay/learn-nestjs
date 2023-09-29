# NestJS Learning Project

Este proyecto es una introducción práctica a NestJS, un marco de trabajo Node.js basado en TypeScript que utiliza características avanzadas de JavaScript como decoradores. A lo largo de este proyecto, estoy experimentando con la creación de esquemas y manipulando datos para obtener una comprensión profunda de cómo funciona NestJS.

## Características

- Creación de esquemas con Mongoose.
- Implementación de un CRUD para modelos de `Todo` y `User`.
- Uso de GraphQL para realizar consultas y mutaciones.
- Manejo de relaciones entre diferentes modelos.

## Requisitos

- Node.js
- MongoDB

## Instalación

1. Clona este repositorio:
   ```bash
   git clone [URL-del-repositorio]
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd [nombre-del-directorio]
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicia el servidor:
   ```bash
   npm run start:dev
   ```

## Uso

Con el servidor en ejecución, dirígete a `http://localhost:3000/graphql` para acceder al Playground de GraphQL, donde puedes probar las consultas y mutaciones.

Ejemplo de consulta:

```graphql
query {
  todos {
    title
    userId {
      name
    }
  }
}
```

## Contribuciones

Dado que este es un proyecto de aprendizaje personal, no estoy aceptando pull requests. Sin embargo, si encuentras algún problema o tienes sugerencias, siéntete libre de abrir un issue.

## Agradecimientos

Agradezco a la documentación oficial de NestJS, tutoriales y a la comunidad por los recursos y el apoyo.

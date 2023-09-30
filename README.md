# NestJS Learning Project

Este proyecto es una introducción práctica a NestJS, un marco de trabajo Node.js basado en TypeScript que utiliza características avanzadas de JavaScript como decoradores. A lo largo de este proyecto, estoy experimentando con la creación de esquemas y manipulando datos para obtener una comprensión profunda de cómo funciona NestJS. Aprovechando las potentes características que ofrece, como inyección de dependencias, decoradores personalizados, y una estructura modular y escalable.

## Características Principales

- **Modelado de Datos con Mongoose**: Se utilizan esquemas de Mongoose para definir la estructura de los datos de `User` y `Todo`.

  ```typescript
  @ObjectType()
  @Schema()
  export class User {
    ...
  }
  ```

- **GraphQL**: Utilizamos el módulo GraphQL de NestJS para exponer una API de GraphQL. La estructura y los tipos están definidos utilizando decoradores específicos de GraphQL.

  ```typescript
  @Resolver(of => Todo)
  export class TodoResolver {
    ...
  }
  ```

- **Inyección de Dependencias**: NestJS promueve un enfoque basado en la inyección de dependencias. Esto no solo facilita la escritura de código desacoplado y más fácil de mantener, sino que también facilita la realización de pruebas unitarias.

  ```typescript
  constructor(private todoService: TodoService, private userService: UserService) { }
  ```

- **Modularidad**: Todo el código está organizado en módulos específicos para `User` y `Todo`, lo que facilita la escalabilidad y el mantenimiento del código en el futuro.

  ```typescript
  @Module({
    ...TodoModule,
    UserModule,
  })
  export class AppModule {}
  ```

- **Buenas Prácticas**: El código sigue las mejores prácticas recomendadas para NestJS. Desde el uso correcto de decoradores, la definición adecuada de tipos y DTOs, hasta el manejo de errores.

## Requisitos

- Node.js
- MongoDB

## Cómo Empezar

1. **Configuración del entorno**: Asegúrate de configurar las variables de entorno, en particular `DB_URI`, que es la cadena de conexión a la base de datos MongoDB.

2. **Ejecución local**: Utiliza el comando `npm run start` para ejecutar el servidor localmente. Una vez iniciado, puedes acceder a la interfaz de Playground GraphQL para probar la API.

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

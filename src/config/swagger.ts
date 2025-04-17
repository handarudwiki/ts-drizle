// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Drizle ORM API',
      version: '1.0.0',
      description: 'Dokumentasi API untuk aplikasi menggunakan Drizzle ORM',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Sesuaikan dengan lokasi file route Anda
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

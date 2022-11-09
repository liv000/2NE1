const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: '2NE1',
      description: '엘리스 SW 3기 첫번째 프로젝트입니다. ',
    },
    servers: [
      {
        url: 'http://localhost:3000', // 요청 URL
      },
    ],
  },
  apis: ['./routers/*.js'],
};
const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };

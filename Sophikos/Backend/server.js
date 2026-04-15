require('dotenv').config();

const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/cors'), {
    origin: true // разрешает запросы с любого адреса, для разработки ок
});

fastify.register(require('./routes/users'));
fastify.register(require('./routes/auth'));

fastify.listen({ port: 10000, host: '0.0.0.0' }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
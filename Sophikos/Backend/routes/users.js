const prisma = require('../prisma/client');

module.exports = async function(fastify) {

    fastify.get('/users', async (request, reply) => {
        const users = await prisma.user.findMany();
        return users;
    });

    fastify.post('/users', async (request, reply) => {
        const { name, email } = request.body;
        const user = await prisma.user.create({
            data: { name, email }
        });
        return user;
    });

};
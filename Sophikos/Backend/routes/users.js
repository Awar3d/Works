const prisma = require('../prisma/client');
const jwt = require('jsonwebtoken');

module.exports = async function(fastify) {
    fastify.get('/users/me', async (request, reply) => {
        const authHeader = request.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.status(401).send({ error: 'Нет токена'})
        }
        const token = authHeader?.replace("Bearer ", "");
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({ where: { id: payload.userId } })
        return user;
    })

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
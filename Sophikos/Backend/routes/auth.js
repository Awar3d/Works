const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

module.exports = async function(fastify) {
    fastify.post('/auth/register', async (request, reply) => {
        const { name, email, password } = request.body;

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return reply.status(400).send({ error: "Email уже занят"})
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, passwordHash },
        })

        return { ok: true, userId: user.id };
    })
    fastify.post('/auth/login', async (request, reply) => {
        const { email, password } = request.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return reply.status(400).send({ error: 'Неверный email или пароль' })
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if(!valid) {
            return reply.status(400).send({ error: 'Неверный email или пароль' })
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        )

        return { ok: true, token}
    })
}
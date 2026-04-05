import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const hash = await bcrypt.hash('your_password', 10)
    await prisma.user.create({
        data: {
            email: 'alimdaurenbek01@gmail.com',
            name: 'Daurenbek',
            passwordHash: hash,
            role: 'ADMIN',
            status: 'APPROVED',
        }
    })
    console.log('Admin создан')
}

main().finally(() => prisma.$disconnect())
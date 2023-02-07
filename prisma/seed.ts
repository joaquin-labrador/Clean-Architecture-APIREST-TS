import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    const categoryBasic = await prisma.userCategory.create({
        data: {
            userCategoryName: "Basic"
        }
    });

    const categoryPremium = await prisma.userCategory.create({
        data: {
            userCategoryName: "Premium"
        }
    });

    const categoryAdmin = await prisma.userCategory.create({
        data: {
            userCategoryName: "Admin"
        }
    });

    console.log({ categoryBasic, categoryPremium, categoryAdmin })
}


main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
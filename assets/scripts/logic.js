const { PrismaClient } = require("@prisma/client");

async function createUser(bot, msg) {
    let username = msg.from.username;
    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.findFirst({
        where: { username },
      });
  
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            username: username,
            tonBalance: 0,
            gameBalance: 0,
            isPayed: false,
            isAdmin: false,
          },
        });
        console.log(newUser);
        await bot.sendMessage(
          msg.chat.id,
          "Пользователь был успешно добавлен в базу данных"
        );
      } else {
        await bot.sendMessage(
          msg.chat.id,
          "Такой пользователь уже есть в базе данных"
        );
        console.log("Такой пользователь уже существует");
      }
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      await bot.sendMessage(
        msg.chat.id,
        "Произошла ошибка при добавлении пользователя в базу данных"
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  

module.exports = {
  createUser: createUser,
};

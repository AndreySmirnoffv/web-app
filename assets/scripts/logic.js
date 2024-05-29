const { PrismaClient } = require("@prisma/client");
const {adminKeyboard } = require("../keyboard/keyboard");

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
      await bot.sendPhoto(msg.chat.id, "./assets/images/welcomePhoto.jpg", {
        caption: `Привет ${msg.from.username}, вот что ты можешь сделать`,
        reply_markup: JSON.stringify({
          inline_keyboard: [[{ text: "Start App", callback_data: "asd" }]],
        }),
      });
      console.log(newUser);
    } else {
      if (!user.isAdmin) {
        await bot.sendPhoto(msg.chat.id, "./assets/images/welcomePhoto.jpg", {
          caption: `Привет ${msg.from.username}, вот что ты можешь сделать`,
          reply_markup: JSON.stringify({
            inline_keyboard: [[{ text: "Start App", callback_data: "asd" }]],
          }),
        });
      } else {
        await bot.sendMessage(
          msg.chat.id,
          "Привет админ вот что ты можешь сделать",
          adminKeyboard
        );
      }
    }
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    await bot.sendMessage(msg.chat.id, "Произошла ошибка");
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createUser: createUser,
};

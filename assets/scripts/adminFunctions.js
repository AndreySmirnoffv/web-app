const { prisma } = require('./logic')

async function waitForText(bot, chatId) {
    return new Promise((resolve) => {
      bot.onText(/.*/, (msg) => {
        if (msg.from.username === chatId) {
          resolve(msg);
          console.log(msg.text)
        }
      });
    });
  }
  

async function addBalance(bot, msg) {
    try {
        await bot.sendMessage(msg.chat.id, "Пришлите мне имя пользователя, которому хотите добавить баланс");
        console.log("программа дальше не идет разбирайся почему гы )")
        console.log(msg.text)
        const username = "hashfuck"
        console.log(`Имя пользователя: ${username}`);

        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if (!user) {
            await bot.sendMessage(msg.chat.id, "Пользователь с таким именем не найден.");
            return;
        }

        await msg.reply("Пришлите мне, сколько Ton хотите добавить");
        const balanceText = await waitForText(bot, ctx);
        const balance = parseInt(balanceText, 10);

        if (isNaN(balance)) {
            await bot.sendMessage(msg.chat.id, "Пожалуйста, пришлите корректное число.");
            return;
        }

        await prisma.user.update({
            where: { username: username },
            data: {
                tonBalance: user.tonBalance + balance,
            },
        });

        await bot.sendMessage(msg.chat.id, "Все сохранилось успешно");
    } catch (error) {
        console.log(error)
        console.error("Произошла ошибка при обновлении баланса:", error);
        await bot.sendMessage(msg.chat.id, "Произошла ошибка при обновлении баланса.");
    } finally {
        await prisma.$disconnect();
    }
}


module.exports = {
    addBalance: addBalance
}
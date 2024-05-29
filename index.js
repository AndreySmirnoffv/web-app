require('dotenv').config({path: "./assets/modules/.env"})
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.devStatus ? process.env.TEST_TOKEN : process.env.DEFAULT_TOKEN, {polling: true})
const fs = require('fs')
const { createUser } = require('./assets/scripts/logic.js')
const commands = JSON.parse(fs.readFileSync("./assets/commands/commands.json"))

bot.setMyCommands(commands)

bot.on('message', async msg => {
    if (msg.text === '/start'){
        createUser(bot, msg)
        // await bot.sendPhoto(msg.chat.id, "./assets/images/welcomePhoto.jpg")
    }
})

bot.on('callback_query', async msg => {})

bot.on('polling_error', console.log)
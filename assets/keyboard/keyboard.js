module.exports = {
    startKeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Start App", callback_data: "asd"}]
            ]
        })
    }
}
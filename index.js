const Express = require('express')

const { cleanup, setup } = require('./config')

const app = Express()

app.use(async (req, res) => {
    await setup({ withIncognito: true })

    // Your test code here
    await page.goto('https://facebook.com')
    await incognitoPage.goto('https://google.com')

    await cleanup(res)
})

module.exports = { chrome: app }
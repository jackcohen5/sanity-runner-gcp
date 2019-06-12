const Puppeteer = require('puppeteer')
const Archiver = require('archiver')

const setup = async ({ withIncognito }) => {
    global.browser = await Puppeteer.launch({
        args: ['--no-sandbox']
    })
    global.page = await browser.newPage()

    if (withIncognito) {
        global.incognito = await browser.createIncognitoBrowserContext()
        global.incognitoPage = await global.incognito.newPage()
    }
}


const cleanup = async (res) => {
    const hasIncognito = typeof global.incognito !== 'undefined'
    const imageBuffer = await page.screenshot()
    const incognitoImageBuffer = await incognitoPage.screenshot()
    browser.close()

    try {
        const zip = Archiver('zip')
        res.set('Content-Type', 'application/zip')
        res.set('Content-disposition', 'attachment; filename=screenshots.zip')
        await zip.pipe(res)
        await zip.append(imageBuffer, { name: `browser.png` })
        if (hasIncognito) {
            await zip.append(incognitoImageBuffer, { name: `incognito.png` })
        }
        await zip.finalize()
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

module.exports = { cleanup, setup }
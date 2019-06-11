const Express = require('express');
const Puppeteer = require('puppeteer');
const Archiver = require('archiver');

const app = Express();

app.use(async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.send('Please provide URL as GET parameter, for example: <a href="/?url=https://example.com">?url=https://example.com</a>');
    }

    const browser = await Puppeteer.launch({
        args: ['--no-sandbox']
    });
    const incognito = await browser.createIncognitoBrowserContext()

    const page = await browser.newPage();
    await page.goto(url);
    const imageBuffer = await page.screenshot();

    const incognitoPage = await incognito.newPage();
    await incognitoPage.goto('https://google.com');
    const incognitoImageBuffer = await incognitoPage.screenshot();
    browser.close();

    let i = 0
    try {
        const zip = Archiver('zip');
        res.set('Content-Type', 'application/zip');
        res.set('Content-disposition', 'attachment; filename=screenshots.zip');
        await zip.pipe(res);
        for (const b of [imageBuffer, incognitoImageBuffer]) {
            await zip.append(b, { name: `${++i}.png` });
        }
        await zip.finalize();
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

module.exports.chrome = app;
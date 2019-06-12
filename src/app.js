const app = require('./index').chrome

const server = app.listen(process.env.PORT || 8080, err => {
    if (err) return console.error(err)
    const port = server.address().port
    console.info(`App listening on port ${port}`)
})
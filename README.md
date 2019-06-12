# Sanity Runner GCP

## Why?

You want to run serverless automated sanities on your application, but some of your tests require two sessions running at once. That's why we have incognito mode, right?! But wait, AWS Lambda doesn't support multiple processes and the `--single-process` flag isn't officially supported in Chromium, meaning we can't use Puppeteer's `createIncognitoBrowserContext` on Lambda. Well never fear, that's why we're gonna run it on GCP instead.

## Installation

You can optionally use [nvm](https://github.com/nvm-sh/nvm) and [yvm](https://github.com/tophat/yvm) to manage your runtime environment.

`nvm use`
`yvm use`

Then you can run `yarn` (or `npm install`) to install.

## Usage

Once you've installed your dependencies, you can run the test locally with `yarn start` (or `npm start`)

## Deploying to GCP

`yarn deploy`

This will deploy your function under the name `chrome` to GCP with 512MB memory in your default region (make sure you have installed the gcloud CLI and logged in).

You can then use `yarn teardown` to delete your function.

## License

MIT
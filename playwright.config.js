
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    fullyParallel: true,

    timeout: 30000,

    expect: {
        timeout: 5000
    },

    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'playwright-report',
            open: 'never'
        }]
    ],

    use: {

        browserName: 'chromium',

        headless: true,

        baseURL: 'http://127.0.0.1:4173',

        screenshot: 'only-on-failure',

        trace: 'retain-on-failure'

    },

    webServer: {

        command: 'python -m http.server 4173',

        url: 'http://127.0.0.1:4173',

        reuseExistingServer: !process.env.CI,

        timeout: 30000

    }

});

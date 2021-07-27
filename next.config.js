require('dotenv').config()
module.exports = {
    env: {
        TOKEN: process.env.TOKEN
    },
    i18n: {
        locales: ['pt-br'],
        defaultLocale: 'pt-br',
        domains: [
            {
                domain: 'patrickchaves.com.br',
                defaultLocale: 'pt-br'
            }
        ]
    }
}
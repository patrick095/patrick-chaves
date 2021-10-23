/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "src/styles")],
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
};

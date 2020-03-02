import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />)
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html lang="fr">
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="description" content="Mon Journal De Bord" />
                    <meta name="theme-color" content="#6cad49" />
                    <link rel="shortcut icon" href="/favicon.png" />
                    <link
                        href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
                        rel="stylesheet"
                    />
                    <title>Mon Journal De Bord</title>
                </Head>
                <body>
                    <Main />
                    <div id="portal" />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

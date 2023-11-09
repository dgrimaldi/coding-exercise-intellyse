// These styles apply to every route in the application
import '@/styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

// Define a custom type for NextPage with layout support
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

// Define a custom type for AppProps with layout support
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    // Determine the layout for the current route
    const getLayout = Component.getLayout ?? ((page) => page)

    // Render the layout with the current route's component and page props
    return getLayout(<Component {...pageProps} />)
}

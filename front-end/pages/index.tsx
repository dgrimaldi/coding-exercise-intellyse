import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import Login from './login'
import Layout from '@/components/layout/Layout'


// Define a Next.js page component
const Page: NextPageWithLayout = () => {
    return <><Login /></>
}

// Define a custom layout for this page using the getLayout function
Page.getLayout = function getLayout(page: ReactElement) {
    return (
        // Render the Layout component with a custom navbar and the page content
        <Layout navbar={<p className="font-mono" >ChatGPT-APP</p>}>{page}</Layout>
    )
}

export default Page

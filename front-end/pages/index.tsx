import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import Login from './login'
import Layout from '@/components/layout/Layout'


const Page: NextPageWithLayout = () => {
    return <><Login /></>
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout navbar={<p className="font-mono" >ChatGPT-APP</p>}>{page}</Layout>
    )
}

export default Page

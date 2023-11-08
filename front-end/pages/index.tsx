import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import Login from './login'


const Page: NextPageWithLayout = () => {
    return <div><Login /></div>
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <div>{page}</div>
    )
}

export default Page

import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
const Page: NextPageWithLayout = () => {
    return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <div>{page}</div>
    )
}

export default Page

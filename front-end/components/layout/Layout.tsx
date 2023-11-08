import React from 'react'


type LayoutProps = {
    children?: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-row flex-grow">
                <nav className="sticky top-0 -ml-0.5 pointer-events-none">
                    <div className="sticky top-0 p-4 border border-gray-200 h-full">
                        <ul role="list" className="p-6 divide-y divide-slate-200">
                            <li className="flex py-4 first:pt-0 last:pb-0 ">
                                <button className="shadow-md border-solid border-2 border-sky-500 rounded p-2">Chat#1</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout

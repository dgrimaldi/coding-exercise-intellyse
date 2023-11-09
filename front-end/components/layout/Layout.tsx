import React from 'react'


type LayoutProps = {
    children?: React.ReactNode
    navbar?: React.ReactNode
}
const Layout = ({ children, navbar }: LayoutProps) => {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-row max-sm:flex-col">
                <nav className="sticky top-0 -ml-0.5 pointer-events-none">
                    <div className="sticky top-0 p-4 border border-gray-200 h-full">
                        {navbar}
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

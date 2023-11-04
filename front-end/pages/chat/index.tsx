import Layout from "@/components/layout/Layout";
const Chat = () => {
    return (
        <Layout>
            {/*<div className="w-full h-full bg-white shadow-md rounded p-6">*/}

            {/*

            {/*    </div>*/}
            {/*</div>*/}
            <div className="relative h-screen">
                    <h1 className="text-2xl font-bold mb-4">Chat#1</h1>
                    <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex flex-col mt-5">
                        {/* Chat messages will go here */}
                    </div>
                    </div>
                <div className="absolute inset-x-0 bottom-0">
                    <div className="shadow-md p-4 flex flex-row bottom-0 gap-4">
                        <input
                            type="text"
                            className="basis-11/12 p-2 border rounded-lg focus:outline-none row-start-2"
                            placeholder="Type a message..."
                        />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Chat
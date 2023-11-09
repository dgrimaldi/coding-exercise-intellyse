import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { create, messageFetcher } from "./api";
import useSWR from 'swr'
import { useRef } from 'react';

const Navbar= () =>  <ul role="list" className="p-6 divide-y divide-slate-200">
                        <li className="flex py-4 first:pt-0 last:pb-0 ">
                            <button className="shadow-md border-solid border-2 border-sky-500 rounded p-2">Chat#1</button>
                        </li>
                    </ul>


const Chat = () => {
    const [message, setMessage] = useState("")
    const searchParams = useSearchParams();
    const userId = searchParams?.get('user');
    const messagesEndRef = useRef(null)

    const { data, error, mutate } = useSWR(userId, messageFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    const handleSendMessage = async () => {
        if(userId){        
            try {
                await create(message, userId.toString())
                await mutate()
                // Scroll to the last message in the chat after posting and getting all chat messages
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
                setMessage("")

            } catch (e) {
                console.log(e)
                throw new Error(`Failed to post new user message, ${e}/`)
            }
        }
    }


    // Display an error message if data fetching fails
    if (error) return <div>Failed to load</div>

    return (
        <Layout navbar={<Navbar />} loading={!data}>
            <div className="relative h-screen p-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-4 flex-none">Chat#1</h1>
                <div className="border border-gray-200 p-4 rounded-lg overflow-auto basis-4/5">
                    <div className="flex flex-col mt-5" >
                        {data?.chats.map((value: chat) =>
                            <div key={value.id} className="bg-white shadow-md rounded p-6">
                                <p>{`Q: ${value.message}`}</p>
                                <p>{`A: ${value.answer}`}</p>
                            </div> 
                            )}
                        <div ref={messagesEndRef}/>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 basis-1/5 flex-none">
                    <div className="shadow-md p-4 flex flex-row bottom-0 gap-4">
                        <input
                            type="text"
                            className="basis-11/12 p-2 border rounded-lg focus:outline-none row-start-2"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e)=> setMessage(e.currentTarget.value)}
                            />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Chat

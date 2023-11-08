import Layout from "@/components/layout/Layout";
import { useState } from "react";
import APIs from '../../utils/urls'
import { useSearchParams } from 'next/navigation';
import { create } from "./api";
import useSWR, { Fetcher } from 'swr'





const Chat = () => {
    const [message, setMessage] = useState("")
    const searchParams = useSearchParams();
    const userId = searchParams?.get('user');

    const fetcher: Fetcher<chat, string> = (id) => fetch(`${APIs.chatAPI}$userId=${id}`).then(res => res.json())
 
    const { data, error } = useSWR(userId, fetcher)
    console.log(data)


    const handleSendMessage = async () => {
        if(userId){        
            try {
                await create(message, userId.toString())
            } catch (error) {
                console.log(error)
                throw new Error(`Failed to post new user message, ${error}/`)
            }
        }
    }
 
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

    return (
        <Layout>
            {/*<div className="w-full h-full bg-white shadow-md rounded p-6">*/}

            {/*

            {/*    </div>*/}
            {/*</div>*/}
            <div className="relative h-screen p-4">
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

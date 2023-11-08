
//TODO place at top small sm:place-content-start 

import { useState } from "react"
import APIs from '../../utils/urls'
import { useRouter } from 'next/navigation'
import { auth, create } from "./api"


function Index() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = async () => {

        try {
            await create(email, password)
            handleLogin()
        } catch (error) {
            console.error(`Failed to create new user data, ${error}/`)
        }

        
    }

    const handleLogin = async () => {
        try {
            const res = await auth(email, password)
            const data: user = JSON.parse(await res.json())

            if (!res.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch data')
            } else 
                router.push(`/chat?user=${data._id.$oid}`)


        } catch (error) {
            console.error(error)
        }
  
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        
        
 
    }

    return (
    
           <div className="h-screen flex flex-col gap-4 place-content-center justify-center p-24"> 
               <input
                    className="border rounded-lg focus:outline-none rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email Address"
                    type="email"
                    value={email}
                   onChange={(e)=> setEmail(e.currentTarget.value)}
               />
               <input
                   className="border rounded-lg focus:outline-none rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   placeholder="Password"
                   value={password}
                   type="password"
                   onChange={(e)=> setPassword(e.currentTarget.value)}

               />
            <button className="bg-indigo-500 rounded-full text-white" onClick={handleSignUp}>Sign Up</button>
            <button className="bg-indigo-500 rounded-full text-white" onClick={handleLogin}>Login</button>
           </div>
    )
}

export default Index

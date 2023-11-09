import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from 'next/navigation'
import { auth, create } from "./api"
import clsx from "clsx"

const inputStyle = `border-2 rounded-lg focus:outline-none rounded-md 
                    py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset  
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`
                    
const errorMessageStyle = "text-rose-600 dark:text-rose-500 text-sm"

const style = {
    input: {
        error: `${inputStyle} ring-rose-300 focus:ring-rose-600`,
        default: `${inputStyle} ring-gray-300 focus:ring-indigo-600`,
    },
    message: {
        error: `${errorMessageStyle}`,
        default: `${errorMessageStyle} invisible`,
    }
}


function Index() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

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
            if (!res.ok) {
                throw new Error()
            } else {
                const data: user = JSON.parse(await res.json())
                router.push(`/chat?user=${data._id.$oid}`)
            }

        } catch {
            console.error("Incorrect email or password")
            setError(true)
        }
    }

    const handleInput = (setStateFn: Dispatch<SetStateAction<string>>, input: string) => {
        setError(false)
        setStateFn(input)
    }

    return (
           <div className="h-screen flex flex-col gap-4 place-content-center justify-center p-24"> 
               <input
                   className={clsx({
                    [style.input.default]: !error,
                    [style.input.error]: error
                })}
                    placeholder="Email Address"
                    type="email"
                    value={email}
                   onChange={(e)=> handleInput(setEmail,e.currentTarget.value)}
               />
               <input
                   className={clsx({
                    [style.input.default]: !error,
                    [style.input.error]: error
                })}
                   placeholder="Password"
                   value={password}
                   type="password"
                   onChange={(e)=> {handleInput(setPassword,e.currentTarget.value)}}
               />
            <p className={clsx({
                    [style.message.default]: !error,
                    [style.message.error]: error
                })}>Incorrect email or password</p>
            <button className="bg-indigo-500 rounded-full text-white" onClick={handleSignUp}>Sign Up</button>
            <button className="bg-indigo-500 rounded-full text-white" onClick={handleLogin}>Login</button>
           </div>
    )
}

export default Index

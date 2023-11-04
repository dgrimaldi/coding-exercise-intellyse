
function Index() {
    return (
           <div className="h-screen flex flex-col gap-4 place-content-center justify-center sm:place-content-start p-24">
               <input
                   className="border rounded-lg focus:outline-none rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   placeholder="Email Address"
               />
               <input
                   className="border rounded-lg focus:outline-none rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   placeholder="Password"
               />
               <button className="bg-indigo-500 rounded-full">Continue</button>
           </div>
    )
}

export default Index

type chat = {
    id: string,
    timestamp: Date,
    sender: string,
    message: string
    answer: string
}

type CustomError = Error & {
    info?: string,
    status?: number
}
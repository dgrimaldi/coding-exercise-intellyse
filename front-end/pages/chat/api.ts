import APIs from '../../utils/urls'


export async function create(message: string, userId: string) {
    return await fetch(`${APIs.chatAPI}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "chat": {
              "answer": "",
              message,
              "sender": userId,
            }
          }),
    })
}


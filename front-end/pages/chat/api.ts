import { Fetcher } from 'swr'
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


export const messageFetcher: Fetcher<{chats: chat[]}, string> = async (id) => {

  const res = await fetch(`${APIs.chatAPI}/${id}`)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
      const error: CustomError = new Error('An error occurred while fetching message for current user.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
  }

  return res.json()
}


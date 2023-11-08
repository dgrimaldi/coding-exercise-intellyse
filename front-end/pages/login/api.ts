import APIs from '../../utils/urls'


export async function create(email: string, password: string) {
    return fetch(`${APIs.userAPI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        }),
      })
}


export async function auth(email: string, password: string) {
    return await fetch(`${APIs.userAPI}/authentication`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        }),
    })
}
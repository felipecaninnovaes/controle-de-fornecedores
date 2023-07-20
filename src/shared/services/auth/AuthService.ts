import { verify_username_and_passowrd } from '../fornecedores-services'


interface IAuth {
  accessToken: string
  userID: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const token = await verify_username_and_passowrd(email, password)
    const data: IAuth = JSON.parse(token)
    if (token !== '') {
      return (data)
    }
    return new Error('Erro no login.')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro no login.')
  }
}

export const AuthService = {
  auth,
}

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { AuthService } from '../services/auth/AuthService'
import { tokenValidation } from '../services/auth/TokenValidation'


interface IAuthContextData {
  logout: () => void
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData)

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'
const LOCAL_STORAGE_USER_ID = 'USER_ID'

interface IAuthProviderProps {
  children: React.ReactNode
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [tokenValidate, setTokenValidade] = useState<boolean>()


  useEffect(() => {
    const ID = localStorage.getItem(LOCAL_STORAGE_USER_ID) || 'empty'
    const Token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN) || 'empty'
    async function apiCall() {
      const apiResponse: boolean = await tokenValidation(ID.replaceAll('"', ''), Token.replaceAll('"', ''))
      setTokenValidade(apiResponse)
    }
    apiCall()
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password)
    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken))
      localStorage.setItem(LOCAL_STORAGE_USER_ID, JSON.stringify(result.userID))
      setTokenValidade(true)
      
    }
  }, [])

  const handleLogout = useCallback( () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_USER_ID)
    setTokenValidade(false)
  }, [])
  const isAuthenticated = tokenValidate || false
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

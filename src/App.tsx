import { BrowserRouter } from 'react-router-dom'
import './shared/forms/TraducoesYup'

import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts'
import { Login, MenuLateral } from './shared/components'
import { AppRoutes } from './routes'
import { createDataBase, insertUser } from './shared/services/fornecedores-services'


export const App = () => {
  createDataBase()
  insertUser()
  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>

          <DrawerProvider>
            <BrowserRouter>

              <MenuLateral>

                <div className="App">
                  <AppRoutes />
                </div>
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>

        </Login>

      </AppThemeProvider>
    </AuthProvider>
  )
}

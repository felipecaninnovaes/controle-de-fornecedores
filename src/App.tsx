import { BrowserRouter } from 'react-router-dom'
import './shared/forms/TraducoesYup'

import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts'
import { Login, MenuLateral } from './shared/components'
import { AppRoutes } from './routes'
import { createDataBase, autoCreateDefaultUser } from './shared/services/fornecedores-services'
import { checkUpdatesApp } from './shared/services/update'


export const App = () => {
  checkUpdatesApp()
  createDataBase()
  autoCreateDefaultUser()
  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>

          <DrawerProvider>
            <BrowserRouter>

              <MenuLateral>

                <div className='App'>
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

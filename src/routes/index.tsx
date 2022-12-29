import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDrawerContext } from '../shared/contexts'
import {
  Dashboard,
  DetalhesFornecedores,
  DetalhesUsuarios,
  ExportFornecedores,
  ListagemDeFornecedores,
  ListagemDeUsuarios,
} from '../pages'

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'payments',
        path: '/fornecedores',
        label: 'Pagamento de fornecedores',
      },
      {
        icon: 'ios_share',
        path: '/export',
        label: 'Exportar Arquivo',
      },
      {
        icon: 'person',
        path: '/usuarios',
        label: 'Usuarios',
      },
    ])
  }, [])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/fornecedores" element={<ListagemDeFornecedores />} />
      <Route path="/usuarios" element={<ListagemDeUsuarios />} />
      <Route path="/export" element={<ExportFornecedores />} />
      {/* <Route path='/fornecedores/detalhe/novo' element={<DetalhesFornecedores />} /> */}
      <Route path='/fornecedores/detalhe/novo' element={<DetalhesFornecedores />} />
      <Route path='/usuarios/detalhe/novo' element={<DetalhesUsuarios />} />
      <Route path='/fornecedores/detalhe/:idURL/:mesURL/:dataPagamentoURL/:fornecedorURL/:cnpjURL/:valorURL/:multaURL/:jurosURL/:bancoURL' element={<DetalhesFornecedores />} />
      <Route path='/usuarios/detalhe/:idURL/:keyURL/:usernameURL/:passwordURL' element={<DetalhesUsuarios />} />
      <Route path="*" element={<Navigate to="/fornecedores" />} />
    </Routes>
  )
}

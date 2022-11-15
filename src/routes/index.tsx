import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDrawerContext } from '../shared/contexts'
import {
  Dashboard,
  DetalhesFornecedores,
  ListagemDeFornecedores,
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
        icon: 'apartment',
        path: '/fornecedores',
        label: 'Fornecedores',
      },
    ])
  }, [])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/fornecedores" element={<ListagemDeFornecedores />} />
      {/* <Route path='/fornecedores/detalhe/novo' element={<DetalhesFornecedores />} /> */}
      <Route path='/fornecedores/detalhe/novo' element={<DetalhesFornecedores />} />
      <Route path='/fornecedores/detalhe/:idURL/:mesURL/:dataPagamentoURL/:fornecedorURL/:cnpjURL/:valorURL/:multaURL/:jurosURL/:bancoURL' element={<DetalhesFornecedores />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}

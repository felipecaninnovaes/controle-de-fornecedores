import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDrawerContext } from '../shared/contexts'
import {
  Dashboard,
  DetalhesFornecedores,
  Entrada,
  ExportFornecedores,
  ListagemDeFornecedores,
  Saida,
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
        icon: 'archive',
        path: '/entrada',
        label: 'Entrada de estoque',
      },
      {
        icon: 'unarchive',
        path: '/saida',
        label: 'Saida de estoque',
      },
    ])
  }, [])

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/fornecedores" />} />
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/fornecedores" element={<ListagemDeFornecedores />} />
      <Route path="/export" element={<ExportFornecedores />} />
      <Route path='/fornecedores/detalhe/novo' element={<DetalhesFornecedores />} />
      <Route path='/fornecedores/detalhe/:idURL/:mesURL/:dataPagamentoURL/:fornecedorURL/:cnpjURL/:valorURL/:multaURL/:jurosURL/:bancoURL' element={<DetalhesFornecedores />} />
      <Route path="/entrada" element={<Entrada />} />
      <Route path="/saida" element={<Saida />} />
    </Routes>
  )
}

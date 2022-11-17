import { useEffect, useMemo, useState } from 'react'
import { Button, Icon, IconButton, LinearProgress, Collapse, Alert, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { FerramentasDaListagem } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { delete_in_database, select_from_database } from '../../shared/services/fornecedores-services'
import { Box } from '@mui/system'
import { Environment } from '../../shared/environment'


export const ListagemDeFornecedores: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [rowsPage, setRowsPage] = useState(Environment.LIMITE_DE_LINHAS)
  const [countPages, setCountPages] = useState(1)
  const [value, setValue] = useState('')
  const [fornecedores, setFornecedores] = useState<IFornecedores[] | null[]>([])
  const [isCollapseSuccesses, setIsCollapseSuccesses] = useState(false)
  const [isCollapseError, setIsCollapseError] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  
  interface IFornecedores {
    id: string,
    mes: string,
    fornecedor: string,
    cnpj: string,
    dataPagamento: string,
    numeroDaNota: string,
    valor: string,
    multa: string,
    juros: string,
    desconto: string,
    banco: string
  }


  const navigate = useNavigate()

  const notifySuccesses = () => {
    setIsCollapseSuccesses(true)
    setTimeout(function () { setIsCollapseSuccesses(false) }, 1200)
  }

  const notifyError = () => {
    setIsCollapseError(true)
    setTimeout(function () { setIsCollapseError(false) }, 1200)
  }

  useEffect(() => {
    setIsLoading(true)

    async function apiCall() {
      const apiResponse: any = await select_from_database()
      const trimStart = (countPages - 1) * rowsPage
      const trimEnd = trimStart + rowsPage
      const trimmedData = apiResponse.slice(trimStart, trimEnd)
      localStorage.setItem('databaseModified', '0')
      setTotalCount(apiResponse.length)
      setFornecedores(trimmedData)
      setIsLoading(false)
    }
    apiCall()
  }, [value, countPages])

  return (
    <LayoutBaseDePagina
      titulo='Listagem de pagamentos de fornecedores'
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca={false}
          mostrarBotaoNovo={true}
          textoBotaoNovo='Novo'
          aoClicarEmNovo={() => navigate('/fornecedores/detalhe/novo')}
        />
      }
    >

      <Collapse in={isCollapseError}><Alert variant='filled' severity="info">Não existe mais pagina :(</Alert></Collapse>
      <TableContainer component={Paper} variant="outlined" sx={{ overflow: 'hidden', m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ACOES</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>MES</TableCell>
              <TableCell>DATA DE PAGAMENTO</TableCell>
              <TableCell>FORNECEDOR</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>NUMERO DA NOTA</TableCell>
              <TableCell>VALOR</TableCell>
              <TableCell>MULTA</TableCell>
              <TableCell>JUROS</TableCell>
              <TableCell>DESCONTO</TableCell>
              <TableCell>BANCO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflow: 'hidden' }}>
            {fornecedores.map(row => (
              <TableRow key={row?.id}>

                <TableCell>
                  <IconButton size="small" onClick={() => { delete_in_database(String(row?.id)); setValue(value + 1) }}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/fornecedores/detalhe/${row?.id}/${row?.mes}/${row?.dataPagamento}/${row?.fornecedor}/${row?.cnpj}/${row?.valor}/${row?.multa}/${row?.juros}/${row?.banco}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row?.id}</TableCell>
                <TableCell>{row?.mes}</TableCell>
                <TableCell>{row?.dataPagamento}</TableCell>
                <TableCell>{row?.fornecedor}</TableCell>
                <TableCell>{row?.cnpj}</TableCell>
                <TableCell>{row?.numeroDaNota}</TableCell>
                <TableCell>{row?.valor}</TableCell>
                <TableCell>{row?.multa}</TableCell>
                <TableCell>{row?.juros}</TableCell>
                <TableCell>{row?.desconto}</TableCell>
                <TableCell>{row?.banco}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <LinearProgress variant='indeterminate' />
        )}
        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
          <TableRow>
            <TableCell colSpan={3}>
              <Pagination
                page={countPages}
                showFirstButton showLastButton
                color='primary'
                variant='outlined'
                count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                onChange={(_, newPage) => setCountPages(newPage)}
              />
            </TableCell>
          </TableRow>
        )}
      </TableContainer>
    </LayoutBaseDePagina>
  )
}

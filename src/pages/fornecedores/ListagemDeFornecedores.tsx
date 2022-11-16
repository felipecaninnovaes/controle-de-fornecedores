import { useEffect, useMemo, useState } from 'react'
import { Button, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { FerramentasDaListagem } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { delete_in_database, select_from_database } from '../../shared/services/fornecedores-services'
import { Box } from '@mui/system'
import { Environment } from '../../shared/environment'


export const ListagemDeFornecedores: React.FC = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [rowsPage, setRowsPage] = useState(Environment.LIMITE_DE_LINHAS)
  const [countPages, setCountPages] = useState(1)

  interface IFornecedores {
    id: string,
    mes: string,
    cnpj: string,
    fornecedor: string,
    dataPagamento: string,
    valor: string,
    multa: string,
    juros: string,
    banco: string,
  }

  const [value, setValue] = useState('')
  const [fornecedores, setFornecedores] = useState<IFornecedores[] | null[]>([])

  useEffect(() => {
    setIsLoading(true)

    async function apiCall() {
      const apiResponse: any = await select_from_database()
      const trimStart = (countPages - 1) * rowsPage
      const trimEnd = trimStart + rowsPage
      const trimmedData = apiResponse.slice(trimStart, trimEnd)
      localStorage.setItem('databaseModified', '0')
      console.log('DataBase Updated')
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
      <TableContainer component={Paper} variant="outlined" sx={{ overflow: 'hidden', m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>ACOES</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>MES</TableCell>
              <TableCell>DATA DE PAGAMENTO</TableCell>
              <TableCell>FORNECEDOR</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>VALOR</TableCell>
              <TableCell>MULTA</TableCell>
              <TableCell>JUROS</TableCell>
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
                <TableCell>{row?.valor}</TableCell>
                <TableCell>{row?.multa}</TableCell>
                <TableCell>{row?.juros}</TableCell>
                <TableCell>{row?.banco}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <LinearProgress variant='indeterminate' />
        )}
        <Box flexDirection='column'>
          <Button onClick={() => setCountPages(countPages - 1)}>VOLTAR PAGINA</Button>
          <Button onClick={() => setCountPages(countPages + 1)}>PROXIMA PAGINA</Button>
        </Box>

      </TableContainer>
    </LayoutBaseDePagina>
  )
}

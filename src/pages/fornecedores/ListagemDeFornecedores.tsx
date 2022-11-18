import { useEffect, useMemo, useState } from 'react'
import { Button, Icon, Typography, IconButton, LinearProgress, Collapse, Alert, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { FerramentasDaListagem } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { delete_in_database, select_from_database } from '../../shared/services/fornecedores-services'
import { Box } from '@mui/system'
import { Environment } from '../../shared/environment'
// import '../../styles/tableNoWrap.css'

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
      console.log(apiResponse)
      setTotalCount(apiResponse.length)
      setFornecedores(trimmedData)
      setIsLoading(false)
    }
    apiCall()
  }, [value, countPages])

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca={false}
          showTitle={true}
          textTitle='Controle de Fornecedores'
          mostrarBotaoNovo={true}
          textoBotaoNovo='Novo'
          aoClicarEmNovo={() => navigate('/fornecedores/detalhe/novo')}
        />
      }
    >

      <Collapse in={isCollapseError}><Alert variant='filled' severity="info">Não existe mais pagina :(</Alert></Collapse>
      <div className={'textContainer'}>
      <TableContainer component={Paper} variant="outlined" sx={{ overflow: 'hidden', m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>MES</TableCell>
              <TableCell>PAGAMENTO</TableCell>
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
                      <Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'><Icon>delete</Icon></Typography>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => navigate(`/fornecedores/detalhe/${row?.id}/${row?.mes}/${row?.dataPagamento}/${row?.fornecedor}/${row?.cnpj}/${row?.valor}/${row?.multa}/${row?.juros}/${row?.banco}`)}>
                      <Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'><Icon>edit</Icon></Typography>
                    </IconButton>
                  </TableCell>
                <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>{row?.id}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.mes}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.dataPagamento}</Typography></TableCell>
                  <TableCell><Typography width='6.7rem' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.fornecedor}</Typography></TableCell>
                  <TableCell><Typography width='6.0rem' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.cnpj}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.numeroDaNota}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.valor}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.multa}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.juros}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.desconto}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.banco}</Typography></TableCell>
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
      </div>
    </LayoutBaseDePagina >
  )
}
import { useEffect, useState } from 'react'
import { Icon, Typography, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ListingTools } from '../../shared/components'
import { BaseLayoutFromPages } from '../../shared/layouts'
import { delete_in_database, select_from_database } from '../../shared/services/fornecedores-services'
import { Environment } from '../../shared/environment'

export const ListagemDeFornecedores: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [countPages, setCountPages] = useState(1)
  const [value, setValue] = useState('')
  const [fornecedores, setFornecedores] = useState<IFornecedores[] | null[]>([])
  const [totalRows, setTotalRows] = useState(0)
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

  useEffect(() => {
    setIsLoading(true)

    async function apiCall() {
      const apiResponse = await select_from_database()
      const trimStart = (countPages - 1) * Environment.ROWS_LIMIT
      const trimEnd = trimStart + Environment.ROWS_LIMIT
      const trimmedData = apiResponse.slice(trimStart, trimEnd)
      localStorage.setItem('databaseModified', '0')
      setTotalRows(apiResponse.length)
      setFornecedores(trimmedData)
      setIsLoading(false)
    }
    apiCall()
  }, [value, countPages])
  return (
    <BaseLayoutFromPages
      toolBars={
        <ListingTools
          showSearchInput={false}
          showTitle={true}
          textTitle='Controle de Fornecedores'
          showNewButton={true}
          newTextButton='Novo'
          onClickOnNew={() => navigate('/fornecedores/detalhe/novo')}
        />
      }
    >
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
          {(totalRows > 0 && totalRows > Environment.ROWS_LIMIT) && (
            <TableRow>
              <TableCell colSpan={3}>
                <Pagination
                  page={countPages}
                  showFirstButton showLastButton
                  color='primary'
                  variant='outlined'
                  count={Math.ceil(totalRows / Environment.ROWS_LIMIT)}
                  onChange={(_, newPage) => setCountPages(newPage)}
                />
              </TableCell>
            </TableRow>
          )}

        </TableContainer>
      </div>
    </BaseLayoutFromPages >
  )
}
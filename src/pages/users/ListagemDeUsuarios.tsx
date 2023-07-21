import { useEffect, useState } from 'react'
import { Icon, Typography, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ListingTools } from '../../shared/components'
import { BaseLayoutFromPages } from '../../shared/layouts'
import { delete_in_database, select_from_database } from '../../shared/services/fornecedores-services'
import { Environment } from '../../shared/environment'
import { select_all_users_from_database } from '../../shared/services/usuarios-services'
import { delete_user_in_database } from '../../shared/services/usuarios-services/delete'

export const ListagemDeUsuarios: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [countPages, setCountPages] = useState(1)
  const [value, setValue] = useState('')
  const [fornecedores, setFornecedores] = useState<IUsuarios[] | null[]>([])
  const [totalRows, setTotalRows] = useState(0)
  interface IUsuarios {
    id: string,
    key: String,
    username: String,
    password: String
  }


  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    async function apiCall() {
      const apiResponse: any = await select_all_users_from_database()
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
          textTitle='Listagem de Usuarios'
          showNewButton={true}
          newTextButton='Novo'
          onClickOnNew={() => navigate('/usuarios/detalhe/novo')}
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
                <TableCell>USERNAME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflow: 'hidden' }}>
              {fornecedores.map(row => (
                <TableRow key={row?.id}>
                  <TableCell>
                    <IconButton size="small" onClick={() => { delete_user_in_database(String(row?.id)); setValue(value + 1) }}>
                      <Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'><Icon>delete</Icon></Typography>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => navigate(`/usuarios/detalhe/${row?.id}/${row?.key}/${row?.username}/${row?.password}`)}>
                      <Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'><Icon>edit</Icon></Typography>
                    </IconButton>
                  </TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>{row?.id}</Typography></TableCell>
                  <TableCell><Typography width='auto' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'> {row?.username}</Typography></TableCell>
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
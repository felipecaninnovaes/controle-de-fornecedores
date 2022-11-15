import { useState, useEffect } from 'react'
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { FerramentasDeDetalhe } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { insert_db, select_from_id_in_database } from '../../shared/services/fornecedores-services'
import { edit_db } from '../../shared/services/fornecedores-services/edit'


interface IFormData {
  id: string,
  mes: string,
  cnpj: string,
  fornecedor: string,
  dataPagamento: string,
  valor: string,
  multa: string,
  juros: string,
  banco: string
}



export const DetalhesFornecedores: React.FC = () => {
  const today = new Date()
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

  const { formRef } = useVForm()
  const { idURL = 'novo', mesURL = '', dataPagamentoURL = date, fornecedorURL = '', cnpjURL = '', valorURL = '0', multaURL = '0', jurosURL = '0', bancoURL = '' } = useParams<'idURL' | 'mesURL' | 'dataPagamentoURL' | 'fornecedorURL' | 'cnpjURL' | 'valorURL' | 'multaURL' | 'jurosURL' | 'bancoURL'>()
  const navigate = useNavigate()

  const [fornecedores, setFornecedores] = useState<IFormData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagamento, setPagamento] = useState(dataPagamentoURL)
  const [fornecedor, setFornecedor] = useState(fornecedorURL)
  const [cnpj, setCnpj] = useState(cnpjURL)
  const [valor, setValor] = useState(valorURL)
  const [multa, setMulta] = useState(multaURL)
  const [juros, setJuros] = useState(jurosURL)
  const [banco, setBanco] = useState(bancoURL)



  const handleSave = (id: string) => {
    if (id === 'novo') {
      insert_db(fornecedor, cnpj, pagamento, valor, multa, juros, banco)
    } else {
      edit_db(id, fornecedor, cnpj, pagamento, valor, multa, juros, banco)
    }

  }

  return (
    <LayoutBaseDePagina
      titulo={'Novo fornecedor'}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvar
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={idURL !== 'novo'}
          mostrarBotaoNovo={idURL !== 'novo'}
          mostrarBotaoVoltar

          aoClicarEmSalvar={() => {
            handleSave(idURL)
            navigate('/fornecedores')
          }}
          aoClicarEmSalvarEFechar={() => {
            console.log(fornecedores)
          }}
          aoClicarEmNovo={() => navigate('/fornecedores/detalhe/novo')}
          aoClicarEmVoltar={() => navigate('/fornecedores')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='elevation'>

          <Grid item>
            <Typography variant='h6'>Insira os dados do {fornecedor}</Typography>
          </Grid>

          <Grid display='flex' flexDirection='row' padding={2} gap={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}



            <Grid container item direction='column' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  type={'date'}
                  name='dataDePagamento'
                  label='Data de pagamento'
                  disabled={isLoading}
                  onChange={e => setPagamento(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='fornecedor'
                  label='Fornecedor'
                  disabled={isLoading}
                  onChange={e => setFornecedor(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='CNPJ'
                  label='CNPJ'
                  disabled={isLoading}
                  onChange={e => setCnpj(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='valor'
                  label='Valor'
                  disabled={isLoading}
                  onChange={e => setValor(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='multa'
                  label='Multa'
                  disabled={isLoading}
                  onChange={e => setMulta(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='Juros'
                  label='Juros'
                  disabled={isLoading}
                  onChange={e => setJuros(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='Banco'
                  label='Banco'
                  disabled={isLoading}
                  onChange={e => setBanco(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </LayoutBaseDePagina>
  )
}

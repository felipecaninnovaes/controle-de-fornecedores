import { useState } from 'react'
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { FerramentasDeDetalhe } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { insert_db} from '../../shared/services/fornecedores-services'


interface IFormData {
  nome: string,
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

export const NovoFornecedores: React.FC = () => {
  const { formRef } = useVForm()
  const navigate = useNavigate()


  const [isLoading, setIsLoading] = useState(false)
  const [pagamento, setPagamento] = useState('')
  const [fornecedor, setFornecedor] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [valor, setValor] = useState('0')
  const [multa, setMulta] = useState('0')
  const [juros, setJuros] = useState('0')
  const [banco, setBanco] = useState('')


  const handleSave = (dados: IFormData) => {
    return (<h1>ola</h1>)
  }


  return (
    <LayoutBaseDePagina
      titulo={'Novo fornecedor'}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvar
          mostrarBotaoVoltar
          aoClicarEmSalvar={() => { insert_db(fornecedor, cnpj, pagamento, valor, multa, juros, banco); navigate('/fornecedores') }}
          aoClicarEmVoltar={() => navigate('/fornecedores')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='elevation'>

          <Grid item>
            <Typography variant='h6'>Insira os dados</Typography>
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

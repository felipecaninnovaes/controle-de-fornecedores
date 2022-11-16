import { useState, useEffect } from 'react'
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { FerramentasDeDetalhe } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { insert_db} from '../../shared/services/fornecedores-services'
import { edit_db } from '../../shared/services/fornecedores-services/edit'


interface IFormData {
  dataPagamento: string,
  fornecedor: string,
  cnpj: string,
  valor: string,
  multa: string,
  juros: string,
  banco: string
}



export const DetalhesFornecedores: React.FC = () => {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  const { formRef } = useVForm()
  const { idURL = 'novo', mesURL = '', dataPagamentoURL = date, fornecedorURL = 'undefined', cnpjURL = 'undefined', valorURL = '0', multaURL = '0', jurosURL = '0', bancoURL = 'undefined' } = useParams<'idURL' | 'mesURL' | 'dataPagamentoURL' | 'fornecedorURL' | 'cnpjURL' | 'valorURL' | 'multaURL' | 'jurosURL' | 'bancoURL'>()
  const navigate = useNavigate()


  const [isLoading, setIsLoading] = useState(false)


  const dataEdit: IFormData = {
    dataPagamento: dataPagamentoURL,
    fornecedor: fornecedorURL,
    cnpj: cnpjURL,
    valor: valorURL,
    multa: multaURL,
    juros: jurosURL,
    banco: bancoURL
  }

  useEffect(() => {
    setIsLoading(true)
    if(idURL !== 'novo') {
    formRef.current?.setData(dataEdit)
  }
  setIsLoading(false)
  })

  const handleSave = async (dados: IFormData) => {
    if (idURL === 'novo') {
      console.log(dados)
      await insert_db(dados)
    } else {
      edit_db(idURL, dados)
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
            formRef.current?.submitForm(); navigate('/fornecedores')
          }}
          // aoClicarEmSalvar={() => {
          //   handleSave(idURL)
          //   navigate('/fornecedores')
          // }}
          aoClicarEmSalvarEFechar={() => {
            console.log('click 😊')
          }}
          aoClicarEmNovo={() => navigate('/fornecedores/detalhe/novo')}
          aoClicarEmVoltar={() => navigate('/fornecedores')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='elevation'>
          <Grid item>
            <Typography variant='h6'>Insira os dados do </Typography>
          </Grid>

          <Grid display='flex' flexDirection='row' padding={2} gap={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}



            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  type={'date'}
                  name='dataPagamento'
                  label='Data de pagamento'
                  disabled={isLoading}
                // onChange={e => setPagamento(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='fornecedor'
                  label='Fornecedor'
                  disabled={isLoading}
                // onChange={e => setFornecedor(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='cnpj'
                  label='CNPJ'
                  disabled={isLoading}
                // onChange={e => setCnpj(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='valor'
                  label='Valor'
                  disabled={isLoading}
                // onChange={e => setValor(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='multa'
                  label='Multa'
                  disabled={isLoading}
                // onChange={e => setMulta(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='juros'
                  label='Juros'
                  disabled={isLoading}
                // onChange={e => setJuros(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='banco'
                  label='Banco'
                  disabled={isLoading}
                // onChange={e => setBanco(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </LayoutBaseDePagina>
  )
}

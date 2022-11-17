import { useState, useEffect } from 'react'
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { FerramentasDeDetalhe } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { insert_db } from '../../shared/services/fornecedores-services'
import { edit_db } from '../../shared/services/fornecedores-services/edit'


interface IFormData {
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



export const DetalhesFornecedores: React.FC = () => {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  const { formRef } = useVForm()
  const {
    idURL = 'novo',
    mesURL = '',
    dataPagamentoURL = date,
    fornecedorURL = '',
    numeroDaNotaURL = '0',
    cnpjURL = '0',
    valorURL = '0',
    multaURL = '0',
    jurosURL = '0',
    descontoURL = '0',
    bancoURL = '0'
  } = useParams<'idURL' |
    'mesURL' |
    'dataPagamentoURL' |
    'fornecedorURL' |
    'numeroDaNotaURL' |
    'cnpjURL' |
    'valorURL' |
    'multaURL' |
    'jurosURL' |
    'descontoURL' |
    'bancoURL'
  >()
  const navigate = useNavigate()


  const [isLoading, setIsLoading] = useState(false)


  const dataEdit: IFormData = {
    dataPagamento: dataPagamentoURL,
    fornecedor: fornecedorURL,
    numeroDaNota: numeroDaNotaURL,
    cnpj: cnpjURL,
    valor: valorURL,
    multa: multaURL,
    juros: jurosURL,
    desconto: descontoURL,
    banco: bancoURL
  }

  useEffect(() => {
    setIsLoading(true)
    if (idURL !== 'novo') {
      formRef.current?.setData(dataEdit)
    } else {
      formRef.current?.setData(dataEdit)
    }
    setIsLoading(false)
  })

  const handleSave = async (dados: IFormData) => {
    if (idURL === 'novo') {
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
          // mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={idURL !== 'novo'}
          mostrarBotaoNovo={idURL !== 'novo'}
          mostrarBotaoVoltar
          aoClicarEmSalvar={() => {
            formRef.current?.submitForm(); navigate('/fornecedores')
          }}
          //botao de teste
          // aoClicarEmSalvarEFechar={() => { 
          //   console.log('click 😊')
          // }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='dataPagamento'
                  label='Data de pagamento'
                  disabled={isLoading}
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
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  type='number'
                  name='cnpj'
                  label='CNPJ'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  type='number'
                  name='valor'
                  label='Valor'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  type='number'
                  name='numeroDaNota'
                  label='Numero Da Nota'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='multa'
                  type='number'
                  label='Multa'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  type='number'
                  name='juros'
                  label='Juros'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  type='number'
                  name='desconto'
                  label='Desconto'
                  disabled={isLoading}
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
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </LayoutBaseDePagina>
  )
}

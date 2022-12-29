import { useState, useEffect } from 'react'
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { DetailTools } from '../../shared/components'
import { BaseLayoutFromPages } from '../../shared/layouts'
import { insert_user } from '../../shared/services/usuarios-services/insert'
import { edit_user_db } from '../../shared/services/usuarios-services/edit'
import { delete_user_in_database } from '../../shared/services/usuarios-services/delete'



interface IFormData {
  id: String,
  username: String,
  password: String
}



export const DetalhesUsuarios: React.FC = () => {
  // const today = new Date()
  // const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  const { formRef } = useVForm()
  const {
    idURL = 'novo',
    keyURL = '',
    usernameURL = '',
    passwordURL = '',
  } = useParams<'idURL' |
    'keyURL' |
    'usernameURL' |
    'passwordURL'
  >()
  const navigate = useNavigate()


  const [isLoading, setIsLoading] = useState(false)


  const dataEdit: IFormData = {
    id: idURL,
    username: usernameURL,
    password: passwordURL,
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
      await insert_user(dados)
    } else {
      edit_user_db(idURL, dados)
    }

  }

  return (
    <BaseLayoutFromPages
      toolBars={
        <DetailTools
          showSaveButton
          // showButtonCloseAndSave={true}
          showDeleteButton={idURL !== 'novo'}
          showNewButton={idURL !== 'novo'}
          showBackButton
          onClickSave={() => {
            formRef.current?.submitForm(); navigate('/usuarios')
          }}
          //botao de teste
          // onClickSaveAndClose={() => { 
          //   console.log('click 😊')
          // }}
          onClickDelete={() => {delete_user_in_database(idURL); navigate('/usuarios')}}
          onClickOnNew={() => navigate('/usuarios/detalhe/novo')}
          onClickInBack={() => navigate('/usuarios')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='elevation'>
          <Grid item>
            <Typography variant='h6'>Insira os dados do Usuario</Typography>
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
                  name='id'
                  label='ID'
                  disabled={true}
                />
              </Grid>
            </Grid>
            
            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='username'
                  label='Username'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='column'>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  type={'password'}
                  fullWidth
                  name='password'
                  label='Password'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </BaseLayoutFromPages>
  )
}

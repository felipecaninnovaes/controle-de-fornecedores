import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material'

import { Environment } from '../../environment'


interface IFerramentasDaListagemProps {
  textoDaBusca?: string
  textoDaBuscaMes?: string
  mostrarInputBusca?: boolean
  mostrarInputBuscaMes?: boolean
  aoMudarTextoDeBusca?: (novoTexto: string) => void
  aoMudarTextoDeBuscaMes?: (novoTextoMes: string) => void
  textoBotaoNovo?: string
  mostrarBotaoNovo?: boolean
  aoClicarEmNovo?: () => void
  textoBotaoExport?: string
  mostrarBotaoExport?: boolean
  aoClicarEmExport?: () => void
}
export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = '',
  textoDaBuscaMes = '',
  aoMudarTextoDeBusca,
  aoMudarTextoDeBuscaMes,
  mostrarInputBusca = false,
  mostrarInputBuscaMes = false,
  aoClicarEmNovo,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = false,
  aoClicarEmExport,
  textoBotaoExport = 'Export',
  mostrarBotaoExport = false,
}) => {
  const theme = useTheme()

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          type={'month'}
          placeholder={Environment.INPUT_DE_BUSCA}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
      {mostrarInputBuscaMes && (
        <TextField
          size="small"
          value={textoDaBuscaMes}
          type={'month'}
          placeholder={Environment.INPUT_DE_BUSCA}
          onChange={(e) => aoMudarTextoDeBuscaMes?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color='primary'
            disableElevation
            size='large'
            variant='contained'
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >{textoBotaoNovo}</Button>
        )}
        {mostrarBotaoExport && (
          <Button
            color='primary'
            size='large'
            disableElevation
            variant='contained'
            onClick={aoClicarEmExport}
            endIcon={<Icon>ios_share</Icon>}
          >{textoBotaoExport}</Button>
        )}
      </Box>
    </Box>
  )
}

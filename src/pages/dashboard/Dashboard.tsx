import { Typography } from '@mui/material'
import { FerramentasDaListagem } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina>
      <FerramentasDaListagem
        showTitle={true}
        textTitle='Pagina Inicial (Em desenvolvimento)'
      />

    </LayoutBaseDePagina>
  )
}

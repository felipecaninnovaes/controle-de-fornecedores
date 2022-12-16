import { Typography } from '@mui/material'
import { ListingTools } from '../../shared/components'
import { BaseLayoutFromPages } from '../../shared/layouts'

export const Dashboard = () => {
  return (
    <BaseLayoutFromPages>
      <ListingTools
        showTitle={true}
        textTitle='Pagina Inicial (Em desenvolvimento)'
      />

    </BaseLayoutFromPages>
  )
}

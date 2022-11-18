import { ReactNode } from 'react'
import { Box } from '@mui/system'

interface IBaseLayoutFromPagesProps {
  children: ReactNode
  toolBars?: ReactNode
}

export const BaseLayoutFromPages: React.FC<IBaseLayoutFromPagesProps> = ({ children, toolBars: toolBars }) => {

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>

      {toolBars && (
        <Box>
          {toolBars}
        </Box>
      )}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  )
}

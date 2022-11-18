import { Box, Button, Icon, IconButton, Paper, TextField, Typography, useTheme } from '@mui/material'
import { useDrawerContext } from '../../contexts'

import { Environment } from '../../environment'


interface IListingToolsProps {
  textSearch?: string
  searchMonth?: string
  textTitle?: string
  showTitle?: boolean
  showSearchInput?: boolean
  showSearchMonth?: boolean
  onChangeTextSearch?: (newText: string) => void
  onChangeMonthSearch?: (newMonthText: string) => void
  newTextButton?: string
  showNewButton?: boolean
  onClickOnNew?: () => void
  exportButtonText?: string
  showExportButton?: boolean
  onClickInExport?: () => void
}
export const ListingTools: React.FC<IListingToolsProps> = ({

  textSearch: textSearch = '',
  searchMonth: searchMonth = '',
  textTitle = '',
  onChangeTextSearch: onChangeTextSearch,
  onChangeMonthSearch: onChangeMonthSearch,
  showSearchInput: showSearchInput = false,
  showSearchMonth: showSearchMonth = false,
  showTitle = false,
  onClickOnNew: onClickOnNew,
  newTextButton: newTextButton = 'Novo',
  showNewButton: showNewButton = false,
  onClickInExport: onClickInExport,
  exportButtonText: exportButtonText = 'Export',
  showExportButton: showExportButton = false,
}) => {
  const theme = useTheme()

  const { toggleDrawerOpen } = useDrawerContext()

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
      <IconButton onClick={toggleDrawerOpen}>
        <Icon>menu</Icon>
      </IconButton>
      {showTitle && (
        <Typography>{textTitle}</Typography>
      )}
      {showSearchInput && (
        <TextField
          size="small"
          value={textSearch}
          type={'month'}
          placeholder={Environment.SEARCH_INPUT}
          onChange={(e) => onChangeTextSearch?.(e.target.value)}
        />
      )}
      {showSearchMonth && (
        <TextField
          size="small"
          value={searchMonth}
          type={'month'}
          placeholder={Environment.SEARCH_INPUT}
          onChange={(e) => onChangeMonthSearch?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color='primary'
            disableElevation
            size='large'
            variant='contained'
            onClick={onClickOnNew}
            endIcon={<Icon>add</Icon>}
          >{newTextButton}</Button>
        )}
        {showExportButton && (
          <Button
            color='primary'
            size='large'
            disableElevation
            variant='contained'
            onClick={onClickInExport}
            endIcon={<Icon>ios_share</Icon>}
          >{exportButtonText}</Button>
        )}
      </Box>
    </Box>
  )
}

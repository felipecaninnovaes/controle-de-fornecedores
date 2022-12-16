import { Box, Button, Divider, Icon, IconButton, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../../contexts'


interface IDetailToolsProps {
  textNewButton?: string

  showNewButton?: boolean
  showBackButton?: boolean
  showDeleteButton?: boolean
  showSaveButton?: boolean
  showButtonCloseAndSave?: boolean

  showLoadingNewButton?: boolean
  showLoadingBackButton?: boolean
  showLoadingDeleteButton?: boolean
  showLoadingSaveButton?: boolean
  showLoadingSaveAndChange?: boolean

  onClickOnNew?: () => void
  onClickInBack?: () => void
  onClickDelete?: () => void
  onClickSave?: () => void
  onClickSaveAndClose?: () => void
}
export const DetailTools: React.FC<IDetailToolsProps> = ({
  textNewButton: textNewButton = 'Novo',

  showNewButton: showNewButton = false,
  showBackButton: showBackButton = false,
  showDeleteButton: showDeleteButton = false,
  showSaveButton: showSaveButton = false,
  showButtonCloseAndSave: showButtonCloseAndSave = false,

  showLoadingNewButton: showLoadingNewButton = false,
  showLoadingBackButton: showLoadingBackButton = false,
  showLoadingDeleteButton: showLoadingDeleteButton = false,
  showLoadingSaveButton: showLoadingSaveButton = false,
  showLoadingSaveAndChange: showLoadingSaveAndChange = false,

  onClickOnNew: onClickOnNew,
  onClickInBack: onClickInBack,
  onClickDelete: onClickDelete,
  onClickSave: onClickSave,
  onClickSaveAndClose: onClickSaveAndClose,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
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
      {(showSaveButton && !showLoadingSaveButton) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar
          </Typography>
        </Button>
      )}

      {showLoadingSaveButton && (
        <Skeleton width={110} height={60} />
      )}

      {(showButtonCloseAndSave && !showLoadingSaveAndChange && !smDown && !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickSaveAndClose}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar e fechar
          </Typography>
        </Button>
      )}

      {(showLoadingSaveAndChange && !smDown && !mdDown) && (
        <Skeleton width={180} height={60} />
      )}

      {(showDeleteButton && !showLoadingDeleteButton) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Apagar
          </Typography>
        </Button>
      )}

      {showLoadingDeleteButton && (
        <Skeleton width={110} height={60} />
      )}

      {(showNewButton && !showLoadingNewButton && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickOnNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            {textNewButton}
          </Typography>
        </Button>
      )}

      {(showLoadingNewButton && !smDown) && (
        <Skeleton width={110} height={60} />
      )}

      {
        (
          showBackButton &&
          (showNewButton || showDeleteButton || showSaveButton || showButtonCloseAndSave)
        ) && (
          <Divider variant='middle' orientation='vertical' />
        )
      }

      {(showBackButton && !showLoadingBackButton) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickInBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Voltar
          </Typography>
        </Button>
      )}

      {showLoadingBackButton && (
        <Skeleton width={110} height={60} />
      )}
    </Box >
  )
}

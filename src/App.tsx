import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'

import { theme } from './styles/app-theme/custom-mui.styles'
import { PhotoProvider } from '~/contexts/PhotoContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <PhotoProvider>
              <Outlet />
            </PhotoProvider>
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackBarProvider>
    </ThemeProvider>
  )
}
export default App

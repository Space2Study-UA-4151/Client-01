import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
  openConfirmModal: (component: React.ReactElement) => void
  closeConfirmModal: () => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [confirmModal, setConfirmModal] = useState<React.ReactElement | null>(
    null
  )

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
  }, [setModal, setPaperProps, setTimer])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    ({ component, paperProps }: Component, delayToClose?: number) => {
      setModal(component)

      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
    },
    [setModal, setPaperProps, closeModalAfterDelay]
  )

  const openConfirmModal = useCallback((component: React.ReactElement) => {
    setConfirmModal(component)
  }, [])

  const closeConfirmModal = useCallback(() => {
    setConfirmModal(null)
  }, [])

  useEffect(() => {
    const handler = () => closeConfirmModal()
    window.addEventListener('closeConfirm', handler)
    return () => window.removeEventListener('closeConfirm', handler)
  }, [closeConfirmModal])

  const contextValue = useMemo(
    () => ({ openModal, closeModal, openConfirmModal, closeConfirmModal }),
    [openModal, closeModal, openConfirmModal, closeConfirmModal]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      {modal && (
        <PopupDialog
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          onClose={() =>
            openConfirmModal(
              <ConfirmDialog
                message='Are you certain you want to close? Any unsaved changes will be lost'
                onConfirm={() => {
                  closeConfirmModal()
                  closeModal()
                }}
                onDismiss={closeConfirmModal}
                open
                title='Please Confirm'
              />
            )
          }
          paperProps={paperProps}
          timerId={timer}
        />
      )}

      {confirmModal && (
        <PopupDialog
          closeModalAfterDelay={() => {}}
          content={confirmModal}
          onClose={closeConfirmModal}
          paperProps={{}}
          timerId={null}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }

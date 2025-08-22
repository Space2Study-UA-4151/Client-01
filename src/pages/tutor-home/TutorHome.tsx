import { useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { PhotoProvider } from '~/contexts/PhotoContext'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import FindBlock from '~/components/find-block/FindBlock'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { translationKey } from '~/components/find-block/find-student-constants'

const TutorHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      setTimeout(() => {
        openModal({
          component: <PhotoProvider><UserStepsWrapper userRole={userRole} /></PhotoProvider>,
          paperProps: {
            sx: styles.modal
          }
        })
      }, 0)
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper data-testid='tutorHome'>
      <FindBlock translationKey={translationKey} />
    </PageWrapper>
  )
}

export default TutorHome

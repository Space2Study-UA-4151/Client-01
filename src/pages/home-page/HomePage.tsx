import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'

import GuestHomePage from '../guest-home-page/GuestHome'
import TutorHome from '../tutor-home/TutorHome'
import StudentHome from '../student-home/StudentHome'

const HomePage = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  switch (userRole) {
    case UserRoleEnum.Tutor:
      return <TutorHome />
    case UserRoleEnum.Student:
      return <StudentHome />
    default:
      return <GuestHomePage />
  }
}

export default HomePage

import { useAppSelector } from '~/hooks/use-redux'

import GuestHomePage from '../guest-home-page/GuestHome'
import TutorHome from '../tutor-home/TutorHome'
import StudentHome from '../student-home/StudentHome'

const HomePage = () => {
  const { userRole } = useAppSelector((state) => state.appMain)
  console.log('User role', userRole)
  switch (userRole[0]) {
    case 'tutor':
      return <TutorHome />
    case 'student':
      return <StudentHome />
    default:
      return <GuestHomePage />
  }
}

export default HomePage

import { FC } from 'react'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { UserRole } from '~/types'

interface PrivateRouteProps {
  role: UserRole[]
}

const PrivateRoute: FC<PrivateRouteProps> = ({ role }) => {
  const context = useOutletContext()
  const { userRole } = useAppSelector((state) => state.appMain)

  if (!userRole[0] || !role.includes(userRole[0] as UserRole)) {
    return <Navigate replace to={errorRoutes.authPolicy.path} />
  }

  return <Outlet context={context} />
}

export default PrivateRoute

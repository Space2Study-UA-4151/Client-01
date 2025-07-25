import { useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import SignUpForm from '~/containers/guest-home-page/signup-form/SignUpForm'
import useForm from '~/hooks/use-form'
import { useSignUpMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ConfirmationDialogContext } from '~/context/confirm-context'
import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  termsPrivacyPolicy
} from '~/utils/validations/login'
import signUpTutorImg from '~/assets/img/signup-dialog/tutor.svg'
import signUpStudentImg from '~/assets/img/signup-dialog/student.svg'
import { snackbarVariants } from '~/constants'

import styles from '~/containers/guest-home-page/login-dialog/LoginDialog.styles'
import { UserRoleEnum } from '~/types'

interface SignUpDialogProps {
  role: UserRoleEnum
}

const SignUpDialog = ({ role }: SignUpDialogProps) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const { setNeedConfirmation } = useContext(ConfirmationDialogContext)
  const [signupUser] = useSignUpMutation()

  const {
    handleSubmit,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    data,
    errors
  } = useForm({
    onSubmit: async () => {
      try {
        await signupUser(data).unwrap()
        closeModal()
      } catch (e) {
        if (typeof e === 'object' && e !== null && 'data' in e) {
          const err = e as { data: { code: string } }
          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${err.data.code}`
          })
        } else {
          setAlert({
            severity: snackbarVariants.error,
            message: 'errors.unknownError'
          })
        }
      }
    },
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: role,
      areTermsAccepted: false
    },
    validations: {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      areTermsAccepted: termsPrivacyPolicy
    }
  })

  useEffect(() => {
    const hasContent =
      data.firstName.trim() !== '' ||
      data.lastName.trim() !== '' ||
      data.email.trim() !== '' ||
      data.password.trim() !== '' ||
      data.confirmPassword.trim() !== '' ||
      data.areTermsAccepted
    setNeedConfirmation(hasContent)
  }, [data, setNeedConfirmation])

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={role === UserRoleEnum.Tutor ? signUpTutorImg : signUpStudentImg}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {role === UserRoleEnum.Tutor
            ? t('signup.head.tutor')
            : t('signup.head.student')}
        </Typography>
        <Box sx={styles.form}>
          <SignUpForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleNonInputChange={handleNonInputValueChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog

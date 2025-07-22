import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

// import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import SignUpForm from '~/containers/guest-home-page/signup-form/SignUpForm'
import useForm from '~/hooks/use-form'
import { useLoginMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword
} from '~/utils/validations/login'
import signUpTutorImg from '~/assets/img/signup-dialog/tutor.svg'
import signUpStudentImg from '~/assets/img/signup-dialog/student.svg'
import { snackbarVariants } from '~/constants'

import styles from '~/containers/guest-home-page/login-dialog/LoginDialog.styles'

interface SignUpDialogProps {
  role: string
}

const SignUpDialog = ({ role }: SignUpDialogProps) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [loginUser] = useLoginMutation()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await loginUser(data).unwrap()
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
        confirmPassword: ''
      },
      validations: { firstName, lastName, email, password, confirmPassword }
    }
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={role == 'tutor' ? signUpTutorImg : signUpStudentImg}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {role == 'tutor' ? t('signup.head.tutor') : t('signup.head.student')}
        </Typography>
        <Box sx={styles.form}>
          <SignUpForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          {/* <GoogleLogin buttonWidth={styles.form.maxWidth} type={login} /> */}
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog

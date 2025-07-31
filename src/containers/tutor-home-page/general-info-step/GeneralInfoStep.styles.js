import { fadeAnimation } from '~/styles/app-theme/custom-animations'
import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation
  },
  imgContainer: {
    width: '432px',
    maxWidth: { md: '50%', lg: '450px' },
    // maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' }
    // pl: { lg: '96px', md: '30px' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pl: { xs: '8px', sm: '96px', md: '16px' },
    maxWidth: '448px'
  },
  title: {
    mb: '18px',
    fontSize: '16px'
  },
  form: {
    overflow: 'auto',
    maxWidth: { xs: '315px', md: '343px' },
    pt: '16px',
    pr: { xs: '8px', sm: '96px', md: '80px', lg: '96px' },
    pb: { xs: '24px', sm: '64px' },
    ...scrollbar
  }
}

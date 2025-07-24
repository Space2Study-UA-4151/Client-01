import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Tooltip,
  Typography,
  SxProps,
  Theme
} from '@mui/material'

import { TypographyVariantEnum } from '~/types'
import { styles } from '~/components/app-checkbox-field/AppCheckboxField.styles'

interface AppCheckboxFieldProps extends Omit<CheckboxProps, 'error'> {
  label: string
  errorMsg?: string
  withHelperText?: boolean
  labelSx?: SxProps<Theme>
  checkboxSx?: SxProps<Theme>
}

const AppCheckboxField = ({
  label,
  errorMsg,
  withHelperText = true,
  labelSx,
  checkboxSx,
  ...props
}: AppCheckboxFieldProps) => {
  const helperText = errorMsg ? (
    <Tooltip title={errorMsg}>
      <Typography variant={TypographyVariantEnum.Caption}>
        {errorMsg}
      </Typography>
    </Tooltip>
  ) : (
    ' '
  )

  return (
    <FormControl error={Boolean(errorMsg)} sx={checkboxSx}>
      <FormControlLabel
        control={<Checkbox {...props} />}
        label={<Typography sx={labelSx}>{label}</Typography>}
      />
      {withHelperText && (
        <FormHelperText sx={styles.helperText}>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default AppCheckboxField

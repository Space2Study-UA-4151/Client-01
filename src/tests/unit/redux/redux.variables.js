export const loginUserData = { email: 'user@gmail.com', password: '123' }

export const signupUserData = {
  email: 'user@gmail.com',
  password: 'testest_1',
  confirmPassword: 'testest_1',
  firstName: 'John',
  lastName: 'Doe'
}

export const initialState = {
  userId: '',
  userRole: '',
  firstName: '',
  lastName: '',
  authLoading: false,
  loading: true,
  pageLoad: false,
  error: '',
  isFirstLogin: true
}

export const stateAfterLogin = {
  userId: '62f4fa49d39c988e347d833f',
  userRole: 'student',
  firstName: 'John',
  lastName: 'Doe',
  authLoading: false,
  loading: false,
  pageLoad: false,
  error: '',
  isFirstLogin: true
}

export const stateAfterSignup = {
  userId: '',
  userRole: '',
  firstName: '',
  lastName: '',
  loading: false,
  pageLoad: false,
  authLoading: false,
  error: '',
  isFirstLogin: true
}

export const errorMessage = 'Request failed with status code 404'
export const errorCode = 'USER_NOT_REGISTERED'

export const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJpc0ZpcnN0TG9naW4iOnRydWUsInJvbGUiOiJzdHVkZW50IiwiaWQiOiI2MmY0ZmE0OWQzOWM5ODhlMzQ3ZDgzM2YifQ.-wr3kGB3cg3mwJefH2uU82W2FQY2HxdK2gG7rY8TIyA'

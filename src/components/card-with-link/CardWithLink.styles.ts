export const styles = {
  imgContainer: {
    padding: '15px',
    // width: '100%',
    // alignSelf: 'center',
    objectFit: 'contain',
    mr: '25px',
    maxWidth: '62px',
    maxHeight: '62px',
    borderRadius: '6px'
  },
  img: {
    fontSize: '32px',
    width: '32px',
    height: '32px',
    display: 'block'
  },
  titleWithDescription: {
    wrapper: {
      minWidth: '110px',
      margin: 0,
      mb: 0,
      lineHeight: '24px',
      textAlign: 'start'
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'basic.black',
      typography: { xs: 'h6' },
      m: 0
    },
    description: {
      typography: { xs: 'body2' },
      color: 'primary.500'
    }
  }
}

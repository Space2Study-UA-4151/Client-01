export function onClosePopup(e, onClose) {
  if (e.currentTarget === e.target) {
    onClose()
  }
}

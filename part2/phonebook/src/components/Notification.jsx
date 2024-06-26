const Notification = ({ notificationType,message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={notificationType}>
      {message}
    </div>
  )
}

export default Notification
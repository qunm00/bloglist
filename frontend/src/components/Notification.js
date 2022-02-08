const Notification = ({ 
  message,
  notificationState
}) => {
  return (
    <div>
      {
        message
        ?
        <div className={
          (notificationState ? "success" : "alert") + " rounded border px-4 py-3 relative"
        }>
          <p>{message}</p>
        </div>
        : null
      }
    </div>
  )
}

export default Notification
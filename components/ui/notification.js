import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

import classes from './notification.module.css'

function Notification(props) {
  const { title, message, status } = props
  const [show, setShow] = useState(status || false)

  useEffect(() => {
    setShow(status || false)
  }, [status])

  let statusClasses = ''

  if (status === 'success') {
    statusClasses = classes.success
  }

  if (status === 'error') {
    statusClasses = classes.error
  }

  const cssClasses = `${classes.notification} ${statusClasses}`

  return ReactDOM.createPortal(
    show && (
      <div className={cssClasses} onClick={() => setShow(false)}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    ),
    document.getElementById('notifications')
  )
}

export default Notification

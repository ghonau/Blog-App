import Notification from '../ui/notification'

import classes from './contact-form.module.css'

import { Fragment, useState, useEffect } from 'react'
function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')

  const [requestStatus, setRequestStatus] = useState()

  const [responseMessage, setResponseMessage] = useState()

  useEffect(() => {
    if (requestStatus === 'sucess' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setResponseMessage(null)
        console.log('just set the request status to null')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  async function submitHandler(e) {
    setRequestStatus('pending')
    e.preventDefault()
    let response

    try {
      response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          name: enteredName,
          message: enteredMessage,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        throw new Error(response.json().message || 'Something went wrong')
      }
      setRequestStatus('success')
    } catch (error) {
      setRequestStatus('error')
      setResponseMessage(error || 'Something went wrong!')
    }
  }

  return (
    <Fragment>
      <section className={classes.contact}>
        <h1>How can i help you?</h1>
        <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor='email'>Your Email</label>
              <input
                type='email'
                id='email'
                required
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.currentTarget.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor='name'>Your Name</label>
              <input
                type='text'
                id='name'
                required
                value={enteredName}
                onChange={(e) => setEnteredName(e.currentTarget.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor='message'>Your Message</label>
              <textarea
                type='text'
                rows={5}
                id='message'
                required
                value={enteredMessage}
                onChange={(e) => setEnteredMessage(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
      </section>
      {requestStatus && (
        <Notification
          title={requestStatus}
          message={responseMessage}
          status={requestStatus}
        />
      )}
    </Fragment>
  )
}

export default ContactForm

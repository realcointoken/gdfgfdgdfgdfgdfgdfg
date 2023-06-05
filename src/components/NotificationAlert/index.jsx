import React from 'react'
import {useState, useEffect} from 'react'
import Alert from 'react-bootstrap/Alert'

interface Props {
  variant: String;
  message: String;
}

export default function NotificationAlert(props: Props) {
  const {variant, message} = props
  const [text, setText] = useState('')

  useEffect(() => {
    setText(message)
    setTimeout(() => {
      setText('')
    }, 5000)
  }, [props])

  return (
    <>
      {text != '' && (
        <Alert variant={variant} onClose={() => setText('')} dismissible>
          {text}
        </Alert>
      )}
    </>
  )
}

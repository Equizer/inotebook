import React from 'react'

const Alert = (props) => {

  const capitalize = (type) => {
    if (type === 'danger') {
      type = 'error'
    }
    let lower = type.toLowerCase();
    return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`
  }
  return (
    props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
     <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
    </div>
  )
}

export default Alert

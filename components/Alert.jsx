import React from 'react'

export default function Alert(props) {
  // Return null if alert is null
  if (!props.alert) {
    return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      top: '56px', // Height of the navbar
      left: 0,
      right: 0,
      zIndex: 1050, // Higher than navbar's z-index
      width: '100%',
      borderRadius: 0 // Remove border radius for full-width look
    }}>
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show m-0`} role="alert" style={{borderRadius: 0}}>
        <strong>{props.alert.title || ''}</strong> {props.alert.message || ''}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}


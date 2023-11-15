import React from 'react'

const About = (props) => {

  const displayAlert = () => {
    props.showAlert('this alert is in about page', 'secondary')
  }
  return (
    <div>
      This is about page
      <button onClick={displayAlert}>click</button>
    </div>
  )
}

export default About
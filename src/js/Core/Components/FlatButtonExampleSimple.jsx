import React from 'react'
import ReactDOM from 'react-dom'
import {FlatButton} from 'material-ui'

const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label='Default' />
    <FlatButton label='Primary' primary={true} />
    <FlatButton label='Secondary' secondary={true} />
    <FlatButton label='Disabled' disabled={true} />
  </div>
)

export default FlatButtonExampleSimple

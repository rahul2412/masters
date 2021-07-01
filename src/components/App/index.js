import React, { Component } from 'react'
import codes from '../../codes'
import './index.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        {
          codes.map(code => <li>{code.code}</li>)
        }
      </div>
    )
  }
}
import React, { Component } from 'react'
import codes from '../../codes'
import './index.scss'
import { Input } from 'antd';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCodes: codes
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    let filteredCodes = codes.filter( e => e.code.includes(event.target.value));
    this.setState({ filteredCodes:filteredCodes })
  }

  render() {
    return (
      <div>
        <Input onChange={this.handleChange} />

        {
          this.state.filteredCodes.map(code => <li>{code.code}</li>)
        }
      </div>
    )
  }
}
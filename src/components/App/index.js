import React, { Component } from 'react'
import codes from '../../codes'
import 'antd/dist/antd.css';
import './index.scss'
import { Input, Button, Modal } from 'antd';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCodes: codes,
      isModalVisible: false,
      modalCode: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleOk = () => {
    this.setState({ isModalVisible: false });

  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  handleChange = event => {
    let filteredCodes = codes.filter(e => e.code.toLowerCase().includes(event.target.value.toLowerCase()));
    this.setState({ filteredCodes: filteredCodes })
  }

  handleCodeChange = event => {
    if (event.target.value) { this.setState({ modalCode: event.target.value }) }
  }

  render() {
    return (
      <div>
        <Input className="SearchBox" placeholder="Search Code ..." onChange={this.handleChange} />
        <Button className="AddSnippet" type="primary" onClick={this.showModal}>
          Add Snippet
        </Button>
        <Modal title="Add Code Snippet" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} destroyOnClose >
          <Input.TextArea rows={4} placeholder="Enter Code ..." onChange={this.handleCodeChange} />
        </Modal>
        {
          this.state.filteredCodes.map(code => <li>{code.code}</li>)
        }
      </div>
    )
  }
}
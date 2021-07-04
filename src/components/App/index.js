import React, { Component } from 'react'
import codes from '../../codes'
import 'antd/dist/antd.css';
import './index.scss'
import { Input, Button, Modal, Alert } from 'antd';
import { debounce } from 'lodash'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSnippets: codes,
      filteredCodes: codes,
      searchedCode: "console",
      isModalVisible: false,
      modalCode: "",
      alertBox: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = debounce(this.handleSearch.bind(this), 500); //for performance optimisation if number is too large
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal = () => this.setState({ isModalVisible: true });

  handleOk = () => {
    if (this.state.modalCode) {
      let codeSnippets = this.state.codeSnippets
      codeSnippets.push({ code: this.state.modalCode })
      this.setState({
        codeSnippets: codeSnippets,
        filteredCodes: codeSnippets,
        isModalVisible: false,
        modalCode: "",
        alertBox: true,
        searchedCode: ""
      });
      setTimeout(() => {
        this.setState({
          alertBox: false
        })
      }, 2500)
    }
    else this.setState({ isModalVisible: false });
  };

  handleCancel = () => this.setState({ isModalVisible: false, modalCode: "" });

  handleChange = event => {
    this.setState({ searchedCode: event.target.value })
    this.handleSearch(event.target.value)
  }

  handleSearch = value => {
    let filteredCodes = this.state.codeSnippets.filter(e => e.code.toLowerCase().includes(value.toLowerCase()));
    this.setState({ filteredCodes: filteredCodes })
  }

  handleCodeChange = event => this.setState({ modalCode: event.target.value })

  render() {
    return (
      <div>
        {
          this.state.alertBox && <Alert message="Adding snippet was successful." type="success" showIcon closable />
        }
        <Input className="SearchBox" placeholder="Search Code ..." onChange={this.handleChange} value={this.state.searchedCode} />
        <Button className="AddSnippet" type="primary" onClick={this.showModal}>
          Add Snippet
        </Button>
        <Modal title="Add Code Snippet" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} destroyOnClose >
          <Input.TextArea rows={4} placeholder="Enter Code ..." onChange={this.handleCodeChange} />
        </Modal>
        {
          this.state.filteredCodes.map(code => <li>{code.code}</li>)
        }
        <br /><br />
        <h3>@Copyright 2021 Rahul Passi</h3>
      </div>
    )
  }
}
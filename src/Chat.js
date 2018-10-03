import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import Messages from './Messages';
import {
        Modal,
        Input,
        Row,
        Col,
        ModalHeader,
        ModalBody,
        ModalFooter,
        Button,
        Navbar,
        Nav,
        NavbarBrand,
        NavItem,
        NavLink } from 'reactstrap';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
      modal: true
    }

    this.socket = io('https://chatroom-backend-express.herokuapp.com/');

    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });

    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
          author: this.state.username,
          message: this.state.message
      });
      this.setState({message: ''});
    }

    this.toggle = this.toggle.bind(this);
  }



  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render(props) {
    return (
      <div className="Chat">
        <Navbar color="light" light expand="md">
          <NavbarBrand>Rafa's Chatroom</NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="#" onClick={this.toggle}>{this.state.username}
              </NavLink>
            </NavItem>
          </Nav>

        </Navbar>

        <Messages messages={this.state.messages}/>

        <Row className='bottomBar'>
          <Col className='bottomCol' md='11'>
            <Input
              className="messageInputbox"
              type="text"
              placeholder="Message"
              value={this.state.message}
              onKeyPress={this.handleKeyPress}
              onChange={ev => this.setState({message: ev.target.value})}/>
          </Col>

          <Col className='bottomCol' md='1'>
          <Button
            className="sendButton"
            onClick={this.sendMessage}> Send </Button>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login Name</ModalHeader>
          <ModalBody>
            <Input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default Chat;

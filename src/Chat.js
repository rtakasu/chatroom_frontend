import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import Messages from './Messages';
import { Modal, Input, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

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

  setName(name) {
    console.log(name);
  }

  render(props) {
    return (
      <div className="Chat">
        <Messages messages={this.state.messages}/>
        <div className='bottomBar'>
          <Input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
          <Button onClick={this.sendMessage}> Send Message </Button>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login Name</ModalHeader>
          <ModalBody>
            <Input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Login</Button>{' '}
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default Chat;

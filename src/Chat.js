import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Input, Footer } from 'reactstrap';
import io from "socket.io-client";
import Messages from './Messages';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: []
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
  }

  render(props) {
    return (
      <div className="Chat">
        <Messages messages={this.state.messages}/>
        <div className='bottomBar'>
          <Input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
          <Input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
          <Button onClick={this.sendMessage}> Send Message </Button>
        </div>

      </div>
    );
  }
}

export default Chat;

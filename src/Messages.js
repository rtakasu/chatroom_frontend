import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Messages extends Component {
  render(props) {
    return (
      <div className="Messages">
        <ListGroup flush>
          {this.props.messages.map(message => {
            if (message["type"] == "message") {
              return (
                <ListGroupItem className='message'> <b>{message.author}</b>: {message.message}</ListGroupItem>
              )
            } else if (message["type"] == "login") {
              return (
                <ListGroupItem className='message'> <b>{message.author}: Joined the Chat</b> </ListGroupItem>
              )
            }

          })}
        </ListGroup>
      </div>
    );
  }
}

export default Messages;

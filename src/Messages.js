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
            return (
              <ListGroupItem className='message'>{message.author}: {message.message}</ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Messages;

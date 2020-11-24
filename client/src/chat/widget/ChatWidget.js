import React, { Component } from 'react';
import axios from 'axios';
import { Widget, addResponseMessage, deleteMessages, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class ChatWidget extends Component {

  constructor(props) {
    super(props);
    this.messages = props.messages.map(element => {
      element.displayed = false;
      return element;
    });
  }

  componentDidMount() {
    this.updateMessages();
  }

  componentDidUpdate() {
    this.updateMessages();
  }

  updateMessages = () => {
    const existingmessageids = this.messages.map((m) => {
      return m.messageid;
    });
    console.log({existingmessageids});
    this.props.messages.forEach((m) => {
      if (!existingmessageids.includes(m.messageid)) {
        this.messages.push(m);
      }
    });
    console.log({props:this.props.messages});
    console.log({messages:this.messages});

    this.messages.forEach(element => {
      if (!element.displayed) {
        element.displayed = true;
        addResponseMessage(element.smstext);
      }
    });
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    axios({
      method: 'post',
      url: '/sms/new',
      data: {
        to: this.props.msisdn,
        message: newMessage
      }
    })
    .then(function(response, body) {
      console.log(response);
    });
  }

  render() {
    const {
      msisdn,
      fetchSMS
    } = this.props;

    const subtitle = (
      <span>
        <a onClick={fetchSMS} href="#">(Refresh)</a>
      </span>
    )
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title={msisdn}
          subtitle={subtitle}
        />
      </div>
    );
  } 
}

export default ChatWidget;
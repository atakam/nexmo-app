import React, { Component } from 'react';
import axios from 'axios';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class ChatWidget extends Component {

  constructor(props) {
    super(props);
    this.messages = props.messages && props.messages.map(element => {
      element.displayed = false;
      return element;
    });

    this.selfmessages = props.selfmessages && props.selfmessages.map(element => {
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
    if (this.messages) {
      const existingmessageids = this.messages.map((m) => {
        return m.messageid;
      });
      this.props.messages.forEach((m) => {
        if (!existingmessageids.includes(m.messageid)) {
          this.messages.push(m);
        }
      });
      this.messages.forEach(element => {
        if (!element.displayed) {
          element.displayed = true;
          addResponseMessage(element.smstext);
        }
      });
    }

    if (this.selfmessages) {
      const existingselfmessageids = this.selfmessages.map((m) => {
        return m.messageid;
      });
      this.props.selfmessages.forEach((m) => {
        if (!existingselfmessageids.includes(m.messageid)) {
          this.selfmessages.push(m);
        }
      });
      this.selfmessages.forEach(element => {
        if (!element.displayed) {
          element.displayed = true;
          addUserMessage(element.smstext);
        }
      });
    }
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
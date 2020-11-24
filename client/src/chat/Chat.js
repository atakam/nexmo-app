import React, { Component } from 'react';
import _ from 'underscore';
import ChatWidget from './widget/ChatWidget';

import 'react-chat-widget/lib/styles.css';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      selfmessages: {}
    };
  }

  componentDidMount() {
    this.fetchSMS();
    // this.interval = setInterval(() => {
    //   this.fetchSMS();
    // }, 30000);
  }

  componentWillUnmount() {
  }

  fetchSMS = () => {
    fetch('/sms')
    .then(response => response.json())
    .then(json => {
      var grouped = _.groupBy(json.messages.remote.messages, function(message) {
        return message.msisdn;
      });
      var selfgrouped = _.groupBy(json.messages.self.messages, function(message) {
        return message.msisdn;
      });
      console.log(json);
      if (!this.deepEqual(this.state.messages, grouped) || !this.deepEqual(this.state.selfmessages, selfgrouped)) {
        console.log(grouped);
        this.setState({
          messages: grouped,
          selfmessages: selfgrouped
        })
      }
    })
    .catch(error => console.log('error', error));
  }

  deepEqual = (x, y) => {
    if (x === y) {
      return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
      if (Object.keys(x).length != Object.keys(y).length)
        return false;
  
      for (var prop in x) {
        if (y.hasOwnProperty(prop))
        {  
          if (! this.deepEqual(x[prop], y[prop]))
            return false;
        }
        else
          return false;
      }
  
      return true;
    }
    else 
      return false;
  }

  getWidgets = () => {
    let widgets = [];
    const {messages, selfmessages} = this.state;
    for (const msisdn in messages) {
      widgets.push(<ChatWidget
        key={msisdn}
        msisdn={msisdn}
        messages={messages[msisdn]}
        selfmessages={selfmessages[msisdn]}
        fetchSMS={this.fetchSMS}
      />);
    }
    return widgets;
  }

  render() {
    return (
      <div className="App">
        {this.getWidgets()}
      </div>
    );
  } 
}

export default Chat;
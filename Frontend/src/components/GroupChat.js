import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

class GroupChat extends Component {
    constructor(props) {
        super(props);

        console.log(props.match);

        this.state = {
            id: new String(this.props.match.params.id).substr(1, this.props.match.params.id.length - 1),
            messages: [],
            formInput: "",
            username: "Username",
            hubConnection: null,
        };
    }

    addMessage(newMessage) {
        let currentMessages = this.state.messages;
        currentMessages.push({userName: this.state.username, roomId:this.state.id, contents: newMessage});
        this.setState({messages:currentMessages});
    }

    componentDidMount() {
        const hubConnection = new HubConnectionBuilder()
            .withUrl(`http://localhost:5000/group`)
            .build();

        this.setState({ hubConnection: hubConnection, username: this.state.username }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.dir(err));

            this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
                if(receivedMessage == "") {
                    return;
                }
                console.log("Received message from the server");
                this.addMessage(receivedMessage);
            });
        });

        fetch(`http://localhost:5000/api/message/${this.state.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ messages: data });
            });
    }

    sendButtonClick() {
        if(this.state.formInput == "") {
            return;
        }

        let messageToSend = this.state.formInput;
        this.setState({ formInput: "" });

        this.state.hubConnection
            .invoke('sendToAll', this.state.username, messageToSend)
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                {
                    this.state.messages.map(message => {
                        return (
                            <p key={message.id}> {message.userName + ": " + message.contents} </p>
                        )
                    })
                }
                <input
                    value={this.state.formInput}
                    type="text" className="form-control"
                    placeholder="Enter a message"
                    onChange={e => this.setState({ formInput: e.target.value })}
                />
                <br />
                <button className="btn btn-primary" onClick={this.sendButtonClick.bind(this)}>Send</button>
            </div>
        )
    }
}

export { GroupChat };
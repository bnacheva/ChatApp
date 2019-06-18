import React from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

class ChatPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            hubConnection: null
        };
    }

    componentDidMount() {
        const username = "User";

        const hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat')
            .build();

        this.setState({ hubConnection: hubConnection, username: username }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.dir(err));

            this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
                if(receivedMessage == "") {
                    return;
                }
                console.log("Received message from the server");
                const text = `${nick}: ${receivedMessage}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
        });
    }

    sendMessageToServer() {
        this.state.hubConnection
            .invoke('sendToAll', this.state.username, this.state.message)
            .catch(err => console.error(err));

        this.setState({ message: '' });
    };

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Basic Chat</h2>
                <br />
                <input
                    type="text" className="form-control"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />
                <br />
                <button className="btn btn-primary" onClick={this.sendMessageToServer.bind(this)}>Send</button>
                <br/>
                <br/>
                <div>
                    {this.state.messages.map((message, index) => (
                        <span style={{ display: 'block',
                        fontSize: '20px' }} key={index}> {message} </span>
                    ))}
                </div>
            </div>
        );
    }
}

export { ChatPage };

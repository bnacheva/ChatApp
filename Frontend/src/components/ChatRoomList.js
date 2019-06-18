import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class ChatRoomList extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            rooms: [],
            currentRoom: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/chatroom')
            .then(response => response.json())
            .then(data => {
                this.setState({ rooms: data });
            });
    }

    render() {
        return (
            <div className="rooms-list">
                <h4>Rooms Available</h4>
                {this.state.rooms.map(room => {
                    return (
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-info" key={room.id}>
                                <Link to={{
                                        pathname: '/groupRoom/:' + room.id
                                    }}>
                                    {room.name}
                                </Link>
                        </li>
                        </ul>
                    )
                })}
            </div>
        )
    }
}

export default ChatRoomList;
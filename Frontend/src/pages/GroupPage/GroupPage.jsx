import React from "react";
import { HubConnectionBuilder } from "@aspnet/signalr";

import AddChatRoom from '../../components/AddChatRoom';
import ChatRoomList from '../../components/ChatRoomList';
import Title from '../../components/Title';

class GroupPage extends React.Component {
    constructor(props) {
        super(props);

        this.connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/group")
            .build();
    }
    componentDidMount() {
        this.connection
            .start({ withCredentials: false })
            .catch(err => console.error(err.toString()));
    }
    render() {
        return (
            <div className="GroupPage">
                <Title />
                <br />
                <ChatRoomList openRoom={() => 1} connection={this.connection} />
                <br />
                <AddChatRoom connection={this.connection} />
                <br />
            </div>
        );
    }
}

export { GroupPage };
import React from 'react';
import { connect } from 'react-redux';
import { HubConnectionBuilder } from "@aspnet/signalr";

import { setUserName } from "../actions/userActions";
import { receiveMessage } from "../actions/messageActions";

import Title from '../components/Title';

class GroupPage extends React.Component {
    constructor() {
        super();

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
            <div className="App">
                <Title />
                
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        userName: state.userInfo.userName,
        currentRoom: state.requestRooms.currentRoom
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetUserName: name => dispatch(setUserName(name)),
        onReceiveMessage: (
            user,
            message,
            roomId,
            messageId,
            postedAt,
            currentRoomId
        ) =>
            dispatch(
                receiveMessage(
                    user,
                    message,
                    roomId,
                    messageId,
                    postedAt,
                    currentRoomId
                )
            )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupPage);
export { GroupPage };
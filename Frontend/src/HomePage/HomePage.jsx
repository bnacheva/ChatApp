import React, { Button } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    };

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Hi, {user.firstName}!</h2>       
                <br/>
                <p>
                    <Link to="/chat">
                        <button type="button" className="btn btn-primary">
                            Chat now
                        </button> 
                    </Link> &nbsp;
                    <Link to="/login">
                        <button type="button" className="btn btn-primary">
                            Logout
                    </button></Link>   
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
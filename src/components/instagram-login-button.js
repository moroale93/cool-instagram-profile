import React from 'react';
import {logout, upsertAccessToken} from "../actions/instagramActions";
import connect from "react-redux/es/connect/connect";
import queryString from "query-string";

class InstagramLoginButton extends React.Component {
    componentDidMount() {
        let params = queryString.parse(window.location.hash);
        if (params.access_token && !this.props.accessToken) {
            this.props.upsertAccessToken(params.access_token);
        }
    }

    onLogoutClick = () => {
        this.props.logout();
    };

    render() {
        if (this.props.accessToken) {
            return (
                <div>
                    <button alt="Logout from Instagram" onClick={this.onLogoutClick}>
                        Logout from Instagram
                    </button>
                </div>
            );
        }
        return (
            <div>
                <a alt="Login with Instagram"
                   href="https://api.instagram.com/oauth/authorize/?client_id=095056c01085469b9261e738b42e4bac&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Flogged&response_type=token">
                    Login with Instagram
                </a>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    accessToken: state.access_token
});

const mapDispatchToProps = {
    logout: logout,
    upsertAccessToken: upsertAccessToken
};

export default connect(mapStateToProps, mapDispatchToProps)(InstagramLoginButton);
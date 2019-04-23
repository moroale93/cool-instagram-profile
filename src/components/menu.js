import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import InstagramLoginButton from "./instagram-login-button";

class Menu extends React.Component {
    render() {
        const logo = this.props.profileImage, profileUsername = this.props.profileUsername;
        return (
            <nav>
                <div className={"logo to-left"}>
                    <img src={logo}/>
                </div>
                <div className={"username"}>
                    {profileUsername}
                </div>
                <ul className={"to-right"}>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/charts">
                            Charts
                        </NavLink>
                    </li>
                    <li>
                        <InstagramLoginButton/>
                    </li>
                </ul>
                <div className={"clearright"}></div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    accessToken: state.access_token,
    profileImage: state.profile.profile_picture,
    profileUsername: state.profile.username
});

export default connect(mapStateToProps)(Menu);
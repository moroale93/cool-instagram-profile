import React from 'react';
import {connect} from 'react-redux';
import {getProfileData} from '../actions/instagramActions';

class ProfileHead extends React.Component {
    componentDidMount() {
        this.props.getProfileData();
    }

    render() {
        const data = this.props.profileData || null;
        if (data) {
            return (
                <div>
                    <h1>{data.full_name}</h1>
                    <p>{data.bio}</p>
                    <a href={data.website}>Website</a>
                    <div>
                        <div>Media: {data.counts.media}</div>
                        <div>Follows: {data.counts.follows}</div>
                        <div>Followed by: {data.counts.followed_by}</div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                No data
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profileData: state.profile
});

const mapDispatchToProps = {
    getProfileData: getProfileData
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHead);
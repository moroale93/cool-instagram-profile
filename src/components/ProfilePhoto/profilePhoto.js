import React from 'react';
import PropTypes from "prop-types";
import "./profilePhoto.scss";

class ProfileImages extends React.Component {
    render() {
        const data = this.props.photo || null;
        if (data) {
            return (
                <div className={"profile-photo-wrapper"}>
                    <div className={"top-wrapper"}>
                        <img src="/images/transparent.png"
                             style={{'backgroundImage': "url(" + data.images.low_resolution.url + ")"}}/>
                    </div>
                    <div className={"bottom-wrapper"}>
                        <h1 className={"text-right"}>{(new Date(Number(data.created_time))).toLocaleDateString()}</h1>
                        <h2 className={"text-center"}>{data.caption.text}</h2>
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

ProfileImages.propTypes = {
    photo: PropTypes.object.isRequired
};

export default ProfileImages;
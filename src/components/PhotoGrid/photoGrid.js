import React from 'react';
import {connect} from 'react-redux';
import {getProfileImages} from '../../actions/instagramActions';
import ProfilePhoto from '../ProfilePhoto/profilePhoto';
import "./photoGrid.scss";

class PhotoGrid extends React.Component {
    settings = {
        wrapperWidth: 900,
        numOfCols: 4,
        maxRotationDeg: 30,
        paddingProp: 0.05714285714,
        heightProp: 1.2
    };

    constructor(props) {
        super(props);
        this.state = {animated: false};
    }

    componentDidMount() {
        this.props.getProfileImages();
    }

    clickPhoto = (e) => {
        console.log("Cliccata foto con id", e.target.closest(".photo-grid-cell").getAttribute("id"));
    };

    render() {
        const data = this.props.profileImages || null;
        if (data) {
            if (!this.state.animated) {
                setTimeout(() => {
                    this.setState({
                        animated: true
                    })
                }, 100);
            }
            let wrapperClasses = ["photo-grid-list"];
            if (!this.state.animated) {
                wrapperClasses.push("ready-to-animate");
            }
            const self = this;
            const rowNumbers = Math.floor(data.length / this.settings.numOfCols) + 1;
            const cellWidth = self.settings.wrapperWidth / self.settings.numOfCols;
            const cellHeight = cellWidth * self.settings.heightProp;
            const padding = cellWidth * self.settings.paddingProp;
            const imagesList = (data).map(function (item, key) {
                const randomRotation = Math.floor(Math.random() / (1 / (self.settings.maxRotationDeg * 2))) - self.settings.maxRotationDeg;
                const randomZIndex = Math.floor(Math.random() / (1 / 5));
                return (
                    <div className={"photo-grid-cell" + (randomRotation < 0 ? " left-oriented" : "")} key={key}
                         id={item.id} onClick={self.clickPhoto} style={{
                        height: cellHeight + "px",
                        width: cellWidth + "px",
                        top: cellHeight * Math.floor(key / self.settings.numOfCols) + "px",
                        left: cellWidth * (key % self.settings.numOfCols) + "px",
                        transform: "rotate(" + randomRotation + "deg)",
                        padding: padding + "px",
                        zIndex: randomZIndex
                    }}>
                        <ProfilePhoto photo={item}/>
                    </div>
                )
            });
            return (
                <div className={"photo-grid-wrapper"}
                     style={{width: self.settings.wrapperWidth + "px"}}>
                    <div className={wrapperClasses.join(" ")}
                         style={{height: rowNumbers * cellHeight + "px"}}>
                        {imagesList}
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
    profileImages: state.images
});

const mapDispatchToProps = {
    getProfileImages: getProfileImages
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGrid);
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import welcomeImg from "../../assets/media/welcome-banner.png";

const Dashboard = (props) => {
    const history = useHistory();
    useEffect(() => {}, []);

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="w-full flex flex-column align-items-center">
                <img src={welcomeImg} alt="welcome image" className="h-30rem" />
                <p className="text-7xl">Welcome!</p>
            </div>
            <div></div>
            <div className="grid col-10">{/* ~cb-add-services-links~ */}</div>
        </div>
    );
};
const mapState = (state) => ({
    //
});
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(Dashboard);

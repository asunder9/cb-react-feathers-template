import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Dashboard = (props) => {
    const history = useHistory();
    useEffect(() => {}, []);

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <h5 className="mb-0 ml-2">Dashboard</h5>
            </div>
            <div className="grid col-10">
                <div className="col-12 lg:col-6 xl:col-4">
                    <Link to="">
                        <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: "10rem" }}>
                            <i className="pi pi-plus mb-2" style={{ fontSize: "1.2rem" }}></i>
                            <div className="text-900 font-medium text-lg">Welcome!</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
const mapState = (state) => ({});
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(Dashboard);

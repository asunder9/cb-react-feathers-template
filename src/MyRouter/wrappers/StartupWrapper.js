import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const StartupWrapper = (props) => {
    const history = useHistory();
    useEffect(() => {
        // runs once
    }, []);

    return null;
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(StartupWrapper);

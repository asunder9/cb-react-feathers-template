import React, { useState } from "react";

import { connect } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";

const LoginPage = (props) => {
    const [email, setEmail] = useState("a@a.com");
    const [password, setPassword] = useState("123456");

    const [emailError, setEmailError] = useState(null);
    const [passError, setPassError] = useState(null);

    const history = useHistory();
    const onEnter = (e) => {
        console.log("e.key", e.key);
        if (e.key === "Enter") login();
    };

    const login = () => {
        if (validate()) {
            props
                .login({ email, password })
                .then(() => {
                    props.alert({ type: "success", title: "Login", message: "Successful" });
                    history.push("/");
                })
                .catch((e) => {
                    console.log("error", e);
                    props.alert({ type: "error", title: "Login", message: "Failed to login" });
                });
        }
    };

    const validate = () => {
        let isValid = true;
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setEmailError("Please Enter a valid Email address");
            isValid = false;
        }
        if (password.length < 6) {
            setPassError("Please enter a valid password. Must be at least 6 characters");
            isValid = false;
        }
        return isValid;
    };

    return (
        <div className="grid p-fluid flex flex-column align-items-center">
            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>Login</h5>
                    <div className="flex flex-column align-items-center">
                        <div className="col-12 mb-2 lg:col-6 lg:mb-0">
                            <p className="m-0">Email</p>
                            <InputText type="text" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={emailError ? "p-invalid" : ""} onKeyDown={onEnter}></InputText>
                            <small className="p-error">{emailError}</small>
                        </div>
                        <div className="col-12 mb-2 lg:col-6 lg:mb-0">
                            <p className="m-0">Password</p>
                            <InputText type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={passError ? "p-invalid" : ""} onKeyDown={onEnter}></InputText>
                            <small className="p-error">{passError}</small>
                        </div>
                        {/* <div className="col-12 mb-2 lg:col-6 lg:mb-0">
                            <InputText type="text" placeholder="Invalid" className="p-invalid" />
                        </div> */}
                    </div>
                    <div className="flex justify-content-center mt-3">
                        <div className="col-3">
                            <Button label="Login" className="p-button-raised p-button-rounded" onClick={login}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    login: (data) => dispatch.auth.login(data),
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(LoginPage);

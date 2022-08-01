import client from "../services/restClient";
// import mongoose from "mongoose";
const initState = {
    user: {},
    isLoggedIn: false,
};
export const auth = {
    state: {
        ...initState,
    },
    reducers: {
        // handle state changes with pure functions
        update(state, newState) {
            return { ...state, ...newState };
        },
    },
    effects: (dispatch) => ({
        ///////////////
        //// LOGIN //// using feathers rest client
        ///////////////
        async login(data, reduxState) {
            return new Promise(async (resolve, reject) => {
                dispatch.loading.show();

                try {
                    let loginResponse = await client.authenticate({ ...data, strategy: "local" });
                    localStorage.setItem("email", data.email);
                    this.update({ isLoggedIn: true, user: loginResponse.user });
                    resolve();
                } catch (error) {
                    console.log("error", { error });
                    reject(error);
                }
                dispatch.loading.hide();
            });
        },
        /////////////////////////
        //// RE-AUTHENTICATE ////
        /////////////////////////
        async reAuth(data, reduxState) {
            return new Promise(async (resolve, reject) => {
                dispatch.loading.show();
                try {
                    let loginResponse = await client.reAuthenticate();
                    this.update({ isLoggedIn: true, user: loginResponse.user });
                    resolve();
                } catch (error) {
                    console.log("error", { error });
                    reject(error);
                }
                dispatch.loading.hide();
            });
        },
        ////////////////
        //// LOGOUT ////
        ////////////////
        async logout(_, reduxState) {
            dispatch.loading.show();
            await client
                .logout()
                .then((res) => {
                    console.log("Client Logged out successfully!");
                    dispatch.toast.alert({ type: "success", message: "User Logout!" });
                    this.update(initState);
                })
                .catch((err) => {
                    console.log("Failed to logout!", err);
                    dispatch.toast.alert({ type: "error", message: "Failed to logout!" });
                    this.update(initState);
                });
            window.localStorage.clear();
            window.sessionStorage.clear();
            dispatch.loading.hide();
        },
    }),
};

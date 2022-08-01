import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
const ToastWrapper = ({ type, title, message }) => {
    const toast = useRef();

    const state = useSelector((state) => state.toast); // redux state

    useEffect(() => {
        if (type) showToast(type, title, message);
    });
    const showToast = (type, title, message) => {
        toast.current.show({ severity: type, summary: title, detail: message, life: 3000 });
    };
    return <Toast ref={toast} style={{ zIndex: 2000 }} />;
};

const mapState = (state) => {
    const { type, title, message } = state.toast;
    return { type, title, message };
};

export default connect(mapState, null)(ToastWrapper);

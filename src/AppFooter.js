import React from "react";

export const AppFooter = (props) => {
    return (
        <div className="layout-footer">
            {/* <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="Logo" height="20" className="mr-2" /> */}
            <img src={"assets/logo/cb-logo.svg"} alt="Logo" height="20" className="mr-2" />
            {/* <img src={"assets/logo/cb-logo.svg"} alt="logo" /> */}
            <small>
                by
                <span className="font-medium ml-1">Code Bridge</span>
            </small>
        </div>
    );
};

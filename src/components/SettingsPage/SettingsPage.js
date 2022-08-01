import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import EditSaveCancelComponent from "../common/EditSaveCancelComponent";

const SettingsPage = (props) => {
    const [nvm, setnvmVersion] = useState({ version: null });
    const [node, setnodeVersion] = useState({ version: null });
    const [feathersCli, setfeathersCliVersion] = useState({ version: null });

    const [nvmIsLoading, setnvmIsLoading] = useState(false);
    const [nodeIsLoading, setnodeIsLoading] = useState(false);
    const [feathersCliIsLoading, setfeathersCliIsLoading] = useState(false);

    const [isEditStudioRootPath, setisEditStudioRootPath] = useState(false);
    const [studioRootPath, setstudioRootPath] = useState("");

    const reduxUser = useSelector((reduxState) => reduxState.auth.user); // redux state
    useEffect(() => {
        setstudioRootPath(reduxUser.studioRootPath);
    }, [reduxUser]);

    const onCancelStudioRootPath = () => {
        setstudioRootPath(props.user.studioRootPath);
        setisEditStudioRootPath(false);
    };

    const onSaveStudioRootPath = () => {
        props.patchUserStudioRootPath(studioRootPath);
        setisEditStudioRootPath(false);
    };
    const checkNvm = async () => {
        setnvmIsLoading(true);
        await window.electronApp
            .getNvmVersion()
            .then((version) => {
                setnvmVersion({ isInstalled: true, version });
                //todo later patch user system.softwares
            })
            .catch((e) => setnvmVersion({ isInstalled: false, version: null }));
        setnvmIsLoading(false);
    };
    const checkNode = async () => {
        setnodeIsLoading(true);
        await window.electronApp
            .getNodeVersion()
            .then((version) => {
                setnodeVersion({ isInstalled: true, version });
                //todo later patch user system.softwares
            })
            .catch((e) => setnodeVersion({ isInstalled: false, version: null }));
        setnodeIsLoading(false);
    };
    const checkFeathersCli = async () => {
        setfeathersCliIsLoading(true);
        await window.electronApp
            .getFeathersCliVersion()
            .then((version) => {
                setfeathersCliVersion({ isInstalled: true, version });
                //todo later patch user system.softwares
            })
            .catch((e) => setfeathersCliVersion({ isInstalled: false, version: null }));
        setfeathersCliIsLoading(false);
    };
    const VersionCheckComponent = ({ label, version, isInstalled, buttonLabel, onClick, isLoading }) => (
        <div className="col-12 flex align-items-center justify-content-between">
            <div className="col-6 flex align-items-center ">
                <p className="m-0 mr-3 col-6">{label}</p>
                <p className="m-0 mr-3">{version || " - "}</p>
                <Tag
                    className={`mr-2 ${isInstalled === true ? "p-tag-success" : isInstalled === false ? "p-tag-danger" : "bg-gray-500"}`}
                    value={isInstalled === true ? "Installed" : isInstalled === false ? "Not installed" : "No info"}
                    icon={isInstalled === true ? "pi pi-check" : isInstalled === false ? "pi pi-exclamation-triangle" : ""}
                ></Tag>
            </div>
            <Button className="col-2 justify-self-end" icon={`pi ${isLoading ? "pi-spin pi-spinner" : ""}`} label={buttonLabel || "Check"} onClick={onClick} disabled={isLoading || isInstalled} />
        </div>
    );

    return (
        <div className="col-12 flex justify-content-center">
            <div className="col-8">
                <div className="col-12 card flex flex-column align-items-start mb-3">
                    <h5 className="m-0">Settings</h5>
                </div>

                <div className="col-12 card flex flex-column align-items-start mb-3">
                    <h5>System</h5>
                    <VersionCheckComponent label="NVM Version Manager" version={nvm.version} isInstalled={nvm.isInstalled} onClick={checkNvm} isLoading={nvmIsLoading} />
                    <VersionCheckComponent label="Node.JS" version={node.version} isInstalled={node.isInstalled} onClick={checkNode} isLoading={nodeIsLoading} />
                    <VersionCheckComponent label="Feathers CLI" version={feathersCli.version} isInstalled={feathersCli.isInstalled} onClick={checkFeathersCli} isLoading={feathersCliIsLoading} />
                </div>

                <div className="card flex flex-column align-items-start mb-3">
                    <h5>Studio</h5>

                    <div className="flex align-items-center">
                        <p className="m-0 mr-3" style={{ color: "grey" }}>
                            Path:
                        </p>
                        {isEditStudioRootPath ? (
                            <InputText value={studioRootPath} onChange={(e) => setstudioRootPath(e.target.value)} keyfilter={/[^\\]/i} />
                        ) : (
                            <p className="m-0" style={{ textDecoration: "underline" }}>
                                {props.user.studioRootPath}
                            </p>
                        )}
                    </div>

                    <div className="align-self-end">
                        <EditSaveCancelComponent isEdit={isEditStudioRootPath} onEdit={() => setisEditStudioRootPath(!isEditStudioRootPath)} onCancel={onCancelStudioRootPath} onSave={onSaveStudioRootPath} saveDisabled={studioRootPath === props.user.studioRootPath} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    patchUserStudioRootPath: (path) => dispatch.auth.patchUserStudioRootPath(path),
    patchUserSystemSoftwares: (data) => dispatch.auth.patchUserSystemSoftwares(data),
});

export default connect(mapState, mapDispatch)(SettingsPage);

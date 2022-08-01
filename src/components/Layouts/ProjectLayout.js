import React, { useState, useEffect, useRef } from "react";
import "./ProjectLayout.css";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { AppMenu } from "../../AppMenu";

import PrimeReact from "primereact/api";
import { BreadCrumb } from "primereact/breadcrumb";

const ProjectLayout = (props) => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);

    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };

    const menu = [
        // {
        //     label: "Home",
        //     items: [
        //         {
        //             label: "Projects",
        //             icon: "pi pi-fw pi-home",
        //             to: "/projects",
        //         },
        //     ],
        // },
        {
            label: "Project",
            items: [
                { label: "Home", icon: "pi pi-fw pi-home", to: "/project" },
                { label: "Databases", icon: "pi pi-fw pi-table", to: "/project/databases" },
                { label: "Schema", icon: "pi pi-fw pi-book", to: "/project/schema" },
                { label: "Backend", icon: "pi pi-fw pi-server", disabled: true, to: "/project/backend" },
                { label: "Frontend", icon: "pi pi-fw pi-desktop", disabled: true, to: "/project/frontend" },
                { label: "Mobile", icon: "pi pi-fw pi-mobile", disabled: true, to: "/" },
                { label: "CI/CD", icon: "pi pi-fw pi-caret-right", disabled: true, to: "/" },
                { label: "Hosting", icon: "pi pi-fw pi-cloud-upload", disabled: true, to: "/" },
                { label: "File Storage", icon: "pi pi-fw pi-folder", disabled: true, to: "/" },
                { label: "Email", icon: "pi pi-fw pi-at", disabled: true, to: "/" },
                { label: "Block Chain", icon: "pi pi-fw pi-sitemap", disabled: true, to: "/" },
                { label: "Big Data", icon: "pi pi-fw pi-sitemap", disabled: true, to: "/" },
                { label: "ML/DL", icon: "pi pi-fw pi-eye", disabled: true, to: "/" },
                { label: "Documentation", icon: "pi pi-fw pi-comment", disabled: true, to: "/" },
                { label: "Testing", icon: "pi pi-fw pi-search", disabled: true, to: "/" },
            ],
        },
        {
            label: "UI Components",
            icon: "pi pi-fw pi-sitemap",
            items: [
                { label: "Form Layout", icon: "pi pi-fw pi-id-card", to: "/formlayout" },
                { label: "Input", icon: "pi pi-fw pi-check-square", to: "/input" },
                { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
                { label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate" },
                { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button" },
                { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
                { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
                { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
                { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
                { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
                { label: "Message", icon: "pi pi-fw pi-comment", to: "/messages" },
                { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
                { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
                { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" },
            ],
        },
        {
            label: "UI Blocks",
            items: [{ label: "Free Blocks", icon: "pi pi-fw pi-eye", to: "/blocks", badge: "NEW" }],
        },
        {
            label: "Icons",
            items: [{ label: "PrimeIcons", icon: "pi pi-fw pi-prime", to: "/icons" }],
        },
    ];

    const breadcrumbHome = { icon: "pi pi-home", url: "/project" }; // todo change all breadcrumb items to custom with history.push instead of url(because url will refresh the page)
    // const breadcrumbItems = [{ label: "Computer" }, { label: "Notebook" }, { label: "Accessories" }, { label: "Backpacks" }, { label: "Item" }];

    const getBreadCrumbItems = () => {
        const currentPathSplit = location.pathname
            .replace("/project", "")
            .split("/")
            .filter((i) => i);
        // const currentPathSplit = ["data", "A", "b", "c", "d"]; //dummy
        let bread = [];
        for (let i = 0; i < currentPathSplit.length; i++) {
            let url = "/project";
            for (let j = 0; j <= i; j++) {
                url = url + "/" + currentPathSplit[j];
            }
            bread.push({ label: currentPathSplit[i], url });
        }
        // console.log("bread", bread);
        return bread;
    };

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    return (
        <div>
            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <div className="card card-w-title">
                        <BreadCrumb home={breadcrumbHome} model={getBreadCrumbItems()} className="mb-3" />
                        <div>
                            <h5 className="m-0">
                                <span style={{ color: "grey" }}>Project: </span>
                                {props.selectedProject?.projectName}
                            </h5>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    const { selectedProject } = state.project;
    return { selectedProject };
};
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(ProjectLayout);

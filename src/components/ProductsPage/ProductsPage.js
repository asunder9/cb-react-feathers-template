import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProductsDatatable from "./componet/datatable/ProductsDataTable";
import _ from "lodash";
const dummyData = [
    {
        name: "potato1",
        email: "potato1@fruit.com",
    },
    {
        name: "potato2",
        email: "potato2@fruit.com",
    },
    {
        name: "potato3",
        email: "potato3@fruit.com",
    },
];
const ProductsPage = (props) => {
    const history = useHistory();
    const [data, setData] = useState(dummyData);
    useEffect(() => {
        //on mount
        //axios api call
        // setlist(res.data)
    }, []);

    const onColumnChangeHandler = (index, subKey, newVal) => {
        let _newData = _.cloneDeep(data);
        _newData[index][subKey] = newVal;
        setData(_newData);
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <h5 className="mb-0 ml-2">ProductsPage</h5>
            </div>
            <div className="grid col-10">
                <div className="col-12 lg:col-6 xl:col-4">
                    <ProductsDatatable items={data} onColumnChange={onColumnChangeHandler} /*onRowDelete*/ />
                </div>
            </div>
            {/* save button */}
        </div>
    );
};
const mapState = (state) => ({});
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(ProductsPage);

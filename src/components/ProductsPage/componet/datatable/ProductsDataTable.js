import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import _ from "lodash";
// { fieldName: "field1", type: "Number", label: "Full name", display: true, component: "input", sortable };
// { fieldName: "field2", type: "Number", label: "Full name", display: true, component: "input", sortable, componentArgs:{prefix: '%'} };
const ProductsDataTable = ({ items, onColumnChange, onRowDelete }) => {
    const [_items, setItems] = useState(items);

    const setIsEditByIndex = (index, bool) => {
        let _newItems = _.cloneDeep(_items);
        _newItems[index].isEdit = bool;
        setItems(_newItems);
    };

    const text_productTemplate = (rowData, { rowIndex }) => <InputText onChange={(e) => onColumnChange(rowIndex, "name", e.target.value)} value={rowData.name} disabled={!rowData.isEdit} />;
    const email_productTemplate = (rowData, { rowIndex }) => <InputText onChange={(e) => onColumnChange(rowIndex, "email", e.target.value)} value={rowData.email} disabled={!rowData.isEdit} />;

    const edit_productTemplate = (rowData, { rowIndex }) => <Button onClick={() => setIsEditByIndex(rowIndex, !rowData.isEdit)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const delete_productTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    console.log("_items", _items);
    return (
        <DataTable value={_items}>
            <Column field="name" header="Full name" body={text_productTemplate} />
            <Column field="email" header="Email" body={email_productTemplate} />

            <Column header="Edit" body={edit_productTemplate} />
            <Column header="Delete" body={delete_productTemplate} />
        </DataTable>
    );
};

export default ProductsDataTable;

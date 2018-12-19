import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AgGridReact } from 'ag-grid-react';
import {LicenseManager} from 'ag-grid-enterprise';

// LicenseManager.setLicenseKey(
//     ''
// );
//
import 'ag-grid-enterprise';

class AgGridEnterpriseExample extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    field: 'name',
                    cellRenderer: 'agGroupCellRenderer'
                },
                { field: 'account' },
                { field: 'calls' },
                {
                    field: 'minutes',
                    valueFormatter: "x.toLocaleString() + 'm'"
                }
            ],
            detailCellRendererParams: {
                detailGridOptions: {
                    columnDefs: [
                        { field: 'callId' },
                        { field: 'direction' },
                        { field: 'number' },
                        {
                            field: 'duration',
                            valueFormatter: "x.toLocaleString() + 's'"
                        },
                        { field: 'switchCode' }
                    ],
                    onFirstDataRendered(params) {
                        params.api.sizeColumnsToFit();
                    }
                },
                getDetailRowData: function(params) {
                    params.successCallback(params.data.callRecords);
                }
            },
            onGridReady: function(params) {
                setTimeout(function() {
                    var rowCount = 0;
                    params.api.forEachNode(function(node) {
                        node.setExpanded(rowCount++ === 1);
                    });
                }, 500);
            },
            rowData: []
        };
    }
    gridApi: any;
    gridColumnApi: any;

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        const httpRequest = new XMLHttpRequest();
        const updateData = data => {
            this.setState({ rowData: data });
        };

        httpRequest.open(
            'GET',
            'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json'
        );
        httpRequest.send();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                updateData(JSON.parse(httpRequest.responseText));
            }
        };

        setTimeout(function() {
            var rowCount = 0;
            params.api.forEachNode(function(node) {
                node.setExpanded(rowCount++ === 1);
            });
        }, 500);
    }

    render() {
        return (
            <div
                style={{
                    height: '750px',
                    width: '750px',
                    margin: '0 auto',
                }}
                className="ag-theme-balham"
            >
                <AgGridReact
                        columnDefs={this.state.columnDefs}
                        masterDetail={true}
                        detailCellRendererParams={
                            this.state.detailCellRendererParams
                        }
                        onGridReady={this.onGridReady.bind(this)}
                        rowData={this.state.rowData}
                    />
            </div>
        );
    }
}

function render() {
    ReactDOM.render(
        <AgGridEnterpriseExample />,
        document.getElementById('grid-mount')
    )
}

render();
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "react", "react-dom", "ag-grid-react", "ag-grid-enterprise"], function (require, exports, React, ReactDOM, ag_grid_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    ReactDOM = __importStar(ReactDOM);
    var AgGridEnterpriseExample = /** @class */ (function (_super) {
        __extends(AgGridEnterpriseExample, _super);
        function AgGridEnterpriseExample(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
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
                        onFirstDataRendered: function (params) {
                            params.api.sizeColumnsToFit();
                        }
                    },
                    getDetailRowData: function (params) {
                        params.successCallback(params.data.callRecords);
                    }
                },
                onGridReady: function (params) {
                    setTimeout(function () {
                        var rowCount = 0;
                        params.api.forEachNode(function (node) {
                            node.setExpanded(rowCount++ === 1);
                        });
                    }, 500);
                },
                rowData: []
            };
            return _this;
        }
        AgGridEnterpriseExample.prototype.onGridReady = function (params) {
            var _this = this;
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
            var httpRequest = new XMLHttpRequest();
            var updateData = function (data) {
                _this.setState({ rowData: data });
            };
            httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json');
            httpRequest.send();
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                    updateData(JSON.parse(httpRequest.responseText));
                }
            };
            setTimeout(function () {
                var rowCount = 0;
                params.api.forEachNode(function (node) {
                    node.setExpanded(rowCount++ === 1);
                });
            }, 500);
        };
        AgGridEnterpriseExample.prototype.render = function () {
            return (React.createElement("div", { style: {
                    height: '750px',
                    width: '750px',
                    margin: '0 auto',
                }, className: "ag-theme-balham" },
                React.createElement(ag_grid_react_1.AgGridReact, { columnDefs: this.state.columnDefs, masterDetail: true, detailCellRendererParams: this.state.detailCellRendererParams, onGridReady: this.onGridReady.bind(this), rowData: this.state.rowData })));
        };
        return AgGridEnterpriseExample;
    }(React.Component));
    function render() {
        ReactDOM.render(React.createElement(AgGridEnterpriseExample, null), document.getElementById('grid-mount'));
    }
    render();
});

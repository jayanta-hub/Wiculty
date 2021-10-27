// Global Search.......................................................................



import React, { Fragment, Component } from "react";
import { properties } from "../properties/propertiesEN";
import { api } from '../api/api';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Pagination from "../pages/Pagination";
import history from '../history';
import ViewIncident from '../pages/TicketList/ViewIncident';
import ViewChange from '../pages/Change/ViewChange';
import ProblemView from '../pages/Problem/ProblemView';
import Overlay from "../pages/Overlay";
import DefaultMessages from '../pages/DefaultMessages';
import { closedCancelledStatusArr, closedCancelledStatusesWithNewProblem, changeClosedCancelledId } from "../properties/themeConfig";

class GlobalSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPending: true,
            isError: false,
            isSucess: false,
            searchResultData: [],
            incidentDataToView: [],
            showViewDataModel: false
        }
    }

    componentDidMount = () => {
        //fetch all groups
        let fetchAllGroupUrl = "user/fetchGroupListByEmailAndModule/" + localStorage.getItem('username') + "/" + localStorage.getItem('selectedModule');
        api.get(fetchAllGroupUrl).then(groupResult => {
                if (groupResult.data !== undefined) {
                    if (Object.keys(groupResult.data).length > 0) {
                        let grpsArray = [];
                        groupResult.data.map((eachGrp) => {
                            grpsArray.push(eachGrp.groupName);
                        });
                        this.fetchSearchResult(grpsArray.toString());
                    }
                } else {
                    this.setState({
                        isPending: false,
                        isError: true,
                        isSucess: true
                    });
                }
            })
            .catch(groupErrors => {
                this.setState({
                    isPending: false,
                    isError: true,
                    isSucess: true
                });
            });
    }

    fetchSearchResult = (grps) => {
        let globalSearchUrl = "GlobalSearch/search";
        if (localStorage.getItem('selectedModule') === 'IM') {
            globalSearchUrl = "GlobalSearch/search";
        } else if (localStorage.getItem('selectedModule') === 'PM') {
            globalSearchUrl = "GlobalSearch/problemsearch";
        } else if (localStorage.getItem('selectedModule') === 'CM') {
            globalSearchUrl = "GlobalSearch/changesearch";
        }
        let postData = {
                searchParam: this.props.searchText,
                assignmentGroup: grps,
                module: localStorage.getItem('selectedModule')
            }
            //     api.post(globalSearchU, postData).then(globalSearchResult => {
            //       if(globalSearchResult.data !== undefined){
            //         this.setState({
            //           searchResultData : globalSearchResult.data,
            //           isPending : false,
            //           isError : false,
            //           isSucess : true
            //         });
            //       } else {
            //         this.setState({
            //           isPending : false,
            //           isError : true,
            //           isSucess : true
            //         });
            //       }
            //     })
            //     .catch(globalSearchError => {
            //       this.setState({
            //         isPending : false,
            //         isError : true,
            //         isSucess : true
            //       });
            //     });
            //   }

        filterMethod = (filter, row, column) => {
            const id = filter.pivotId || filter.id
            return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase()) : true
        }

        handleButtonClick = cellInfo => {
            let urlToBeRedirected = '';
            if (localStorage.getItem('selectedModule') === 'IM') {
                urlToBeRedirected = `${process.env.PUBLIC_URL}/updateIncident/` + new Buffer(cellInfo['incidentID']).toString('base64');
            } else if (localStorage.getItem('selectedModule') === 'PM') {
                urlToBeRedirected = `${process.env.PUBLIC_URL}/updateProblem/` + new Buffer(cellInfo['problemID']).toString('base64');
            } else if (localStorage.getItem('selectedModule') === 'CM') {
                urlToBeRedirected = `${process.env.PUBLIC_URL}/updateChange/` + new Buffer(cellInfo['changeID']).toString('base64');
            }
            if (urlToBeRedirected !== '') {
                history.push(urlToBeRedirected);
                this.setState({ redirect: urlToBeRedirected }, () => {
                    this.props.closeGlobalSearchModel();
                    window.location.reload();
                });
            }

        }

        viewDetails = (cellData) => {
            this.setState({
                showViewDataModel: true,
                incidentDataToView: cellData,
            });
        }

        closeViewModel = () => {
            this.setState({
                showViewDataModel: false,
                incidentDataToView: ''
            });
        }

        render() {
            const NoDataConst = () => ( <
                div > < /div>
            );

            let limit = 0;
            if (
                this.state.searchResultData !== undefined &&
                this.state.searchResultData !== null &&
                this.state.searchResultData !== ''
            ) {
                limit = this.state.searchResultData.length;
            }

            const colDetails = [];
            if (
                (localStorage.getItem('selectedModule') === 'IM')
            ) {
                colDetails.push({
                    Header: `${properties.IncidentIdText}`,
                    accessor: "incidentID",
                    Cell: props => {
                        if (localStorage.getItem('imMenuConfig').includes('IM_Page_incidentupdate') === true) {
                            if (
                                props.original.assignTo === localStorage.getItem('username')
                            ) {
                                if (closedCancelledStatusArr.includes(props.original.status) === false) {
                                    return ( <
                                        button className = "ticketId delete"
                                        onClick = {
                                            () => {
                                                this.handleButtonClick(props.original);
                                            }
                                        }
                                        title = { properties.updateIncidentText } >
                                        { props.original.incidentID } <
                                        /button>
                                    )
                                } else {
                                    return ( <
                                        button className = "ticketId delete"
                                        title = { properties.updateIncidentText } >
                                        { props.original.incidentID } <
                                        /button>
                                    )
                                }
                            } else {
                                return ( <
                                    button className = "ticketId delete"
                                    title = { properties.updateIncidentText } >
                                    { props.original.incidentID } <
                                    /button>
                                )
                            }
                        } else {
                            return ( <
                                div style = {
                                    { textAlign: "left" } } >
                                <
                                span title = { props.original.incidentID } > { props.original.incidentID } < /span> <
                                /div>
                            )
                        }
                    }
                })
            }

            if (
                (localStorage.getItem('selectedModule') === 'PM')
            ) {
                colDetails.push({
                    Header: `${properties.ProblemIdText}`,
                    accessor: "problemID",
                    Cell: props => {
                        if (localStorage.getItem('pmMenuConfig') !== null && localStorage.getItem('pmMenuConfig').includes('PM_Page_problemupdate') === true) {
                            if (
                                props.original.assignTo === localStorage.getItem('username')
                            ) {
                                if (closedCancelledStatusesWithNewProblem.includes(props.original.status) === false) {
                                    return ( <
                                        button className = "ticketId delete"
                                        onClick = {
                                            () => {
                                                this.handleButtonClick(props.original);
                                            }
                                        }
                                        title = { properties.updateProblemText } >
                                        { props.original.problemID } <
                                        /button>
                                    )
                                } else {
                                    return ( <
                                        button className = "ticketId delete"
                                        title = { properties.updateProblemText } >
                                        { props.original.problemID } <
                                        /button>
                                    )
                                }
                            } else {
                                return ( <
                                    button className = "ticketId delete"
                                    title = { properties.updateProblemText } >
                                    { props.original.problemID } <
                                    /button>
                                )
                            }
                        } else {
                            return ( <
                                div style = {
                                    { textAlign: "left" } } >
                                <
                                span title = { props.original.problemID } > { props.original.problemID } < /span> <
                                /div>
                            )
                        }
                    }
                })
            }

            if (
                (localStorage.getItem('selectedModule') === 'CM')
            ) {
                colDetails.push({
                    Header: `${properties.changeManagement.changeId}`,
                    accessor: "changeID",
                    Cell: props => {
                        if (localStorage.getItem('cmMenuConfig').includes('CM_Update_Change') === true) {
                            if (
                                props.original.assignedTo === localStorage.getItem('username')
                            ) {
                                if (changeClosedCancelledId.includes(props.original.status) === false) {
                                    return ( <
                                        button className = "ticketId delete"
                                        onClick = {
                                            () => {
                                                this.handleButtonClick(props.original);
                                            }
                                        }
                                        title = { properties.updateChangeText } >
                                        { props.original.changeID } <
                                        /button>
                                    )
                                } else {
                                    return ( <
                                        button className = "ticketId delete"
                                        title = { properties.updateChangeText } >
                                        { props.original.changeID } <
                                        /button>
                                    )
                                }
                            } else {
                                return ( <
                                    button className = "ticketId delete"
                                    title = { properties.updateChangeText } >
                                    { props.original.changeID } <
                                    /button>
                                )
                            }
                        } else {
                            return ( <
                                div style = {
                                    { textAlign: "left" } } >
                                <
                                span title = { props.original.changeID } > { props.original.changeID } < /span> <
                                /div>
                            )
                        }
                    }
                })
            }

            if (
                (localStorage.getItem('selectedModule') === 'IM') ||
                (localStorage.getItem('selectedModule') === 'PM')
            ) {
                colDetails.push({
                    Header: `${properties.titleNameText}`,
                    accessor: "title",
                    Cell: props => < div style = {
                        { textAlign: "left" } } > < span title = { props.original.title } > { props.original.title } < /span></div >
                })
            }

            if (
                (localStorage.getItem('selectedModule') === 'CM')
            ) {
                colDetails.push({
                    Header: `${properties.changeManagement.selectChangeType}`,
                    accessor: "changeTypeDisplayValue",
                    Cell: props => < div style = {
                        { textAlign: "left" } } > < span title = { props.original.changeTypeDisplayValue } > { props.original.changeTypeDisplayValue } < /span></div >
                }, )
            }

            colDetails.push({
                Header: `${properties.statusText}`,
                accessor: "statusDisplayValue",
                Cell: props => < div style = {
                    { textAlign: "left" } } > < span title = { props.original.statusDisplayValue } > { props.original.statusDisplayValue } < /span></div >
            }, {
                Header: `${properties.assignmentGroupText}`,
                accessor: "assignmentGroup",
                Cell: props => < div style = {
                    { textAlign: "left" } } > < span title = { props.original.assignmentGroup } > { props.original.assignmentGroup } < /span></div >
            }, {
                Header: `${properties.assignmentToText}`,
                accessor: (localStorage.getItem('selectedModule') === 'CM') ? 'assignedTo' : 'fullName',
                Cell: props => < div style = {
                    { textAlign: "left" } } > < span title = {
                    ((localStorage.getItem('selectedModule') === 'CM')) ? props.original.assignedTofullName : props.original.fullName
                } > {
                    ((localStorage.getItem('selectedModule') === 'CM')) ? props.original.assignedTofullName : props.original.fullName
                } < /span></div >
            }, {
                Header: `${properties.priorityText}`,
                accessor: "priorityDisplayValue",
                Cell: props => < div style = {
                    { textAlign: "left" } } > < span title = { props.original.priorityDisplayValue } > { props.original.priorityDisplayValue } < /span></div >
            }, {
                Header: `${properties.actionText}`,
                accessor: "",
                filterable: false,
                sortable: false,
                Cell: props => {
                    return ( <
                        div >
                        <
                        a href onClick = {
                            () => {
                                this.viewDetails(props.original);
                            }
                        }
                        style = {
                            { color: "#337ab7", cursor: "pointer" } } >
                        <
                        span className = "glyphicon glyphicon-list-alt"
                        title = { properties.viewIncidentDetailText } > < /span> <
                        /a> <
                        /div>
                    )
                }
            });

            return ( <
                Fragment >
                <
                div className = "contianer" > {
                    (this.state.isSucess !== true) ?

                    <
                    div className = "col-md-12" >
                    <
                    DefaultMessages
                    isPending = { this.state.isPending }
                    apiError = { this.state.isError }
                    /> <
                    /div> :
                        <
                        div className = "col-md-12" > {
                            (localStorage.getItem('selectedModule') === 'IM') &&
                            <
                            Overlay
                            title = { properties.viewIncidentDetailText }
                            subTitle = { this.state.incidentDataToView['incidentID'] }
                            show = { this.state.showViewDataModel }
                            handleClose = { this.closeViewModel }
                            className = "completemodalFull" >
                            <
                            ViewIncident incidentData = { this.state.incidentDataToView }
                            /> <
                            /Overlay>
                        }

                    {
                        (localStorage.getItem('selectedModule') === 'PM') &&
                        <
                        Overlay
                        title = { properties.viewProblemDetailText }
                        subTitle = { this.state.incidentDataToView['problemID'] }
                        show = { this.state.showViewDataModel }
                        handleClose = { this.closeViewModel }
                        className = "completemodalFull" >
                            <
                            ProblemView problemData = { this.state.incidentDataToView }
                        /> <
                        /Overlay>
                    }

                    {
                        (localStorage.getItem('selectedModule') === 'CM') &&
                        <
                        Overlay
                        title = { properties.viewChangeDetailText }
                        subTitle = { this.state.incidentDataToView['changeID'] }
                        show = { this.state.showViewDataModel }
                        handleClose = { this.closeViewModel }
                        className = "completemodalFull" >
                            <
                            ViewChange details = { this.state.incidentDataToView }
                        /> <
                        /Overlay>
                    }

                    <
                    ReactTable
                    data = { this.state.searchResultData }
                    ref = {
                        (r) => this.reactTable = r }
                    PaginationComponent = { Pagination }
                    noDataText = { properties.reactTableNoDataText }
                    NoDataComponent = { NoDataConst }
                    minRows = { 0 }
                    columns = { colDetails }
                    defaultPageSize = { 10 }
                    resizable = { false }
                    pageSizeOptions = {
                        [10, 20, 40, 80, 100, limit] }
                    className = "-striped -highlight"
                    showPaginationBottom
                    ticketCount = { limit }
                    style = {
                        { backgroundColor: "#fafafa" } }
                    contentEditable
                    defaultFilterMethod = { this.filterMethod }
                    defaultSorted = {
                        [{
                            id: "incidentID",
                            desc: true
                        }]
                    }
                    /> <
                    /div>
                } <
                /div>

                <
                /Fragment> 
            )
        }
    }

    export default GlobalSearch;
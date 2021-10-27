// NavBar........................

import React, { Component, Fragment } from "react";
import { Header } from "./header";
import TemplateNavbar from "./nav";
import { Footer } from "./footer";
import {
  Navbar,
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import history from "../../history";
import { properties } from "../../properties/propertiesEN";
import {
  themeConst,
  userSessionTimeOutConfig,
  allowGlobalSerachModules,
} from "../../properties/themeConfig";
import { api } from "../../api";
import { ClearLocalStorage } from "../../jsons/ClearLocalStorage";
import ModuleNames from "../../pages/ModuleNames";
import Overlay from "../../pages/Overlay";
import DefaultMessages from "../../pages/DefaultMessages";
import InlineError from "../../pages/InlineError";
import AlertMessages from "../../pages/AlertMessages";
import GlobalSearch from "../../pages/GlobalSearch";
import ChangePassword from "../../pages/ChangePassword";
import { DropdownMenu, MenuItem } from "react-bootstrap-dropdown-menu";
import ModuleDropDown from "./ModuleDropDown";
import { Widget } from "rasa-webchat";

const Template = (WrappedComponent) => (props) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: {},
        hasGlobalSearchError: false,
        showGlobalSearchModel: false,
        confirmLogOut: false,
        showloader: true,
        hide: false,
        Nothide: "false",
        open: false,
        show: false,
        showLogWarning: false,
        options: themeConst,
        theme: "",
        hideTheme: false,
        globalSearchText: "",
        selectedModule: localStorage.getItem("selectedModule"),
        availableModules: localStorage.getItem("module"),
        isRedirected: localStorage.getItem("isRedirected"),
        showAlertModel: false,
        showCreateModel: false,
        hasError: false,
        isPending: true,
        isSucess: false,
        message: "",
        red: {
          color: "#71748d",
          textTransform: "capitalize !important",
          fontFamily: "normal normal normal 14px/1 FontAwesome",
          fontSize: "14px",
        },
        userFullName: {
          color: "#71748d",
          textTransform: "capitalize !important",
          fontFamily: "normal normal normal 14px/1 FontAwesome",
          fontSize: "14px",
          fontWeight: "bold",
          wordBreak: "break-all",
        },
        warningTime:
          localStorage.getItem("systemWarningTimeOutConfig") !== null &&
          localStorage.getItem("systemWarningTimeOutConfig") !== "undefined"
            ? 1000 * 60 * localStorage.getItem("systemWarningTimeOutConfig")
            : 1000 * 60 * userSessionTimeOutConfig[0].warningTime,
        signoutTime:
          localStorage.getItem("systemTimeOutConfig") !== null &&
          localStorage.getItem("systemTimeOutConfig") !== "undefined"
            ? 1000 * 60 * localStorage.getItem("systemTimeOutConfig")
            : 1000 * 60 * userSessionTimeOutConfig[0].signoutTime,
      };
      if (ClearLocalStorage.clearStorage() === true) {
        history.push("/login");
      }
      this.events = [
        "load",
        "mousemove",
        "mousedown",
        "click",
        "scroll",
        "keypress",
      ];

      this.warn = this.warn.bind(this);
      this.resetTimeout = this.resetTimeout.bind(this);

      for (var i in this.events) {
        window.addEventListener(this.events[i], this.resetTimeout);
      }

      this.setTimeout();

      const currentPage = this.props.location.pathname.split("/");
      if (
        currentPage[0] !== "updateIncident" &&
        localStorage.getItem("lockedIncidentId") !== null &&
        localStorage.getItem("lockedIncidentId") !== ""
      ) {
        this.unlockedIncident();
      }
    }

    unlockedIncident = () => {
      console.log(localStorage.getItem("lockedIncidentId"), "locking--un");
      let lockIncidentUrl =
        "incident/incidentmanagement/" +
        localStorage.getItem("lockedIncidentId");
      let lockIncidentBody = {
        lockedByUserId: "",
      };

      // api.patch(lockIncidentU, lockIncidentBody).then(lockIncidentResult => {
      //         if (lockIncidentResult.data !== undefined) {
      //             console.log(localStorage.getItem('lockedIncidentId'), 'locking--un');

      //             localStorage.setItem('lockedIncidentId', '');
      //         }
      //     })
      //     .catch(lockIncidentError => {});
    };

    closeAlertModel = () => {
      this.setState({
        showAlertModel: false,
      });
    };

    showChangePasswordPopUp = (e) => {
      this.setState({
        showCreateModel: true,
      });
    };

    closeAddModel = () => {
      this.setState({
        showCreateModel: false,
      });
    };

    closeGlobalSearchModel = () => {
      this.setState({
        showGlobalSearchModel: false,
      });
    };

    toggle() {
      this.setState({ hide: !this.state.hide });
    }

    logoff = () => {
      if (
        localStorage.getItem("lockedIncidentId") !== null &&
        localStorage.getItem("lockedIncidentId") !== ""
      ) {
        this.unlockedIncident();
      }

      this.setState(
        { open: false, authDone: false, isLoginSuccess: false },
        () => {
          window.location.href = `${process.env.PUBLIC_URL}/login`;
          let defaultLang = localStorage.getItem("defaultLang");
          localStorage.clear();
          localStorage.setItem("defaultLang", defaultLang);
          localStorage.setItem("selectedLang", defaultLang);
        }
      );
    };

    handleClose = () => {
      this.setState({ show: false });
    };

    handleCloseLogWaning = () => {
      this.setState({ showLogWarning: false });
    };

    handleShow = (e) => {
      e.preventDefault();
      this.setState({ show: true });
    };

    loadUpdateProfile = (e) => {
      if (this.props.location.pathname !== "/updateProfile") {
        history.push(`${process.env.PUBLIC_URL}/updateProfile`);
      }
    };

    onChange(e) {
      this.setState(
        {
          [e.target.name]: e.target.value,
        },
        () => {
          this.toggleTheme();
        }
      );

      const updateThemeUrl =
        "user/updateTheme/" +
        e.target.value +
        "/" +
        localStorage.getItem("username");

      // api.put(updateThemeU).then(updateThemeResult => {
      //     console.log(updateThemeResult);
      // });
      localStorage.setItem("theme", e.target.value);
    }

    toggleTheme = () => {
      this.setState({ hideTheme: !this.state.hideTheme });
    };

    updateSelectedModule = (selectedModuleName) => {
      this.setState(
        {
          selectedModule: selectedModuleName,
        },
        () => {
          localStorage.setItem("selectedModule", selectedModuleName);
          localStorage.setItem("isRedirected", false);
          this.refs.menuSection.updateMenu();
          this.forceUpdate();
        }
      );
    };

    changePassword = (userData) => {
      this.setState({ showAlertModel: true, showCreateModel: false });
      let postData = {
        email: userData["username"],
        password: userData["oldPassword"],
        newpass: userData["newPassword"],
      };
      let changePasswordUrl = "/user/resetUserPassword";

      // api.put(changePasswordU, postData).then(changePasswordResult => {
      //         if (
      //             changePasswordResult.data !== undefined &&
      //             changePasswordResult.data !== null &&
      //             changePasswordResult.data !== ''
      //         ) {
      //             if (changePasswordResult.data.status === 'success') {
      //                 this.setState({
      //                     isSucess: true,
      //                     isPending: false,
      //                     hasError: false,
      //                     message: properties.passwordChangeSucess
      //                 }, () => {
      //                     setTimeout(() => {
      //                         this.logoff();
      //                     }, 2000);
      //                 });
      //             } else {
      //                 this.setState({
      //                     isSucess: false,
      //                     isPending: false,
      //                     hasError: true,
      //                     message: ''
      //                 });
      //             }
      //         } else {
      //             this.setState({
      //                 isSucess: false,
      //                 isPending: false,
      //                 hasError: true,
      //                 message: ''
      //             });
      //         }
      //     })
      //     .catch(passwordUpdateError => {
      //         this.setState({
      //             isSucess: false,
      //             isPending: false,
      //             hasError: true,
      //             message: ''
      //         });
      //     });
    };

    onClickHandel = () => {};

    clearTimeoutFunc = () => {
      if (this.warnTimeout) clearTimeout(this.warnTimeout);

      if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
    };

    setTimeout = () => {
      if (
        localStorage.getItem("token") !== null &&
        localStorage.getItem("token") !== undefined &&
        localStorage.getItem("token") !== ""
      ) {
        this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
        this.logoutTimeout = setTimeout(this.logoff, this.state.signoutTime);
      }
    };

    resetTimeout = () => {
      this.clearTimeoutFunc();
      this.setTimeout();
    };

    warn = () => {
      this.setState({
        showLogWarning: true,
      });
    };

    handleChange = (event) => {
      this.setState({
        globalSearchText: event.target.value,
      });
    };

    searchGlobally = (event) => {
      event.preventDefault();
      const errors = this.validate({
        globalSearchText: this.state.globalSearchText.trim(),
      });
      this.setState(
        {
          errors: errors,
          hasGlobalSearchError: false,
        },
        () => {
          if (Object.keys(this.state.errors).length === 0) {
            this.setState({
              showGlobalSearchModel: true,
            });
          } else {
            this.setState({
              hasGlobalSearchError: true,
            });
          }
        }
      );
    };

    resetSearchGlobally = () => {
      this.setState({
        globalSearch: "",
        globalSearchText: "",
      });
    };

    validate = (data) => {
      const errors = {};
      if (data.globalSearchText === "") {
        errors.globalSearch = properties.globalSearchRequired;
      }

      return errors;
    };

    componentWillUnmount() {
      this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
      this.logoutTimeout = setTimeout(this.logoff, this.state.signoutTime);
    }

    componentDidMount() {
      if (
        localStorage.getItem("module") !== null &&
        localStorage.getItem("module") !== undefined &&
        localStorage.getItem("module") !== ""
      ) {
        let allModules = localStorage.getItem("module").split(",");
        if (allModules.includes("IM") === true) {
          if (
            localStorage.getItem("imMenuConfig") === null ||
            localStorage.getItem("imMenuConfig") === ""
          ) {
            let selectedRoles = localStorage.getItem("imRoles");
            this.getAccessControlPages("IM", selectedRoles);
          }
        }

        if (allModules.includes("PM") === true) {
          if (
            localStorage.getItem("pmMenuConfig") === null ||
            localStorage.getItem("pmMenuConfig") === ""
          ) {
            let selectedRoles = localStorage.getItem("pmRoles");
            this.getAccessControlPages("PM", selectedRoles);
          }
        }

        if (allModules.includes("CM") === true) {
          if (
            localStorage.getItem("cmMenuConfig") === null ||
            localStorage.getItem("cmMenuConfig") === ""
          ) {
            let selectedRoles = localStorage.getItem("cmRoles");
            this.getAccessControlPages("CM", selectedRoles);
          }
        }

        if (allModules.includes("KM") === true) {
          if (
            localStorage.getItem("kmMenuConfig") === null ||
            localStorage.getItem("kmMenuConfig") === ""
          ) {
            let selectedRoles = localStorage.getItem("kmRoles");
            this.getAccessControlPages("KM", selectedRoles);
          }
        }

        if (allModules.includes("UM") === true) {
          if (
            localStorage.getItem("umMenuConfig") === null ||
            localStorage.getItem("umMenuConfig") === ""
          ) {
            let selectedRoles = localStorage.getItem("umRoles");
            this.getAccessControlPages("UM", selectedRoles);
          }
        }

        if (allModules.includes("CFG_M") === true) {
          if (
            localStorage.getItem("ciMenuConfig") === null ||
            localStorage.getItem("ciMenuConfig") === ""
          ) {
            let selectedRoles = localStorage.getItem("ciRoles");
            this.getAccessControlPages("CFG_M", selectedRoles);
          }
        }
      }
    }

    getAccessControlPages(selectedModule, selectedRoles) {
      let menuConfigUrl =
        "user/getPageAccessbyRole/" + selectedModule + "/" + selectedRoles;

      // api.get(menuConfigU).then(menuResult => {
      //     let pageNames;
      //     let updatePages = [];
      //     menuResult.data.map((accessControlPages) => {
      //         updatePages.push(accessControlPages['pageName']);
      //     });

      //     if (updatePages.length > 0) {
      //         pageNames = [...new Set(updatePages)];
      //     }

      //     if (selectedModule === "IM") {
      //         localStorage.setItem('imMenuConfig', pageNames.toString());
      //     }
      //     if (selectedModule === "PM") {
      //         localStorage.setItem('pmMenuConfig', pageNames.toString());
      //     }
      //     if (selectedModule === "KM") {
      //         localStorage.setItem('kmMenuConfig', pageNames.toString());
      //     }
      //     if (selectedModule === "CM") {
      //         localStorage.setItem('cmMenuConfig', pageNames.toString());
      //     }

      //     if (selectedModule === "UM") {
      //         localStorage.setItem('umMenuConfig', pageNames.toString());
      //     }

      //     if (selectedModule === "CFG_M") {
      //         localStorage.setItem('ciMenuConfig', pageNames.toString());
      //     }
      // });
    }

    render() {
      let loggeduser = localStorage.getItem("username");
      if (localStorage.getItem("module") === null) {
        history.push(`${process.env.PUBLIC_URL}/login`);
      }
      return (
        <div>
          <div className="page-container" id={localStorage.getItem("theme")}>
            <Header />
            <Navbar.Header className="header">
              <Navbar.Brand className="header-logo">
                <div className="pull-left">
                  <span
                    className="bm-burger-button"
                    onClick={this.toggle.bind(this)}
                  >
                    <i className="fa fa-bars"> </i>
                  </span>
                  <a
                    onClick={this.onClickHandel.bind(this)}
                    className="logo-left"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/logo.png`}
                      alt="logo"
                      className="inner-logo"
                    />
                  </a>
                </div>

                <div className="col-md-6" style={{ marginLeft: "40px" }}>
                  <div className="col-md-4" style={{ textAlign: "right" }}>
                    {localStorage.getItem("module") !== null && (
                      <ModuleDropDown
                        updateSelectedModule={this.updateSelectedModule}
                        selectedModule={this.state.availableModules}
                      />
                    )}
                  </div>

                  <div className="col-md-2"></div>

                  <div className="col-md-6" style={{ textAlign: "center" }}>
                    {allowGlobalSerachModules.includes(
                      localStorage.getItem("selectedModule")
                    ) === true && (
                      <InputGroup className="globalSearchTextStyle">
                        <form onSubmit={this.searchGlobally.bind(this)}>
                          <FormControl
                            type="text"
                            placeholder={properties.SearchplaceHolderForglobal}
                            name="globalSearch"
                            id="globalSearch"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.globalSearchText}
                            className={
                              this.state.hasGlobalSearchError === true
                                ? "globalSearchError"
                                : ""
                            }
                          />
                          <div className="search-icon">
                            <i
                              className="glyphicon glyphicon-search"
                              onClick={this.searchGlobally.bind(this)}
                            />
                            <i
                              className="glyphicon glyphicon-remove"
                              onClick={this.resetSearchGlobally.bind(this)}
                            />
                          </div>
                        </form>
                      </InputGroup>
                    )}
                  </div>
                </div>

                <div className="pull-right">
                  <span className="brandname"> {properties.projectName} </span>
                  <ul className="right-data-menu">
                    <li>
                      <DropdownMenu
                        triggerType="icon"
                        trigger="glyphicon glyphicon-off"
                        position="left"
                      >
                        <span style={{ textAlign: "center" }}>
                          <MenuItem
                            text={localStorage.getItem("loggedInUserFullName")}
                            linkStyle={this.state.userFullName}
                          />
                        </span>

                        <MenuItem
                          text={properties.changePasswordText}
                          linkStyle={this.state.red}
                          onClick={this.showChangePasswordPopUp}
                        />

                        <hr className="dash" />
                        {/* <a onClick={this.loadUpdateProfile.bind(this)}> */}
                        <MenuItem
                          text={properties.updateProfileText}
                          linkStyle={this.state.red}
                          onClick={this.loadUpdateProfile.bind(this)}
                        />

                        <hr className="dash" />
                        {/* <a onClick={this.handleShow}> */}
                        <MenuItem
                          text={properties.logOutButtonText}
                          linkStyle={this.state.red}
                          onClick={this.handleShow}
                        />
                      </DropdownMenu>
                    </li>

                    {/* <li>
            											<i
            												className="fa fa-ellipsis-v theme-container"
            												aria-hidden="true"
            												onClick={this.toggleTheme.bind(this)}										
            											></i>
            											<div
            												className="theme-inner"
            												id={'hideTheme-' + this.state.hideTheme}
            											>
            												<select
            													value={localStorage.getItem('theme')}
            													name="theme"
            													onChange={this.onChange.bind(this)}
            													className="form-control theme"
            												>
            													{this.state.options.map(option => {
            														return <option value={option} key={option} >{option}</option>
            													})}
            												</select>
            											</div>
            										</li> */}
                  </ul>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Overlay
              show={this.state.showAlertModel}
              handleClose={this.closeAlertModel}
              className="alertData"
            >
              <AlertMessages
                isSucess={this.state.isSucess}
                isPending={this.state.isPending}
                apiError={this.state.hasError}
                message={this.state.message}
              />
            </Overlay>
            <Overlay
              title={properties.changePasswordText}
              show={this.state.showCreateModel}
              handleClose={this.closeAddModel}
            >
              <ChangePassword
                changeUserPassword={this.changePassword.bind(this)}
              />
            </Overlay>
            <Overlay
              title={
                localStorage.getItem("selectedModule") === "IM"
                  ? properties.globalSearchpopupText
                  : localStorage.getItem("selectedModule") === "PM"
                  ? properties.globalSearchpopupPMText
                  : localStorage.getItem("selectedModule") === "CM"
                  ? properties.globalSearchpopupCMText
                  : ""
              }
              show={this.state.showGlobalSearchModel}
              handleClose={this.closeGlobalSearchModel}
              className="completemodal"
            >
              <GlobalSearch
                searchText={this.state.globalSearchText}
                closeGlobalSearchModel={this.closeGlobalSearchModel}
              />
            </Overlay>
            <div className="dashboard-container">
              <Modal
                show={this.state.showLogWarning}
                onHide={this.handleCloseLogWaning}
                className="logoutBox"
                container={this}
                backdrop="static"
              >
                <Modal.Body>
                  <h3>
                    {" "}
                    {properties.loggedOutWarningMessage +
                      (localStorage.getItem("systemTimeOutConfig") -
                        localStorage.getItem("systemWarningTimeOutConfig")) +
                      properties.loggedOutWarningMessageNext}
                  </h3>
                </Modal.Body>
                <Modal.Footer className="logoutBox">
                  <Button
                    variant="secondary"
                    className="btn btn-primary"
                    onClick={this.handleCloseLogWaning}
                  >
                    {" "}
                    {properties.YesText}{" "}
                  </Button>
                  <Button
                    variant="primary"
                    className="btn btn-cancel"
                    onClick={this.logoff}
                  >
                    {" "}
                    {properties.NoText}{" "}
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={this.state.show}
                onHide={this.handleClose}
                className="logoutBox"
                container={this}
                backdrop="static"
              >
                <Modal.Body>
                  <h3> {properties.logOutConfirmationMessage}</h3>
                </Modal.Body>
                <Modal.Footer className="logoutBox">
                  <Button
                    variant="secondary"
                    className="btn btn-primary"
                    onClick={this.logoff}
                  >
                    {" "}
                    {properties.logOutButtonText}
                  </Button>
                  <Button
                    variant="primary"
                    className="btn btn-cancel"
                    onClick={this.handleClose}
                  >
                    {" "}
                    {properties.cancelButtonText}
                  </Button>
                </Modal.Footer>
              </Modal>

              {this.state.selectedModule !== "" ? (
                <div
                  className={"hide-" + this.state.hide}
                  id="style-5"
                  style={{ overflow: "auto", height: "90%", minHeight: "90%" }}
                >
                  <TemplateNavbar
                    selectedModule={this.state.selectedModule}
                    isRedirected={localStorage.getItem("isRedirected")}
                    ref={"menuSection"}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="right-sideBar" id={"hide-" + this.state.hide}>
                <div className="col-md-12">
                  <div className=" pull-right"></div>
                </div>{" "}
                {/* <ModuleNames
                									updateSelectedModule={this.updateSelectedModule}
                									selectedModule={this.state.availableModules}
                								/> */}{" "}
                <WrappedComponent {...this.props} />
              </div>
            </div>{" "}
            {localStorage.getItem("token") !== null &&
              localStorage.getItem("token") !== undefined &&
              localStorage.getItem("token") !== "" &&
              localStorage.getItem("enableWebChat") !== null &&
              localStorage.getItem("enableWebChat") !== "" &&
              localStorage.getItem("enableWebChat") !== undefined && (
                <Fragment>
                  {" "}
                  {localStorage.getItem("enableWebChat").toLowerCase() ===
                    "yes" && (
                    <Widget
                      initPayload={"/get_started"}
                      socketUrl={process.env.REACT_APP_CHATBOT_URL}
                      socketPath={"/socket.io/"}
                      customData={{
                        language: "en",
                        authid: localStorage.getItem("token"),
                      }}
                      title={properties.helpDeskTest}
                    />
                  )}
                </Fragment>
              )}
            <Footer />
          </div>
        </div>
      );
    }
  };
};
export { Template };

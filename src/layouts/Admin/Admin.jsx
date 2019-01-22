import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "../../custom_modules/AdminNavbar/AdminNavbar";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes,{subroute} from "routes.js";
import { PrivateRoute } from '../../modules/privateRoute';

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      sidebarMini: false,
      name:"wasif"
    };
  }

  componentDidMount() {

    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <PrivateRoute path={prop.layout + prop.path}
            component={prop.component}
            key={key} />
        );
      } else {
        return null;
        {/* <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          /> */}
      }
    });
  };
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
    } else {
      this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle("sidebar-mini");
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          subroute={subroute}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref="mainPanel">
          <AdminNavbar name={this.state.name} {...this.props} handleMiniClick={this.handleMiniClick} />
          <Switch>{this.getRoutes(routes)}</Switch>
          {// we don't want the Footer to be rendered on full screen maps page
            this.props.location.pathname.indexOf("full-screen-map") !==
              -1 ? null : (
                <Footer fluid />
              )}
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          sidebarMini={this.state.sidebarMini}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
          handleMiniClick={this.handleMiniClick}
        /> */}
      </div>
    );
  }
}

export default Admin;

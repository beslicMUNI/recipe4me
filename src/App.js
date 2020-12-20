import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";

// REdux imports
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles/";

// components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import axios from "axios";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
console.log(token);

if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    localStorage.clear(); //?
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <AuthRoute exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

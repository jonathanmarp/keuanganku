import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Import React
import React from "react";

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

class App extends React.Component<{}, { hasLogin: boolean, server: string }> {
  constructor(props: any) {
    super(props);

    // State
    this.state = {
      hasLogin: false,
      server: "http://keuangankubackend.000webhostapp.com/api/"
    };
  
    // Binding function login
    this.Login = this.Login.bind(this);
  }

  componentDidMount() {
    this.setState({
      hasLogin: localStorage.getItem("hasLogin") === "true" ? true : false
    })
  }

  Login(email: string, username: string, password: string) {
    // Setup response
    let response = {
      code: 200,
      description: ""
    };

    // setup url
    const urlTarget = `${this.state.server}user/login/${email}/${username}/${password}/`;

    // Fetch
    fetch(urlTarget).then(data => data.json()).then(data => {
      console.log(data);
    });

    // return response
    return response;
  }

  render(): any {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Login */}
            <Route exact path="/login" render={() => {
              return this.state.hasLogin ? <Main /> : <Login Login={this.Login} />;
            }}></Route>
            
            {/* Register */}
            <Route exact path="/register" render={() => {
              return this.state.hasLogin ? <Main /> : <Register />;
            }}></Route>
            
            {/* Main */}
            <Route exact path="/main" render={() => {
              return this.state.hasLogin ? <Main /> : <Login Login={this.Login} />;
            }}></Route>

            <Route exact path="/">
              <Redirect to="/main" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default App;

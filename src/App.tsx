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

// Make interface
interface TypeReturn {
  code: number,
  response: boolean,
  description: string,
  data: any
}

class App extends React.Component<{}, { hasLogin: boolean, server: string }> {
  constructor(props: any) {
    super(props);

    // State
    this.state = {
      hasLogin: false,
      server: "https://keuangankubackend.000webhostapp.com/api/"
    };
  
    // Binding function login
    this.Login = this.Login.bind(this);
  
    // Binding set has login
    this.setHasLogin = this.setHasLogin.bind(this);

    // Binding get access main
    this.getAccessMain = this.getAccessMain.bind(this);
  }

  setHasLogin(): void {
    // Set state
    this.setState({
      hasLogin: localStorage.getItem("hasLogin") === "true" ? true : false
    });
  }

  componentDidMount(): void {
    // Call set has login
    this.setHasLogin();
  }

  async Login(email: string, 
              username: string, 
              password: string) {
    // Setup response
    let response = {
      code: 200,
      description: ""
    };
    
    // fetch
    try {
      fetch(`${this.state.server}user/login/${email}/${username}/${password}`)
        .then(data => data.json())
        .then((data: TypeReturn) => {
          // Get element
          const element: HTMLElement = document.getElementById("alert_error_login")!;
          
          // If status not error
          if(data.code === 400) {
            // Show error alert
            element.style.display = "block";
          } else {
            // Hidden error alert
            element.style.display = "none";

            // If succes
            localStorage.setItem("hasLogin", "true"); // Set to true
            localStorage.setItem("email", data.data.email); // Set email
            localStorage.setItem("username", data.data.username); // Set username
            localStorage.setItem("key_user", String(data.data.key)); // Set key
            localStorage.setItem("create", data.data.create); // Set create

            // Call set has login
            this.setHasLogin();
          }
        });
    } catch(err) {
      console.log(err);
    }

    // return response
    return response;
  }

  getAccessMain(): boolean {
    return (this.state.hasLogin 
            && localStorage.getItem("email")    != null 
            && localStorage.getItem("username") != null
            && localStorage.getItem("key_user") != null
            && localStorage.getItem("create")   != null);
  }

  render(): any {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Login */}
            <Route exact path="/login" render={() => {
              return this.getAccessMain() ? <Main /> : <Login Login={this.Login} />;
            }}></Route>
            
            {/* Register */}
            <Route exact path="/register" render={() => {
              return this.getAccessMain() ? <Main /> : <Register />;
            }}></Route>
            
            {/* Main */}
            <Route exact path="/main" render={() => {
              return this.getAccessMain() ? <Main /> : <Login Login={this.Login} />;
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

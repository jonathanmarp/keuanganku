import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Import React
import React from "react";

// Import pages
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

// Import components
import Navbar from './components/Navbar';

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
      server: "https://keuangankubackend.000webhostapp.com/api/"
    };
  
    // Binding function login
    this.Login = this.Login.bind(this);

    // Binding function login
    this.Register = this.Register.bind(this);
  
    // Binding set has login
    this.setHasLogin = this.setHasLogin.bind(this);

    // Binding get access main
    this.getAccessMain = this.getAccessMain.bind(this);

    // Binding Log Out
    this.LogOut = this.LogOut.bind(this);
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

    // Get element
    const elementProgres: HTMLElement = document.getElementById("progess_form")!;
    
    // fetch
    try {
      fetch(`${this.state.server}user/login/${email}/${username}/${password}`)
        .then(data => data.json())
        .then((data: { code: number, response: boolean, description: string, data: any }) => {
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

          // Show element progress
          elementProgres.style.display = "none";
        });
    } catch(err) {
      // Hidden element progress
      elementProgres.style.display = "none";
    }

    // return response
    return response;
  }

  async Register(email: string, 
              username: string, 
              password: string) {
    // Setup response
    let response = {
      code: 200,
      description: ""
    };

    // Get element
    const elementProgres: HTMLElement = document.getElementById("progess_form")!;

    // fetch
    try {
      fetch(`${this.state.server}user/create/${email}/${username}/${password}`)
        .then(data => data.json())
        .then((data: { code: number, response: boolean, description: string }) => {
          // Get alert
          const alert: { alertParent: HTMLElement, alertMessage: HTMLElement } = {
            alertParent: document.getElementById("alert_error_register")!,
            alertMessage: document.getElementById("regsiter_error_message")!,
          }

          // If status not error
          if(data.code === 400) {
            // Set error and Show error alert
            if(data.response) alert.alertMessage.innerHTML = data.description;
            alert.alertParent.style.display = "block";
          } else {
            // Hidden error alert
            alert.alertParent.style.display = "none";
            
            try {
              fetch(`${this.state.server}user/login/${email}/${username}/${password}`)
                .then(data => data.json())
                .then((data: { code: number, response: boolean, description: string, data: any }) => {
                  // If status not error
                  if(data.code === 400) {
                    // Set message and Show error alert
                    alert.alertMessage.innerHTML = "Ada masalah pada tahap selanjutnya";
                    alert.alertParent.style.display = "block";
                  } else {
                    // Hidden error alert
                    alert.alertParent.style.display = "none";
        
                    // If succes
                    localStorage.setItem("hasLogin", "true"); // Set to true
                    localStorage.setItem("email", data.data.email); // Set email
                    localStorage.setItem("username", data.data.username); // Set username
                    localStorage.setItem("key_user", String(data.data.key)); // Set key
                    localStorage.setItem("create", data.data.create); // Set create
        
                    // Call set has login
                    this.setHasLogin();
                  }
        
                  // Show element progress
                  elementProgres.style.display = "none";
                });
            } catch(err) {
              // Hidden element progress
              elementProgres.style.display = "none";
            }
          }

          // Hidden element progress
          elementProgres.style.display = "none";
        });
    } catch(err) {
      // Hidden element progress
      elementProgres.style.display = "none";
    }

    // return response
    return response;
  }

  async LogOut() {
    // Remove item
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("key_user");
    localStorage.removeItem("create");

    // Set has login
    localStorage.setItem("hasLogin", "false");

    // Set on state
    this.setHasLogin();
  }

  /** @return {boolean} */
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
        {/* Navbar */}
        <Navbar 
          GetAccessMain={this.getAccessMain}
          LogOut={this.LogOut} />

        <IonReactRouter>
          <IonRouterOutlet>
            {/* Login */}
            <Route exact path="/login" render={() => {
              return this.getAccessMain() ? <Redirect to="/main" /> : <Login Login={this.Login} />;
            }}></Route>
            
            {/* Register */}
            <Route exact path="/register" render={() => {
              return this.getAccessMain() ? <Redirect to="/main" /> : <Register Register={this.Register} />;
            }}></Route>
            
            {/* Main */}
            <Route exact path="/main" render={() => {
              return this.getAccessMain() ? <Main server={this.state.server} /> : <Redirect to="/login" />;
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

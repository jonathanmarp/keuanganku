// Components Ionic
import { 
  IonContent, 
  IonPage,
  IonInput,
  IonItem,
  IonList,
  IonIcon,
  IonButton,
  IonBadge
} from '@ionic/react';

// Icons
import { 
  personAddOutline,
  keyOutline,
  mailOutline,
  personAddSharp,
  alertOutline
} from 'ionicons/icons';

// Components Pages
import Navbar from '../components/Navbar';

// Import React
import { useState } from 'react';

// Styles
import './Login.css';

const Login: React.FC<any> = (props: any) => {
  // setup for input
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // setup for access
  const [emailAccess, setEmailAccess] = useState(false);
  const [usernameAccess, setUsernameAccess] = useState(false);
  const [passwordAccess, setPasswordAccess] = useState(false);

  // For check email
  let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

  // return the result
  return (
    <IonPage>
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <IonContent fullscreen>
        <div className="flex items-center justify-center h-full w-full">
          <div className="px-6 py-2 w-full md:w-1/2 h-[80%]">
            <h1 className="text-2xl font-semibold py-4">Login</h1>

            <IonList className="rounded-lg">
              {/* Email */}
              <IonItem>
                {/* Icon */}
                <div className='px-2'>
                  <IonIcon icon={mailOutline}></IonIcon>
                </div>

                {/* Input */}
                <IonInput 
                  type="email" 
                  value={email} 
                  placeholder="Email"
                  onIonChange={(event) => setEmail(event.detail.value!)}
                  onIonBlur={() => {
                    // Get element
                    const element: HTMLElement = document.getElementById("input_email_alert")!;
                    
                    // Check if email is empty
                    if((email === "") || (!email.match(regexEmail))) {
                      // Set display to block
                      element.style.display = "block";

                      // Set access to false
                      setEmailAccess(false);
                    } else {
                      // Set display to hidden
                      element.style.display = "none";

                      // Set access to true
                      setEmailAccess(true);
                    }
                  }}></IonInput>

                {/* Alert */}
                <div id="input_email_alert" className="hidden">
                  <IonBadge color="danger">
                    <IonIcon icon={alertOutline}></IonIcon>
                  </IonBadge>
                </div>
              </IonItem>

              {/* Username */}
              <IonItem>
                {/* Icon */}
                <div className='px-2'>
                  <IonIcon icon={personAddOutline}></IonIcon>
                </div>
                
                {/* Input */}
                <IonInput 
                  type="text" 
                  value={username} 
                  placeholder="Username"
                  onIonChange={(event) => setUsername(event.detail.value!)}
                  onIonBlur={() => {
                    // Get element
                    const element: HTMLElement = document.getElementById("input_username_alert")!;
                    
                    // Check if email is empty
                    if(username === "") {
                      // Set display to block
                      element.style.display = "block";

                      // Set access to false
                      setUsernameAccess(false);
                    } else {
                      // Set display to hidden
                      element.style.display = "none";

                      // Set access to true
                      setUsernameAccess(true);
                    }
                  }}></IonInput>

                {/* Alert */}
                <div id="input_username_alert" className="hidden">
                  <IonBadge color="danger">
                    <IonIcon icon={alertOutline}></IonIcon>
                  </IonBadge>
                </div>
              </IonItem>

              {/* Password */}
              <IonItem>
                {/* Icon */}
                <div className='px-2'>
                  <IonIcon icon={keyOutline}></IonIcon>
                </div>

                {/* Input */}
                <IonInput 
                  type="password"
                  value={password}
                  placeholder="Password"
                  onIonChange={(event) => setPassword(event.detail.value!)}
                  onIonBlur={() => {
                    // Get element
                    const element: HTMLElement = document.getElementById("input_password_alert")!;
                    
                    // Check if email is empty
                    if(password === "") {
                      // Set display to block
                      element.style.display = "block";

                      // Set access to false
                      setPasswordAccess(false);
                    } else {
                      // Set display to hidden
                      element.style.display = "none";

                      // Set access to true
                      setPasswordAccess(true);
                    }
                  }}></IonInput>

                {/* Alert */}
                <div id="input_password_alert" className="hidden">
                  <IonBadge color="danger">
                    <IonIcon icon={alertOutline}></IonIcon>
                  </IonBadge>
                </div>
              </IonItem>
            </IonList>

            {/* Button Login */}
            <div className="mt-4 flex justify-between items-center">
              <IonButton color="light" expand="block" className="w-1/2" onClick={() => {
                // Check is safety
                if(emailAccess && usernameAccess && passwordAccess) {
                  if(props.Login(email, username, password)) {
                    
                  }
                }
              }}>
                Login
              </IonButton>

              <IonButton href='/register' color="medium" expand="block" className="w-1/2">
                <div className="flex">
                  <div className='px-2'>
                    <IonIcon icon={personAddSharp}></IonIcon>
                  </div>
                  <p>Register</p>
                </div>
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
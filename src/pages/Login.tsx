// Components Ionic
import { 
  IonContent, 
  IonPage,
  IonInput,
  IonItem,
  IonList,
  IonIcon,
  IonButton
} from '@ionic/react';

// Icons
import { 
  personAddOutline,
  keyOutline,
  mailOutline,
  personAddSharp
} from 'ionicons/icons';

// Components Pages
import Navbar from '../components/Navbar';

// Styles
import './Login.css';

const Login: React.FC = () => {
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
                  <div className='px-2'>
                    <IonIcon icon={mailOutline}></IonIcon>
                  </div>
                  <IonInput type="email" placeholder="Email"></IonInput>
              </IonItem>

              {/* Username */}
              <IonItem>
                  <div className='px-2'>
                    <IonIcon icon={personAddOutline}></IonIcon>
                  </div>
                  <IonInput type="text" placeholder="Username"></IonInput>
              </IonItem>

              {/* Password */}
              <IonItem>
                  <div className='px-2'>
                    <IonIcon icon={keyOutline}></IonIcon>
                  </div>
                  <IonInput type="password" placeholder="Password"></IonInput>
              </IonItem>
            </IonList>

            {/* Button Login */}
            <div className="mt-4 flex justify-between items-center">
              <IonButton color="light" expand="block" className="w-1/2">
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
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
import Navbar from '../components/navbar';

// Styles
import './Login.css';

const Register: React.FC = () => {
  return (
    <IonPage>
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <IonContent fullscreen>
        <div className="flex items-center justify-center h-full w-full">
          <div className="px-6 py-2 md:w-1/2 w-full h-[80%]">
            <h1 className="text-2xl font-semibold py-4">Regsiter</h1>

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

              {/* Re Password */}
              <IonItem>
                  <div className='px-2'>
                    <IonIcon icon={keyOutline}></IonIcon>
                  </div>
                  <IonInput type="password" placeholder="Re Password"></IonInput>
              </IonItem>
            </IonList>

            {/* Button Login */}
            <div className="mt-4 flex justify-between items-center">
              <IonButton color="light" expand="block" className="w-1/2">
                Register
              </IonButton>

              <IonButton href='/login' color="medium" expand="block" className="w-1/2">
                <div className="flex">
                  <div className='px-2'>
                    <IonIcon icon={personAddSharp}></IonIcon>
                  </div>
                  <p>Login</p>
                </div>
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
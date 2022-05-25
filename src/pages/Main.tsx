// Components Ionic
import {
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon
} from '@ionic/react';

// Icons
import {
    add
} from 'ionicons/icons';

// Components Pages
import Navbar from '../components/Navbar';

// Styles
import './Login.css';

const Main: React.FC = () => {
    return (
        <IonPage>
            {/* Navbar */}
            <Navbar />

            {/* Add Button */}
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="dark">
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
}

export default Main;
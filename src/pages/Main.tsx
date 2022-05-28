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

const Main: React.FC = () => {
    return (
        <IonPage>
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
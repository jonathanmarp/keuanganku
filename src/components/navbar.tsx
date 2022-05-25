import { 
    IonHeader,
    IonTitle, 
    IonToolbar
  } from '@ionic/react';

function Navbar() {
    return (
        <IonHeader className="ion-no-border">
            <IonToolbar color="white">
            <IonTitle>
                <div className="flex">
                <h1 className="text-2xl">Keuangan</h1>
                <h1 className="dark:text-gray-400 font-semibold text-2xl">ku</h1>
                </div>
            </IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}

export default Navbar;
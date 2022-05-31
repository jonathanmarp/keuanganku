// Components Ionic
import { 
    IonButton,
    IonHeader,
    IonMenuButton,
    IonTitle, 
    IonToolbar,
    IonMenu,
    IonContent,
    IonRouterOutlet,
    IonIcon,
    IonItem
  } from '@ionic/react';

// Icons
import {
    peopleOutline,
    logOutOutline,
    settingsOutline,
    listOutline,
    globeOutline
} from 'ionicons/icons';

// Styles
import "./Navbar.css"

function Navbar(props: { GetAccessMain: Function, LogOut: Function }) {
    return (
        <>
            {
                (props.GetAccessMain() === true) ? (
                    <>
                        {/* Menu */}
                        <IonMenu side="start" menuId="main-menu" contentId="main">
                            {/* Header */}
                            <IonHeader className="ion-no-border">
                                <IonToolbar color="dark">
                                    <IonTitle>Menu</IonTitle>
                                </IonToolbar>
                            </IonHeader>

                            {/* Content */}
                            <IonContent className="ion-no-border">
                                {/* Add */}
                                <div className="px-5 mt-6">
                                    {/* Title */}
                                    <div className="flex items-center text-lg border-b">
                                        <IonIcon icon={peopleOutline} />
                                        <h1 className="font-semibold px-2">User</h1>
                                    </div>

                                    {/* List */}
                                    <div className='mt-2'>
                                        {/* Settings */}
                                        <button className="button-menu p-2">
                                            <IonIcon icon={settingsOutline} />
                                            <h1 className="font-semibold px-2">Pengaturan</h1>
                                        </button>
                                        
                                        {/* Sign Out */}
                                        <button 
                                            className="button-menu p-2"
                                            onClick={() => props.LogOut()}>
                                            <IonIcon icon={logOutOutline} />
                                            <h1 className="font-semibold px-2">Keluar</h1>
                                        </button>
                                    </div>
                                </div>
                                
                                {/* More */}
                                <div className="px-5 mt-6">
                                    {/* Title */}
                                    <div className="flex items-center text-lg border-b">
                                        <IonIcon icon={listOutline} />
                                        <h1 className="font-semibold px-2">Yang Lain</h1>
                                    </div>

                                    {/* List */}
                                    <div className='mt-2'>
                                        {/* Main */}
                                        <IonButton fill="clear" href="/Main" className="button-menu p-2">
                                            <IonIcon icon={globeOutline} />
                                            <h1 className="font-semibold px-2">Main</h1>
                                        </IonButton>

                                        {/* History */}
                                        <IonButton fill="clear" href="/history" className="button-menu p-2">
                                            <IonIcon icon={globeOutline} />
                                            <h1 className="font-semibold px-2">History</h1>
                                        </IonButton>
                                    </div>
                                </div>
                            </IonContent>
                        </IonMenu>
                        <IonRouterOutlet id="main"></IonRouterOutlet>
                    </>
                ) : ""
            }
        
            <IonHeader className="ion-no-border">
                <IonToolbar color="white">
                    <IonTitle>
                        <div className="flex">
                            <h1 className="text-2xl">Keuangan</h1>
                            <h1 className="dark:text-gray-400 font-semibold text-2xl">ku</h1>
                        </div>
                    </IonTitle>

                    {
                        (props.GetAccessMain() === true) ? (
                            <IonItem lines="none" slot="end" className="p-2">
                                <IonButton color="dark" className="w-10 h-10">
                                    <IonMenuButton menu="main-menu"></IonMenuButton>
                                </IonButton>
                            </IonItem>
                        ) : ""
                    }
                </IonToolbar>
            </IonHeader>
        </>
    );
}

export default Navbar;
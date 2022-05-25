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
    walletOutline,
    cashOutline,
    albumsOutline,
    cardOutline,
    peopleOutline,
    logOutOutline
} from 'ionicons/icons';

// Styles
import "./Navbar.css"

function Navbar(props: any) {
    return (
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
                            {/* Keluar */}
                            <button className="button-menu p-2">
                                <IonIcon icon={logOutOutline} />
                                <h1 className="font-semibold px-2">Keluar</h1>
                            </button>
                        </div>
                    </div>

                    {/* Add */}
                    <div className="px-5 mt-6">
                        {/* Title */}
                        <div className="flex items-center text-lg border-b">
                            <IonIcon icon={walletOutline} />
                            <h1 className="font-semibold px-2">Tambah Keugangan</h1>
                        </div>

                        {/* List */}
                        <div className='mt-2'>
                            {/* Pemasukan */}
                            <button className="button-menu p-2">
                                <IonIcon icon={cashOutline} />
                                <h1 className="font-semibold px-2">Tambah Pemasukan</h1>
                            </button>

                            {/* Pengeluaran */}
                            <button className="button-menu p-2">
                                <IonIcon icon={albumsOutline} />
                                <h1 className="font-semibold px-2">Tambah Pengeluaran</h1>
                            </button>

                            {/* Utang */}
                            <button className="button-menu p-2">
                                <IonIcon icon={cardOutline} />
                                <h1 className="font-semibold px-2">Tambah Utang</h1>
                            </button>
                        </div>
                    </div>
                </IonContent>
            </IonMenu>
            <IonRouterOutlet id="main"></IonRouterOutlet>
        
            <IonHeader className="ion-no-border">
                <IonToolbar color="white">
                    <IonTitle>
                        <div className="flex">
                            <h1 className="text-2xl">Keuangan</h1>
                            <h1 className="dark:text-gray-400 font-semibold text-2xl">ku</h1>
                        </div>
                    </IonTitle>

                    <IonItem slot="end" className="p-2">
                        <IonButton color="dark" className="w-10 h-10">
                            <IonMenuButton menu="main-menu"></IonMenuButton>
                        </IonButton>
                    </IonItem>
                </IonToolbar>
            </IonHeader>
        </>
    );
}

export default Navbar;
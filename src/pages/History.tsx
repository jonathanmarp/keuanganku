// Import React
import React from 'react';

// Components Ionic
import {
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonProgressBar,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonModal,
    IonHeader,
    IonTitle,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonDatetime,
} from '@ionic/react';

// Import core from ionic
import { RefresherEventDetail } from '@ionic/core';

// Icons
import {
    add, 
    alertOutline,
    cashOutline, 
    closeOutline,
    ellipsisHorizontalCircleOutline
} from 'ionicons/icons';

// Import Style
import "./Main.css";

/** @interface */
interface PropsMainData {
    id: number,
    type: string,
    size: number
    create: Number,
    update: Number,
    paid: boolean,
    has_paid: number
}

/** @interface */
interface PropsMainDatas {
    data: Array<PropsMainData>
}

/** @interface */
interface PropsMain { 
    server: string,
    datas_money: Array<PropsMainData>,
    datas_debt: Array<PropsMainData>,
    formmatter: Intl.NumberFormat,
    income: number,
    expenditure: number,
    owe: number,
    owed: number,
    total: number,
    canModalOpen: boolean,
    canModalOpenMore: boolean,
    sizeInput: number,
    typeInput: string,
    dateModalMore: Date,
    idModalMore: number,
    sizeModalMore: number,
    typeModalMoreDebt: boolean,
    hasPaidModalMoreDebt: Date,
    paidModalMoreDebt: boolean,
}

class History extends React.Component<{ server: String}, PropsMain> {
    constructor(props: any) {
        super(props);

        this.state = {
            server: props.server,
            datas_money: [],
            datas_debt: [],
            formmatter: new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'IDR',
            }),
            income: 0,
            expenditure: 0,
            owe: 0,
            owed: 0,
            total: 0,
            canModalOpen: false,
            canModalOpenMore: false,
            sizeInput: 0,
            typeInput: "income",
            dateModalMore: new Date(),
            idModalMore: 0,
            sizeModalMore: 0,
            typeModalMoreDebt: false,
            hasPaidModalMoreDebt: new Date(),
            paidModalMoreDebt: false,
        };

        this.FetchMoney = this.FetchMoney.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.cancelAdd = this.cancelAdd.bind(this);
        this.cancelMore = this.cancelMore.bind(this);
    }

    // Fetch Data From Server
    FetchMoney() {
        const element: HTMLElement = document.getElementById("progess_fetch")!;
        element.style.display = "block";

        fetch(`${this.state.server}money/all/${localStorage.getItem("key_user")}`)
        .then(datas => datas.json())
        .then((datas_fetch: PropsMainDatas) => {
            this.setState({
                datas_money: datas_fetch.data
            });

            element.style.display = "none";
        });
    }

    // Fetch Debt From Server
    FetchDebt() {
        const element: HTMLElement = document.getElementById("progess_fetch")!;
        element.style.display = "block";

        fetch(`${this.state.server}debt/all/${localStorage.getItem("key_user")}`)
        .then(datas => datas.json())
        .then((datas_fetch: PropsMainDatas) => {
            this.setState({
                datas_debt: datas_fetch.data
            });

            element.style.display = "none";
        });
    }

    refreshData() {
        this.FetchMoney();
        this.FetchDebt();
    }

    componentDidMount() {
        this.refreshData();

        const InterVal: any = setInterval(() => {
            try {
                this.refreshData();
            } catch(err) { clearInterval(InterVal); }
        }, (60 * 1000));
    }

    refreshPage(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            this.refreshData();
            event.detail.complete();
          }, 2000);
    }

    componentDidUpdate(prevProps: any, oldDatas: PropsMain) {
        if(oldDatas.datas_money !== this.state.datas_money) {
            let income = 0;
            let exenditure = 0;

            this.state.datas_money.map((data: PropsMainData) => {
                switch(data.type) {
                    case "income":
                        income += data.size;
                        break;

                    case "expenditure":
                        exenditure += data.size;
                        break;
                }

                return 1;
            });

            this.setState({
                income: income,
                expenditure: exenditure
            });
        }

        if(oldDatas.datas_debt !== this.state.datas_debt) {
            let owe = 0;
            let owed = 0;

            this.state.datas_debt.map((data: PropsMainData) => {
                switch(data.type) {
                    case "owe":
                        owe += data.size;
                        break;

                    case "owed":
                        owed += data.size;
                        break;
                }

                return 1;
            });

            this.setState({
                owe: owe,
                owed: owed
            });
        }
    }

    getTotal(): number {
        const state = this.state;
        return state.income + state.expenditure + state.owe + state.owed;
    }

    cancelAdd(): void {
        this.setState({
            canModalOpen: false,
            canModalOpenMore: false,
            sizeInput: 0,
            typeInput: "income"
        });
    }

    cancelMore(): void {
        this.setState({
            canModalOpenMore: false
        });
    }

    render(): any {
        return (
            <IonPage className="p-2 overflow-y-auto">
                {/* Add Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton
                        color="dark"
                        onClick={() => this.setState({ canModalOpen: true })}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>

                {/* Refresher */}
                <IonContent className="absolute top-0">
                    <IonRefresher slot="fixed" onIonRefresh={this.refreshPage}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                </IonContent>

                {/* More */}
                <IonModal
                    isOpen={this.state.canModalOpenMore}>
                    {/* Progeress */}
                    <IonProgressBar 
                            type="indeterminate" 
                            color="dark"
                            id="progess_edit"
                            className="hidden"></IonProgressBar>

                    {/* Header */}
                    <IonHeader className="ion-no-border">
                        <div className="flex items-center justify-between p-2">
                            {/* Title */}
                            <IonTitle>Mengubah {this.state.typeModalMoreDebt ? "Utang" : "Keuangan"}</IonTitle>

                            {/* Close Button */}
                            <IonButton 
                                color={"dark"} 
                                fill="clear"
                                onClick={() => this.cancelMore()}>
                                <IonIcon icon={closeOutline} />
                            </IonButton>
                        </div>
                    </IonHeader>

                    <IonContent>
                        <IonList>
                            <IonLabel className="flex justify-center">Dibuat Tanggal</IonLabel>
                            <div className="w-full flex justify-center">
                                {((): any => {
                                    const date: Date = this.state.dateModalMore;
                                    const month: string = String(date.getMonth() + 1);
                                    const day: string = String(date.getDate());
                                    const hours: string = String(date.getHours());
                                    const minutes: string = String(date.getMinutes());
                                    let time: string = `${date.getFullYear()}-${month.length === 1 ? "0" : ""}${month}-${day.length === 1 ? "0" : ""}${day}T`;
                                    time += `${hours.length === 1 ? "0" : ""}${hours}:${minutes.length === 1 ? "0" : ""}${minutes}`;

                                    return <IonDatetime value={time} readonly></IonDatetime>;
                                })()}
                            </div>
                        </IonList>

                        <IonList className="mt-4">
                            <IonLabel className="flex justify-center">Edit {this.state.typeModalMoreDebt ? "Utang" : "Keuangan"}</IonLabel>

                            {/* Add Money */}
                            <IonItem className="flex justify-between items-center">
                                {/* Icon */}
                                <div className='px-2'>
                                    <IonIcon icon={cashOutline}></IonIcon>
                                </div>

                                {/* Input */}
                                <IonInput 
                                    type="number" 
                                    value={this.state.sizeModalMore} 
                                    placeholder="Besaran Uang yang Akan di Masukkan"
                                    min={0}
                                    onIonChange={(event) => this.setState({sizeModalMore: parseInt(event.detail.value!) })}
                                    onIonBlur={() => {
                                        // Get element
                                        const element: HTMLElement = document.getElementById("input_email_alert")!;
                                        
                                        // Check is NaN
                                        if(isNaN(this.state.sizeModalMore))
                                            this.setState({
                                                sizeModalMore: 1
                                            });

                                        // Check if email is empty
                                        if(this.state.sizeModalMore <= 0)
                                            element.style.display = "block";
                                        else
                                            element.style.display = "none";
                                    }}></IonInput>

                                {/* Alert */}
                                <div id="input_email_alert" className="hidden p-2">
                                    <IonBadge color="danger">
                                        <IonIcon icon={alertOutline}></IonIcon>
                                    </IonBadge>
                                </div>
                            </IonItem>
                        </IonList>

                        {
                            this.state.typeModalMoreDebt ? (
                                <div className="flex w-full">
                                    <IonButton 
                                        expand="block" 
                                        className="w-1/2" 
                                        color={this.state.paidModalMoreDebt ? "success" : "danger" }>
                                        Has Paid: {this.state.paidModalMoreDebt ? "true" : "false"}
                                    </IonButton>

                                    {
                                        this.state.paidModalMoreDebt ? "" : (
                                            <IonButton
                                                expand="block" 
                                                className="w-1/2" 
                                                color="warning" 
                                                onClick={() => {
                                                    const urlTarget = `${this.state.server}debt/paid/${localStorage.getItem("key_user")}/${this.state.idModalMore}`;

                                                    // Get element
                                                    const element: HTMLElement = document.getElementById("progess_edit")!;

                                                    // Show Progress
                                                    element.style.display = "block";

                                                    // Fetch
                                                    fetch(urlTarget).then(data => data.json()).then((response: {
                                                        code: number,
                                                        response: boolean,
                                                        description: string
                                                    }) => {
                                                        // Set display none
                                                        element.style.display = "none";

                                                        // Hidden
                                                        this.cancelAdd();

                                                        // Run refresh
                                                        this.refreshData();
                                                    });
                                                }}>
                                                Paid
                                            </IonButton>
                                        )
                                    }
                                </div>
                            ) : ""
                        }

                        <div className="flex w-full">
                            <IonButton 
                                expand="block" 
                                className="w-1/2" 
                                color="light"
                                onClick={() => {
                                    const urlTarget = `${this.state.server}${this.state.typeModalMoreDebt ? "debt" : "money"}/update/${localStorage.getItem("key_user")}/${this.state.idModalMore}/${this.state.sizeModalMore}`;

                                    // Get element
                                    const element: HTMLElement = document.getElementById("progess_edit")!;

                                    // Show Progress
                                    element.style.display = "block";

                                    // Fetch
                                    fetch(urlTarget).then(data => data.json()).then((response: {
                                        code: number,
                                        response: boolean,
                                        description: string
                                    }) => {
                                        // Set display none
                                        element.style.display = "none";

                                        // Hidden
                                        this.cancelAdd();

                                        // Run refresh
                                        this.refreshData();
                                    });
                                }}>
                                Edit
                            </IonButton>

                            <IonButton 
                                expand="block" 
                                className="w-1/2" 
                                color="medium"
                                onClick={() => {
                                    const urlTarget = `${this.state.server}${this.state.typeModalMoreDebt ? "debt" : "money"}/delete/${localStorage.getItem("key_user")}/${this.state.idModalMore}`;

                                    // Get element
                                    const element: HTMLElement = document.getElementById("progess_edit")!;

                                    // Show Progress
                                    element.style.display = "block";

                                    // Fetch
                                    fetch(urlTarget).then(data => data.json()).then((response: {
                                        code: number,
                                        response: boolean,
                                        description: string
                                    }) => {
                                        // Set display none
                                        element.style.display = "none";

                                        // Hidden
                                        this.cancelAdd();

                                        // Run refresh
                                        this.refreshData();
                                    });
                                }}>
                                Delete
                            </IonButton>
                        </div>
                    </IonContent>
                </IonModal>

                {/* Modal */}
                <IonModal 
                    isOpen={this.state.canModalOpen}
                    onDidDismiss={() => this.cancelAdd()}>
                    {/* Progeress */}
                    <IonProgressBar 
                        type="indeterminate" 
                        color="dark"
                        id="progess_form"
                        className="hidden"></IonProgressBar>
                    
                    {/* Header */}
                    <IonHeader className="ion-no-border">
                        <div className="flex items-center justify-between p-2">
                            {/* Title */}
                            <IonTitle>Menambah Keuangan</IonTitle>

                            {/* Close Button */}
                            <IonButton 
                                color={"dark"} 
                                fill="clear"
                                onClick={() => this.cancelAdd()}>
                                <IonIcon icon={closeOutline} />
                            </IonButton>
                        </div>
                    </IonHeader>

                    <IonContent>
                        <IonList>
                            {/* Add Money */}
                            <IonItem className="flex justify-between items-center">
                                {/* Icon */}
                                <div className='px-2'>
                                    <IonIcon icon={cashOutline}></IonIcon>
                                </div>

                                {/* Input */}
                                <IonInput 
                                    type="number" 
                                    value={this.state.sizeInput} 
                                    placeholder="Besaran Uang yang Akan di Masukkan"
                                    min={0}
                                    onIonChange={(event) => this.setState({sizeInput: parseInt(event.detail.value!) })}
                                    onIonBlur={() => {
                                        // Get element
                                        const element: HTMLElement = document.getElementById("input_email_alert")!;
                                        
                                        // Check is NaN
                                        if(isNaN(this.state.sizeInput))
                                            this.setState({
                                                sizeInput: 1
                                            });

                                        // Check if email is empty
                                        if(this.state.sizeInput <= 0)
                                            element.style.display = "block";
                                        else
                                            element.style.display = "none";
                                    }}></IonInput>

                                {/* Alert */}
                                <div id="input_email_alert" className="hidden p-2">
                                    <IonBadge color="danger">
                                        <IonIcon icon={alertOutline}></IonIcon>
                                    </IonBadge>
                                </div>
                            </IonItem>

                            {/* Jenis Keuangan */}
                            <IonItem>
                                <IonLabel>Jenis Keuangan</IonLabel>
                                <IonSelect 
                                    interface="popover"
                                    placeholder="Pilih Jenis Keuangan"
                                    value={this.state.typeInput}
                                    onIonChange={(event) => this.setState({typeInput: event.detail.value! })}>
                                    <IonSelectOption value="income">Pemasukan</IonSelectOption>
                                    <IonSelectOption value="expenditure">Pengeluaran</IonSelectOption>
                                    <IonSelectOption value="owe">Meng Hutang</IonSelectOption>
                                    <IonSelectOption value="owed">Di Hutang</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonList>

                        {/* Add Button */}
                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                            <IonFabButton
                                color="dark"
                                onClick={() => {
                                    // Get element
                                    const element: HTMLElement = document.getElementById("progess_form")!;

                                    // Show Progress
                                    element.style.display = "block";

                                    // Get data
                                    const inputSize: number = this.state.sizeInput;
                                    const inputType: string = this.state.typeInput;

                                    // Make Target
                                    let method: string = "money";
                                    let type: string = "income";

                                    // Check type
                                    switch(inputType) {
                                        case "expenditure":
                                            type = "expenditure";
                                            break;

                                        case "owe":
                                            method = "debt";
                                            type = "owe";
                                            break;
                                        
                                        case "owed":
                                            method = "debt";
                                            type = "owed";
                                            break;
                                    }

                                    // Make url
                                    let url: string = 
                                        `${this.state.server}${method}/create/${localStorage.getItem("key_user")}/${type}/${inputSize}`;

                                    // Fetch
                                    fetch(url).then(data => data.json()).then((response: {
                                        code: number,
                                        response: boolean,
                                        description: string
                                    }) => {
                                        // Set display none
                                        element.style.display = "none";

                                        // Hidden
                                        this.cancelAdd();

                                        // Run refresh
                                        this.refreshData();
                                    });
                                }}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                    </IonContent>
                </IonModal>

                {/* Content */}
                <div className="mt-16 relative">
                    {/* Progeress */}
                    <IonProgressBar 
                        type="indeterminate" 
                        color="dark"
                        id="progess_fetch"
                        className="hidden absolute"></IonProgressBar>

                        <div className="w-full h-full">
                            <IonItem>
                                <IonGrid className="text-xs md:text-base">
                                    {/* Header */}
                                    <IonRow>
                                        <IonCol size="1">
                                            <IonLabel>Id</IonLabel>
                                        </IonCol>
                                        <IonCol size="3">
                                            <p>Jenis Keuangan</p>
                                        </IonCol>
                                        <IonCol size="4">
                                            <p>Jumlah Uang</p>
                                        </IonCol>
                                        
                                        <IonCol size="2">
                                            <p>More</p>
                                        </IonCol>
                                    </IonRow>

                                    {/* Content  */}
                                    {
                                        this.state.datas_money.map((item: PropsMainData, id: number): any => {
                                            return (
                                                <IonRow key={id}>
                                                    <IonCol size="1">
                                                        <IonLabel>{item.id}</IonLabel>
                                                    </IonCol>

                                                    <IonCol size="3">
                                                        <p>{(item.type === "income") ? "Pemasukkan" : "Pengeluaran"}</p>
                                                    </IonCol>

                                                    <IonCol size="4">
                                                        <p>{this.state.formmatter.format(item.size)}</p>
                                                    </IonCol>

                                                    <IonCol size="2">
                                                        <IonButton
                                                            onClick={() => this.setState({ 
                                                                canModalOpenMore: true,
                                                                dateModalMore: new Date(Number(item.create)),
                                                                sizeModalMore: item.size,
                                                                idModalMore: item.id,
                                                                typeModalMoreDebt: false
                                                            })}>
                                                            <IonIcon icon={ellipsisHorizontalCircleOutline} />
                                                        </IonButton>
                                                    </IonCol>
                                                </IonRow>
                                            )
                                        })
                                    }
                                </IonGrid>
                            </IonItem>

                            <IonItem>
                                <IonGrid className="text-xs md:text-base">
                                    {/* Header */}
                                    <IonRow>
                                        <IonCol size="1">
                                            <IonLabel>Id</IonLabel>
                                        </IonCol>
                                        <IonCol size="3">
                                            <p>Jenis Utang</p>
                                        </IonCol>
                                        <IonCol size="4">
                                            <p>Jumlah Utang</p>
                                        </IonCol>
                                        
                                        <IonCol size="2">
                                            <p>More</p>
                                        </IonCol>
                                    </IonRow>

                                    {/* Content  */}
                                    {
                                        this.state.datas_debt.map((item: PropsMainData, id: number): any => {
                                            return (
                                                <IonRow key={id}>
                                                    <IonCol size="1">
                                                        <IonLabel>{item.id}</IonLabel>
                                                    </IonCol>

                                                    <IonCol size="3">
                                                        <p>{(item.type === "owe") ? "Meng Hutang" : "Di Hutang"}</p>
                                                    </IonCol>

                                                    <IonCol size="4">
                                                        <p>{this.state.formmatter.format(item.size)}</p>
                                                    </IonCol>

                                                    <IonCol size="2">
                                                        <IonButton
                                                            onClick={() => this.setState({ 
                                                                canModalOpenMore: true,
                                                                dateModalMore: new Date(Number(item.create)),
                                                                sizeModalMore: item.size,
                                                                idModalMore: item.id,
                                                                typeModalMoreDebt: true,
                                                                hasPaidModalMoreDebt: new Date(Number(item.has_paid)),
                                                                paidModalMoreDebt: item.paid,
                                                            })}>
                                                            <IonIcon icon={ellipsisHorizontalCircleOutline} />
                                                        </IonButton>
                                                    </IonCol>
                                                </IonRow>
                                            )
                                        })
                                    }
                                </IonGrid>
                            </IonItem>
                        </div>
                </div>
            </IonPage>
        );
    }
}

export default History;
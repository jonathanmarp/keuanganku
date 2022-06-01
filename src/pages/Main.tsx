// Import React
import React from 'react';

// Components Ionic
import {
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
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
} from '@ionic/react';

// Import core from ionic
import { RefresherEventDetail } from '@ionic/core';

// Icons
import {
    add, 
    alertOutline, 
    arrowDownOutline, 
    arrowUpOutline, 
    cardOutline, 
    cashOutline, 
    closeOutline, 
    peopleCircleOutline,
} from 'ionicons/icons';

// Import Style
import "./Main.css";

// Import Char.js
import {
    Chart as ChartJS,
    registerables
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

ChartJS.register (...registerables);

/** @interface */
interface PropsMainData {
    id: Number,
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
    sizeInput: number,
    typeInput: string
}

class Main extends React.Component<{ server: String}, PropsMain> {
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
            sizeInput: 0,
            typeInput: "income"
        };

        this.FetchMoney = this.FetchMoney.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.makeChartTop = this.makeChartTop.bind(this);
        this.makeList = this.makeList.bind(this);
        this.cancelAdd = this.cancelAdd.bind(this);
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
                if(parseInt(String(data.paid)) === 0) {
                    switch(data.type) {
                        case "owe":
                            owe += data.size;
                            break;
    
                        case "owed":
                            owed += data.size;
                            break;
                    }
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

    makeChartTop(props: {
        data: number,
        color: string,
        title: string,
        icon: string
    }): any {
        return (
            <IonCard className="main_card_statistic">
                <IonCardHeader>
                    <IonCardSubtitle>{props.title}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="flex items-center justify-between">
                    <div className="flex items-center">
                        <IonIcon icon={props.icon} />
                        <p className="px-2 text-sm">{this.state.formmatter.format(props.data)}</p>
                    </div>
                    
                    <div className="hidden md:block" style={{width: "40px", height: "40px"}}>
                        <Chart type={"doughnut"} data={{
                            labels: ["", ""],
                            datasets: [
                                {
                                    label: "",
                                    data: [props.data, this.getTotal()],
                                    backgroundColor: [props.color, "#191A19"],
                                }
                            ]
                        }} options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }} />
                    </div>
                </IonCardContent>
            </IonCard>
        );
    }

    makeList(props: {
        title: string,
        data: number
        makeCurrency: boolean
    }): any {
        let dataWillShow: any = props.data;

        if(props.makeCurrency)
            dataWillShow = this.state.formmatter.format(dataWillShow);
        else
            dataWillShow = Math.floor(props.data / this.getTotal() * 100);

        return (
            <IonItem>
                <IonLabel>{props.title}</IonLabel>
                <p>{dataWillShow}{props.makeCurrency ? "" : "%"}</p>
            </IonItem>
        );
    }

    cancelAdd(): void {
        this.setState({
            canModalOpen: false,
            sizeInput: 0,
            typeInput: "income"
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
                            {/* Email */}
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

                    {/* List Card */}
                    <div className="flex flex-wrap md:flex-nowrap md:justify-between">
                        {/* Income */}
                        <this.makeChartTop 
                            color={"green"} 
                            data={this.state.income} 
                            title="Pemasukan"
                            icon={arrowUpOutline} />

                        {/* Expenditure */}
                        <this.makeChartTop 
                            color={"#f1f1f1"} 
                            data={this.state.expenditure} 
                            title="Pengeluaran"
                            icon={arrowDownOutline} />

                        {/* Owe */}
                        <this.makeChartTop 
                            color={"yellow"} 
                            data={this.state.owe} 
                            title="Meng Hutang"
                            icon={cardOutline} />

                        {/* Owed */}
                        <this.makeChartTop 
                            color={"red"} 
                            data={this.state.owed} 
                            title="Di Hutang"
                            icon={peopleCircleOutline} />
                    </div>

                    {/* Total Money */}
                    <div className="w-full mt-2 p-2 md:flex md:justify-between">
                        <div className="w-full md:w-[49%] py-1">
                            <IonList>
                                <this.makeList makeCurrency={true} data={this.state.income} title="Pemasukan" />
                                <this.makeList makeCurrency={true} data={this.state.expenditure} title="Pengeluaran" />
                                <this.makeList makeCurrency={true} data={this.state.owe} title="Meng Hutan" />
                                <this.makeList makeCurrency={true} data={this.state.owed} title="Di Hutang" />
                                <this.makeList makeCurrency={true} data={this.state.income - 
                                    (this.state.expenditure + this.state.owe + this.state.owed)} title="Jumlah" />
                            </IonList>
                        </div>

                        <div className="w-full md:w-[49%] py-1">
                            <IonList>
                                <this.makeList makeCurrency={false} data={this.state.income} title="Pemasukan" />
                                <this.makeList makeCurrency={false} data={this.state.expenditure} title="Pengeluaran" />
                                <this.makeList makeCurrency={false} data={this.state.owe} title="Meng Hutan" />
                                <this.makeList makeCurrency={false} data={this.state.owed} title="Di Hutang" />
                                <this.makeList makeCurrency={false} data={this.state.income - 
                                    (this.state.expenditure + this.state.owe + this.state.owed)} title="Jumlah" />
                            </IonList>
                        </div>
                    </div>
                </div>
            </IonPage>
        );
    }
}

export default Main;
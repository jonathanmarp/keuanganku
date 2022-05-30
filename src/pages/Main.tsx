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
    IonContent
} from '@ionic/react';

// Import core from ionic
import { RefresherEventDetail } from '@ionic/core';

// Icons
import {
    add, 
    arrowDownOutline, 
    arrowUpOutline, 
    cardOutline, 
    peopleCircleOutline
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

interface PropsMainData {
    id: Number,
    type: String,
    size: number
    create: Number,
    update: Number,
}

interface PropsMainDatas {
    data: Array<PropsMainData>
}

interface PropsMain { 
    server: String,
    datas_money: Array<PropsMainData>,
    datas_debt: Array<PropsMainData>,
    income: number,
    expenditure: number,
    owe: number,
    owed: number,
    total: number
}

class Main extends React.Component<{ server: String}, PropsMain> {
    constructor(props: any) {
        super(props);

        this.state = {
            server: props.server,
            datas_money: [],
            datas_debt: [],
            income: 0,
            expenditure: 0,
            owe: 0,
            owed: 0,
            total: 0
        };

        this.FetchMoney = this.FetchMoney.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.refreshData = this.refreshData.bind(this);
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
    }

    refreshPage(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            this.refreshData();
            event.detail.complete();
          }, 2000);
    }

    componentDidUpdate(prevProps: any, prevState: PropsMain) {
        if(prevState.datas_money !== this.state.datas_money) {
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

        if(prevState.datas_debt !== this.state.datas_debt) {
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

    getTotal(): Number {
        const state = this.state;
        return state.income + state.expenditure + state.owe + state.owed;
    }

    render(): any {        
        return (
            <IonPage className="p-2">
                {/* Add Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton color="dark">
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>

                <IonContent className="absolute top-0">
                    <IonRefresher slot="fixed" onIonRefresh={this.refreshPage}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                </IonContent>

                {/* Content */}
                <div className="mt-16 relative">
                    {/* Progeress */}
                    <IonProgressBar 
                        type="indeterminate" 
                        color="dark"
                        id="progess_fetch"
                        className="hidden absolute"></IonProgressBar>

                    <div className="flex flex-wrap md:flex-nowrap md:justify-between">
                        <IonCard className="main_card_statistic">
                            <IonCardHeader>
                                <IonCardSubtitle>Pemasukan</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <IonIcon icon={arrowUpOutline} />
                                    <p className="px-2">Rp {this.state.income}</p>
                                </div>

                                <div style={{width: "40px", height: "40px"}}>
                                    <Chart type={"doughnut"} data={{
                                        labels: ["Pendapatan", "Total"],
                                        datasets: [
                                            {
                                                label: "",
                                                data: [this.state.income, this.getTotal()],
                                                backgroundColor: ["green", "black"],
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

                        <IonCard className="main_card_statistic">
                            <IonCardHeader>
                                <IonCardSubtitle>Pengeluaran</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <IonIcon icon={arrowDownOutline} />
                                    <p className="px-2">Rp {this.state.expenditure}</p>
                                </div>

                                <div style={{width: "40px", height: "40px"}}>
                                    <Chart type={"doughnut"} data={{
                                        labels: ["Pengeluaran", "Total"],
                                        datasets: [
                                            {
                                                label: "",
                                                data: [this.state.expenditure, this.getTotal()],
                                                backgroundColor: ["#f1f1f1", "black"],
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

                        <IonCard className="main_card_statistic">
                            <IonCardHeader>
                                <IonCardSubtitle>Meng Hutang</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <IonIcon icon={cardOutline} />
                                    <p className="px-2">Rp {this.state.owe}</p>
                                </div>

                                <div style={{width: "40px", height: "40px"}}>
                                    <Chart type={"doughnut"} data={{
                                        labels: [""],
                                        datasets: [
                                            {
                                                label: "",
                                                data: [this.state.owe, this.getTotal()],
                                                backgroundColor: ["yellow", "black"],
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

                        <IonCard className="main_card_statistic">
                            <IonCardHeader>
                                <IonCardSubtitle>Di Hutang</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <IonIcon icon={peopleCircleOutline} />
                                    <p className="px-2">Rp {this.state.owed}</p>
                                </div>

                                <div style={{width: "40px", height: "40px"}}>
                                    <Chart type={"doughnut"} data={{
                                        labels: [""],
                                        datasets: [
                                            {
                                                label: "",
                                                data: [this.state.owed, this.getTotal()],
                                                backgroundColor: ["red", "black"],
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
                    </div>
                </div>
            </IonPage>
        );
    }
}

export default Main;
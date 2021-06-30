import { Component } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryContainer, VictoryTooltip } from 'victory';
import { Container, Grid } from "@material-ui/core";
import { History } from "history";
import store from "../../../Redux/Store";
import { userLoggedOut } from "../../../Redux/UserState";
import VacationModel from "../../../Models/VacationModel";
import FollowModel from "../../../Models/FollowModel";
import jwtAxios from "../../../Services/jwtAxios";
import globals from "../../../Services/Globals"
import notify from "../../../Services/Notify";
import "./VacationsReport.css";

interface VacationListProps {
    history: History;
}

interface VacationReportState {
    vacations: VacationModel[];
    followersPerVacation: number[];
}
class VacationsReport extends Component<VacationListProps,VacationReportState> {
    public numOfFollows:number[] = [];
    public allData: object[] = [];
    public allVacations: VacationModel[] = [];
    public constructor(props:VacationListProps) {
        super(props);
        this.state = {vacations: [], followersPerVacation: []}
    }

    public async componentDidMount() {
        try {
            //getting all vacation
            const vacations = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl);
            for(let i = 0; i < vacations.data.length; i++) { //for each vacation getting it's follows
                const oneVacationFollows = await jwtAxios.get<FollowModel[]>(globals.followsUrl + vacations.data[i].vacationId);
                this.numOfFollows.push(oneVacationFollows.data.length); //get number of follows of one vacation
            }
            this.allVacations = vacations.data; 
            //setting followers per vacation in state:
            await this.setState({followersPerVacation: this.numOfFollows, vacations: vacations.data});
            for(let i = 0; i < this.state.vacations.length; i++) {
                //insert vacations data(vacation + number of followers) into chart axis.
                this.allData.push({quarter: i + 1, follows: this.state.followersPerVacation[i], label: this.state.followersPerVacation[i]});
            }
            await this.setState({});
        }
        catch(err) {
            if(err.response.data === "Your login session has expired."){
                store.dispatch(userLoggedOut());
                this.props.history.push('/login');
            }
            notify.error(err);
        }
    }
    
    public render(): JSX.Element {
        return (
            <div className="VacationsReport">
                <Container className="chartContainer" maxWidth="lg">
                    <h2>Follows Report</h2>
                    <Grid xs={12} sm={6} md={3} >
                        <VictoryChart domainPadding={100} height={500} width={1000} containerComponent={<VictoryContainer responsive={false} />}> 
                            <VictoryAxis
                                tickValues={[1,2,3,4,5]}
                                tickFormat={[...this.allVacations.map(v => v.destination)]} 
                                style={{
                                    axis: {
                                        stroke: 'black',
                                        strokeWidth: 2 
                                    },
                                    tickLabels: {
                                        fill: 'brown',
                                        fontSize: 18 //CHANGE COLOR OF X-AXIS LABELS
                                    } 
                                }}
                            />
                            <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x}`)}

                            style={{
                                axis: {
                                    stroke: 'black',
                                    strokeWidth: 2  //CHANGE COLOR OF X-AXIS
                                },
                                tickLabels: {
                                    fill: 'brown', //CHANGE COLOR OF X-AXIS LABELS
                                    fontSize: 18
                                }
                            }}
                            />
                            <VictoryBar labelComponent={<VictoryTooltip/> }
                            data={this.allData}
                            x={"quarter"}
                            y={"follows"}
                            style={{
                                data: {
                                    fill:'rgba(60, 58, 154, 0.26)',
                                    stroke: 'black',
                                    strokeWidth: 3,
                                    fontSize: 'large'
                                } 
                            }} />
                        </VictoryChart>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default VacationsReport;

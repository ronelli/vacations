import { Redirect, Route, Switch } from "react-router";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import Home from "../Home/Home";
import VacationsReport from "../../AdminArea/VacationsReport/VacationsReport";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
                <Route path="/register" component={Register} exact />
                <Route path="/vacations" component={VacationList} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/logout" component={Logout} exact />
                <Route path="/home" component={Home} exact />
                <Route path="/new/vacation" component={AddVacation} exact />
                <Route path="/vacations/edit/:id" component={EditVacation} exact />
                <Route path="/reports" component={VacationsReport} exact />
                <Redirect from="/" to="/home" exact />
            </Switch>
        </div>
    );
}

export default Routing;

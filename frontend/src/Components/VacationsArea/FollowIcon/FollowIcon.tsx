import { Component } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import jwtAxios from "../../../Services/jwtAxios";
import globals from "../../../Services/Globals";
import "./FollowIcon.css";

interface FollowIconState {
    isFollowed: boolean,
    vacationId: number
}
interface FollowIconProps {
    user: UserModel;
    vacation: VacationModel;
}
class FollowIcon extends Component<FollowIconProps, FollowIconState> {

    public constructor(props:FollowIconProps) {
        super(props);
        this.state = {isFollowed: false, vacationId: this.props.vacation.vacationId }
    }

    public async componentDidMount() {
        const followingStatus = await jwtAxios.get(`${globals.followsUrl}/${this.props.user.uuid}/${this.state.vacationId}`);
        if(followingStatus.data.length) {
            await this.setState({isFollowed: true});
        }
    }

    public markVacation = async() => {
        await this.setState({isFollowed: !this.state.isFollowed});
    }
    public render(): JSX.Element {
        return (
            <div className="FollowIcon" onClick={this.markVacation}>
				{this.state.isFollowed ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
            </div>
        );
    }
}

export default FollowIcon;

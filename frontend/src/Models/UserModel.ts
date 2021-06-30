class UserModel {
	public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password:string;
    public confirmPassword?: string;
    public token: string;
    public uuid: string;
    public isAdmin: number;
    public userText?: string;
}

export default UserModel;

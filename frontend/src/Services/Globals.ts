abstract class Globals {

}

class DevelopmentGlobals extends Globals {
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public authCaptchaUrl = "http://localhost:3001/api/auth/captcha/";
    public followsUrl = "http://localhost:3001/api/follows/";
    public imagesUrl = "http://localhost:3001/images/vacations";
    public rootUrl = "http://localhost:3001";
}

class ProductionGlobals extends Globals {
    public registerUrl = "https://ron-vacations.herokuapp.com/api/auth/register/";
    public loginUrl = "https://ron-vacations.herokuapp.com/api/auth/login/";
    public vacationsUrl = "https://ron-vacations.herokuapp.com/api/vacations/";
    public authCaptchaUrl = "https://ron-vacations.herokuapp.com/api/auth/captcha/";
    public followsUrl = "https://ron-vacations.herokuapp.com/api/follows/";
    public imagesUrl = "https://ron-vacations.herokuapp.com/images/vacations";
    public rootUrl = "https://ron-vacations.herokuapp.com";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();
export default globals;
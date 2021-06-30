import { Typography } from '@material-ui/core';
import SocialMedia from "../../FooterArea/SocialMedia/SocialMedia";
function Footer(): JSX.Element {
    return (
        <Typography variant="subtitle2" className="footer">
            Copyright © ron_elli - All rights reserved.
            <SocialMedia />
        </Typography>
    );
}

export default Footer;

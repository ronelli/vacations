import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import "./Home.css";

function Home(): JSX.Element {
    

    return (
        <div className="Home">
            <Container>
                <Grid container spacing={3} justify="center" alignItems="stretch" >
                    <Grid item xs={12} sm={6} md={3}  style={{display: 'flex'}}>
                        <Card className="infoBox">
                            <CardHeader className="titleBox" title={"About the project"}>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    <span>
                                        Registered users may follow available vacations in the site.
                                        The users will see changes in real time.
                                    </span><br /><br />
                                    <span>
                                        Administrators of the site can add, update and delete vacations.
                                        graphical report of numbers of vacation followers is available to administrators of the site.
                                    </span>
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} style={{display: 'flex'}} >
                        <Card className="infoBox">
                            <CardHeader className="titleBox" title={"Features:"}>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="body2" component="p">  
                                    <span>1. login && registration</span> <br /><br />
                                    <span>2. authentication and authorization</span> <br /><br />
                                    <span>3. Real-Time update using socket-io</span> <br /><br />
                                    <span>4. chart report</span>               
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} style={{display: 'flex'}} >
                        <Card className="infoBox">
                            <CardHeader className="titleBox" title={"Technologies"}>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    <span>React</span> <br />
                                    <span>Redux</span> <br />
                                    <span>REST API</span> <br />
                                    <span>NodeJS</span> <br />
                                    <span>Socket.io</span> <br />
                                    <span>Material-UI</span> <br />
                                    <span>VictoryCharts</span> <br />
                                    <span>CSS</span> <br />
                                    <span>MySQL</span> 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Home;

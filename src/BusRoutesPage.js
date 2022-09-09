import React, { useEffect } from "react"
import { Button, Card, Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import {API, Auth} from 'aws-amplify'
import {Nav,Tab,Tabs} from 'react-bootstrap';
import { useState } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useForm } from "react-hook-form";
import "./style.css";

function BusRoutesPage() {
    var [cta,setCTA] = useState(2);
    var [busID,setBusID] = useState(null);
    var [routeID,setRouteID] = useState(null);
    var [vehicleList,setVehicleList] = useState(null);
    var [searchedBus,setSearchedBus] = useState(null);
    var [noBusSearch,setNoBusSearch] = useState(true);

useEffect(() =>{
    async function fetchAPI(){
        var store = await (API.get('busAPI','/'))
        setCTA(store)
    }
    fetchAPI()
})

const elements = []
var routes = cta
if(cta){
    for(var i = 0; i < cta.length; i++){
        elements.push([routes[i].url,routes[i].vid,routes[i].name])
    }
}

const busCards = []
for (const [index, value] of elements.entries()) {
    //   items.push(<li key={index}>{value}</li>)
    var busRouteNumber = "/BusRoute/" + value[1]
    var source = "https://www.transitchicago.com" + value[0]
    busCards.push(
    <Card key = {value[1]}  style={{ width: '18rem' }}>
        <a href = {busRouteNumber} >
            <Card.Img href = {busRouteNumber} variant="top" src= {source} height="130"/>
        </a>   
        <Card.Body>
            <Card.Title>
            <Routes>
                <Route path="/BusRoute/:id" element={value[1]}/>
            </Routes>
                <a href = {busRouteNumber} >{value[1]} {value[2]}</a>   
            </Card.Title>
            <Card.Text>
            </Card.Text>
            {/* <a href = "/BusRoute" >Route</a> */}
        </Card.Body>
    </Card>)
}

return (
    <html>
        <div>
            <Container fluid >
                <h1 style={{paddingBottom:"2rem",paddingTop:"2rem"}}>
                    <u>Bus Routes</u>
                </h1>
                <Row style = {{justifyContent:"center"}} >
                    {busCards}
                </Row>
            </Container>
        </div>
    </html>
    )
  
}

export default BusRoutesPage
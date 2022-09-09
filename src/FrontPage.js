import React, { useEffect } from "react"
import { Button, Card, Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import {API, Auth} from 'aws-amplify'
import {Nav,Tab,Tabs} from 'react-bootstrap';
import { useState } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useForm } from "react-hook-form";

function FrontPage() {
    var [cta,setCTA] = useState(2);
    var [busID,setBusID] = useState(null);
    var [routeID,setRouteID] = useState(null);
    var [vehicleList,setVehicleList] = useState(null);
    var [searchedBus,setSearchedBus] = useState(null);
    var [noBusSearch,setNoBusSearch] = useState(true);

useEffect(() =>{
    // async function fetchAPI(){
    //     var store = await (API.get('busAPI','/'))
    //     setCTA(store)
    // }
    // fetchAPI()
})

const getBusAPI = async (event) =>{
    event.preventDefault()
    try{
        const store = await API.get('busAPI','/searchBus', {'queryStringParameters': 
        {'busID': busID,"routeID":routeID}})
        console.log(store[0]["Delay"])
        setNoBusSearch(false)
        setSearchedBus((((store[0]["NoDelay"])/(store[0]["Delay"]+store[0]["NoDelay"]))*100).toFixed(2))
        console.log(store)
    }catch(error){
        console.log(error)
    }
};

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
        <div  style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",paddingTop:"1rem",marginBottom:"1rem",
                      }}>
        <Card style={{border:"1px solid black"}}>
            {/* <div id = "busIDHeader" style={{display:"flex",borderBottom:"1px solid #aaaaaa", marginBottom:"1rem",marginLeft: "0px"}}>
                <button >Train</button>
            </div> */}
            <Tabs defaultActiveKey="first" style={{marginBottom:"1rem"}}>
                <Tab eventKey="first" title="Bus">
                    <img src={require("./bus1.png")}></img>
                    <div style={{padding:"1rem"}}>
                        <Card.Title>Bus ID Lookup</Card.Title>
                        <Card.Text>Discover how terribly late or amazingly on-time your bus is!</Card.Text>
                        <form onSubmit={getBusAPI}>
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Bus ID"
                                name="s" 
                                size = "15" 
                                onChange={(e) => setBusID(e.target.value) }
                            />
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Route ID"
                                name="s"
                                size = "15" 
                                onChange={(e) => setRouteID(e.target.value)}
                            />
                            
                            <button style={{marginBottom:"1rem"}} type="submit">Search</button>
                        </form>
                        {noBusSearch ? <div></div>: <div>On-Time Percentage is {searchedBus}% </div> }

                    </div>

                </Tab>
                <Tab eventKey="second" title="Train">
                    <div style={{padding:"1rem"}}>
                        <img src={require("./train2.png")}></img>
                        <Card.Title>Train ID Lookup</Card.Title>
                        <Card.Text>
                        Discover how terribly late or amazingly on-time your train is!
                        </Card.Text>
                        <form action="/" method="get">
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Train ID"
                                name="s" 
                            />
                            <button style={{marginBottom:"1rem"}} type="submit">Search</button>
                        </form>
                    </div>
                </Tab>
            </Tabs>
        </Card>

        </div>

    </html>
    )
  
}
export default FrontPage
//     const elements = ["1 Bronzeville/Union Station","2 Hyde Park Express",
//     "3 King Drive","4 Cottage Grove - OWL","N5 South Shore Night Bus - OWL",
//     "6 Jackson Park Express","7 Harrison","8 Halsted","8A South Halsted",
//     "9 Ashland - OWL","X9 Ashland Express","10 Museum of Science & Industry",
//     "11 Lincoln","12 Roosevelt","J14 Jeffery Jump","15 Jeffery Local",
//     "18 16th-18th","19 United Center Express","20 Madison - OWL","21 Cermak",
//     "22 Clark - OWL","24 Wentworth","26 South Shore Express","28 Stony Island",
//     "29 State","30 South Chicago","31 31st","34 South Michigan - OWL","35 31st/35th",
//     "36 Broadway","37 Sedgwick","39 Pershing","43 43rd","44 Wallace-Racine","47 47th",
//     "48 South Damen","49 Western - OWL","49B North Western","X49 Western Express",
//     "50 Damen","51 51st","52 Kedzie","52A South Kedzie","53 Pulaski - OWL","53A South Pulaski",
//     "54 Cicero","54A North Cicero/Skokie Blvd.","54B South Cicero","55 Garfield - OWL",
//     "55A 55th/Austin","55N 55th/Narragansett","56 Milwaukee","57 Laramie","59 59th/61st","60 Blue Island/26th - OWL",
//     "62 Archer - OWL","62H Archer/Harlem","63 63rd - OWL","63W West 63rd","65 Grand","66 Chicago - OWL",
//     "67 67th-69th-71st","68 Northwest Highway","70 Division","71 71st/South Shore","72 North","73 Armitage",
//     "74 Fullerton","75 74th-75th","76 Diversey","77 Belmont - OWL","78 Montrose","79 79th - OWL",
//     "80 Irving Park","81 Lawrence - OWL","81W West Lawrence","82 Kimball-Homan","84 Peterson",
//     "85 Central","85A North Central","86 Narragansett/Ridgeland","87 87th - OWL","88 Higgins",
//     "90 Harlem","91 Austin","92 Foster","93 California/Dodge","94 California","95 95th",
//     "96 Lunt","97 Skokie","X98 Avon Express","100 Jeffery Manor Express","103 West 103rd",
//     "106 East 103rd","108 Halsted/95th","111 111th/King Drive","111A Pullman Shuttle",
//     "112 Vincennes/111th","115 Pullman/115th","119 Michigan/119th","120 Ogilvie/Streeterville Express",
//     "121 Union/Streeterville Express","124 Navy Pier","125 Water Tower Express",
//     "126 Jackson","128 Soldier Field Express","130 Museum Campus","134 Stockton/LaSalle Express",
//     "135 Clarendon/LaSalle Express","136 Sheridan/LaSalle Express","143 Stockton/Michigan Express",
//     "146 Inner Lake Shore/Michigan Express","147 Outer DuSable Lake Shore Express",
//     "148 Clarendon/Michigan Express","151 Sheridan","152 Addison","155 Devon",
//     "156 LaSalle","157 Streeterville/Taylor","165 West 65th","169 69th-UPS Express",
//     "171 U. of Chicago/Hyde Park","172 U. of Chicago/Kenwood","192 U. of Chicago Hospitals Express",
//     "201 Central/Ridge","206 Evanston Circulator","Auto Auto Show Bus"
// ]
import React from "react"
import { Button, Card, Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import {API, Auth} from 'aws-amplify'

export default class FrontPage extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cta: null,
    };
}

async componentDidMount() {
    try{
        const data = await (API.get('busAPI','/'))
        console.log(data)
        this.setState({
            cta: data,
        });
    }
    catch{
        console.log("ERROR")
    }
}

// getDelay(){
//     fetch(
//         "http://localhost:3000/delay")
//         .then((res) => res.json())
//         .then((json) => {
//             console.log(json,33) // Print the google web page.
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// }

render() {

    const elements = []
    var routes = this.state.cta
    console.log(routes)
    if(this.state.cta){
        for(var i = 0; i < this.state.cta.length; i++){
            elements.push([routes[i].url,routes[i].vid,routes[i].name])
        }
    }
    
    const busCards = []
    for (const [index, value] of elements.entries()) {
        //   items.push(<li key={index}>{value}</li>)
        var busRouteNumber = "/BusRoute/" + value[1]
        var source = "https://www.transitchicago.com" + value[0]
        busCards.push(
        <Card key = {value[1]} ref={this.myRefElement} style={{ width: '18rem' }}>
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
    <Container id = "container" fluid >
        <Row id = "row" className="justify-content-md-center">
            {busCards}
        </Row>
    </Container>
    )
  }
}

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
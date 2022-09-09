import { useHistory, useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import "./style.css";
import { Prev } from 'react-bootstrap/esm/PageItem';
import {API, Auth} from 'aws-amplify'
import ReactLoading from "react-loading";
import "./style.css";

function BusRoute() {
  const{id} = useParams()
  var [vehicles, setVehicles] = useState([])
  var [isLoading, setIsLoading] = useState(true);
  var [totalNoDelay, setTotalNoDelay] = useState(0)
  var [totalDelay, setTotalDelay] = useState(0)
  var [busRouteEfficiency, setBusRouteEfficiency] = useState(0)
  var [MostLateBus, setMostLateBus] = useState(0)

  useEffect(() => {
      var storeDelay = 0
      var storeNoDelay = 0
      console.log(id)
      const data = API.get('busAPI','/BusRoute/{id}', {'queryStringParameters': {'id': id}})
      .then(response => {
        response.forEach(element => {
          storeDelay += element.Delay
          storeNoDelay += element.NoDelay
        });
          console.log(response[0])
          if(totalNoDelay == 0){ // Prevent errors when diviidng by zero
            setTotalNoDelay(1)
          }else if(totalDelay == 0){
            setTotalDelay(1)
          }
          setTotalNoDelay(storeNoDelay )
          setTotalDelay(storeDelay)
          setBusRouteEfficiency((storeDelay/storeNoDelay)*100)
          setVehicles(response)
          setIsLoading(false)
        }
      )
      .catch(error => console.log(error));
      const data2 = API.get('busAPI','/BusRoute/MostLate', {'queryStringParameters': {'id': id}})
      .then(response => {
          setMostLateBus(response[0])
      })
      .catch(error => console.log(error));

  },[]);


  busRouteEfficiency = (100-busRouteEfficiency).toFixed(1)
  var reverseBusRouteEfficiency = (100-busRouteEfficiency).toFixed(1)

  var mostLateBusEfficient = parseFloat(MostLateBus.Efficient).toFixed(1)
  var reverseMostLateBus = (100-mostLateBusEfficient).toFixed(1)
  return (
    <html>
      <div style={{width:"auto",padding:"2rem"}}>
        <div style = {{paddingTop:"1rem"}}>
        <h1>Bus Route {id} </h1>
        {isLoading ? 
          <div >
            <p style={{textAlign:"center"}}>Loading Content</p> 
            <div >
              <ReactLoading style={{margin:"auto",width:"30px"}}   type="spin" color="#0000FF"  />
            </div>
          </div>
          :
          <div >
            <ProgressBar >
              <ProgressBar animated variant="danger" now={reverseBusRouteEfficiency} label={`${reverseBusRouteEfficiency}%`}  />
              <ProgressBar animated variant="success" now={busRouteEfficiency} label={`${busRouteEfficiency}%`} />
            </ProgressBar>
            <Card style={{ width: '100%' ,margin:"auto",marginTop:"1rem",padding:"1rem",paddingBottom:"1rem"}}> 
              <Card.Title style={{fontSize:"30px"}}>Award for Most Late Bus</Card.Title>
                <h3>Bus ID:  {MostLateBus.vid}</h3>
                <ProgressBar>
                  <ProgressBar animated variant="danger" now={reverseMostLateBus} label={`${reverseMostLateBus}%`}  />
                  <ProgressBar animated variant="success" now={mostLateBusEfficient} label={`${mostLateBusEfficient}%`}  />
                </ProgressBar>
            </Card>   
          </div>
        }
        </div>

      </div>
    </html>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BusRoute />, rootElement);
export default BusRoute;


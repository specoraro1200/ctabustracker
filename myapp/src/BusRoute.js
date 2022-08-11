import { useHistory, useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import "./style.css";
import { Prev } from 'react-bootstrap/esm/PageItem';

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
      fetch(
      `http://localhost:3000/BusRoute/${id}` ,
      )
      .then(res => res.json())
      .then(response => {
        response.forEach(element => {
          storeDelay += element.Delay
          storeNoDelay += element.NoDelay
        });
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
      })
      .catch(error => console.log(error));

      fetch(
        `http://localhost:3000/BusRoute/MostLateBus/${id}` ,
        )
        .then(res => res.json())
        .then(response => {
            setMostLateBus(response[0])
        })
  },[]);


  busRouteEfficiency = (100-busRouteEfficiency).toFixed(1)
  var reverseBusRouteEfficiency = (100-busRouteEfficiency).toFixed(1)

  var mostLateBusEfficient = parseFloat(MostLateBus.Efficient).toFixed(1)
  var reverseMostLateBus = (100-mostLateBusEfficient).toFixed(1)
  return (
    <div id = "body">
      <Container style = {{paddingTop:"1rem"}}>

      <h1>Bus Route {id} Efficiency</h1>
      {isLoading ? <p>Loading Content</p> :
        <div class = "root">
          <ProgressBar >
            <ProgressBar animated variant="danger" now={reverseBusRouteEfficiency} label={`${reverseBusRouteEfficiency}%`}  />
            <ProgressBar animated variant="success" now={busRouteEfficiency} label={`${busRouteEfficiency}%`} />
          </ProgressBar>
          <Card style={{ width: '75%' ,margin:"auto",marginTop:"1rem",padding:"1rem",paddingBottom:"1rem"}}> 
            <Card.Title style={{fontSize:"30px"}}>Award for Most Late Bus</Card.Title>
              <h3>ID# {MostLateBus.vid}</h3>
              <ProgressBar>
                <ProgressBar animated variant="danger" now={mostLateBusEfficient} label={`${mostLateBusEfficient}%`}  />
                <ProgressBar animated variant="success" now={reverseMostLateBus} label={`${reverseMostLateBus}%`}  />
              </ProgressBar>
          </Card>   
        </div>
        }
      </Container>



      
      {/* {commitHistory.length !== 0 && (
        <button onClick={loadMoreCommit}>Load More Commits</button>
      )} */}

      {/* {commitHistory.map((c, index) => (
        <div key={index}>
          {c.commit && (
            <>
              <div>
                <h2 style={{ textDecoration: "Underline" }}>
                  {c.commit.committer.name}
                </h2>
                <p>{c.commit.message}</p>
              </div>
              <hr />
            </>
          )}
        </div>
      ))} */}
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BusRoute />, rootElement);
export default BusRoute;


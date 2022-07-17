import React from "react"
import { useHistory, useParams } from 'react-router-dom'

const BusRoute = () =>{
  const{id} = useParams()
  return <h1>{id}</h1>
}

export default BusRoute;


import './App.css';
import FrontPage from './FrontPage';
import Layout from './Layout';
import BusRoute from './BusRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom' 
import React from "react"
import { Route, Routes } from 'react-router-dom';
import "./style.css";
import {API, Auth} from 'aws-amplify'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />

class App extends React.Component {
  state = {
    name: ""
  }
  render() {

    return (
      <BrowserRouter id = "body">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Raleway:ital,wght@0,100;0,200;0,210;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        <div className="App">
          <Layout/>
          <Routes>
            <Route path="*" element={<FrontPage/>}/>
            <Route path="/BusRoute/:id" element={<BusRoute/>}/>
          </Routes>
          <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
          <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
          <script>var Alert = ReactBootstrap.Alert;</script>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

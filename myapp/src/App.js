import './App.css';
import FrontPage from './FrontPage';
import Layout from './Layout';
import BusRoute from './BusRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom' 
import React from "react"
import { Route, Routes } from 'react-router-dom';

class App extends React.Component {
  state = {
    name: ""
  }

  componentDidMount() {
    // fetch("http://localhost:3000")
    //   .then(res => res.json())
    //   .then(data => this.setState({ name: data.name }))
    // fetch("http://www.ctabustracker.com/bustime/api/v2/getpatterns?key=Ph2VjWCh3hRRKyqERyPYdYLjs&rt=20")
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout></Layout>
          <Routes>
            <Route path="/" element={<FrontPage/>}/>
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

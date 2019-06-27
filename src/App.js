import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/page/home/index';
import ParkirPage from './components/page/parkir/index';
import Wilayah from './components/page/api_wilayah/apiWilayah';
import Axios from 'axios';

export default class App extends React.Component {
  state = {
    token: '',
    urlApiWilayah: ''
  }
  
  componentDidMount() {
    // Axios adalah object, get adalah property yang di dalamnya adalah function (method).
    // lalu method get akan me-return yang namanya promise (then and catch);
    Axios.get('https://x.rajaapi.com/poe')
      .then((res) => {
        this.setState({ urlApiWilayah: 'https://x.rajaapi.com/MeP7c5ne' + res.data.token + '/m/wilayah' , token: res.data.token });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Header />
        <Route path='/' component={Home} exact />
        <Route path='/parkir' component={ParkirPage} exact />
        <Route 
          path='/wilayah'  
          render={(props) => <Wilayah {...props} urlApiWilayah={this.state.urlApiWilayah}/>}
          exact />
        <div className='border-top border-bottom py-3'>
          <p>Link Api RajaApi = {this.state.urlApiWilayah}</p>
          <p>Token API RajaApi untuk hari ini = {this.state.token}</p>
        </div>
      </div>
    );
  }
}

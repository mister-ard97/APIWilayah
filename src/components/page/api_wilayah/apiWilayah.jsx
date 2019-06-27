import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';
import Axios from 'axios';

class Wilayah extends React.Component {
    state = {
        provinsi: [],
        kabupaten: [],
        loadingKabupaten: true,
    }

    componentDidMount() {
        Axios.get(this.props.urlApiWilayah + '/provinsi')
            .then((res) => {
                this.setState({ provinsi: res.data.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onPrintProvinsi = () => {
        var provinsi = this.state.provinsi.map((val) => {
            return (
                <option value={val.id}>{val.name}</option>
            )
        });

        console.log(provinsi);

        return provinsi;
    }

    onChangeProvinsi = () => {
        this.setState({ idProv: this.refs.provinsi.refs.provinsiInner.value});
    }

    onPrintKabupaten = () => {
        if( this.state.loadingKabupaten === true) {
            return (
                <option>Loading ...</option>  
            )
        } else if(this.state.loadingKabupaten === false) {
            var kabupaten = this.state.kabupaten.map((val) => {
                return (
                    <option value={val.id}>{val.name}</option>
                )
            });
          
        }
        
        console.log(kabupaten);

        return kabupaten;
    }

    onChangeProvinsi = () => {
        this.setState({loadingKabupaten: true})
    }

    getKabupatenById = () => {
        var idProvinsi = this.refs.provinsi.refs.provinsiInner.value;
        if(idProvinsi !== 'Pilih Provinsi') {
            Axios.get(this.props.urlApiWilayah + '/kabupaten?idpropinsi=' + idProvinsi)
                .then((res) => {
                    this.setState({ kabupaten: res.data.data, loadingKabupaten: false });
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        if(this.state.provinsi.length === 0) {
            // Ketika this.state.provinsi.length sama dengan 0, 
            // maka akan me-return loading
            // kondisi ini tidak membutuhkan else karena return, jadi render akan me return api wilayah ketika loading selesai
            return (
                <div className='container mt-5 text-center'>
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        return (
            <div className='container mt-5' style={{ backgroundColor: '#8FBC8F' }}>
                <h1 className='text-center'>API Wilayah Indonesia</h1>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-6'>
                            <FormGroup>
                                <Label for="exampleSelect">Provinsi</Label>
                                <Input type="select" name="provinsi" id="exampleSelect" ref='provinsi' innerRef='provinsiInner' onChange={this.onChangeProvinsi}>
                                    <option>Pilih Provinsi</option>
                                    {this.onPrintProvinsi()}
                                </Input>
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <Label for="exampleSelect">Kabupaten</Label>
                                <Input type="select" name="kabupaten" id="exampleSelect" onClick={this.getKabupatenById}>
                                    <option>Pilih Kabupaten</option>
                                    {this.onPrintKabupaten()}
                                </Input>
                            </FormGroup>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Wilayah;
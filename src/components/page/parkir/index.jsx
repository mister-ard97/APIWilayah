import React from 'react';
// connect from react-redux
import { connect } from 'react-redux';
// import action from redux folder 
import {Bayar} from '../../../redux/action/countAction';

class ParkirPage extends React.Component {
    state = {
        jenis : '',
        process: false
    }
    pilihKendaraan = (e) => {
        this.setState({jenis: e.target.value});
    }

    bayarParkir = () => {
        var jenis = this.state.jenis;
        var jam = document.getElementsByName('lamaParkir')[0].value;
        var biaya = 0;
        var array = [];
        if(jam < 0 && jam !== '') {
            if(jam < 0) {
                document.getElementsByTagName('p')[1].innerHTML = 'Jam jangan di bawah 0 (nol)';
            } 
        } else if(jam >= 0 && jam !== '') {
            if(jenis === 'Mobil' && jam >= 0) {
                if (jam >= 0 && jam <= 0) {
                    biaya = 2000;
                } else {
                    biaya = 2000 * jam;
                }
                this.setState({ process: true });
            } else if(jenis === 'Motor' && jam >= 0){
                if (jam >= 0 && jam <= 0) {
                    biaya = 1000;
                } else {
                    biaya = 1000 * jam;
                }
                this.setState({ process: true });
            } else {
                document.getElementsByTagName('p')[1].innerHTML = 'Pilih Jenis Kendaraan untuk menghitung hasilnya';
            }
        } else {
            document.getElementsByTagName('p')[1].innerHTML = 'Input Jam Harus Diisi dulu';
        }

        array.push(jenis, jam, biaya);
        this.props.Bayar(array);
    }

    printParkir = (condition, jam) => {
       if(condition && jam >= 0) {
           document.getElementsByTagName('p')[1].innerHTML = '';
           return (
               <div className='border-top border-bottom border-dark'>
                   <p className='mt-2'>Hasil Biaya Parkir</p>
                   <p>Kendaraan: <span>{this.props.jenis}</span></p>
                   <p>Lama Parkir: <span>{this.props.jam} Jam</span></p>
                   <p>Biaya: Rp. <span>{this.props.biaya}</span></p>
               </div>
           )
       }
    }

    render() {
        return (
            <div className='container-fluid text-center mt-5'>
                <h1 className='mb-5'>Aplikasi Hitung Parkir</h1>
                <input type='button' name='Mobil' className='btn btn-primary' value='Mobil' onClick={this.pilihKendaraan}/>
                <input type='button' name='Motor' className='ml-3 btn btn-primary' value='Motor' onClick={this.pilihKendaraan}/>
                <p className='mt-3'>{this.state.jenis}</p>
                <input type="number" name='lamaParkir' className='mb-3'/><span> Jam </span>
                <p></p>
                <input type='button' className='mt-5 btn btn-success' onClick={this.bayarParkir} value='Lihat Harga Parkir'/>
                <p className='text-weight-bold'></p>
                <div>
                    {this.printParkir(this.state.process, this.props.jam)}
                </div>
                <div className='font-weight-bold'>
                    <p className='mt-3'>Catatan Biaya Parkir</p>
                    <p>Jenis Kendaraan = Mobil : Rp. 2000/Jam</p>
                    <p>Jenis Kendaraan = Motor : Rp. 1000/Jam</p>
                    <p>Jika parkir selama 0 Jam, maka dihitung 1 Jam parkir.</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        jenis: state.hasil.jenis,
        jam: state.hasil.jam,
        biaya: state.hasil.biaya
    }
}

export default connect(mapStateToProps, {Bayar})(ParkirPage)

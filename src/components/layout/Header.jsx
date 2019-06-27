import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onPrintLogParkir = () => {
        var jenis = this.props.jenis;
        var jam = this.props.jam;
        var biaya = this.props.biaya
        if(jam >= 0 && jenis !== '' && biaya > 0) {
            return (
                <div className='mt-2 text-success border-bottom border-success'>
                    <span>Jenis Kendaraan: {this.props.jenis}</span> {' | '}
                    <span>Lama Parkir: {this.props.jam} Jam</span> {' | '}
                    <span>Biaya: Rp. {this.props.biaya}</span>
                </div>
            )
        } else {
            return (
                <div className='mt-2'>
                    <span>Jenis Kendaraan: </span> {' | '}
                    <span>Lama Parkir: 0 Jam</span> {' | '}
                    <span>Biaya: Rp. 0</span>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link to='/'>
                        <NavbarBrand>Aplikasi Parkir</NavbarBrand>
                    </Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <div className='mt-2 mr-2'>
                                <span className='text-muted'>Terakhir Lihat Harga Parkir: </span>
                            </div>
                            {this.onPrintLogParkir()}
                            <NavItem>
                                <Link to='/parkir'>
                                    <NavLink className=' ml-3 btn btn-primary'>Parkir</NavLink> 
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/wilayah'>
                                    <NavLink className=' ml-3 btn btn-info'>Api Wilayah</NavLink>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

// untuk dapat menggunakan state global
const mapStateToProps = (state) => {
    return {
        jenis: state.hasil.jenis,
        jam: state.hasil.jam,
        biaya: state.hasil.biaya
    }
}

//lalu mapStateToProps kita connect menggunakan import connect dari react-redux, lalu di export
export default connect(mapStateToProps)(Header)

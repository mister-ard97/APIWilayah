import React from 'react';
import { Jumbotron } from 'reactstrap';

const Home = (props) => {
    return (
        <div className='mt-3'>
            <Jumbotron className='bg-dark text-white'>
                <h1 className="display-3">Selamat Datang</h1>
                <p className="lead">Ini halaman Home pada Aplikasi Parkir</p>
                <hr className="my-2" />
                <p>Untuk menggunakan aplikasi parkir, pilih menu Parkir pada Navbar</p>
                <p className='blockquote-footer text-center'>Muhammad Reza Ardiansyah</p>
            </Jumbotron>
        </div>
    );
};

export default Home;
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Myclass extends Component {

       myclick(){

        alert("cliss click")
       }
              
    render() {
        return (
            <div className='container'>
                       <h1 className='bg primary-text-white text-center'>My email is : {this.props.email}</h1>
                <button
                    onClick={this.myclick}> click me
        </button>
        <button className='btn btn-success' onClick={this.props.myclick}>click me</button>
            </div>

        );
    }

}

export default Myclass
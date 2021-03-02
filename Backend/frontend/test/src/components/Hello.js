import React from 'react';
import Myclass from './Myclass';

function Hello(Props){

    function click(){

        return(
            alert("clicked")
        );
    }
    return (
<div>
    <h1> 
        My name is {Props.name} </h1>
        <button
           onClick={click}> click me
        </button>
   </div> 
    );
}

export default Hello
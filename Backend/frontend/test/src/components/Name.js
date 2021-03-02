import React, { Component } from 'react'

class Name extends Component {


    constructor() {
        super();
        this.state = {
            name: 'aboli'
        }
    }
    clickedMe = () => {
     this.setState({
        name: this.state.name === "aboli"? "aboli naik" :"aboli"
            })
        }
    
    render() {

        return (
            <div>
                <h1> this is state xplainantion {this.state.name}</h1>
                <button onClick={() => this.clickedMe()}>CLick Me</button>
            </div>
        );
    }
}

export default Name;
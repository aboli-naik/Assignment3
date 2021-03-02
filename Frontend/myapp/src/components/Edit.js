import React, { Component } from 'react'
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';

class Edit extends Component {


    render() {

        return (

            <div>

                <Label for="Course">Course Name</Label>
                <Input id="coursename" />
                <br>
                </br>

                <Label for="Module">Module</Label>
                <Input id="modulename" />
                <br>
                </br>
                <Button color="primary">Save</Button>


            </div>
        )
    }
}

export default Edit
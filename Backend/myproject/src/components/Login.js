import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import { isEmail } from 'validator';
import { withRouter } from 'react-router-dom';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        
    }

    getInitialState = () => ({
        data: {
            email: '',
            password: ''
            
        },
        errors: {}
    });

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    validate = () => {
        const { data } = this.state;
        let errors = {};
      
        if (data.email === '') {errors.email = 'Email can not be blank.'}
        
        if (data.password === '') errors.password = 'Password must be valid.';
      
        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();
        

        if (Object.keys(errors).length === 0) {
            console.log(data);
            //Call an api here
                                  
              
            fetch('https://48c5553c-7494-4832-8ec0-f583825c9deb.mock.pstmn.io/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.Email,
                Password: this.state.Password,
                            })
            

        }).then((Response) => Response)

            .then((result) => {
                console.log('hiiiiiiii');
                console.log(result);

                if (result.Status == 'Invalid')

                    alert('Invalid User');

                else
                this.props.history.push("/MyAccount");

            })


            //Resetting the form
            this.setState(this.getInitialState());
        } else {
            this.setState({ errors });
        }
    }

    render() {
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
         
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" value={data.email} invalid={errors.email ? true : false} name="email" onChange={this.handleChange} />
                    <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" value={data.password} type="password" name="password" invalid={errors.password ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>

                <Button color="primary">Login</Button>
            </Form>
        );
    }
}

export default withRouter(Login)
import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import { isEmail } from 'validator';
import { withRouter } from 'react-router-dom';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();

    }

    getInitialState = () => ({
        data: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            birthdate: ''
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

    showAlert() {
        alert('password should containg atleast 8 chracter')

    }
    validate = () => {
        const { data } = this.state;
        let errors = {};

        if (data.name === '') errors.name = 'First Name can not be blank.';
        if (!isEmail(data.email)) errors.email = 'Email must be valid.';
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.password === '') errors.password = 'Password must be valid.';
        if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords must match.';

        return errors;
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            console.log(data);
            //Call an api here

            fetch('http://localhost:8000/api/authentication/registration/', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    emailerror: this.emailerror,
                    role: this.state.role,
                    birthdate:this.state.birthdate

                })

            }).then((Response) => Response)

                .then((result) => {

                    console.log(result);

                    if (result.Status == 'Invalid')

                        alert('Invalid User');

                    else
                        alert('successful account creation');
                    this.props.history.push("/login");

                })

            this.setState(this.getInitialState());
        } else {
            this.setState({ errors });
        }
    }
    setGender(event) {
        console.log(event.target.value);

    }
    render() {
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="name">First Name</Label>
                    <Input id="name" value={data.name} invalid={errors.name ? true : false} name="name" onChange={this.handleChange} />
                    <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" value={data.email} invalid={errors.email ? true : false} name="email" onChange={this.handleChange} />
                    <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" onClick={this.showAlert} value={data.password} type="password" name="password" invalid={errors.password ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" value={data.confirmPassword} type="password" name="confirmPassword" invalid={errors.confirmPassword ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <div >
                    <input type="date" value={data.birthdate} name="birthdate" onChange={this.handleChange} /> birthdate
                  </div>

                </FormGroup>
                <FormGroup>
                    <div >
                        <input type="radio" value={data.role} name="student" onChange={this.setGender} /> student
                        <input type="radio" value={data.role} name="student" onChange={this.setGender} /> student
                  </div>
                </FormGroup>

                <Button color="primary">Register</Button>
            </Form>
        );
    }
}

export default withRouter(Register);
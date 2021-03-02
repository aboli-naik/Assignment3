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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
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

    showAlert  ()  {
       alert('password should containg atleast 8 chracter')
      
    }
    validate = () => {
        const { data } = this.state;
        let errors = {};

        if (data.firstName === '') errors.firstName = 'First Name can not be blank.';
        if (data.lastName === '') errors.lastName = 'Last Name can not be blank.';
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

            fetch('https://48c5553c-7494-4832-8ec0-f583825c9deb.mock.pstmn.io/api/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: this.state.Email,
                    Password: this.state.Password,
                    emailerror: this.Emailerror

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

    render() {
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input id="firstName" value={data.firstName} invalid={errors.firstName ? true : false} name="firstName" onChange={this.handleChange} />
                    <FormFeedback>{errors.firstName}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input id="lastName" value={data.lastName} invalid={errors.lastName ? true : false} name="lastName" onChange={this.handleChange} />
                    <FormFeedback>{errors.lastName}</FormFeedback>
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

                <Button color="primary">Register</Button>
            </Form>
        );
    }
}

export default withRouter(Register);
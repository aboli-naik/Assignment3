import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import { isEmail } from 'validator';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom'


class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
            .then((result => {
                this.setState({
                    users: result

                })
            })
            )
    }

    render() {
        var { users } = this.state;
        return (
            <div>
                {
                    this.state.users ?
                        this.state.users.map((list, i) =>
                            <div>
                                <table border="1">
                                    <tr>
                                        <td>{list.id} </td>
                                        <td>{list.name} </td>
                                        <td>{list.email} </td>
                                        <td>{list.username}</td>
                                        <td>

                                        <Link to = "Edit"> Edit  </Link>
                                        </td>

                                    </tr>


                                    <tr>
                                        <td></td>

                                    </tr>


                                </table>

                            </div>
                        )

                        :
                        null
                }
            </div>

        )
    }
}
export default withRouter(MyAccount);
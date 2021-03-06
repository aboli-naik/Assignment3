

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'


class CoursesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
        }
    }
    componentDidMount() {
        fetch('http://localhost:8000/api/core/courses/').then(response => response.json())
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
                <h1>This is list of Courses</h1>
                {
                    this.state.users ?
                        this.state.users.map((list, i) =>
                            <div>
                                <table border="1">
                                    <tr>
                                        <td>{list.id} </td>
                                        <td>{list.coursename} </td>
                                        <td>{list.modules} </td>
                                        <td>
                                            <Link to="Edit"> Edit  </Link>
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
export default withRouter(CoursesList);

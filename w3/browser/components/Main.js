import React, {Component} from 'react';
import axios from 'axios';

import StudentList from './StudentList.js' 
import SingleStudent from './SingleStudent.js'
import NewStudentForm from './NewStudentForm'; 

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: [],
            selectedStudent : {},
            showForm: false
        }

        this.selectStudent = this.selectStudent.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.addNewStudent = this.addNewStudent.bind(this)
    }

    componentDidMount(){
        this.getStudents()
    }

    getStudents(){
        // console.log("fetching")
        axios.get('/student')
        .then(res => this.setState({students: res.data}))
        .catch(console.error)
    }

    selectStudent(student) {
        return this.setState({
            selectedStudent : student
        })
    }

    addNewStudent(student){
        axios.post('/student', student)
        .then(res => res.data)
        .then(student => (this.setState({ //setting the state so that the new student appears immidiately
            students: [...this.state.students, student]})))
        .catch(console.error)
    }

    handleForm() {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    render(){
        return (
            <div>
                <h1>Students</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Tests</th>
                        </tr>
                    </thead>
                    < StudentList students={this.state.students} selectStudent={this.selectStudent} />
                </table>
                {
                    this.state.selectedStudent.id ? <SingleStudent student={this.state.selectedStudent} /> : null
                }
                <button onClick={this.handleForm}>Add New Student</button>
                {
                    this.state.showForm ? <NewStudentForm addNewStudent={this.addNewStudent}/> : null
                }
            </div>
        )
    }
}
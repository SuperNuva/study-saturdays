import React, { Component } from 'react';

export default class NewStudentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) { //handles the changes for each input 
        this.setState({[e.target.name]: e.target.value}) //[] is for bracket notation for objects.
    }


    handleSubmit(e) {  //set the state on submit 
        e.preventDefault();
        const student = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }
        this.props.addNewStudent(student)
        
        this.setState({
            firstName: '',
            lastName: '',
            email: ''
        })
        console.log("The form was submitted!")
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label> 
                    First Name:
                    <input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
                    {
                        this.state.firstName.match(/\d+/g) && <div className='alert alert-warning' style={{color:'red'}}>Names cannot have numbers!</div>
                    }
                </label>
                <label> 
                    Last Name:
                    <input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange}/>
                    {
                        this.state.lastName.match(/\d+/g) && <div className='alert alert-warning' style={{color:'red'}}>Names cannot have numbers!</div>
                    }
                </label>
                <label> 
                    Email:
                    <input type='email' name='email' value={this.state.email} onChange={this.handleChange}/>
                </label>
                <button type='submit'>Submit</button>
            </form>
        )
    }
}
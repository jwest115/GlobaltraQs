import React, { Component } from 'react'

export class AddPinForm extends Component {


    state = {
        title: 'a',
        description: '',
    }


    handleChange(evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit = e => {
        alert(`${this.state.title} desc ${this.state.description}`)
    }


    render() {

        console.log(this.props.userlat + 'ye' + this.state.title)
        return (

            <form onSubmit={this.handleSubmit}>

                <label>Title</label>
                <input type="text" name="title" onChange={this.handleChange.bind(this)} value={this.props.userlat} />

                <label>description</label>
                <input type="text" name="description" value={this.state.description} onChange={this.handleChange.bind(this)} />
                <button>Submit</button>
            </form>
        );
    }
}

export default AddPinForm

import React, { Component } from 'react'
import Pins from './Pins'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPin } from '../../actions/pins'

export class PinForm extends Component {

    state = {
        title: '',
        description: '',
        latitude: '',
        longitude: '',
        category: ''
    }
    static propTypes = {
        addPin: PropTypes.func.isRequired
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const a = this.props.userlat
        const b = this.props.userlng
        e.preventDefault();
        this.state.latitude = a
        this.state.longitude = b
        const { title, description, latitude, longitude, category } = this.state
        const pin = { title, description, latitude, longitude, category };
        this.props.addPin(pin)
        console.log(a + ' ' + this.state.latitude)
    }

    render() {

        const { title, description, latitude, longitude, category } = this.state


        return (

            <div className="card card-body mt-4 mb-4">
                <h2>Add a Pin</h2>
                {console.log(this.props.userlat + 'pinfomr' + this.props.userlng)}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            onChange={this.onChange}
                            value={description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select value={category} name="category" className="form-control" onChange={this.onChange}>
                            <option value="1">Personal</option>
                            <option value="2">Community</option>
                            <option value="3">Hisftorical</option>
                        </select>
                    </div>


                    <input type="hidden" name="latitude" onChange={this.onChange}
                        // value={this.props.userlat}
                        value={latitude} />

                    <input type="hidden" name="longitude" onChange={this.onChange}
                        // value={this.props.userlat}
                        value={longitude} />
                    {/*        <div className="form-group">

                        <textarea
                            className="form-control"
                            type="hidden"
                            name="longitude"
                            onChange={this.onChange}
                               value={this.props.userlng} 
                        value = { longitude }
                        />

                    </div> */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                </button>
                    </div>
                </form>
            </div >
        )
    }
}
//callling the action
export default connect(null, { addPin })(PinForm)

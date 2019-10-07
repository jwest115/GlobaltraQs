import React, { Component } from 'react'
import Pins from './Pins'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPin } from '../../actions/pins'

export class PinForm extends Component {

    state = {
        title: '',
        description: '',
        latitude: this.props.userlat,
        longitude: this.props.userlng,
    }
    static propTypes = {
        addPin: PropTypes.func.isRequired
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { title, description, latitude, longitude } = this.state
        const pin = { title, description, latitude, longitude };
        this.props.addPin(pin)
    }

    render() {

        const { title, description, latitude, longitude } = this.state


        return (

            <div className="card card-body mt-4 mb-4">
                <h2>Add Pinsa</h2>
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
                        <label>Latitude</label>
                        <textarea
                            className="form-control"
                            type="number"
                            name="latitude"
                            onChange={this.onChange}
                            // value={this.props.userlat}
                            value={latitude}
                        />
                    </div>
                    <div className="form-group">
                        <label>longitude</label>
                        <textarea
                            className="form-control"
                            type="number"
                            name="longitude"
                            onChange={this.onChange}
                            /*   value={this.props.userlng} */
                            value={longitude}
                        />

                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                </button>
                    </div>
                </form>
            </div>
        )
    }
}
//callling the action
export default connect(null, { addPin })(PinForm)

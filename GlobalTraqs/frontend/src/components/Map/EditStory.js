import React, { Component } from 'react'
import Pins from './Pins'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editPin } from '../../actions/pins'
import axios from 'axios';
import {Link} from "react-router-dom";
import {Redirect} from "@reach/router";

export class EditStory extends Component {

    state = {
        title: '',
        description: '',
        latitude: '',
        longitude: '',
        category: '',
        user: '',
    };
    static propTypes = {
        editPin: PropTypes.func.isRequired
    };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { id } = this.props.match.params;

        const a = this.props.userlat;
        const b = this.props.userlng;
        const c = this.props.storyid;
        const d = 1;
        this.state.user = d;
        e.preventDefault(); //prevents refresh of page
        this.state.latitude = a;
        this.state.longitude = b;
        this.state.id = c;
        console.log("story id "+ id);
        const { title, description, category, latitude, longitude, user } = this.state;
        const pin = { title, description, category, latitude, longitude, user };
        console.log("title " + pin.title + "description " + pin.description + " category " + pin.category + " lat " + pin.latitude + " lon " + pin.longitude + " user " +  user.id + " pin");
        // this.props.editPin(pin, c)
        /*    axios.put(`/api/pins/${c}/`, pin)
               .then(res => {
                   console.log(res)
                   console.log(res.data)
               }) */
        console.log(a + ' ' + this.state.latitude + '' + c);
        return <Redirect to={`Story/${id}`}/>;
    };

    render() {

        const { title, description, latitude, longitude, category } = this.state;


        return (

            <div className="card card-body mt-4 mb-4">
                <h2>edit a Pin</h2>
                {console.log(this.props.userlat + 'pinfomr' + this.props.userlng + 'aa' + this.props.storyid)}
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

                        <select name="category" className="form-control" onChange={this.onChange}>
                            {/* someone put like user must select an option error handling something blah blah */}
                            <option disabled selected value> -- select an option -- </option>
                            <option value="1">Personal</option>
                            <option value="2">Community</option>
                            <option value="3">Historical</option>
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
export default connect(null, { editPin })(EditStory)
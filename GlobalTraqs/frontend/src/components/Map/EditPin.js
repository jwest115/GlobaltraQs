import React, { Component } from "react";
import Pins from "./Pins";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePins, editPin } from "../../actions/pins";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import  { Redirect } from 'react-router-dom'


const labelStyle = {
  marginRight: "10px"
};

const months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];

export class EditPin extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    latitude: this.props.latitude,
    longitude: this.props.longitude,
    category: this.props.category,
    user: this.props.userId,
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    pinDeleted: false
  };
  static propTypes = {
    editPin: PropTypes.func.isRequired,
    deletePins: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  onSubmit = e => {
    const a = this.props.userlat;
    const b = this.props.userlng;
    const c = this.props.storyid;
    // const d = 1
    // this.state.user = d
    e.preventDefault(); //prevents refresh of page
    this.state.latitude = a;
    this.state.longitude = b;
    this.state.id = c;
    const { title, description, category, startDate, endDate} = this.state;
    const pin = { title, description, category, startDate, endDate};
    this.props.editPin(pin, c);
    /*    axios.put(`/api/pins/${c}/`, pin)
               .then(res => {
                   console.log(res)
                   console.log(res.data)
               }) */


     let selectedStartMonthName = months[startDate.getMonth()];
     let startDateFormatted = selectedStartMonthName + " " + startDate.getDate() + ", " + startDate.getFullYear();

     let selectedEndMonthName = months[endDate.getMonth()];
     let endDateFormatted = selectedEndMonthName + " " + endDate.getDate() + ", " + endDate.getFullYear();
     console.log("formatted start " + startDateFormatted);
     console.log("formatted end " + endDateFormatted);

    this.props.onUpdate(category, title, description, startDate, endDate, startDateFormatted, endDateFormatted);
    console.log(a + " " + this.state.latitude + "" + c);
  };

  deletePin = () => {
    this.props.deletePins(this.props.storyid);
    this.setState({pinDeleted: true});
  };

  render() {
    const { title, description, latitude, longitude, category, startDate, endDate } = this.state;
      if(this.state.pinDeleted) {
          return <Redirect to='/' />
      }

    return (
      <div className="card card-body mt-4 mb-4">
        <div className="delete-button-div">
          <button
            onClick={this.deletePin}
            type="button"
            className="delete-story-button btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
        <br />
        <h2>Edit Story</h2>
        {console.log(
          this.props.userlat +
            "pinfomr" +
            this.props.userlng +
            "aa" +
            this.props.storyid
        )}
        <form onSubmit={this.onSubmit}>
           <div className="form-group">
            <label>Category</label>
            <select
              value={this.state.category}
              name="category"
              className="form-control"
              onChange={this.onChange}
            >
              {/* someone put like user must select an option error handling something blah blah */}
              {/*<option disabled selected value>*/}
              {/*  {" "}*/}
              {/*  -- select an option --{" "}*/}
              {/*</option>*/}
              <option value="1">Personal</option>
              <option value="2">Community</option>
              <option value="3">Historical</option>
            </select>
          </div>
          <div className="form-group">
            <label>Title</label>
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
          <InputGroup>
              <label style={labelStyle} for="startDate">
                Start Date
              </label>
               <DatePicker
                  selected={startDate}
                  onChange={this.handleStartDateChange}
                  value={startDate}
                />
              <label style={labelStyle} for="endDate">
                &nbsp;&nbsp;&nbsp;End Date
              </label>
               <DatePicker
                  selected={endDate}
                  onChange={this.handleEndDateChange}
                  value={endDate}
                />
          </InputGroup>
          <input
            type="hidden"
            name="latitude"
            // value={this.props.userlat}
            value={latitude}
          />

          <input
            type="hidden"
            name="longitude"
            // value={this.props.userlat}
            value={longitude}
          />
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
      </div>
    );
  }
}
//callling the action
export default connect(null, { editPin, deletePins })(EditPin);

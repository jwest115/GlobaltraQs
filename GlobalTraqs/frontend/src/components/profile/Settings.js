import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "react-switch";
//import { Checkbox } from 'semantic-ui-react'

class Settings extends Component {
   constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <label>
        <span>Accessibility</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

Settings.propTypes = {
};

export default Settings;
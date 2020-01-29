import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import Sidebar from "react-sidebar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { TextField, FormControl, MenuItem, IconButton, responsiveFontSizes } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import { searchPins } from "../../actions/pins";
import { getPins } from "../../actions/pins";
import pins from "../../reducers/pins";
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import SearchIcon from '@material-ui/icons/Search';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { Markup } from 'interweave';


import {
  Label
} from "reactstrap";

import { Marker, Popup } from "react-leaflet";
import InputGroup from "react-bootstrap/InputGroup";

const options = [
  { value: '1', label: 'Personal' },
  { value: '2', label: 'Community' },
  { value: '3', label: 'Historical' },
];

const labelStyle = {
  marginRight: "10px"
};

export class SearchSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            pinType: 1,
            searchText: "",
            selectedCategories: options,
            startDate: new Date(),
            endDate: new Date()
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    handleChange = (selectedCategories) => {
        this.setState({ selectedCategories });
    };

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }


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

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    componentDidMount() {
        this.props.getPins();
    }

    searchPins = e => {
        console.log("pin type " + this.state.pinType);
        e.preventDefault(); //prevents refresh of page
        const startDate = this.state.startDate.getFullYear() + "-" + (this.state.startDate.getMonth() + 1)  + "-" + this.state.startDate.getDate();
        const endDate = this.state.endDate.getFullYear() + "-" + (this.state.endDate.getMonth() + 1)  + "-" + this.state.endDate.getDate();
        let categorySearchQuery = "";
        for(const [index, value] of this.state.selectedCategories.entries()) {
            if(index < this.state.selectedCategories.length - 1) {
                console.log(value.value);
                categorySearchQuery += value.value + ",";
                console.log("is the num")
            }
            else {
                console.log(value.value);
                categorySearchQuery += value.value;
                console.log("is the num")
            }
        }
        console.log(categorySearchQuery);
        this.props.searchPins(this.state.searchText, categorySearchQuery, startDate, endDate);
    };

    static propTypes = {
        pins: PropTypes.array.isRequired,
        getPins: PropTypes.func.isRequired,
        searchPins: PropTypes.func.isRequired,
    };

    render() {
        let resultCount = this.props.pins.length;

        return (
           <Sidebar
                sidebar={
                    <div>
                        <form onSubmit={this.searchPins}>
                            <div className={"form-group"}>
                                <label>Search: </label>
                                 <input
                                    className="form-control"
                                    id="searchForm"
                                    label="Search"
                                    placeholder={"Search for stories"}
                                    name={"searchText"}
                                    onChange={this.onChange}
                                    value={this.state.searchText}
                                 />
                            </div>
                            <label>Category: </label>
                             <Select
                                isMulti
                                defaultValue = {options}
                                value={this.selectedCategories}
                                onChange={this.handleChange}
                                options={options}
                              />
                              <InputGroup style={{marginTop: '20px'}}>
                                <Label style={labelStyle} for="startDate">
                                  Stories from
                                </Label>
                                 <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                  />
                                <Label style={{marginLeft:'20px', marginRight:'20px'}} for="startDate">
                                    to
                                </Label>
                                 <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                  />
                              </InputGroup>
                            {/*<div className="form-group">*/}
                            {/*    <select*/}
                            {/*      className="form-control"*/}
                            {/*      id="pinForm"*/}
                            {/*      name={"pinType"}*/}
                            {/*      value={this.state.pinType}*/}
                            {/*      onChange={this.onChange}*/}
                            {/*    >*/}
                            {/*      <option value={1}>Personal</option>*/}
                            {/*      <option value={2}>Community</option>*/}
                            {/*      <option value={3}>Historical</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <button type="submit" style={{ float: "right" }} className="btn btn-primary">
                                    Search
                                </button>
                            </div>
                        </form>
                        <div>
                            <p style={{ marginTop: "50px", marginBottom: "20px" }}> {resultCount} {resultCount == 1 ? " search result" :  " search results"} </p>

                            {this.props.pins.map((story, index) => {
                                return (
                                <Card>
                                    <Link
                                        style={{ textDecoration: 'inherit'}}
                                        to={`Story/${story.id}`}
                                        params={{ testvalue: "hello" }}
                                    >
                                  <CardActionArea>
                                    <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                        {story.title}
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary">
                                        <Markup content={story.description}/>
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                  </Link>
                                </Card>
                                );
                            })}
                        </div>
                    </div>
                }
                open={this.props.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                pullRight={true}
                styles={{ sidebar: { background: "white", width: "40%", padding: "20px" } }}
                >
               {console.log(this.props.pins.length + " is the length")}
            </Sidebar>
        );
    }
}

const mapStateToProps = state => ({
  //state of redux
  pins: state.pins.pins,
});

export default connect(mapStateToProps, { getPins, searchPins })(SearchSidebar);
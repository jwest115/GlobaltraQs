import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import Sidebar from "react-sidebar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { TextField, Select, FormControl, MenuItem, IconButton, responsiveFontSizes } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import { searchPins } from "../../actions/pins";
import { getPins } from "../../actions/pins";
import pins from "../../reducers/pins";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

export class SearchSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            pinType: 1,
            searchText: ""
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    componentDidMount() {
        this.props.getPins();
    }

    searchPins = e => {
        console.log("pin type " + this.state.pinType);
        e.preventDefault(); //prevents refresh of page
        this.props.searchPins(this.state.searchText, this.state.pinType);
    };

    static propTypes = {
        pins: PropTypes.array.isRequired,
        getPins: PropTypes.func.isRequired,
        searchPins: PropTypes.func.isRequired,
    };

    render() {
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
                            <div>
                            <label>Category: </label>
                            <div className="form-group">
                                <select
                                  className="form-control"
                                  id="pinForm"
                                  name={"pinType"}
                                  value={this.state.pinType}
                                  onChange={this.onChange}
                                >
                                  <option value={1}>Personal</option>
                                  <option value={2}>Community</option>
                                  <option value={3}>Historical</option>
                                </select>
                            <FormHelperText>Select Pin Type</FormHelperText>
                            </div>
                        </div>
                            <div className="form-group">
                            <button type="submit" styles={{ sidebar: { float: "right"} }} className="btn btn-primary">
                                Search
                            </button>
                        </div>
                        </form>
                        {this.props.pins.map((story, index) => {
                            return (
                            <Card>
                              <CardActionArea>
                                <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    {story.title}
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary" component="p">
                                    {story.description}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                            );
                        })}
                    </div>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                pullRight={true}
                styles={{ sidebar: { background: "white", width: "40%", padding: "20px" } }}
                >
               {console.log(this.props.pins.length + " is the length")}
                <button id="open-sidebar-button" onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
                  Toggle sidebar
                </button>
            </Sidebar>
        );
    }
}

const mapStateToProps = state => ({
  //state of redux
  pins: state.pins.pins,
});

export default connect(mapStateToProps, { getPins, searchPins })(SearchSidebar);
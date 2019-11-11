import React, {Component, Fragment} from 'react'
import PropTypes from "prop-types"
import axios from 'axios';
import {connect} from "react-redux";
import EditPin from "./EditPin";
import {getUser} from "../../actions/users";
import {GET_USER} from "../../actions/types";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {Link} from "react-router-dom";
import {communityIcon, defaultPointerIcon, historicalIcon, personalIcon} from "./Pins";
import {getPins} from "../../actions/pins";
import L from "leaflet";
import default_marker from "./images/default.png";
import community from "./images/community.png";
import historical from "./images/historical.png";
import personal from "./images/personal.png";

const divStyle = {
    height: '40vh',
    width: '100%',
    left: '0'
};

const divStyle2 = {
    paddingLeft: '0px',
    paddingRight: '0px'
};

const storyBody = {
    paddingTop: '50px',
    paddingLeft: '50px',
    paddingRight: '50px'
}


export class Story extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userStory: '',
            showEditForm: false,
            editButtonValue:'Edit Story',
            storyAuthor: '',
            storyId: ''
        }
    }


    static propTypes = {
        auth: PropTypes.object.isRequired,
        getPins: PropTypes.func.isRequired,
        pins: PropTypes.array.isRequired,
        // pin: PropTypes.object.isRequired
    };

    updateStoryId = (storyId) => {
        this.setState({storyId : storyId});
        console.log("story id " + storyId);
        this.componentDidMount()
    };

    // componentDidUpdate (prevProps) {
    //      let oldId = prevProps.match.params;
    //      let newId = this.props.match.params;
    //
    //      console.log(newId);
    //      if (newId !== oldId) {
    //          axios.get(`api/pins/${newId}`)
    //             .then(response => {
    //                 this.setState({ userStory: response.data });
    //                 console.log(response.data);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //      }
    // }

    componentDidMount() {
        this.props.getPins();
        this.state.storyId = this.props.match.params;
        console.log(this.props.match.params);
        const { id } = this.state.storyId;
        // this.props.getPin(id);

        axios.get(`api/pins/${id}`)
            .then(response => {
                this.setState({ userStory: response.data });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        // const {user_id} = this.state.userStory;
        // console.log("user id " + this.state.userStory);
        // axios.get(`/api/auth/users/${id}/`)
        //     .then(res => {
        //             this.setState({storyAuthor: res.data});
        //             console.log("the data is " + res.data);
        //     })
        //      .catch(error => {
        //         console.log(error);
        //     });
    }

     editStory = () => {
        if(this.state.showEditForm) {
            this.setState({
                showEditForm: false,
                editButtonValue:"Edit Story"
            });
        }
        else {
              this.setState({
                showEditForm: true,
                editButtonValue:"Close"
            });
        }
    };




    render() {
        const { id } = this.props.match.params;
        console.log(id);
        if(!this.state.userStory || this.state.userStory == undefined){
            return null; //You can change here to put a customized loading spinner
        }

        let isAdminOrModerator = false;
        let adminModeratorEditStory = "";
        const { isAuthenticated, user } = this.props.auth;
        if(isAuthenticated) {
            if(user.is_administrator || user.is_moderator) {
                isAdminOrModerator = true;
                 adminModeratorEditStory = (
                     <div className='admin-moderator-edit'>
                         <button onClick={this.editStory} className="btn btn-success admin-moderator-edit">{this.state.editButtonValue}</button>
                     </div>
                    );
            }
        }
        // console.log("lat " + this.state.userStory.latitude);
        const position = [this.state.userStory.latitude, this.state.userStory.longitude];
        return (
            <div className='container-fluid' style={divStyle2}>
                <Map center={position} zoom={15} maxZoom={30} id="map" style={divStyle}>
                    <TileLayer
                        attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                    />

                          {this.props.pins.map((marker, index) => {
                                let post = [marker.latitude, marker.longitude];
                                let categoryIcon = ''
                                if (marker.category == 1) {
                                    categoryIcon = personalIcon
                                } else if (marker.category == 2) {g
                                    categoryIcon = communityIcon
                                } else { categoryIcon = historicalIcon }
                                const id = marker.id

                                return (
                                    <Marker key={index} position={post} icon={categoryIcon}>
                                        <Popup>
                                            {marker.title} <br /> {marker.description}
                                            <br />
                                            <Router>
                                                <Link to={`/Story/${id}`} key={id}>
                                                    <button onClick={() => this.updateStoryId(id)} type="button" className="btn btn-primary btn-sm">View Story</button>
                                                </Link>
                                            </Router>
                                        </Popup>
                                    </Marker>
                                );
                            })
                        }
                </Map>
                <div className='container-fluid' style={storyBody}>
                    <h2><strong>{this.state.userStory.title}</strong></h2>
                    <p>{this.state.userStory.description}</p>
                </div>
            {/*<div className="card card-body mt-4 mb-4">*/}
            {/*    {this.state.showEditForm &&*/}
            {/*    <EditPin title={this.state.userStory.title} description={this.state.userStory.description} userlat={this.state.userStory.latitude} userlng={this.state.userStory.longitude}*/}
            {/*          storyid={id} user={this.state.userStory.user}/> }*/}
            {/*    {isAdminOrModerator ? adminModeratorEditStory : ""}*/}
            {/*    <div className=''>*/}
            {/*    <h2>id is: {this.state.userStory.title}</h2>*/}
            {/*    <h2>Title:  {this.state.userStory.title}</h2>*/}
            {/*    <h2>Description: {this.state.userStory.description}</h2>*/}
            {/*    <h2>latitude: {this.state.userStory.latitude}</h2>*/}
            {/*    <h2>longitude: {this.state.userStory.longitude}</h2>*/}
            {/*    /!*<h2>owner: {this.state.userStory.user_id} </h2>*!/*/}
            {/*    <div className="col-lg-1">*/}
            {/*        <img src="https://picsum.photos/200/300" className="rounded" position="center"/>*/}
            {/*    </div>*/}



            {/*    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Praesent mauris. Fusce nec tellus sed augue semper porta. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Mauris massa. Vestibulum lacinia arcu eget nulla. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>*/}

            {/*    <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. </p>*/}

            {/*    <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. </p>*/}

            {/*    <p>Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. </p>*/}

            {/*    <p>Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. </p>*/}

            {/*</div>*/}
            {/*</div>*/}
            </div>
        )
    }
}
const mapStateToProps = state => ({
  auth: state.auth,
  pins: state.pins.pins // state.pins we want pins reducer from index, .pins is from initial state

  // pin: state.pin.pin
});
export default connect(
    mapStateToProps, {getPins})
    (Story);

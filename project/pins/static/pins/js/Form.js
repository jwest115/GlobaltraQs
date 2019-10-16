import React, { Component } from "react";
import PropTypes from "prop-types"

class Form extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired
    };

    state = {
        title: "",
        description: "",
        latitude: "",
        longitude: ""
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {title, description, latitude, longitude} = this.state;
        const lead = {title, description, latitude, longitude};
        const conf = {
            method: "post",
            body: JSON.stringify(lead),
            headers: new Headers({"Content-Type": "application/json"})
        };
        fetch(this.props.endpoint, conf).then(response => console.log(response));
    };
}
//     render() {
//         const { title, description, latitude, longitude } = this.state;
//         return (
//             <div style='float: right; width: 25%'>
//                 <form onSubmit={ this.handleSubmit } method="POST" id="addPinForm" action="{% url 'display_map2' %}">
//                     {/*{% csrf_token %}*/}
//                     {/*{% if error_message %}*/}
//                     <div className="alert alert-danger" role="alert">
//                         {/*{{error_message}}*/}
//                     </div>
//                     {/*{% endif %}*/}
//                     <div className="form-group">
//                         {/*{{form.title}}*/}
//                         <br>
//                             {/*{{form.description}}*/}
//                             <br>
//                                 {/*{{form.latitude}}*/}
//                                 {/*{{form.longitude}}*/}
//                                 <input type="submit" value="Save" style="float: right"
//                                        className="btn btn-primary btn-md">
//
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }
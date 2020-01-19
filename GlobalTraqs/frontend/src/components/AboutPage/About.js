import React from 'react';
import ReactDOM from 'react-dom';

import { useSelector, useDispatch, useStore } from 'react-redux';

import {updateAboutUs, getAboutUs} from "../../actions/management";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';

function About() {
    const [aboutUs, setAboutUs] = useState('');
    const [editButtonValue, setEditButtonValue] = useState('Edit');
    const dispatch = useDispatch();
    const aboutUsData = useSelector(state => state.management.about_us);
    const auth = useSelector(state => state.auth);

    const { isAuthenticated, user } = auth;

    let authorized = false;

    if(user) {
        if(user.is_administrator || user.is_moderator) {
            authorized = true;
        }
    }

    useEffect(() => {
        dispatch(getAboutUs());
        // setAboutUs(aboutUsData);
    });

    const editAboutUs = () => {
        // show edit form
        setEditButtonValue('Close');
    };

    const canEdit = (
         <div className="admin-moderator-edit">
            <button
                onClick={editAboutUs}
                className="btn btn-success admin-moderator-edit"
            >
              {editButtonValue}
            </button>
         </div>
    );

    return (
        <div>
            <div className="card card-body mt-4 mb-4">
                {authorized ? (canEdit) : ""}

                {aboutUsData}
             {/*
                <div className="col-lg-1">
                    <img src="https://picsum.photos/200/300" className="rounded" position="center" ></img>

                </div>
              */}


            </div >
        </div>
    )
}

export default About;

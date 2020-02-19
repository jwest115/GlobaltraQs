import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPin } from "../../../actions/pins";
import moment from "moment";

const useAddPinForm = callback => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = auth;
  let x = new Date();

  const [modalState, setmodalstate] = useState(false);

  const [addPinValues, setaddPinValues] = useState({
    category: 1,
    latitude: 34,
    longitude: -118,
    startDate: new Date(),
    endDate: new Date(),
    anonradius: 1,
    title: "",
    description: ""
  });

  const handleAddPinSubmit = e => {
    if (e) e.preventDefault();
    let is_anonymous_pin = true;
    if (isAuthenticated) {
      if (!user.is_anonymous_active) {
        is_anonymous_pin = false;
      }
    }
    if(!addPinValues.startDate) {

    }

    const submit = {
      ...addPinValues,
      owner: isAuthenticated ? user.id : "",
      is_anonymous_pin: is_anonymous_pin
    };

    dispatch(addPin(submit));
    callback();
    setmodalstate(!modalState);
    setaddPinValues({
      category: 1,
      latitude: 34,
      longitude: -118,
      startDate: new Date(),
      endDate: new Date(),
      anonradius: 1,
      title: "",
      description: ""
    });
  };

  const handleAddPinChange = e => {
    e.persist();
    setaddPinValues(addPinValues => ({
      ...addPinValues,
      [e.target.name]: e.target.value
    }));
  };

  const setAnonRadius = radius => {
    let randomLat;
    let randomLng;
    const lat = addPinValues.latitude;
    const lng = addPinValues.longitude;
    let sign1 = Math.round(Math.random());
    let sign2 = Math.round(Math.random());
    if (radius === "2") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.008 - 0.001) + 0.001);
      } else {
        randomLat = Math.random() * (0.008 - 0.001) + 0.001 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.008 - 0.001) + 0.001);
      } else {
        randomLng = Math.random() * (0.008 - 0.001) + 0.001 + lng;
      }
    } else if (radius === "3") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.03 - 0.01) + 0.01);
      } else {
        randomLat = Math.random() * (0.03 - 0.01) + 0.01 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.03 - 0.01) + 0.01);
      } else {
        randomLng = Math.random() * (0.03 - 0.01) + 0.01 + lng;
      }
    } else if (radius === "4") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.1 - 0.05) + 0.05);
      } else {
        randomLat = Math.random() * (0.1 - 0.05) + 0.05 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.1 - 0.05) + 0.05);
      } else {
        randomLng = Math.random() * (0.1 - 0.05) + 0.05 + lng;
      }
    } else {
      randomLat = lat;
      randomLng = lng;
    }
    setaddPinValues({
      ...addPinValues,
      anonradius: radius,
      latitude: randomLat,
      longitude: randomLng
    });
  };
  return {
    handleAddPinSubmit,
    handleAddPinChange,
    addPinValues,
    setaddPinValues,
    modalState,
    setmodalstate,
    setAnonRadius
  };
};

export default useAddPinForm;

import axios from "axios";

import {
  GET_PINS,
  DELETE_PINS,
  ADD_PIN,
  EDIT_PIN,
  GET_PIN,
  GET_USER,
  SEARCH_PINS,
  GET_UPVOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_PINS_BY_OWNER,
  GET_PIN_BY_ID,
  USER_FLAG_PIN,
  USER_FIRST_UPVOTE,
  USER_UPVOTE,
} from "./types";

//GET PINS
export const getPins = () => dispatch => {
  axios
    .get("/api/pins/")
    .then(res => {
      dispatch({
        type: GET_PINS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const searchPins = (
  searchQuery,
  categories,
  startDate,
  endDate,
) => dispatch => {
  axios
    .get(
      `api/pinSearch?search=${searchQuery}&categories=${categories}&startDate_gte=${startDate}&endDate_lte=${endDate}`
    )
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SEARCH_PINS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deletePins = id => dispatch => {
  axios
    .delete(`/api/pins/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_PINS,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const addPin = pin => dispatch => {
  axios
    .post("/api/pins/", pin)
    .then(res => {
      dispatch({
        type: ADD_PIN,
        payload: res.data
      });
      console.log("In add pin");
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const editPin = (pin, id, userid) => dispatch => {
  console.log(id + " " + pin.title);
  axios
    .patch(`/api/pins/${id}/`, pin)
    .then(res => {
      console.log(res.data);
      let validUser = false;
      let flagstateofuser = false;
      let upvotedBefore = false;
      let userCurrentUpvote = false;
      // !!!!!!!!!!!!!!!!!!!!!!!
      // this causes it to error out and prevents the payload from being used in the reducer
      if (userid) {
        flagstateofuser = res.data.flaggerstory.some(a => a.flagger === userid);
        upvotedBefore = res.data.updotes.some(b => b.upVoter === userid);
        if (upvotedBefore)
          userCurrentUpvote = res.data.updotes.filter(
            b => b.upVoter === userid
          )[0].upvote;
        validUser = true;
        console.log("has this user upvoted before" + upvotedBefore);
      }
      const payload = {
        ...res.data,
        userCurrentUpvote: userCurrentUpvote,
        upvotedBefore: upvotedBefore,
        validUser: validUser,
        flagState: flagstateofuser
      };
      dispatch({
        type: EDIT_PIN,
        payload: res.data
        // payload: payload
      });
      console.log("In edit pin");
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const getPin = (id, userid) => dispatch => {
  console.log("the user id in redux" + userid);
  axios
    .get(`api/pins/${id}/`)
    .then(res => {
      let validUser = false;
      let flagstateofuser = false;
      let upvotedBefore = false;
      let userCurrentUpvote = false;
      if (userid) {
        flagstateofuser = res.data.flaggerstory.some(a => a.flagger === userid);
        upvotedBefore = res.data.updotes.some(b => b.upVoter === userid);
        if (upvotedBefore)
          userCurrentUpvote = res.data.updotes.filter(
            b => b.upVoter === userid
          )[0].upvote;
        validUser = true;
        console.log("has this user upvoted before" + upvotedBefore);
      }
      const payload = {
        ...res.data,
        userCurrentUpvote: userCurrentUpvote,
        upvotedBefore: upvotedBefore,
        validUser: validUser,
        flagState: flagstateofuser
      };

      dispatch({
        type: GET_PIN,
        payload: payload
      });
    })
    .catch(error => console.log(error));
};
export const getUpvote = (pinId, userid) => {
  axios
    .get(`api/upVoteStory?pinId=${pinId}&userid=${userid}`)
    .then(res => {
      dispatch({
        type: GET_UPVOTE,
        payload: res.data
      });
    })
    .catch(error => console.log(error));
};
export const addComment = comment => dispatch => {
  axios
    .post("api/commentStory/", comment)
    .then(res => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });

      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const deleteComment = id => dispatch => {
  axios
    .delete(`api/commentStory/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_COMMENT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const getPinsByOwner = ownerId => dispatch => {
  axios
    .get(`api/pins/?owner=${ownerId}`)
    .then(res => {
      dispatch({
        type: GET_PINS_BY_OWNER,
        payload: res.data
      });
      console.log(res.data);
      console.log("is owner's pin!");
    })
    .catch(error => console.log(error));
};

export const userFlagPin = (pin, user, state) => dispatch => {
  const userflagged = {
    flagged: true,
    pinId: pin,
    flagger: user
  };

  axios
    .post(`api/flagStory/`, userflagged)
    .then(res => {
      const flagData = {
        ...res.data,
        flagState: true
      };
      console.log(res.data);
      dispatch({
        type: USER_FLAG_PIN,
        payload: res.data
      });
    })
    .catch(error => console.log(error));
};

export const userFirstUpvote = (pin, user) => dispatch => {
  console.log("over here");
  const submit = {
    upvote: true,
    pinId: pin,
    upVoter: user
  };
  axios
    .post(`api/upVoteStory/`, submit)
    .then(res => {
      dispatch({
        type: USER_FIRST_UPVOTE,
        payload: res.data
      });
    })
    .catch(error => console.log(error));
};

export const userUpovte = (id, state) => dispatch => {
  const submit = {
    upvote: !state
  };
  console.log(submit);
  axios
    .patch(`api/upVoteStory/${id}/`, submit)
    .then(res => {
      dispatch({
        type: USER_UPVOTE,
        payload: res.data
      });
    })
    .catch(error => console.log(error));
};

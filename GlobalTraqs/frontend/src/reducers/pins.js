import {
  GET_PINS,
  DELETE_PINS,
  ADD_PIN,
  EDIT_PIN,
  GET_PIN,
  SEARCH_PINS,
  GET_UPVOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_PINS_BY_OWNER,
  USER_FLAG_PIN,
  USER_FIRST_UPVOTE,
  USER_UPVOTE,
} from "../actions/types.js";

const initialState = {
  pins: [],
  pin: [],
  upvote: false,
  flagState: false,
  validUser: false,
  pinId: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PINS_BY_OWNER:
      return {
        ...state,
        pins: action.payload
      };
    case SEARCH_PINS:
      return {
        ...state,
        pins: action.payload
      };
    case GET_PIN:
      return {
        ...state,
        pin: action.payload,
        validUser: action.payload.validUser,
        flagState: action.payload.flagState,
        pinId: action.payload.id
      };
    case GET_PINS:
      return {
        ...state,
        pins: action.payload
      };
    case DELETE_PINS:
      return {
        ...state,
        pins: state.pins.filter(pins => pins.id !== action.payload),
        pin: []
      };
    case ADD_PIN:
      return {
        ...state,
        pins: [...state.pins, action.payload]
      };
    case EDIT_PIN:
      console.log(action.payload);
      return {
        ...state,
        // fixes duplicated pin on map when editing pin
        pins: [
          ...state.pins.filter(pins => pins.id !== action.payload.id),
          action.payload
        ],
        pin: action.payload
      };
    case ADD_COMMENT:
      const newComment = {
        ...state.pin,
        commentstory: [...state.pin.commentstory, action.payload]
      };

      return {
        ...state,
        pin: newComment
      };

    case DELETE_COMMENT:
      const newComments = state.pin.commentstory.filter(p => {
        if (p.id !== action.payload) {
          return p;
        }
      });

      const delComment = {
        ...state.pin,
        commentstory: newComments
      };
      return {
        ...state,
        pin: delComment
      };
    case USER_FLAG_PIN:
      const userFlag = {
        ...state.pin,
        flaggerstory: [...state.pin.flaggerstory, action.payload],
        flagState: true
      };
      console.log(action.payload);
      return {
        ...state,
        pin: userFlag
      };
    case USER_FIRST_UPVOTE:
      const userFirstUpvote = {
        ...state.pin,
        updotes: [...state.pin.updotes, action.payload],
        upvotedBefore: true,
        userCurrentUpvote: true,
        updooots: state.pin.updooots + 1
      };
      return {
        ...state,
        pin: userFirstUpvote
      };
    case USER_UPVOTE:
      const userupvotes = 0;

      const userUp = {
        ...state.pin,
        updotes: [
          ...state.pin.updotes.filter(x => x.id !== action.payload.id),
          action.payload
        ],
        userCurrentUpvote: action.payload.upvote,
        updooots: action.payload.upvote
          ? state.pin.updooots + 1
          : state.pin.updooots - 1
        // updooots: action.payload.upvote ? pin.updooots++ : pin.updoots--
      };
      return {
        ...state,
        pin: userUp
      };
    default:
      return state;
  }
}

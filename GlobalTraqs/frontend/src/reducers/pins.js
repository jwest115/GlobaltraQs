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
  GET_PINS_BY_OWNER
} from "../actions/types.js";


const initialState = {
  pins: [],
  pin: [],
  upvote: false
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
        pin: action.payload
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
    default:
      return state;
  }
}

import { FETCH_SECRET_FILES } from "./actions-files";

const intialState = {
  secretFiles: [],
  secretFile: {}
};

function rootReducer(state = intialState, action) {
  switch (action.type) {
    case FETCH_SECRET_FILES:
      return {
        ...state,
        secretFiles: action.payload,
      }
    default:
      return {
        ...state
      }
  }
}

export default rootReducer;

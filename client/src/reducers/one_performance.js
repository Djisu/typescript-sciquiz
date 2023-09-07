import {
  ONE_PERFORMANCE_SUCCESS,
  ONE_PERFORMANCE_FAIL,
  ONE_PERFORMANCE_REQUEST,
  ONE_PERFORMANCE_LOADED,
} from '../actions/types.js';

const initialState = {
  onePerformance: [], // Initial state for the ONEPerformances data
  loading: true, // Indicates whether the data is being loaded or not
};

function onePerformanceReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (action.type) {
    case ONE_PERFORMANCE_SUCCESS:
      return {
        ...state,
        onePerformance: action.payload, // Set the onePerformances data from the action payload
        loading: false, // Set loading to false, as the data has been successfully loaded
      };

    case ONE_PERFORMANCE_FAIL:
      return {
        ...state,
        onePerformance: [], // Clear the onePerformances data in case of failure
        loading: false, // Set loading to false, as the data loading has failed
      };
    default:
      return state;
  }
}

export default onePerformanceReducer;

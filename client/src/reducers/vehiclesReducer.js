import { GET_VEHICLE_LIST } from "../actions/types";

export const vehiclesReducer = (state = [], action) => {
  switch(action.type) {
    case GET_VEHICLE_LIST:
      return action.payload.vehicles;
    default:
      return state;
  }
}
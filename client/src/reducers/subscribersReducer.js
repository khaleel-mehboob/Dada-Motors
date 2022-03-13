import { GET_SUBSCRIBER_LIST } from "../actions/types";

export const subscribersReducer = (state = [], action) => {
  switch(action.type) {
    case GET_SUBSCRIBER_LIST:
      return action.payload.subscribers;
    default:
      return state;
  }
}
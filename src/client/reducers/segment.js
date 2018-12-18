/**
 * Created by John.Doe on 7/11/2018.
 */
import { SET_REVIEW, SET_BUILD, SET_FACT, SET_PLAN } from '../constants';

let initalState = {
  fact: [],
  plan: [],
  review: [],
  build: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_REVIEW:
    case SET_BUILD:
    case SET_FACT:
    case SET_PLAN:
      let seg = action.type.match(/SET_(.*)/)[1];
      seg = seg.toLowerCase();
      if (seg) {
        return {
          ...state,
          [seg]: action.content,
        };
      }
      return state;
    default:
      return state;
  }
};

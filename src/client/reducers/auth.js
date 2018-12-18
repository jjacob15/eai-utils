/**
 * Created by John.Doe on 7/11/2018.
 */
import { SET_USER } from '../constants';

const initialState = {
  authorized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        id: action.user.id,
        firstname: action.user.firstname,
        surname: action.user.surname,
      };
    default:
      return state;
  }
};

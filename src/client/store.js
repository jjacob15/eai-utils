/**
 * Created by John.Doe on 7/11/2018.
 */
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';

// without console logging
// export const store = createStore(reducer, applyMiddleware(thunk));
//with console logging
export const store = createStore(reducer, applyMiddleware(thunk, logger));

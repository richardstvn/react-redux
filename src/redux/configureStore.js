import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  const composedEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Add support for redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composedEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
}

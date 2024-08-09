import { configureStore } from "@reduxjs/toolkit";
import { Authreducer } from "./reducers/Authorizationreducer";
import { MiscellaneousReducer } from "./reducers/Miscellaneousslicereducer";

const store = configureStore({
  reducer: {
    auth: Authreducer,
    misc:MiscellaneousReducer
  },
  devTools: false,
});


export default store;
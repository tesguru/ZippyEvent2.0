import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIService } from "../../remote/services/Apiservices";
import { showErrorToast, showSuccessToast } from "../../../Utils/api-utils";

const initialState = {
  miscellaneousdata: {
    userEvents: null,
    eventLog: null,
    paymentEvent: null,
    singleEvent: null,
    securityQuestion:null,
    accountName:null,
    businessAccount:null,
  },
  loading: false,
  error: null,
};

// USER EVENTS
export const getUserEvents = createAsyncThunk(
  "misc/getUserEvents",
  async (userName) => {
    return APIService.getUserEvent(userName);
  }
);

// EVENT LOG
export const getEventLog = createAsyncThunk(
  "misc/getEventLog",
  async (userName) => {
    return APIService.getEventLog(userName);
  }
);

// PAYMENT LOG
export const getPaymentEvents = createAsyncThunk(
  "misc/getPaymentEvents",
  async (accountNo) => {
    return APIService.getPaymentLog(accountNo);
  }
);

// UPDATE ACCOUNT
export const updateAccount = createAsyncThunk(
  "misc/updateAccount",
  async (accountData) => {
    return APIService.updateAccount(accountData);
  }
);

export const createEvent = createAsyncThunk(
  "misc/createEvent",
  async (data) => {
    return APIService.createEvent(data);
  }
);


// GET SINGLE EVENT
export const getSingleEvent = createAsyncThunk(
  "misc/getSingleEvent",
  async (eventId) => {
    return APIService.singleEvents(eventId);
  }
);
//Get security Questions
export const getSecurityQuestions = createAsyncThunk(
  "misc/securityQuestions",
  async (eventId) => {
    return APIService.securityQuestion(eventId);
  }
);

export const getAccountName = createAsyncThunk(
  "misc/getAccountName",
  async (phoneNumber) => {
    return APIService.getAccountName(phoneNumber);
  }
);

export const getBusinessAccount = createAsyncThunk(
  "misc/getBusinessAccount",
  async (data) => {
    return APIService.getBusinessAccount(data);
  }
);


const handleFulfilled = (state, action) => {
  if (action.payload.status_code === '0') {
    return action.payload;
  } else {
    state.error = action.payload.message || 'Unknown error';
    showErrorToast(state.error);
    return null;
  }
};
const handleFetch = (state, action) => {
  if (action.payload.status_code === '0') {
    return action.payload;
  } else {
    state.error = action.payload.message || 'Unknown error';
    return null;
  }
};

const miscellaneousSlice = createSlice({
  name: "misc",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET USER EVENTS
      .addCase(getUserEvents.pending, (state) => {
        state.loading = true;
        state.miscellaneousdata.userEvents = null;
        state.error = null;
      })
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.miscellaneousdata.userEvents = handleFulfilled(state, action);
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user events';
        showErrorToast(state.error);
      })
      // GET EVENT LOG
      .addCase(getEventLog.pending, (state) => {
        state.loading = true;
        state.miscellaneousdata.eventLog = null;
        state.error = null;
      })
      .addCase(getEventLog.fulfilled, (state, action) => {
        state.loading = false;
        state.miscellaneousdata.eventLog = handleFulfilled(state, action);
      })
      .addCase(getEventLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch event log';
        showErrorToast(state.error);
      })
      // GET PAYMENT EVENTS
      .addCase(getPaymentEvents.pending, (state) => {
        state.loading = true;
        state.miscellaneousdata.paymentEvent = null;
        state.error = null;
      })
      .addCase(getPaymentEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.miscellaneousdata.paymentEvent = handleFulfilled(state, action);
      })
      .addCase(getPaymentEvents.rejected, (state, action) => {
        state.loading = false;
        state.miscellaneousdata.paymentEvent = null;
        state.error = action.error.message || 'Failed to fetch payment events';
        showErrorToast(state.error);
      })
      // UPDATE ACCOUNT
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status_code === '0') {
          showSuccessToast(action.payload.message);
        } else {
          state.error = action.payload.message || 'Unknown error';
          showErrorToast(state.error);
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update account';
        showErrorToast(state.error);
      })

//Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status_code === '0') {
          showSuccessToast(action.payload.message);
        } else {
          state.error = action.payload.message || 'Unknown error';
          showErrorToast(state.error);
        }
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update account';
        showErrorToast(state.error);
      })
      // GET SINGLE EVENT
      .addCase(getSingleEvent.pending, (state) => {
        state.loading = true;
        state.miscellaneousdata.singleEvent = null;
        state.error = null;
      })
      .addCase(getSingleEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.miscellaneousdata.singleEvent = handleFulfilled(state, action);
      })
      .addCase(getSingleEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch single event';
        showErrorToast(state.error);
      })
      //GET  SECURITY QUESTIONS
      .addCase(getSecurityQuestions.pending, (state) => {
        state.loading = true;
  
        state.error = null;
      })
      .addCase(getSecurityQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.miscellaneousdata.securityQuestion = handleFulfilled(state, action);
      })
      .addCase(getSecurityQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch single event';
        showErrorToast(state.error);
      })
      //GET ACCOUNT NAME
      .addCase(getAccountName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountName.fulfilled, (state, action) => {
        state.loading = false;
        state.miscellaneousdata.accountName = handleFetch(state, action);
      })
      .addCase(getAccountName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch single event';
        showErrorToast(state.error);
      })
      //GET BUSINESS ACCOUNT
      .addCase(getBusinessAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBusinessAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.miscellaneousdata.businessAccount = handleFulfilled(state, action);
      })
      .addCase(getBusinessAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch single event';
        showErrorToast(state.error);
      });
  },
});

export const MiscellaneousReducer = miscellaneousSlice.reducer;

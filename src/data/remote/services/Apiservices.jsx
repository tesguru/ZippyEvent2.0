import { showErrorToast } from "../../../Utils/api-utils";
import { apiClient } from "../clients/Apiclient";
import { apiTest } from "../clients/Apiclient";

export class APIService {
  static extractServerError(error) {
    let extracted;
    if (error.isAxiosError) {
      if (error.response) {
        extracted = [error.response.data.message || "Server Error"];
      } else if (error.request) {
        extracted = ["Network error occurred"];
      } else {
        extracted = ["An unexpected error occurred"];
      }
    } else {
      extracted = [error.message || "An unexpected error occurred"];
    }
    extracted.forEach((e) => showErrorToast(e));
  }


//LOGIN
static async login(userCredentials) {
    try {
      return apiClient.post("/user_login", userCredentials);
    } catch (error) {
      APIService.extractServerError(error);
      throw error;
    }
  }
  //GET USER EVENT
  static async getUserEvent(userName) {
    try {
      const response = await apiClient.get(`find_user_event?username=${userName}`);
      return response.data;
    } catch (error) {
      APIService.extractServerError(error); 
      throw error;
    }
  }
  //GET EVENT LOG
  static async getEventLog(userName){
    try{
   const response = await apiClient.get(`user_event_log?username=${userName}`);
   return response.data;
    }
    catch(error){
      APIService.extractServerError(error);
      throw error
    }
  }

  //GET PAYMENT LOG
  static async getPaymentLog(account_no){
    try{
      const response = await apiClient.get(`payment_history?user_account_number=${account_no}`);
      return response.data;

    }
    catch(error){
  APIService.extractServerError(error);
  throw error
    }
  }

  //Update Account
 
static async updateAccount(accountData) {
  try {
    return apiClient.post("/update_account", accountData);
  } catch (error) {
    APIService.extractServerError(error);
    throw error;
  }
}

static async createEvent(data) {
  try {
    return apiClient.post("/create_event", data);
  } catch (error) {
    APIService.extractServerError(error);
    throw error;
  }
}
//Single Events
static async singleEvents(event_id){
  try{
    const response = await apiClient.get(`find_event?event_id=${event_id}`);
    return response.data;
  }
  catch(error){
APIService.extractServerError(error);
throw error
  }
}
//SECURITY QUESTIONS
static async securityQuestion(){
  try{
    const response = await apiTest.get('get_security_questions');
    return response.data;
  }
  catch(error){
APIService.extractServerError(error);
throw error
  }
}

//ACCOUNT NAME
static async getAccountName(phonenumber) {
  try {
    const response = await apiTest.post('user_detail', new URLSearchParams({ phonenumber }));
    return response.data;
  } catch (error) {
    APIService.extractServerError(error);
    throw error;
  }
}
//create Businesss Account
static async createBusinessAccount(data) {
  try {
    const response = await apiTest.post('create_business_account_number', new URLSearchParams({ data }));
    return response.data;
  } catch (error) {
    APIService.extractServerError(error);
    throw error;
  }
}
//create Account
static async createAccount(data) {
  try {
    return apiClient.post("/user_account_creation", data);
  } catch (error) {
    APIService.extractServerError(error);
    throw error;
  }
}


}
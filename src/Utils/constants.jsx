export const HEADER = {
    "x-api-key": '20230098',
    "content-type": "application/json",
  };
  export const HEADER2 = {
  "x-api-key": '6128892',
    "content-type": "application/x-www-form-urlencoded",
  };

 

  export const retrieveFromLocalStorage = (keys) => {
    const data = {};
    keys.forEach((key) => {
      const persistedState = sessionStorage.getItem(key);
      data[key] = persistedState ? JSON.parse(persistedState) : null;
    });
  
    return data;
  };
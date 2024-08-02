import Swal from "sweetalert2";
import logo from "../assets/Images/zippylogo.png";

export const showErrorToast = (errorMessage) => {
  Swal.fire({
    imageUrl: logo ,
    imageHeight: 50,
    width: 300,
    padding: '0.5em',
    imageWidth: 50,
    title: 'Error',
    text: errorMessage,
    confirmButtonText: 'Cancel',
    confirmButtonColor: 'hsl(221, 98%, 19%)',
    showCloseButton: true,
  });
   
  return null; 
};

export const showSuccessToast = (successMessage) => {
  Swal.fire({
    imageUrl: logo ,
    imageHeight: 50,
    width: 300,
    padding: '0.5em',
    imageWidth: 50,
    title: 'success',
    text: successMessage,
    // showCloseButton: true,
  });

  return null; 
}

export const ShowPassDetails = (title, message) => {
  Swal.fire({
    imageUrl: logo,
    imageHeight: 50,
    width: 500,
    padding: "0.5em",
    imageWidth: 50,
    title: title,
    //text: message,
    // showCloseButton: true,
   html: `<div style="text-align: left">${message}</div>`,
  });

  return null; // We don't need to render anything for this component
};

export const showInfoToast = (successMessage) => {
  Swal.fire({
    imageUrl: logo ,
    imageHeight: 50,
    width: 300,
    padding: '0.5em',
    imageWidth: 50,
    title: 'Alert',
    text: successMessage,
    // showCloseButton: true,
  });

  return null; 
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
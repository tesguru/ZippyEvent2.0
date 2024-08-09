import { getBusinessAccountNumber } from "../local/reducers/Miscellaneousslicereducer";
import { axiosInstance2 } from "./clients/Apiclient";
import { axiosInstance } from "./clients/Apiclient";

// SubmitFormLogic.js
export const submitForm = async (formData, navigate) => {
    try {
      const {
      
        has_payment,
        phoneNumber,
        event_id,
        event_name,
        event_date,
        total_question,
        no_of_attendee,
        selectedCategories,
        eventAccountNumber,
        eventWalletNumber,
        general_payment,
        eventAccountName,
        ...answers
      } = formData[0];
      console.log(selectedCategories);
    
  
      if (!total_question) {
        // Redirect logic here
        console.log('Redirect to index');
        // navigate('/index'); // Redirect to index page
        return;
      }
  
      const all_answers = [];
      for (let xyz = 1; xyz <= no_of_attendee; xyz++) {
        const user_answers = [];
        for (let i = 0; i < total_question; i++) {
          const answer = answers[`answer_${xyz}_${i}`];
          const question_type_input = answers[`questiontype_${xyz}_${i}`][0];
          if (question_type_input === 'file_upload') {
            
            const userFiles = answers[`answer_${xyz}_${i}`];
            const response = await axiosInstance2.post('zippy_event/upload_document', userFiles);
            const upload_api = response.data; // Assuming you have a function to handle this
            if (upload_api.status_code === '0') {
              user_answers.push(upload_api.result.documentFilePath);
            } else {
              console.log('Invalid File Format');
              navigate(`/registeruser/${event_id}`); // Redirect to form page
              return;
            }
          } else {
            user_answers.push(Array.isArray(answer) ? answer.join(', ') : answer);
          }
        }
        all_answers.push(user_answers.join('|'));
      }
  
      const event_category_list = selectedCategories.map(category => ({ category_name: category }));

      console.log(event_category_list);
  
      let account_number = '';
      let url_account_number = 'NAN';
  
      const fullName = `${formData['surname_1']} ${formData['firstname_1']}`;
      console.log(fullName)
      if (has_payment === 'yes') {
        const paymentApiData = {
          names: fullName.slice(0, 21),
          customer_id: eventWalletNumber,
          phonenumber: phoneNumber.replace(/^./, event_id.slice(2, 5)),
        };
        const paymentApi =  getBusinessAccountNumber(paymentApiData);
        console.log(paymentApi) 
        if (paymentApi.status_code === '0') {
          account_number = paymentApi.account_number;
          url_account_number = paymentApi.account_number;
        } else {
          console.log('Network Error, Kindly Retry');
          navigate(`/registeruser/${event_id}`); // Redirect to form page
          return;
        }
      }
  
      let totalAmount = 0;
      const user_choices = [];
      const user_amount_choices = [];
  
      if (general_payment === 'no') {
        for (let user = 1; user <= no_of_attendee; user++) {
          const payment_categories = formData[`paymentCategoryAnswer_${user}`];
          if (payment_categories) {
            const user_choice = [];
            let total_user_amount = 0;
            payment_categories.forEach(payment_category => {
              const [amount, category_selected] = payment_category.split('|');
              user_choice.push(`${category_selected} (${amount})`);
              totalAmount += parseInt(amount, 10);
              total_user_amount += parseInt(amount, 10);
            });
            user_choices[user - 1] = user_choice.join(', ');
            user_amount_choices[user - 1] = total_user_amount;
          }
        }
      } else {
        all_answers.forEach((_, answer_data) => {
          const count = answer_data + 1;
          user_amount_choices.push(formData[`amount_${count}`]);
          user_choices.push("General Payment");
          totalAmount += parseInt(formData[`amount_${count}`], 10);
        });
      }
      
      for (let answer_data = 0; answer_data < all_answers.length; answer_data++) {
        const count = answer_data + 1;
        const response_data = {
          event_id,
          category: event_category_list,
          amount: user_amount_choices[answer_data] || '',
          fullName: `${formData[`surname_${count}`]}|${formData[`firstname_${count}`]}`,
          phoneNumber,
          account_number,
          eventAccountNumber,
          amountSummary: user_choices[answer_data] || '',
          answer: all_answers[answer_data],
        };
       // Assuming you have a function to handle this
        const response = await axiosInstance.post('zippy_event/submit_answer', response_data);
       
      }
     
      if (has_payment === 'yes') {
        const account_data_log = {
          eventId: event_id,
          generatedAccountNumber: account_number,
          eventAccountNumber,
          amount: totalAmount,
        };

      
        const submit_account_log =   await axiosInstance.post('zippy_event/log_event_sub_account_generated', account_data_log);// Assuming you have a function to handle this
        if (submit_account_log.data.status_code !== '0') {
          console.log('Network Error, Kindly Contact Admin');
          navigate(`/registeruser/${event_id}`); 
          return;
        }
      }
  
      // const urlText = `https://event.zippyworld.app/index/scanQr/${btoa(fullName)}/${btoa(event_name)}/${btoa(event_date)}/${btoa(url_account_number)}`;
      // let qrcodePath = '';
      // if (urlText) {
      //   qrcodePath = await generateQRCode(urlText); 
      // }

      // const data = {
      //   title: 'Confirmation Page',
      //   description: 'Explore diverse events, plan your adventures, create memories.',
      //   amount: totalAmount,
      //   event_name,
      //   event_date,
      //   fullname: fullName,
      //   account_name: fullName.slice(0, 21),
      //   has_payment,
      //   qrCode: qrcodePath,
      //   account_number,
      // };
      
      
      // // Assuming you have a function to render the template
      // renderTemplate(data);
      
      if (has_payment === 'yes') {
        await sendWhatsAppNotification(phoneNumber, event_name, fullName.slice(0, 21), account_number, totalAmount, fullName); // Assuming you have a function to handle this
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error appropriately
    }
  };
  
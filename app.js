//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){

  //hide result
  document.getElementById('result').style.display = 'none';

  //Show loader
  document.getElementById('loading').style.display = 'block';

  //set time out
  setTimeout(calculateResult, 2000);

//since it is form submit we want to prevent default behavior
e.preventDefault();
});


//calculateResult function
function calculateResult(){

  //define our variables
  // Ui Variables

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');



  //We need to parse the Loan value as desimal by parsefloat() method
  const principal = parseFloat(amount.value);

  const calculatedInterest = parseFloat(interest.value) / 100 / 12;

  const claculatedPayment = parseFloat(years.value) * 12;


    //algorithm 
    //Compute(claculate) monthly payment

    const x = Math.pow(1 + calculatedInterest, claculatedPayment);

    //for order of operation we put them into prantesis
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    //Now we want to check to see if this monthly value is actually a finite number by using => isFinite() method.
    //The isFinite() function determines whether a number is a finite, legal number.This function returns false if the value is +infinity, -infinity, or NaN (Not-a-Number), otherwise it returns true.

    //if monthly if finite or legal number  so display the result into the result form by using the id
    if(isFinite(monthly)){

      monthlyPayment.value = monthly.toFixed(2);

      //Total payment value
      totalPayment.value = (monthly * claculatedPayment).toFixed(2);

      //Total interest value
      totalInterest.value = ((monthly * claculatedPayment) - principal).toFixed(2);


      // When  user click on submit btn the result will display and the loader will hide

      //show result
      document.getElementById('result').style.display = 'block';
      //hide loader
      document.getElementById('loading').style.display = 'none';

    }else{
      //if user does not input value in the filed or input string value in input field, we want they see an alert which display for about 3 sec and then it disappear. there are several way to do that, like making a div in HTML section and display or hide it  or Create an alert element which i think is the best way

      //callback  show error function with error message
      const error = 'Please check your numbers';
      showError(error);
      
    }


  
}


//showError function
function showError(error){


  //so in order to prevent or hide loader and result display after click on submit btn when user does not input value or input string value

  // hide result
  document.getElementById('result').style.display = 'none';

  //hide loader
  document.getElementById('loading').style.display = 'none';





  //Create Div Element
  const errorDiv = document.createElement('div');

  //Add class name
  errorDiv.className = "alert alert-danger";

  //Create text node and appent to div
  errorDiv.appendChild(document.createTextNode(error));

  //now we need to insert the element to DOM, so we need to get the parent element which is Card and the header because we want to put the error div before header

  const card = document.querySelector('.card');
  const header = document.querySelector('.heading');

  //Insert error above heading by using a method insertBefore() which takes 2 pramters first one is the element which we created and the second one is the target element which we what to insert the created element before of after it.

  card.insertBefore(errorDiv, header);

  //Clear error after 3 second callback function
  setTimeout(clearError, 3000);


}

//clearError function
function clearError(){
  document.querySelector('.alert').remove();
  
}





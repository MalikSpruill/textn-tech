let $signupForm = document.querySelector(".signup-form");
// let $loginForm = document.querySelector('.login-form');
let $signupBtn = document.querySelector('.signup-btn');

const signupFormHandler = async event => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(username, password);
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
      } else {
        console.log('failure');
        alert(response.statusText);
      }
    }
  }

  const loginFormHandler = async event => {
    event.preventDefault(); 

    const username = document.querySelector('#username-login').value;
    const password = document.querySelector('#password-login').value;
  console.log(username, password);
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
    else {
      console.log("Didn't include either a correct username or password.")
    }
  }

// $loginForm.addEventListener('submit', loginFormHandler);
$signupBtn.addEventListener('click', loginFormHandler);
$signupForm.addEventListener("submit", signupFormHandler);
  
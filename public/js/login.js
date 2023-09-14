const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    const response = await fetch(`/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // Drag Activity

      $('.error-modal-close').text('Cancel');
      $('#error-modal').modal();
      $('.error-msg').text('Incorrect username or password, please try again');
      $('#error-modal').modal('open');

      $('.error-modal-close').click(function (event) {
        $('error-modal').modal('close');
      });

    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

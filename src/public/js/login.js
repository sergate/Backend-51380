const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm));
  fetch('/api/session/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: `Bienvenido ${data.firstName + '' + data.lastName}`,
          showConfirmButton: false,
        });
        setTimeout(function () {
          location.replace('/products');
        }, 3000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops! Something went wrong',
          text: json.error,
        });
      }
    });








  // .then((res) => {
  //   if (res.error) {
  //     loginForm.firstChild.textContent = `${res.error}`;
  //     console.log(res.error);
  //     return;
  //   } else {
  //     console.log(res);
  //     location.assign("/products");
  //   }
  // });
});

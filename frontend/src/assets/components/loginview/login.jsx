import { useEffect, useState } from 'react';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function Login() {
  // const [Data, setData] = useState([]);
  useEffect(() => {
    const loginuser = async () => {
      const res = await axios.post('http://localhost:8080/api/session/login/');
      const data = res.data;
      console.log(data);
      // setData = data.data;
    };
    loginuser();
  }, []);
  return (
    <>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      <Button onClick={Login} variant="primary">
        Login
      </Button>
    </>
  );
}
// function Login() {
//   const [data] = useState();
//   useEffect(() => {
//     fetch('/api/session/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data) {
//           Swal.fire({
//             icon: 'success',
//             title: `Bienvenido ${data.firstName + '' + data.lastName}`,
//             showConfirmButton: false,
//           });
//           //   setTimeout(function () {
//           //     location.replace('/products');
//           //   }, 3000);
//         } else {
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops! Something went wrong',
//             // text: json.error,
//           });
//         }
//       });
//   });
// }

export default Login;

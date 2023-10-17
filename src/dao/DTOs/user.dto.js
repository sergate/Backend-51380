// const DTOsUser = (user) => {
//   const newUserDto = {
//     firstName: user.firstName,
//     lastName: user.lastName,
//     role: user.role,
//     email: user.email,
//     last_connection: user.last_connection,
//     documents: user.documents,
//   };
//   return newUserDto;
// };
// module.exports = DTOsUser;

class DTOsUser {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.last_connection = user.last_connection;
    this.documents = user.documents;
    this.cart = user.cart;
  }
}

module.exports = DTOsUser;
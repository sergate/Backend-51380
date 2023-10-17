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
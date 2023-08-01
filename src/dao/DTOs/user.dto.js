class UserDTO {
    constructor(user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.fullName = user.firstName + ' ' + user.lastName;
    }
  }
module.exports = UserDTO;
const DTOsUser = (user) => {
  const newUserDto = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
  };
  return newUserDto;
};
module.exports = DTOsUser;
const DTOsUser = (user) => {
  const newUserDto = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
  return newUserDto;
};
module.exports = DTOsUser;
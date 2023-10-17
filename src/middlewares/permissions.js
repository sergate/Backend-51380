const adminPermission = async (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(402).json({
      status: 'error',
      msg: 'Usuario no autorizado ',
    });
  }
  next();
  //
};

const userPermission = async (req, res, next) => {
  console.log(req.session.user);
  if (!req.session?.user) {
    return res.status(401).json({
      status: 'error',
      msg: 'error usuario no autorizado',
    });
  }
  next();
  // if (!req.session.user || req.session?.user?.role !== 'user') {
  //   return res.status(401).json({
  //     status: 'error',
  //     msg: 'Usuario no autorizado',
  //   });
  // }
  // next();
};
const premiumPermission = async (req, res, next) => {
  if (req.user?.role !== 'admin' || req.user.role !== 'premium') {
    return res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado ',
    });
  }
  next();
};
// const premiumPermission = async (req, res, next) => {
//   if (!req.session.user || req.user.role === 'user') {
//     return res.status(401).json({
//       status: 'error',
//       msg: 'Usuario no autorizado ',
//     });
//   }

//   const { pid } = req.params;
//   await BdProductManager.getProductId(pid);
//   next();
// };

module.exports = {
  adminPermission,
  userPermission,
  premiumPermission,
};
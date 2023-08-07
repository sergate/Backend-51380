const adminPermission = async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
      return res.status(401).json({
        status: 'error',
        msg: 'Usuario no autorizado ',
      });
    }
    next();
  };
  
  module.exports = adminPermission;
const tesTer = (req, res) => {
  req.logger.fatal('Error irreparable');
  req.logger.error('Error de intensisdad media');
  req.logger.warning('Tener Cuidadito');
  req.logger.info('Obteniendo data sensible');
  req.logger.http('Nose');
  req.logger.debug('Encontrar error bobo');
  res.json({});
};
  
module.exports = {
  tesTer,
};
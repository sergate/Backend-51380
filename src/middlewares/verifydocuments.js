const { TYPE_DOCUMENTS } = require('../config/config');

const verifyDocuments = async (req, res, next) => {
  const document = req.user.documents;

  const array = document.filter((element) => TYPE_DOCUMENTS.includes(element.name));

  if (array.length < 3) {
    return res.json({ msg: 'Para ser usuario premium debe subir la documentacion necesaria' });
  }
  next(null, true);
};

module.exports = verifyDocuments;
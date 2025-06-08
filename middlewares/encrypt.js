const CryptoJS = require('crypto-js');
const key = process.env.ENCRYPTION_SECRET;

module.exports = (req, _, next) => {
if (req.body.description) {
req.body.description = CryptoJS.AES.encrypt(req.body.description, key).toString();
}
next();
};

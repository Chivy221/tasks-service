const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const secretKey = process.env.ENCRYPTION_KEY || "mystrongencryptionkey123456789012"; // 32 символа
const iv = crypto.randomBytes(16);

const encrypt = (dataObject) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey.slice(0, 32), iv);
  const jsonString = JSON.stringify(dataObject); // сериализуем объект
  const encrypted = Buffer.concat([cipher.update(jsonString), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex")
  };
};

const decrypt = ({ iv, content }) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey.slice(0, 32),
    Buffer.from(iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final()
  ]);
  return JSON.parse(decrypted.toString()); // десериализуем в объект
};

module.exports = {
  encrypt,
  decrypt
};

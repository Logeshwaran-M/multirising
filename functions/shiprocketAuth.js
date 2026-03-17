const axios = require("axios");
const functions = require("firebase-functions");

const getShiprocketToken = async () => {

const email = functions.config().shiprocket.email;
const password = functions.config().shiprocket.password;

const response = await axios.post(
"https://apiv2.shiprocket.in/v1/external/auth/login",
{
email,
password
}
);

return response.data.token;

};

module.exports = getShiprocketToken;
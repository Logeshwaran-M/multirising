/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const axios = require("axios");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const functions = require("firebase-functions");

/* SHIPROCKET TOKEN FUNCTION */

async function getShiprocketToken() {

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
}


/* CREATE SHIPMENT WHEN ORDER CREATED */

exports.createShipment = onDocumentCreated(
  "users/{userId}/orders/{orderId}",
  async (event) => {

    const order = event.data.data();

    try {

      const token = await getShiprocketToken();

      const response = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        {
          order_id: event.params.orderId,
          order_date: new Date().toISOString(),

          pickup_location: "Primary",

          billing_customer_name: order.name,
          billing_address: order.address,
          billing_city: order.city,
          billing_pincode: order.pincode,
          billing_state: order.state,
          billing_country: "India",
          billing_email: order.email,
          billing_phone: order.phone,

          shipping_is_billing: true,

          order_items: [
            {
              name: order.productName,
              sku: "SKU001",
              units: 1,
              selling_price: order.price
            }
          ],

          payment_method: "Prepaid",

          sub_total: order.price,

          length: 10,
          breadth: 10,
          height: 5,
          weight: 0.5
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      await event.data.ref.update({
        shipment_id: response.data.shipment_id
      });

      logger.info("Shipment created successfully");

    } catch (error) {

      logger.error("Shiprocket Error:", error);

    }

  }
);

const express = require("express");
require("./db/mongoose");
const orderRouter = require("./routers/order");

const app = express();
const port = process.env.PORT;
const maxCapacity = process.env.MAX_CAPACITY;

app.use(express.json());
app.use(orderRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
  console.log(
    "Maximum capacity of milk per day is fixed to " + maxCapacity + " Litres."
  );
});

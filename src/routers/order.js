const express = require("express");
const Order = require("../models/order");
const router = new express.Router();

router.post("/add", async (req, res) => {
  const dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  if (month < 10) {
    month = "0" + String(month);
  }
  if (day < 10) {
    day = "0" + String(day);
  }

  nowdate = day + "-" + month + "-" + year;
  const order = new Order({
    ...req.body,
    orderPlacedOn: nowdate,
  });

  try {
    await order.save();
    res.status(201).send(order);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["orderedBy", "contact", "requiredCapacity"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const order = await Order.findOne({
      _id: req.params.id,
    });

    if (!order) {
      return res.status(404).send();
    }
    console.log(order["orderPlacedOn"].getUTCDate());

    updates.forEach((update) => (order[update] = req.body[update]));
    await order.save();
    res.send(order);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/updateStatus/:id", async (req, res) => {
  const allowedNewStatuses = ["placed", "packed", "dispatched", "delivered"];
  const newStatus = req.body["orderStatus"];
  if (allowedNewStatuses.includes(newStatus)) {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
      });

      if (!order) {
        return res.status(404).send();
      }

      order["orderStatus"] = newStatus;
      await order.save();
      res.send(order);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
    });

    if (!order) {
      res.status(404).send();
    }

    res.send(order);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/checkCapacity/:date", async (req, res) => {
  const date = req.params.date;

  try {
    let remainingCapacity = Number(process.env.MAX_CAPACITY);

    const orders = await Order.find(
      { orderPlacedOn: date },
      "requiredCapacity"
    );

    orders.forEach((order) => {
      remainingCapacity -= order["requiredCapacity"];
    });

    res.send({ "Milk left for the day(in litres)": remainingCapacity });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

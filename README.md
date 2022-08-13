This is the milk-orders-manager API
This API has been hosted in MongoDB Atlas and is deployed on Heroku.
The link is https://milk-orders-manager.herokuapp.com/

The endpoints of milk-orders-manager API are:

1. /add will add a new order
   Here the required attributes and their values are given as a JSON object which must inlcude orderedBy(name of user who ordered for milk), contact (10 digit mobile number of the user) and requiredCapacity(capacity of milk which will be ordered). The order status is by default set to 'placed' and can be updated. The orderPlacedOn attribute will store the date on which the order is placed.
2. /update/:id route will update order details
   The user will have to give JSON object with attributes they want to update and their values. The attributes which are allowed for updation are orderedBy, contact and requiredCapacity
3. /updateStatus/:id route will update the status{placed,packed,dispatched,delivered} of order with ID as id
4. /delete/:id route will delete the order with given id
5. /checkCapacity/:date will return the capacity of milk left(in litres) as per all orders for the day.

Note:

1. Max capacity of milk for a day is fixed to 100 litres.

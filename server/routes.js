const express = require('express');
const checkAuth = require('./middleware/check-auth.js');
const {signUpController} = require('./controllers/signupController.js');
const {getAllUsers,fetchAllPizzas,postPizza,updateInv,fetchInventory,addToInvwntory,customPizza, fetchOrders, fetchFilteredOrders, postOrders} = require('./controllers/testController.js');
const {loginController} = require('./controllers/loginController.js');


const router = express.Router();


router.post('/signup',signUpController);
router.post('/login',loginController);
router.get('/test/getAllUsers',getAllUsers);
router.get('/test/fetchAllPizzas',fetchAllPizzas);
router.post('/test/postpizza',checkAuth,postPizza);
router.post('/test/custom',customPizza);

//

//Inventory Admin Routes

router.get('/test/inv',fetchInventory);
router.post('/test/inv/add',addToInvwntory);
router.post('/test/inv/update',updateInv);

//Orders Routes

router.get('/test/orders',fetchOrders)
router.get('/test/orders/filters',fetchFilteredOrders)
router.post('/test/orders/post',postOrders)


module.exports = {router};
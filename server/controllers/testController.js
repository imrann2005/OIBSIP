const { mongoose } = require('mongoose');
const { UserModel } = require('../models/userSchema.js');
const { Pizza } = require('../models/PizzaSchema.js');
const InventoryModel = require('../models/inventorySchema.js');
const OrderModel = require('../models/order.js');
const e = require('express');

let PIZZA_PRICE_BASE = 100;

const getAllUsers = async (req, res) => {

    UserModel
        .find({})
        .populate('orders')
        .exec()
        .then(r => {
            if (r.length == 0) return res.status(404).json({ msg: 'No available users' })
            return res.status(200).json({ msg: 'All Users Fetched Succesfully', users: r })
        })
        .catch(e => console.log(e))
}

const fetchAllPizzas = async (req, res) => {

    try {
        const allPizzas = await Pizza.find({});
        console.log(allPizzas);
        if (allPizzas.length == 0) return res.status(404).json({ msg: "No Pizzas Available " });
        res.status(200).json({ msg: "Fetched", pizza: allPizzas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const postPizza = async (req, res) => {
    //console.log(req.body);
    const { name, base, veggies, toppings, qty, price } = req.body;

    try {
        const pizza = await Pizza.findOne({ name: name });
        if (pizza) {
            const updatedPizza = await Pizza.findOneAndUpdate(
                { _id: pizza._id },
                { $inc: { qty: 1 } },
                { new: true }
            );
            console.log(updatedPizza);
            await updatedPizza.save();
            res.status(204).json({ msg: "Pizza Quantitiy updated by 1" });
        }
        else {
            const newPizza = await new Pizza(req.body);
            console.log(newPizza);
            await newPizza.save();
            res.status(201).json({ msg: "New Pizza Added Succesfully!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });

    }
}

const addToInvwntory = async (req, res) => {
    console.log(req.body);
    const { itemName, itemCategory, qty } = req.body;
    try {
        InventoryModel.findOne({ itemName: itemName })
            .exec()
            .then(result => {
                if (result) return res.status(409).json({ msg: 'Item Already exists in inventory' });
            })
            .catch(e => console.log(e))

        const newItem = new InventoryModel(req.body);
        //console.log(newItem);

        await newItem.save();

        return res.status(201).json({ msg: 'Item saved in inventory!', newItem });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

const fetchInventory = async (req, res) => {
    //console.log(req.body);
    InventoryModel.find({})
        .exec()
        .then(r => {
            if (r.length > 0) return res.status(200).json({ msg: 'Inevtory Fetched', inventory: r })
            return res.status(404).json({ msg: 'No Items in inventory' })
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({ msg: "Internal Server Error", e });
        })
}

const updateInv = async (req, res) => {
    //console.log(req.body);
    const { itemName, qty } = req.body;

    InventoryModel.findOneAndUpdate({
        itemName: itemName
    }, {
        qty: qty
    }, {
        new: true,
    })
        .exec()
        .then(n => {
            return res.status(200).json({ msg: 'Item updated in Inventory!', updatedItem: n })
        })
        .catch(e => {
            console.log(e);
            return res.status(500).json({ msg: "Internal Server Error", e });
        })
}

const customPizza = async (req, res) => {
    console.log(req.body);
    const { name, base, veggies, cheese, sauce, meat, qty, price } = req.body;
    //let {price} = req.body;
    //price += PIZZA_PRICE_BASE;
    InventoryModel.find({ itemName: { $in: [veggies, cheese, sauce, base, meat] } })
        .select('_id qty')
        .exec()
        .then(r => {
            if (r.length < 5) return res.status(409).json({ msg: "Some items out of stock" })
            const item = r.find(e => e.qty < qty)
            if (item) return res.status(409).json({ msg: "Some items insufficient in qty!" });

            //Update Inventory
            const updates = r.map(item => ({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $inc: { qty: -qty } }
                }
            }))
            return InventoryModel.bulkWrite(updates)




        })
        .then(rr => {
            //Create new Pizza
            const newPizza = new Pizza(req.body);
            newPizza.save()
                .then(p => { return res.status(201).json({ msg: 'New Pizza Created!', pizza: p }) })
        })
        .catch(e => console.log(e))


}

const fetchOrders = async (req, res) => {
    OrderModel
        .find({})
        .populate('user')
        .populate('pizza')
        .exec()
        .then(r => {
            if (r.length == 0) return res.status(404).json({ msg: 'No orders available' })
            return res.status(200).json({ msg: 'All Orders Fetched', Orders: r })
        })
        .catch(e => console.log(e));
}

const postOrders = async (req, res) => {
    console.log(req.body);
    const { pizza, user } = req.body;

    Pizza.findOne({ _id: pizza })
        .exec()
        .then(r => {
            if (!r) return res.status(404).json({ msg: 'No pizza found with given id' })
        })
        .catch(e => console.log(e))

    UserModel
        .findOne({ _id: user })
        .exec()
        .then(r => {
            if (!r) return res.status(404).json({ msg: 'No user found with given id' })
        })
        .catch(e => console.log(e))

    const newOrder = new OrderModel(req.body)
    //console.log(newOrder);
    newOrder
        .save()
        .then(r => {
            return UserModel.findOneAndUpdate({ _id: user }, {
                $push: { orders: r._id }
            }, {
                new: true,
            })
        })
        .then(rr => {
            res.status(200).json({ msg: 'Order Saved Successfully', updatedUser: rr })
        })
        .catch(e => console.log(e))
}

const fetchFilteredOrders = async (req, res) => {
    //console.log(req.query);
    const { userId } = req.query;
    if (userId) {

    }
}

module.exports = { getAllUsers, fetchAllPizzas, postPizza, fetchInventory, addToInvwntory, updateInv, customPizza, fetchOrders, fetchFilteredOrders, postOrders };
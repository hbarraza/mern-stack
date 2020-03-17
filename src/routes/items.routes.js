const express = require('express');
const router = express.Router();

const Item = require('../models/item'); //para conectar con el modelo 

//Get all items
router.get('/', async (req, res) => {
    const items = await Item.find();    
    res.json(items);
});

//Get one item
router.get('/:id', async(req, res) => {
    const item = await Item.findById(req.params.id)
    res.json(item);
})

//Post item
router.post('/', async(req, res) => {
    const { title, description } = req.body;
    const item = new Item({
        title,
        description
    })
    await item.save();    
    res.json({
        status: 'item guardado'
    });
});

//Update item
router.put('/:id', async(req, res) => {
    const { title, description } = req.body;
    const newItem = { title, description };
    await Item.findByIdAndUpdate(req.params.id, newItem);
    res.json({ status: 'item actualizado' })
})

//Delete item
router.delete('/:id', async(req, res) => {
    await Item.findByIdAndRemove(req.params.id)
    res.json({ status: 'Item eliminado' })
})

module.exports = router;
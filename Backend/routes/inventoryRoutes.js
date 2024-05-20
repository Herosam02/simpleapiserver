const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/InventoryController');

router.get('/', InventoryController.getAllInventory);
router.post('/', InventoryController.addInventoryItem);
router.put('/:id', InventoryController.updateInventoryItem);
router.delete('/:id', InventoryController.deleteInventoryItem);

module.exports = router;
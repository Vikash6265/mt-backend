// add data route

const express = require('express');
const {getCrud, addCrud, removeCrud, updateCrud, getSingleCrud, pinnedCrud } = require('../controllers/crudController');

const router = express.Router();

router.get("/",getCrud);

router.get("/:id",getSingleCrud)

router.post("/", addCrud);

router.delete("/:id",removeCrud);

router.put("/:id",updateCrud);

module.exports = router;
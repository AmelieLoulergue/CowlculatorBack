const express = require("express");
const router = express.Router();

const Result = require("../models/result");
const auth = require("../middleware/auth");

const resultCtrl = require("../controllers/result");
const ibmCtrl = require("../controllers/ibmCloud");
//ROUTE GET
router.get("/", resultCtrl.getResults);
// ROUTE SHOW
router.get("/:id", (req, res, next) => {
  Result.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result: result }))
    .catch((error) => res.status(404).json({ error }));
});
// ROUTE POST
router.post(
  "/",
  auth,
  resultCtrl.createResult,
  resultCtrl.getResults,
  ibmCtrl.createIbmCloudData
);

// ROUTE UPDATE
router.put("/:id", (req, res, next) => {
  Result.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
});

// DELETE
router.delete("/:id", (req, res, next) => {
  Result.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
});
module.exports = router;
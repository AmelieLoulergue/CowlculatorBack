const express = require("express");
const router = express.Router();

const Result = require("../models/result");
const auth = require("../middleware/auth");

const resultCtrl = require("../controllers/result");
const ibmCtrl = require("../controllers/ibmCloud");
//ROUTE GET
router.get("/", resultCtrl.getResults);
router.get("/researcher", resultCtrl.getResultsResearcher);
// ROUTE SHOW
router.get("/user/:userId", (req, res, next) => {
  Result.find()
    .then((result) =>
      res.status(200).json({
        result: result.filter(
          (element) => element.user._id.valueOf() === req.params.userId
        ),
      })
    )
    .catch((error) => res.status(404).json({ error }));
  // Result.findOne({ _id: req.params.id })
  //   .then((result) => res.status(200).json({ result: result }))
  //   .catch((error) => res.status(404).json({ error }));
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

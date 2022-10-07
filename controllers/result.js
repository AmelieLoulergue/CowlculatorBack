const Result = require("../models/result");
exports.createResult = (req, res, next) => {
  delete req.body._id;
  const result = new Result({
    user: req.auth.userId,
    result: req.body.result,
    response: req.body.response,
  });
  // console.log(result);
  result
    .save()
    .then(() => {
      res.status(201).json({
        userId: result.user,
        result: result.result,
        response: result.response,
      });
      next();
    })
    .catch((error) => res.status(400).json({ error }));
};
exports.getResults = (req, res, next) => {
  // console.log("coucou");
  // console.log(Result);
  Result.find()
    .then((result) => {
      res.locals.allResults = result;
      next();
    })
    .catch((error) => res.status(400).json({ error }));
};

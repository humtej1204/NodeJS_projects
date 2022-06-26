const router = require('express').Router();

const apiTestRouter = require('./api/test');

router.use('/test', apiTestRouter);

module.exports = router;

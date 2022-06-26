const router = require('express').Router();

const middlewares = require('./middlewares');

const apiPackageRouter = require('./api/package');
const apiCategoryRouter = require('./api/category');
const apiSubCatRouter = require('./api/subcateg');
const apiUserRouter = require('./api/users');


router.use('/package', middlewares.validateToken, apiPackageRouter);
router.use('/category', apiCategoryRouter);
router.use('/subcategory', apiSubCatRouter);
router.use('/user', apiUserRouter);

module.exports = router;

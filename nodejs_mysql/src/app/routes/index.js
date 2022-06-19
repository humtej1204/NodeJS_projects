const express = require('express');
const router = express.Router();

const pool = require('../../config/dbConnection');

router.get('/', async (req, res) => {
	const list_info = await pool.query(`SELECT packages.name as packages_name,
categories.name as category_name,
subcateg.name as subcateg_name,
packages.description,
packages.price
FROM pack_subcat
INNER JOIN packages ON packages.id=pack_subcat.package_id
INNER JOIN subcateg ON subcateg.id=pack_subcat.subcateg_id
INNER JOIN categories ON categories.id=subcateg.category_id`);
	console.log(list_info);
    res.render('add/index', {list_info: list_info});
});

module.exports = router;

const express = require('express');
const router = express.Router();

const pagesController = require('../../controller/frontend/pages');
router.get('/', pagesController.home);

router.get('/about-us', pagesController.about);

router.get('/tour', pagesController.tour);

router.get('/contact-us', pagesController.contact);

router.post('/contact-us', pagesController.contact_post);
router.get('/:slug', pagesController.default);

//router.get('*', pagesController.not_found);

module.exports = router;
const Router = require('koa-router');
const indexCtrl = require(`../controllers/index.js`);
const uploadCtrl = require(`../controllers/upload.js`);
const showroomCtrl = require(`../controllers/showroom.js`);
const router = new Router();

router.get('/', indexCtrl);
router.get('/showroom', showroomCtrl);
router.post('/upload', uploadCtrl);

module.exports = router;

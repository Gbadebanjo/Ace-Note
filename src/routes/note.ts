import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("respond with a resource from note");
//   res.render('index', { title: 'Express' });
});
router.post('/', function (req, res, next) {
    res.send("respond with resource from note")
});

router.put('/', function (req, res, next) {
    res.send("respond with resource from note")
});

router.delete('/', function (req, res, next) {
    res.send("respond with resource from note")
});

export default router;
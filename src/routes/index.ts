import express from "express";
const router = express.Router();

/* GET home page. */
// /
router.get("/", function (req, res, next) {
  res.render("Home");
});

// /register
router.get("/register", function (req, res, next) {
  res.render("Register");
});

// /login
router.get("/login", function (req, res, next) {
  res.render("login");
});

// /about
router.get("/about", function (req, res, next) {
  res.render("About");
});

// // Handle 404
// router.get('*', function(req, res) {
//   res.status(404).render("404")
// })

export default router;

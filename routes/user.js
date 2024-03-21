const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log("User Request Time: ", Date.now());
    next();
})

// define the base user page routes
// note that the base route "/" is actually
// "/user/", because of the way the main app
// uses this router within index.js

// everything in here starts with base route and /user/
router
    .route("/")
    .get((req, res) => {
        res.send("Get User");
    })
    .post((req, res) => {
        res.send("create user");
    })
    .delete((req, res) => {
        res.send("Delete user");
    })

// define a user setting page
// this route is /user/settings but we only use '/settings'
// because the /user part is how we got here
router.get("/settings", (req, res) => {
    res.send("Get User Settings");
})

module.exports = router;
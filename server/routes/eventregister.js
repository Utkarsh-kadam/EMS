const express = require("express");
const router = express.Router();

const {
  postRegisterEvent
} = require("../controller/registerevent");



router.post("/", postRegisterEvent);

module.exports = router;
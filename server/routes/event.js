const express = require("express");
const router = express.Router();

const {
    getAllEvent,
    getEvent,
    postCreateEvent,
    putUpdateEvent,
    deleteEvent,
} = require("../controller/event");


router.get("/", getAllEvent);

router.get("/:id", getEvent);

router.post("/", postCreateEvent);

router.put("/:id", putUpdateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
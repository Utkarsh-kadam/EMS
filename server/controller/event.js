const Event = require("../db/eventModel");

exports.getAllEvent = (req, res) => {
    Event.find()
        .then((event) => res.json(event))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Event not found", error: err.message })
        );
};

exports.getEvent = (req, res) => {
    Event.findById(req.params.id, req.body)
    .then((event) => res.json(event))
    .catch((err) =>
        res
            .status(400)
            .json({ message: "Failed to get event", error: err.message })
    );
};

exports.postCreateEvent = (req, res) => {
    Event.create(req.body)
        .then((data) => res.json({ message: "Event added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add event", error: err.message })
        );
};

exports.putUpdateEvent = (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update event", error: err.message })
        );
};

exports.deleteEvent = (req, res) => {
    Event.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
            res.json({ message: "event deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "book not found", error: err.message })
        );
};
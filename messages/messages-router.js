const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        //SQL Command: SELECT * FROM "Messages";
        const messages = await db.select("*").from("messages")

        res.json(messages)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try { //translates to SELECT * FROM messages WHERE id=?;
        const [message] = await db
        .select("*")
        .from("messages")
        .where("id", req.params.id)
        .limit(1)

        res.json(message)
    } catch (err) {
        next(err)
    }

})

router.post("/", async (req, res, next) => {
    try {
        //translates to INSERT INTO messages (title, contents) VALUES (?, ?);
        const [id] = await db
            .insert({
                //database will automatically generate the id
                title: req.body.title,
                contents: req.body.contents,
            })
            .into("messages")

            //translates to SELECT * FROM messages WHERE id = ? LIMIT 1;
            const message = await db
            .select("*")
            .from("messages")
            .where("id", id)
            .first() //converts to limit 1

            res.status(201).json(message)

    } catch (er) {
        next(err)
    }
})

router.put("/:id", (req, res, next) => {

})

router.delete("/:id", (req, res, next) => {

})

module.exports = router
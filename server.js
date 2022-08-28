const express = require("express");
const mongodb = require("mongodb").MongoClient;

const app = express();
const port = 3001;

const connectionURI = `mongodb://127.0.0.1:27017/apiDB`;

let db;

mongodb.connect(
  connectionURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.json());

app.post("/createUser", (req, res) => {
  db.collection("userCollection").insertOne(
    {
      username: req.body.username,
      email: req.body.email,
      thoughts: req.body.thoughts,
      friends: req.body.friends,
    },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.post("/createThought", (req, res) => {
  db.collection("thoughtCollection").insertOne(
    {
      thoughtText: req.body.thoughtText,
      createdAt: req.body.createdAt,
      username: req.body.username,
      reactions: req.body.reactions,
    },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get("/readUsers", (req, res) => {
  db.collection("userCollection")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

app.get("/readThoughts", (req, res) => {
  db.collection("thoughtCollection")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

app.delete("/deleteUser", (req, res) => {
  db.collection("userCollection").deleteOne(
    { _id: ObjectId(req.body.id) },
    (err) => {
      if (err) throw err;
      res.send("User deleted.");
    }
  );
});

app.delete("/deleteThought", (req, res) => {
  db.collection("thoughtCollection").deleteOne(
    { _id: ObjectId(req.body.id) },
    (err) => {
      if (err) throw err;
      res.send("Thought deleted.");
    }
  );
});

const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://totomongodb:27017/test");

// const db = mongoose.connection;

const kittySchema = new mongoose.Schema({
  name: String,
});
const Kitten = mongoose.model("Kitten", kittySchema);

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/get-test", async (req, res) => {
//   try {
//     const data = await db.collection("testCollection").find({}).toArray();
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/get-data", async (req, res) => {
  try {
    const kittens = await Kitten.find();
    res.json(kittens);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/set-data", async (req, res) => {
  try {
    const names = [
      "Whiskers",
      "Mittens",
      "Shadow",
      "Simba",
      "Luna",
      "Oliver",
      "Leo",
      "Bella",
      "Chloe",
      "Max",
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newKitten = new Kitten({ name: randomName });
    await newKitten.save();
    res.json(newKitten);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

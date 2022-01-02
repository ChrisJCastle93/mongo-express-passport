const express = require("express"); // Gets Express
const path = require("path"); // Sorts out filepath names
const exphbs = require("express-handlebars"); // Installs Handlebars for JS templating
const app = express(); // Invokes Express
const mongoose = require("mongoose"); // Installs mongoose
const uuid = require("uuid"); // creates unique ids
const router = express.Router(); // allows us to set up routes
// const Schema = mongoose.Schema;
const Member = require('./models/members');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// MONGOOSE

mongoose
  .connect(
    "mongodb+srv://chrisjcastle:dougal22@cluster0.l8tnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) =>
    console.log(`Connected to Mongo`)
    // console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// MOONGOOSE MODEL - MOVED TO ROUTES FOLDER

// const memberSchema = new Schema({
//   id: Number,
//   name: String,
//   email: String,
//   status: String,
// });

// const Member = mongoose.model("Member", memberSchema);

// USER CREATION - now doing through form

// const data = {
//   // id: uuid.v4(),
//   id: 1,
//   name: "Chris Castle",
//   email: "chris@gmail.com",
//   status: "inactive",
// };

// SAVE TO DATABASE - use as function - moved to models

// Member.create(data) 
//   // .then(user => console.log('The user is saved and its value is: ', user))
//   .then(user => console.log('The user is saved.'))
//   .catch((error) =>
//     console.log("An error happened while saving a new user:", error)
//   );

// GET MEMBERS - use as function - moved to models

// Member.find()
//   // .then(members => members.forEach( member => console.log(member.name)))
//   .then(members => console.log(`Number of members: ${members.length}`))
//   .catch(error => console.log(`An error happened: ${error}`));

// API ROUTES - uses routes from routes folder

app.use("/api/members", require("./routes/api/members.js"));

// CLIENT ROUTES - Client side routing. Example in comments about showing what's in database.

// app.get("/", (req, res) => {
//   res.render("index", { title: "Member App", membersArr, });
// });

app.get("/", (req, res) => {
  Member.find().lean().exec(function (err, members) {
    res.render("index", { title: "Member App", members });
  });
});

// Handlebars Middleware.
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


// PORT SETUP
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

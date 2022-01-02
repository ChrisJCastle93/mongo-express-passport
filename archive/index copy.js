const express = require("express"); // Gets Express
const path = require("path"); // Sorts out filepath names
const exphbs = require("express-handlebars"); // Installs Handlebars for JS templating
const app = express(); // Invokes Express
const mongoose = require("mongoose"); // Installs mongoose
const uuid = require("uuid"); // creates unique ids
const router = express.Router(); // allows us to set up routes

// module.exports = members;

// Init middleware
// app.use(logger);

// MONGOOSE

// Set up Mongoose. Follow this syntax, and set up the cloud in Cloud Atlas in the browswer. You will need to set up database access, user access, and network access to be able to utilise it successfully. Use the Mongo commands (brew services, mongosh etc) to fire up the database.

mongoose
  .connect(
    "mongodb+srv://chrisjcastle:dougal22@cluster0.l8tnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// Mongoose allows us to set up data models to be used by MongoDB. In the below, our class is called 'Member', and when we save one of these (later on) MongoDB will create or save to a collection called members (note: plural and lowercase version of the class). Our database collection will have fields based on the keys that we set here.

const memberSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  status: String,
});

const Member = mongoose.model("Member", memberSchema);

// Create new member. Here, we are manually instantiating a new member from the class that we created above. Note, we don't actually run it here, we simply set it to a variable to be invoked later.

// let membersArr = [];

// const member = new Member({
//   id: 4,
//   name: "JJ Williams",
//   email: "bob@gmail.com",
//   status: "inactive",
// });

// Save member. This is the syntax for a promise, that is resolved by the .then(). The parameter newMember can be called anything - it's just what is returned by the .save() promise. This is Mongoose syntax.

// member
//   .save()
//   .then((newMember) => console.log(`A new member is created: ${newMember}!`))
//   .catch((err) => console.log(`Error while creating a new member: ${err}`));

// SAME AS ABOVE USING PROMISES

const data = {
  id: 10,
  name: "CAstle",
  email: "chris@gmail.com",
  status: "inactive",
};

Member.create(data)
  // .then(user => console.log('The user is saved and its value is: ', user))
  .catch((error) =>
    console.log("An error happened while saving a new user:", error)
  );

// // Gets All Members. This is Mongoose syntax. Here I declared a variable called members, then called the database to access all the members in there before console logging the member name. In this example I put this inside our get route so that everything executres in the correct order.

// Member.find({}, (err, members) => {
//   if (err) {
//     console.log(`Error occurred during getting members from DB: ${err}`);
//     return;
//   }
//   console.log(members)
//   // members.forEach((member) => membersArr.push(member));
// });

// Member.find()
// .then(members => members.forEach( member => console.log(member.name)
// .catch(error => console.log(`An error happened: ${error}`));

// =======================================================
// =======================================================
// =======================================================

// EXPRESS ROUTES. We've used express.Router() so we start with router.get instead of app.get. The params (req, res) represent the request data we receive at the URL specified, and res is what we send back to the client.

// API ROUTES
// We set up our middleware here to allow us to use router. In this case we are using router for our API routes. Here we are specifying that when this URL is used, we use the routes that are in the filepath we specified. So, when /api/members/ is accessed, we will access the members file in the routes folder. This contains are get, post, put, delete routes for the members.

app.use("/api/members", require("../routes/api/members"));

// CLIENT ROUTES. These are what the user sees when they access the browser URL. In this first example, when the homepage is accessed we send back the index.handlebars file, as well as a new title and the members object. Note - haven't figured out how to make the code async yet..., so members array just returns a promise.

// app.get("/", (req, res) => {
//   res.render("index", { title: "Member App", membersArr, });
// });

app.get("/", (req, res) => {
  Member.find().lean().exec(function (err, members) {
    res.render("index", { title: "Member App", members });
  });
});

// =======================================================
// =======================================================
// =======================================================

// Handlebars Middleware. This sets the templates we can use in the client. We have our views/folder which has files indexed with .handlebars, which we will render.
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Body Parser Middleware. This simply helps interpret the data we receive from the client in the req param.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // Set static folder. This is probably not needed. It's used for serving static files. We're using dynamic files (handlebars).
// app.use(express.static(path.join(__dirname, "public")));

// PORT SETUP

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

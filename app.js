const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log('connected to DB');
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);

}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// index route to show all listings
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})
});

// new route to show form to create new listing
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
});

// create route
app.post("/listings", async (req, res)=>{
const newListing = new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");
});

// Sample route to test if listing can be created and saved to DB
app.get("/listings/:id", async (req, res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});


// app.get("/testListing", async (req, res)=>{
//     const listing = new Listing({
//         title: "Test Listing",
//         description: "This is a test listing",
//         price: 100,
//         location: "Test Location",
//         country: "Test Country"
//     });
//     await listing.save();
//     console.log('sample was saved');
//     res.send("successful testing");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
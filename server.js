const express = require('express');
const socketIO = require('socket.io');

// Create an express app
const app = express();

// Set up the server
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



const mongoose = require("mongoose");
const path = require("path");
const hbs = require("ejs");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/hritik_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB", error));
  

// Set up the EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname));

// Configure Express middleware
app.use(express.urlencoded({ extended: true }));


const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    
      // message: { type: String, required: true },
    
  });
  
  const Users = mongoose.model("Users", contactSchema);

app.get("/", (req, res) => {
    res.render("login")
})
app.get("/signup", (req, res) => {
     res.render("signup")
})
   
app.post("/signup", async (req, res) => {
    

    try {
        const newContact = new Users({
          name: req.body.name,
          password: req.body.password,
          
            // message: req.body.message,
          
        });
    
        await newContact.save();
        // res.render("index");
        res.render("check");
      } catch (error) {
        console.error("Error saving contact form data:", error);
        res.render("error");
      }

})

app.post("/login", async (req, res) => {
    try {
        const check = await Users.findOne({ name: req.body.name })
        if (check.password === req.body.password) {
            // res.render("index")
            res.render("check");
        }
        else {
            res.send("wrong password")
        }
    }
    catch {
        res.send("invalid credential")
    }

})














// Create a socket.io instance
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

const users = {};
io.on('connection', socket => {
    
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log(name, "joined the chat");
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        console.log(message);
        io.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        console.log("A user disconnected from the chat");
        delete users[socket.id];
    });
});






/*const express = require('express');
const socketIO = require('socket.io');

// Create an express app
const app = express();

// Set up the server
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Create a socket.io instance
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

const users = {};
io.on('connection', socket => {
    
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log(name, "joined the chat");
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        io.emit('receive', { message: message, name: users[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        console.log("A dissconnect the chat");
        delete users[socket.id];
    });
})
*/










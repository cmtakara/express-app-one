// console.log('script is running');
const express = require("express");
const app = express();
// using all caps for PORT because it is a constant
const PORT = 3000;
const cookieParser = require("cookie-parser");

app.use(express.static("./styles"));

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

const fs = require('fs');

// define the template engine
// app.engine(extension, callback)
// extension is a file extension that you define
//       that means that all views using this template engine
//      end with that extension
app.engine("perscholas", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        // Here, we take the content of the template file,
        // convert it to a string, and replace sections of
        // it with the values being passed to the engine.

        const rendered = content
            .toString()
            .replaceAll('#title#', `${options.title}`)
            .replace('#content#', `${options.content}`)
            .replace("#href#", `${options.href}`)
            .replace('#text#', `${options.text}`);
            return callback(null, rendered);
    })
})

app.set("views", "./views");    // specify the views directory
app.set("view engine", "perscholas");   // register the template engine



async function validateCookies(req, res, next) {
    await cookieValidator(req.cookies);
    next();
}

async function cookieValidator(cookies) {
    console.log(cookies);
    // we don't have any cookies, so we will just return true
    return true;
}

app.use(cookieParser());
app.use(validateCookies);

const logReq = function (req, res, next) {
    console.log('Request Received');
    next();
}

app.use(logReq);

// check http://localhost:3000/
// but these routes will only work while our server is running
// all of our routes will have the following structure
// app._method_(path, handler)
// _method_ will be one of the http methods, such as get or post...
// the path will be the relative path in our application
// the handler is function that is executed when the route is matched
// you can look at slides 12-17 to see how you can use the concept of regular expressions with routes

// ROUTES
// remember the http methods 
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
// get, post, put (or patch), delete

app.get("/", (req, res) => {
    // res.send("Try navigating to /user.");
    const options = {
        title: "Rendering Views with Express",
        content:
        "Here, we've created a basic template engine using <code>app.engine()</code> \
        and the <code>fs</code> module, then used <code>res.render</code> to \
        render this page using custom content within the template.<br><br> \
        Generally, you won't want to create your own view engines, \
        but it important to understand how they work behind the scenes. \
        For a look at some popular view engines, check out the documentation for \
        <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
        <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
        <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
        More complete front-end libraries like React, Angular, and Vue \
        also have Express integrations.",
    };

    res.render("index", options);
})

app.get("/example", (req, res) => {
    const options = {
        title: "Another example",
        content: "<h2> This is another way to add content </h2> \
        <form> \
        <input type='text'> \
        <input type='submit'> \
        </form>",
    }
    res.render("index", options)
})

app.get("/newPage", (req, res) => {
    // res.send("Try navigating to /user.");
    const options = {
        title: "New Page",
        content: "Demonstrating a different file within the view engine",
        text: "Go to google",
        href: "https://www.google.com"
    };

    res.render("newPage", options);
})

app.get("/express", (req, res) => {
    res.send("creating routes with express...");
})

app.get("/express2", (req, res) => {
    res.redirect('/express');
})

app.get("/search", (req, res) => {
    res.redirect('https://www.google.com');
})

// // routes need to be unique but that comes with both the http method and the path
// app.get("/user", (req, res) => {
//     res.send(`Received a GET request for user! Try navigating to /user/somevalue/profile/somevalue`);
// })


// app.get("/user/list", (req, res) => {
//     res.send('THIS SHOW LIST a page that lists all users')
// })

// app.get("/user/:userID", (req, res) => {
//     res.send(`Navigated to the user page for: ${req.params.userID}`)
// })

// app.get("/user/:userID/profile", (req, res) => {
//     res.send(`Navigated to the profile page for: ${req.params.userID}`);
// })

// app.get("/user/:userID/profile/:data", (req, res) => {
//     res.send(`Navigated to the user profile page for: ${req.params.userID}, with the data: ${req.params.data}`);
// })

// // this is unique because this method is not the same as the one above
// app.post("/user", (req, res) => {
//     res.send("received a POST request for user!")
// })

// app.use(logReq);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})


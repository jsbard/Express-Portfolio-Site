const express = require("express");
const data = require("./data.json");
const app = express();

// Specify port for deployment to Heroku
// let port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use('/static', express.static('public'));

app.get("/", (req, res) => {
   res.render("index", data.projects);
});

app.get("/about", (req, res) => {
   res.render("about");
});

// For every project in data.json, create a route for the project and use the project.pug template for each
for (let i=0; i<data.projects.length; i++){
   app.get(`/project/${data.projects[i].id}`, (req, res) => {
      res.render("project", data.projects[i]);
   });
}

// Handle 404 errors specifically
app.use((req, res, next) => {
   const err = new Error();
   err.message = "Couldn't find the page you were looking for....";
   err.status = 404;
   res.render("page-not-found", err);
   next(err);
});


// Handle all other server errors
app.use((err, req, res, next) => {
      if (!err.message) {
         err.message = "Something funky happened on our end...";
      }
      res.render("error", err);
      console.error(`Error: ${err.status} \n ${err.message}`);
});


app.get("/page-not-found}", (req, res) => {
   res.render("page-not-found");
});

// For deployment to Heroku, use the variable "port" and uncomment the lines at the top of this file
app.listen(3000, () => {
   console.log("Listening on port 3000.....");
});
const express = require("express");
const data = require("./data.json");
const app = express();

app.set("view engine", "pug");
app.use('/static', express.static('public'));

app.get("/", (req, res) => {
   res.render("index", data.projects);
});

app.get("/about", (req, res) => {
   res.render("about");
});

for (let i=0; i<data.projects.length; i++){
   app.get(`/project/${data.projects[i].id}`, (req, res) => {
      res.render("project", data.projects[i]);
   });
}

app.use((req, res, next) => {
   const err = new Error();
   err.message = "Couldn't find the page you were looking for....";
   err.status = 404;
   next(err);
});

app.use((err, req, res, next) => {
      res.send(`<h1>${err.status}</h1><h2>${err.message}</h2>`)
});

app.listen(3000, () => {
   console.log("Listening on port 3000.....");
});
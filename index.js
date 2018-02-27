const Users = require("./models").user;
const Incidents = require("./models").Incident;
const bodyParser = require("body-parser");

let express = require("express");

let app = express();
let router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router
  .route("/user")
  .get((req, res) => {
    Users.findAll({
      include: { model: Incidents, attributes: ["id", "title", "description"] }
    }).then(records => {
      res.status(200).send({ data: records, status: "success" });
    });
  })
  .post((req, res) => {
    let name = req.body.name;
    Users.create({
      name
    })
      .then(user => {
        if (req.body.incidentId) {
          Incidents.findById(req.body.incidentId).then(incident => {
            return incident.addUser(user);
          });
        } else {
          return user;
        }
      })
      .then(user => {
        res.status(201).send({ data: user, status: "success" });
      });
  });

router
  .route("/incident")
  .get((req, res) => {
    Incidents.findAll({
      include: [
        {
          model: Users,
          through: {
            attributes: ["createdAt", "startedAt", "incidentId", "userId"]
          }
        }
      ]
    });
  })
  .post((req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    Incidents.create({
      title,
      description
    }).then(incident => {
      res.status(201).send({ data: incident, status: "success" });
    });
  });

app.use(router);

app.listen(4300, () => {
  console.log("server running");
});

const { execSync } = require("child_process");
const configGeneral = require("./config/general.json");
const configProcesses = require("./config/processes.json");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  const processes = [];
  configProcesses.forEach((process) => {
    // let status = execSync(${process.command.execute})
    //   .toString()
    //   .trim();
    let status = "activ";

    if (!configGeneral.status[status]) {
      // throw "Process status not found in configuration!";
      status = configGeneral.defaultStatus;
    }

    processes.push({
      name: process.displayName,
      status,
    });
  });
  res.render("index", {
    processes: processes,
    statusConfig: configGeneral.status,
  });
});

app.listen(configGeneral.port);

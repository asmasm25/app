const express= require('express');
const homeRoute = require('./routes/home')
const PatientRoute = require('./routes/show')
const editRouter = require('./routes/update')
const changeRoute= require('./routes/change')
const app=express()
var logger = require('morgan');


const bodyparser= require('body-parser')


const port = 3000

//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
//routing
app.use('/', homeRoute)
app.use('/',PatientRoute)
//app.use('/',editRouter)
//app.use('/',changeRoute)

const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "views/index.html"));

  // rest of code..
}

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
  fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
    win.webContents.send("fromMain", responseObj);
  });
});


app.listen(port,() => console.log(`Exemple app listening on port ${port}`))
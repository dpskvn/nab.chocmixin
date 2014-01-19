/*!
* Nab mixin for Chocolat
* Copyright(c) 2014 Dino Paskvan (http://www.dinopaskvan.com)
* MIT Licensed
*/

/**
* Module dependencies.
*/

var fs = require('fs');
var exec = require('child_process').exec;

/**
* Hook up menu items.
*/

Hooks.addMenuItem('Actions/Nab/Edit the List', 'control-alt-command-l', function() {
  Document.open(__dirname + '/db.json');
});

Hooks.addMenuItem('Actions/Nab/Nab', 'control-alt-command-n', function() {
  var win = new Window();
  var doc = Editor.current();
  var db = JSON.parse(fs.readFileSync(__dirname + '/db.json'));
  win.htmlPath = 'fetch.html';
  win.title = "Fetch";
  win.buttons = ["Fetch", "Cancel"];
  var contents = '';
  win.onButtonClick = function (buttonName) {
    if (buttonName === "Cancel") {
      win.close();
    } else {
      var name = win.evalExpr('document.getElementById("name").value');
      if (Editor.current()) {
        for (var i = 0; i < db.length; i++) {
          if (db[i].name === name) {
            exec('curl ' + db[i].url, function(err, stdout, stderr) {
              if (err) throw (err);
              Recipe.runOn(Editor.current(), function(recipe) {
                  recipe.text = stdout;
              });
            });
          break;
          } else {
            if (i === db.length - 1) Alert.show('Error', 'No such resource in the database.', ['OK']);
          }
        }
        win.close();
      } else {
        Alert.show('Error', 'No open file to nab into.', ['OK']);
      }
    }
  }
  win.frame = {x: 0, y: 0, width: 300, height:60};
  win.run();
  win.center();
});
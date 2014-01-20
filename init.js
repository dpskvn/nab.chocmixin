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
 * Database location.
 */

var dbFile = __dirname + '/db.json';

/**
 * Hook up menu items.
 */

Hooks.addMenuItem('Actions/Nab/Edit the List', 'control-alt-command-l', function() {
  Document.open(dbFile);
});

Hooks.addMenuItem('Actions/Nab/Nab', 'control-alt-command-n', function() {
  var sheet = new Sheet(MainWindow.current());
  //var db = JSON.parse(fs.readFileSync(dbFile));
  sheet.htmlPath = 'nab.html';
  sheet.title = "Nab";
  sheet.buttons = ["Cancel"];
  
  sheet.onLoad = function() {
    sheet.applyFunction(function(data) {
      window.nameKeyPress = function(e) {
        if (e.keyCode == 13) {
          chocolat.sendMessage(document.getElementById('name').value, []);
        } else if (e.keyCode == 27) {
          chocolat.sendMessage('close', []);
        }
      };
      document.getElementById('name').focus();
    }, []);
  };
  
  /**
   * Retrieve item from the database
   * @param {String} name The name of the item to fetch
   * @param {String} dbFile Path to the JSON database
   */
    
  var getFromDB = function(name, dbFile) {
    if (Editor.current()) {
      fs.readFile(dbFile, function(err, data){
        var db = JSON.parse(data);
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
        sheet.close();

      });
    } else {
      Alert.show('Error', 'No open file to nab into.', ['OK']);
      sheet.close();
    }
  }
  
  sheet.onMessage = function(name) {
    if (name !== 'close') {
      getFromDB(name, dbFile);
    } else {
      sheet.close();
    }
  };
  
  sheet.onButtonClick = function(buttonName) {
    if (buttonName === "Cancel") {
      sheet.close();
    }
  }
  
  sheet.frame = {
    x: 0
  , y: 0
  , width: 300
  , height: 60
  };
  
  sheet.run();
});
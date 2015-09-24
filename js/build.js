'use strict';
var glob = require("glob");
var md = require('./markdown');
var fs = require('fs');

var swig = require('swig');
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/../views') });

glob("pages/**.md", function(err, files){
  for(var file in files){
    file = files[file];
    var page = fs.readFileSync(file).toString();
    var html = swig.renderFile("page.html", {
      html: md.render(page)
    });

    fs.writeFileSync("html/" + file.substring(6).replace(".md", ".html").replace(".markdown", ".html"), html);
    console.log("--> " + file + " generated");
  }
});

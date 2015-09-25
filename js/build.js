'use strict';
var glob = require("glob");
var md = require('./markdown');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var swig = require('swig');
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/../views') });

glob("pages/**/*.md", function(err, files){
  for(var file in files){
    file = files[file];
    var page = fs.readFileSync(file).toString();
    var html = swig.renderFile("page.html", {
      html: md.render(page)
    });

    var oname = file.substring(6).replace(".md", ".html").replace(".markdown", ".html");
    mkdirp.sync(path.dirname('html/' + oname));
    fs.writeFileSync("html/" + oname, html);
    console.log("--> " + file + " generated");
  }
});

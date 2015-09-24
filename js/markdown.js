'use strict';
let hljs = require('highlight.js');
let md = require('markdown-it')({
  replaceLink: function(link, env){
    return link.replace(".md", ".html").replace(".markdown", "")
  },
  html: true
});
md.use(require('markdown-it-replace-link'));
let string = require('string');

// Add containers
let container = require('markdown-it-container');
let cont = {
  render: function(tokens, idx){
    if (tokens[idx].nesting === 1) {
      return '<div class="alert alert-'+ tokens[idx].info.trim() +'">\n';
    } else{
      return '</div>\n';
    }
  }
}

md.use(container, 'warning', cont);
md.use(container, 'danger', cont);
md.use(container, 'info', cont);
md.use(container, 'success', cont);

// Add Emoji
let emoji = require('markdown-it-emoji');
md.use(emoji);

let twemoji = require('twemoji');
md.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content);
};

// Add Anchors
md.use(require('markdown-it-anchor'), {
  permalink: true
});
md.use(require("markdown-it-table-of-contents"));
md.use(require('markdown-it-highlightjs'));

md.renderer.rules.table_open = function () {
  return '<table class="table table-striped">\n';
};

module.exports = md;

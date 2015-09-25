'use strict';
// Based on https://github.com/funkjunky/mdfigcaption/blob/master/mdfigcaption.js
let Plugin = require('markdown-it-regexp');

let MdFigCaption = Plugin(
    /~\[([^\]]*)\]\(([^\)]*)\)/,
    function(match, utils) {
        var caption = match[1];
        var url = match[2];

        // TODO: Investigate escaping this
        var html = `<figure>
  <a href="${url}">
    <img src="${url}" />
  </a>
  <figcaption>
    ${caption}
  </figcaption>
</figure>`;

        return html;
    }
);

module.exports = MdFigCaption;

const fs = require('fs')

const helpers = {
  walk(dir, action, maxFiles) {

    if (typeof action !== 'function') {
      // if 2nd param is not a cb fn, make it so.
      action = function(error, file) { };
    }

    fs.readdir(dir, function (err, list) {
      if (err) throw err

      if (!maxFiles) {
        maxFiles = list.length;
      }

      for (i = 0; i < maxFiles; i++) {
        var path = dir + '/' + list[i]
        action(null, path)
        console.log('callback: ' + action + ' run on ' + list[i]);
      }



    })

  },

}

module.exports = helpers

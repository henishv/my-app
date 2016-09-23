process.env.NODE_PATH=`${__dirname};${__dirname}\\node_modules`;
require("module").Module._initPaths();
require('api/apps');
require('front/apps');

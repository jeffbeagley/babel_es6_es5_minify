# babel_es6_es5_minify
Walkthrough on installing npm, nodejs, and using babel for es6 conversion and minifying of javascript

#### install node.js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

#### install npm
sudo apt install -y npm

at this point, you need to clone this repository into a working directory where we'll run our builds from

#### install babel CLI
npm install --save-dev babel-cli babel-preset-env

#### install babel polyfill
npm install --save babel-polyfill

#### install babel async 
npm install --save-dev babel-plugin-transform-async-to-generator

#### install babel minify
npm install babel-minify --save-dev

#### install babel es2015 preset
npm install --save-dev babel-cli babel-preset-es2015

#### now you can run the build, and then minify he code
npm run build
npm run minify

#### to start from scratch and clone this repository and get working
mkdir /var/npm_builds
cd /var/npm_builds

#### git clone this repository into this directory
git clone https://github.com/jeffbeagley/babel_es6_es5_minify.git

#### install nodejs and npm (nodejs is bunded with npm)
sudo apt-get install -y npm

when running the build from docker, got an error saying that node was no such file or directory, found a topic here,
https://github.com/nodejs/node-v0.x-archive/issues/3911

ln -s /usr/bin/nodejs /usr/bin/node

at this point, you can now build, and then minify
npm run build
npm run minify

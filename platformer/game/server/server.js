// server.js

// Uses Javascript / node.js / express.js

// A server that hosts a static phaser game and has an 2 REST API endpoints
// 1) Matchmaking API
// 2) Peer Game Controller State API

import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';
import { matchmaking } from './matchmaking';
import { gameController } from './gameController';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/matchmaking', (req, res) => {
  const { playerId } = req.query;
  const match = matchmaking.findMatch(playerId);
  res.send(match);
});

app.get('/gameController', (req, res) => {
  const { playerId } = req.query;
  const gameState = gameController.getGameState(playerId);
  res.send(gameState);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// Create an function that creates an nginx script and an install script for ubuntu 20.04 using certbot 
// Hostname: zestylegumes.com

function createInstallScript() {
  // Create an nginx script
  const nginxScript = `
# Game Server Nginx Config

server {
  listen 80;
  server_name zestylegumes.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name zestylegumes.com;

  ssl_certificate /etc/letsencrypt/live/zestylegumes.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/zestylegumes.com/privkey.pem;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
`;

  // Create an install script
  const installScript = `
#!/bin/bash

# Install nginx
sudo apt update
sudo apt install nginx

# Install certbot
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Create nginx config
sudo touch /etc/nginx/sites-available/game-server
sudo echo "${nginxScript}" > /etc/nginx/sites-available/game-server
sudo ln -s /etc/nginx/sites-available/game-server /etc/nginx/sites-enabled/

# Create certbot config
sudo certbot --nginx -d zestylegumes.com

# Restart nginx
sudo systemctl restart nginx

# Install node.js
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pm2
sudo npm install pm2 -g

# Clone repo
git clone https://github.com/zestylegumes/game-server.git

# Install dependencies
cd game-server
npm install

# Start server
pm2 start index.js
`;

  // Write install script to file
  const fs = require('fs');
  fs.writeFile('install.sh', installScript, (err) => {
    if (err) throw err;
    console.log('Install script created');
  });
}

// install();

// use process.env to get secret api key from env variable
const apiSecretKey = process.env.DO_API_SECRET_KEY;


// Create a deploy function that takes a secretkey and deploys this server to a DigitalOcean Droplet.

function deployToDigitalOcean(apiSecretKey) {
  const { DigitalOcean } = require('do-wrapper');
  const api = new DigitalOcean(apiSecretKey);

  // Create a droplet
  api.dropletsCreate({
    name: 'game-server',
    region: 'nyc3',
    size: 's-1vcpu-1gb',
    image: 'ubuntu-20-04-x64',
    ssh_keys: [getSshPublicKey],
    backups: false,
    ipv6: false,
    user_data: null,
    private_networking: null,
    volumes: null,
    tags: ['game-server']
  }).then((data) => {
    console.log(data);
    completeDeployment()
  }).catch((err) => {
    console.log(err);
  });
}

// deployToDigitalOcean('apiSecretKey');

function getSshPublicKey() {
  const fs = require('fs');
  const path = require('path');
  const sshPublicKey = fs.readFileSync(path.join(__dirname, '../ssh/id_rsa.pub'), 'utf8');
  return sshPublicKey;
}


// A function that uses scp to copy this file onto the droplet and calls sshAndInstall
function completeDeployment() {
  const { exec } = require('child_process');
  exec('scp -r ../game-server root@zestylegumes.com:/root/', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
    
    sshAndInstall(glueInstallScript)
  });
}

//  ssh into droplet and call a bashScript passed in as argument
function sshAndInstall(bashScript) {
  const { exec } = require('child_process');
  exec(`ssh root@zestylegumes.com 'bash -s' < ${bashScript}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}

// This bash script installs the latest node LTS version with npm using a nodesource ppa and runs the install function in this file 
const glueInstallScript = `
#!/bin/bash

# Install node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

node server.js install
`;

// Run install if the install arg is passed to the script like above and call deploy similarly
// Add a detailed help for "-h" explaining the args including the apiSecretKey

const args = process.argv.slice(2);
if (args[0] === 'install') {
  install();
} else if (args[0] === 'deploy') {
  deployToDigitalOcean(args[1]);
} else if (args[0] === '-h') {
  console.log('Help:');
  console.log('install: Creates an install script for ubuntu 20.04 and runs it');
  console.log('deploy <apiSecretKey>: Deploys this server to a DigitalOcean Droplet');
}

function install() {
    // Use createInstallScript and do the actual installation
    createInstallScript();
    const { exec } = require('child_process');
    exec('bash install.sh', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    });
}

// Write a function that sets up a new package.json and adds any dependencies
function setup() {
  const fs = require('fs');
  const packageJson = {
    "name": "game-server",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.17.1",
      "socket.io": "^2.3.0"
    }
  };
  fs.writeFile('package.json', JSON.stringify(packageJson), (err) => {
    if (err) throw err;
    console.log('package.json created');
  });
}

if (args[0] === 'setup') {
  setup();
} else if (args[0] === '-h') {
  console.log('setup: Creates a new package.json');
}

// Write a function that creates a new ssh key and adds it to the ssh-agent
function createSshKey() {
  const { exec } = require('child_process');
  exec('ssh-keygen -t rsa -b 4096 -C "zestylegumes@gmail.com"', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}

// createSshKey();

// Write a function that adds the ssh key to the ssh-agent
function addSshKey() {
  const { exec } = require('child_process');
  exec('eval "$(ssh-agent -s)"', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
  exec('ssh-add ~/.ssh/id_rsa', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}

// addSshKey();

// Write a function that adds the ssh key to the DigitalOcean account
function addSshKeyToDigitalOcean(apiSecretKey) {
  const { DigitalOcean } = require('do-wrapper');
  const api = new DigitalOcean(apiSecretKey);

  const sshPublicKey = getSshPublicKey();

  api.accountAddKey({
    name: 'game-server',
    public_key: sshPublicKey
  }).then((data) => {
    console.log(data);
  }).catch((err) => {
    console.log(err);
  });
}

// addSshKeyToDigitalOcean('apiSecretKey');

// Write a function that adds the ssh key to the DigitalOcean account
function addDomainToDigitalOcean(apiSecretKey) {
  const { DigitalOcean } = require('do-wrapper');
  const api = new DigitalOcean(apiSecretKey);

  api.domainsCreate({
    name: 'zestylegumes.com',
    ip_address: '104.248.0.2'
  }).then((data) => {
    console.log(data);
  }).catch((err) => {
    console.log(err);
  });
}

// addDomainToDigitalOcean('apiSecretKey');

// Write a function that adds the ssh key to the DigitalOcean account
function addDomainRecordToDigitalOcean(apiSecretKey) {
  const { DigitalOcean } = require('do-wrapper');
  const api = new DigitalOcean(apiSecretKey);

  api.domainsCreateRecord({
    domain_name: 'zestylegumes.com',
    type: 'A',
    name: '@',
    data: '104.248.0.2',
    priority: null,
    port: null,
    weight: null
  }).then((data) => {
    console.log(data);
  }).catch((err) => {
    console.log(err);
  });
}

// addDomainRecordToDigitalOcean('apiSecretKey');


// Call the above functions to set up a new website including droplet, domain, dns, and ssh
function deployFull() {
    deployToDigitalOcean(apiSecretKey);
    addSshKeyToDigitalOcean(apiSecretKey);
    addDomainToDigitalOcean(apiSecretKey);
    addDomainRecordToDigitalOcean(apiSecretKey);
  }
  
  // deployFull();
  
  // Write a function that adds the ssh key to the DigitalOcean account
  function completeDeployment() {
    const { exec } = require('child_process');
    exec('ssh root@104.248.0.2', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(stdout);
      console.log(stderr);
      
      startREPL()
    });
  }
  
  function startREPL() {
    const repl = require('repl');
    const replServer = repl.start({
      prompt: '> ',
      eval: myEval,
      writer: myWriter
    });
    replServer.context.lodash = require('lodash');
  }
  
  function myEval(cmd, context, filename, callback) {
    callback(null, cmd);
  }
  
  function myWriter(output) {
    return output.toUpperCase();
  }
  

const fs = require("fs");
const { EmbedBuilder } = require('discord.js');
const Db = require('../Databasem/app.js')
const config = require('../config.json')
module.exports = async (client, invite) => {
  
  
  var moment = require('moment-timezone');
  const db = new Db({
    path: `./database.json`,
    seperator: ".",
    spaces: 10
});

db.set(`invite.${invite.code}`,`${invite.uses}`)
//console.log(invite.code,invite.uses)
}

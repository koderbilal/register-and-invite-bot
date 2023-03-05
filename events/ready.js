const fs = require("fs");
const { EmbedBuilder } = require('discord.js');
const Db = require('../Databasem/app.js')
const config = require('../config.json')
module.exports = async (client) => {
  console.log(`${client.user.tag} hazır!`)
  
  
  var moment = require('moment-timezone');
  client.user.setPresence({ activities: [{ name: 'Swanex ❤️' }], status: 'idle' });
  const db = new Db({
    path: `./veriler/database.json`,
    seperator: ".",
    spaces: 10
});
//db.set("ben", "ee")
const guild = client.guilds.cache.get(config.sunucuid)
inviter = await guild.invites.fetch({ cache: false })
inviter.forEach(invite=>{
  db.set(`invite.${invite.code}`,`${invite.uses}`)
  //console.log(invite.code)
})

}

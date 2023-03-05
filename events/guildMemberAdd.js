const fs = require("fs");
const { EmbedBuilder } = require('discord.js');
const Db = require('../Databasem/app.js')
const config = require('../config.json')
module.exports = async (client, member) => {
  
  var moment = require('moment-timezone');
  const db = new Db({
    path: `./veriler/database.json`,
    seperator: ".",
    spaces: 10
});

 // Karşılaştırmak için mevcut davet listesini yüklememiz gerekiyor.
 const newInvites = await member.guild.invites.fetch()


 // Bu, lonca için *mevcut* davetlerdir.
 
 
 // Davetiyelere bakın, kullanımı artan davetiyeyi bulun.
 const invite = newInvites.find(i => i.uses > db.get(`invite.${i.code}`));
 // Bu sadece aşağıda gönderilen mesajı basitleştirmek içindir (davet edenin bir etiket özelliği yoktur)
 const inviter = await client.users.fetch(invite.inviter.id);
 // Günlük kanalını edinin (beğeninize göre değiştirin)
 const logChannel = member.guild.channels.cache.find(channel => channel.name === "join-logs");
 // İhtiyacımız olan bilgileri içeren gerçek bir temel mesaj. 
 //db.set(`${invite.code}`)
 inviter
   ? logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`).then(()=>{
    db.set(`invite.${invite.code}`, `${invite.uses}`)
    db.add(`topdeğer.${inviter.id}.toplam`,1)
    db.add(`topdeğer.${inviter.id}.gerçek`,1)
    console.log(member.user.createdTimestamp)

   })
   : logChannel.send(`${member.user.tag} joined but I couldn't find through which invite.`);
   

}

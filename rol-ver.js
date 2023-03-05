const { SlashCommandBuilder } = require('discord.js');

client.on("userUpdate", async (oldUser, newUser) => {
    if (oldUser.username !== newUser.username) {

        // ne yapıyorsun ? 
        //olmadımı
        // sen yanlış yapıyorsun
        // bekle
      let sunucu = ""; 
      let kanal = "LOG KANAL ID" 
      let rol = "ROL ID"; 
       client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
      } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
        client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
        client.channels.cache.get(kanal).send(`${newUser} isimli kullanıcı kullanıcı adından tagı çıkardığı için ayrıcılıkları ve rolü alınmıştır.`)
      }
 
    }
  )
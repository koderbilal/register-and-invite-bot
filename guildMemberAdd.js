  const db = require("quick.db");
const config = require("./config.json");
var moment = require('moment-timezone');
const client = global.client;
 moment.locale("tr");
 require("moment-duration-format");
const ms = require("ms")
const { MessageEmbed } = require("discord.js")
const map = require("lodash/map.js")


module.exports = async (client, member) => {
    if (member.guild.id !== config.sunucuid) return; //sunucu ıd
    const cf = {
        "0":"<a:sifirr:946755272746090526>",
        "1":"<a:birr:946755271743651850>",
        "2":"<a:ikiii:946755271777210388>",
        "3":"<a:ucc:946755272376983572>",
        "4":"<a:dorttt:946755271663951903>",
        "5":"<a:bess:946755271835930644>",
        "6":"<a:altii:946755271672336384>",
        "7":"<a:yedimm:946755271487815760>",
        "8":"<a:sekizz:946755271873667152>",
        "9":"<a:dokuzz:946755271584268358>"
     };
     let dcs =  
`${member.guild.members.cache.size}`
  .split("")
  .map(c => cf[c] || c)
  .join(" ")
        await member.roles.add(config.kayit.kayitsiz);
        //member.roles.add(config.registration.unregistered);
        await member.setNickname(config.kayit.kayitsizisim);
       await member.guild.channels.cache.get(config.kayit.kayitkanal).send({ 
        content:`:tada: Florina'ya hoş geldin  ${member} biz de seni bekliyorduk, hesabın ${moment(member.user.createdTimestamp).locale("tr").format("LLL")} tarihinde ${moment(member.user.createdTimestamp).locale("tr").fromNow()} oluşturulmuş!

:tada: Sunucumuz seninle birlikte ailemiz ${dcs} kişi oldu!

:tada: Sunucu kurallarımız <#938546897231159296> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza-i işlemler kuralları okuduğunu varsayarak gerçekleştirilecek.

<@&${config.kayit.kayitcii}> rolündeki yetkililerimiz seninle ilgilenecektir.

Sol tarafta bulunan **V. Confirmed** odalarından birine girerek kayıt işlemini gerçekleştirebilirsin.:tada: :tada: :tada:`});
}
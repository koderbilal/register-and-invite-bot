const discord = require("discord.js")
const fs = require('fs-extra')

const { Client, Intents, Collection, GatewayIntentBits, Events } = require('discord.js');
const client = global.client = new Client({ intents: 3276799 });

const config = require("./config.json")
// TODO: require(`./komut.js`)
client.login(config.token);

// event dosyalarını yürütüyor
try {

    fs.readdir("./events/", (err, events) => {
      events.forEach(eventFile => {
        const event = require(`./events/${eventFile}`);
        client.on(eventFile.split(".")[0], event.bind(null, client))
        delete require.cache[require.resolve(`./events/${eventFile}`)]
        console.log(`[ Etkinlik Yüklendi: ${eventFile} ]`)
      });
    })
  } catch (err) {
    console.error(err);
  }
  
  const path = require('node:path');
  // komutlar 
  
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, 'komutlar');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    console.log(`[Komut ${command.data.name} Yüklendi! ]`)
    client.commands.set(command.data.name, command);
  }
  
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    const command = client.commands.get(interaction.commandName);
  
    if (!command) return interaction.reply({ content: "Bu komut bakımdadır", ephemeral: true });
  
    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Bu komut yürütülürken bir hata oluştu!', ephemeral: true });
    }
  });
  
  
  // eval için
  const { ChannelType } = require('discord.js');
  const prefix = config.prefix
  const owner = config.owner
  client.on("messageCreate", async message => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(prefix.length);
    if (command === "safe") { // komutlar bu şekilde eklenecektir. if(command === "komut")
      message.channel.send("güvenli")
    }
    if (command === "eval") {
      if (message.author.id !== owner) return message.channel.send({ content: `Sahibim sen değilsin <@${message.author.id}>, benim sahibim <@${owner}>` });;
      if (!args[0]) return message.channel.send({ content: `Kod belirtilmedi` });
      let code = args.join(' ');
      function clean(text) {
        if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
        text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
        return text;
      };
      let res;
      try {
        res = eval(clean(code));
        if (typeof res !== 'string') res = require('node:util').inspect(res);
      } catch (err) {
        console.error(err.stack);
        res = err.message;
      }
      message.channel.send(res, { code: "js", split: true });
    } // buraya if eklenip komut eklenebilir
    // aeval
    if (command === "aeval") {
      //if (message.author.id !== config.owner) return message.channel.send({ content: `Sahibim sen değilsin <@${message.author.id}>, benim sahibim <@${config.owner}>`});
      if (!args[0]) return message.channel.send({ content: `Kod belirtilmedi` });
      let code = args.join(' ');
      function clean(text) {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
      }
  
      try {
  
        let evaled = eval("(async () => {" + code + "})()");
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        message.channel.send(clean(evaled), { code: "xl" });
  
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
      }
    }
    return;
  });
  
  const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
 







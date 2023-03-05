 // Davet önbelleğini başlat
 const invites = new Collection();

 // Tüm komut dosyasını engellemeden bir gecikme oluşturmak için oldukça kullanışlı bir yöntem.
 const wait = require("timers/promises").setTimeout;
 
 client.on("ready", async () => {
   // "hazır" gerçekten hazır değil. Bir büyü beklememiz gerekiyor.
   await wait(1000);
 
   // Tüm loncaları dolaş
   client.guilds.cache.forEach(async (guild) => {
     // Tüm Lonca Davetlerini getir
     const firstInvites = await guild.invites.fetch();
     // Anahtarı Lonca Kimliği olarak ayarlayın ve davet kodunu ve kullanım sayısını içeren bir harita oluşturun.
     invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
   });
 });
 
 client.on("inviteDelete", (invite) => {
     // Daveti Önbellekten Sil
     invites.get(invite.guild.id).delete(invite.code);
   });
   
   client.on("inviteCreate", (invite) => {
     // Yeni davetlerde önbelleği güncelle
     invites.get(invite.guild.id).set(invite.code, invite.uses);
   });
 
   client.on("guildCreate", (guild) => {
     // Yeni bir Loncaya eklendik. Tüm davetleri getirelim ve önbelleğimize kaydedelim
     guild.invites.fetch().then(guildInvites => {
       // Bu, hazır olayıyla aynıdır
       invites.set(guild.id, new Map(guildInvites.map((invite) => [invite.code, invite.uses])));
     })
   });
   
   client.on("guildDelete", (guild) => {
     // Bir Loncadan çıkarıldık. Tüm davetlerini silelim
     invites.delete(guild.id);
   });
 
 
   client.on("guildMemberAdd", async (member) => {
     // Karşılaştırmak için mevcut davet listesini yüklememiz gerekiyor.
     const newInvites = await member.guild.invites.fetch()
     // Bu, lonca için *mevcut* davetlerdir.
     const oldInvites = invites.get(member.guild.id);
     // Davetiyelere bakın, kullanımı artan davetiyeyi bulun.
     const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
     // Bu sadece aşağıda gönderilen mesajı basitleştirmek içindir (davet edenin bir etiket özelliği yoktur)
     const inviter = await client.users.fetch(invite.inviter.id);
     // Günlük kanalını edinin (beğeninize göre değiştirin)
     const logChannel = member.guild.channels.cache.find(channel => channel.name === "join-logs");
     // İhtiyacımız olan bilgileri içeren gerçek bir temel mesaj. 
     inviter
       ? logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`)
       : logChannel.send(`${member.user.tag} joined but I couldn't find through which invite.`);
   });
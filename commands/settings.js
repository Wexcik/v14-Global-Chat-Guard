const { EmbedBuilder } = require("discord.js");

exports.run = async (client, message, args, prefix, dil, database) => {
  if (args[0] === "reset" || args[0] === "sıfırla") {
    await database.findOneAndDelete({ guildID: message.guild.id });
    message.reply(dil == "tr" ? "Ayarlar sıfırlandı!" : "Settings has been reset!");
    return;
  };
  let sunucu = await database.findOne({ guildID: message.guild.id }) || {};
  let filtreKelimeler = sunucu.filtreKelimeler || [];
  let botTemizleyiciKanallari = sunucu.botTemizleyiciKanallari || [];
  let gonderilecek = new EmbedBuilder()
 
 
  .addFields(
    { name: `${dil == "tr" ? "Filtreler" : "Filters"}`, 
  value: `
  \`\`\`css\n${dil == "tr" ? "Küfür" : "Swear"}: ${sunucu.kufurKoruma ? "✅" : "❌"}\n${dil == "tr" ? "Reklam" : "Invite"}: ${sunucu.reklamKoruma ? "✅" : "❌"}\n${dil == "tr" ? "Reklam-Ban" : "Invite-Ban"}: ${sunucu.reklamBanKoruma ? "✅" : "❌"}\n${dil == "tr" ? "Link" : "Link"}: ${sunucu.linkKoruma ? "✅" : "❌"}\n${dil == "tr" ? "Büyük Harf" : "Capslock"}: ${sunucu.capsKoruma ? "✅" : "❌"}\n${dil == "tr" ? "Etiket" : "Mention"}: ${sunucu.etiketKoruma ? "✅" : "❌"}\nSpam: ${sunucu.spamKoruma ? "✅" : "❌"}\nEmoji Spam: ${sunucu.emojiSpamKoruma ? "✅" : "❌"}\`\`\`
  `
})
.addFields(
  { name: `${dil == "tr" ? "Filtre Ayarları" : "Filter Settings"}`, 
value: `
\`\`\`css\n${dil == "tr" ? "Log Kanalı" : "Log Channel"}: ${sunucu.logKanali ? "#"+message.guild.channels.cache.get(sunucu.logKanali).name : "❌"}\n${dil == "tr" ? "Mute Rolü" : "Mute Role"}: ${sunucu.muteRolu ? "@"+message.guild.roles.cache.get(sunucu.muteRolu).name : "❌"}\n${dil == "tr" ? "Ceza Limit" : "Penal Limit"}: ${sunucu.ihlalCezaSayi ? sunucu.ihlalCezaSayi : "10"}\n${dil == "tr" ? "Ceza Süre" : "Penal Duration"}: ${sunucu.ihlalCezaSure ? sunucu.ihlalCezaSure : "10"}\`\`\``
})
  
.addFields(
  { name: `${dil == "tr" ? "Filtrelenmiş Kelimeler" : "Filtered Words"}`, 
value: `
\`\`\`css\n${(filtreKelimeler.length > 0 ? `${filtreKelimeler.slice(0, 5).join('╱')}...\n\n${prefix+(dil == "tr" ? "filtre" : "filter")}` : (dil == "tr" ? "Bulunamadı!" : "Not found!"))}\`\`\``
})
.addFields(
  { name: `${dil == "tr" ? "Sohbet Temizleyici" : "Chat Cleaner"}`, 
value: `
\`\`\`css\n${(botTemizleyiciKanallari.length > 0 ? `${botTemizleyiciKanallari.slice(0, 5).map(knl => "#"+message.guild.channels.cache.get(knl).name).join(' │ ')}...\n\n${prefix+(dil == "tr" ? "sohbet-temizleyici" : "chat-cleaner")}` : (dil == "tr" ? "Bulunamadı!" : "Not found!"))}\`\`\``
})
  message.channel.send({embeds: [gonderilecek]});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ayarlar', 'ayar', 'setting'],
  permLevel: ["ADMINISTRATOR", "MANAGE_GUILD"],
  voted: false,
  premium: false,
  nsfw: false
};
  
exports.help = {
  name: 'settings',
  description: 'Server settings.',
  usage: 'settings',
  isim: 'ayarlar',
  aciklama: 'Sunucu ayarları.',
  kullanim: 'ayarlar',
  category: 'bot'
};
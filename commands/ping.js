exports.run = (Discord, client, message, args, sql, prefix) => {
  let embed = new Discord.RichEmbed ();

  embed.setColor (0xFFB333);
  embed.setAuthor ("CryptoMiner© Ping", "https://i.imgur.com/QL2Vdhb.png", "");
  embed.addField ("Ping", new Date().getTime() - message.createdTimestamp + " Ms", true);
  embed.setFooter ("CryptoMiner© | In Development");

  message.channel.send (embed);
}

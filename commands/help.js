exports.run = (Discord, client, message, args, sql, prefix) => {
  let embed = new Discord.RichEmbed ();

  embed.setColor (0xFFB333);
  embed.setAuthor ("CryptoMiner© Help", "https://i.imgur.com/QL2Vdhb.png", "");
  embed.setDescription ("All the commands and their purpose are listed down below");
  embed.setFooter ("CryptoMiner© | In Development");
  embed.addField (prefix + "computer", ":desktop: Displays info about a user's computer", false);
  embed.addField (prefix + "cpu", ":small_orange_diamond: Displays info about a user's cpu", false);
  embed.addField (prefix + "currency", ":diamond_shape_with_a_dot_inside: Displays someone's currency", false);
  embed.addField (prefix + "collect", ":floppy_disk:  Collects your mined cryptocurrency", false);
  embed.addField (prefix + "gpu", ":small_blue_diamond: Displays info about a user's gpu", false);
  embed.addField (prefix + "help", ":question: Displays all the commands", false);
  embed.addField (prefix + "mine", ":pick: Start cryptocurrency mining process", false);
  embed.addField (prefix + "stats", ":bar_chart: Displays a user's stats", false);
  embed.addField (prefix + "status", ":shrug: Displays a user's status", false);
  embed.addField (prefix + "ping", ":ping_pong: Shows the ping", false);

  message.channel.send (embed);
}

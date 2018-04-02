exports.run = (Discord, client, message, args, sql, prefix) => {
  function commafy (num) {
  			return (num + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}

  let defineduser;

  if (args.length > 1)
	{
			message.channel.send ('`Error: More than 1 argument. Usage: ' + prefix + 'status <@user>`');
			return;
	}

  if (!args[0])
  {
    defineduser = message.author;
  }
  else
  {
    let firstMentioned = message.mentions.users.first();

    if (!firstMentioned)
    {
      defineduser = message.author
    }
    else
    {
      defineduser = firstMentioned;
    }
  	try
  	{
  		defineduser = firstMentioned.id;
  		defineduser = firstMentioned;
  	}
  	catch (err)
  	{
  			message.channel.send ("`Error: Improper mention`");
  			return;
  	}
  }

  sql.get(`SELECT * FROM userData WHERE userID = ${defineduser.id}`).then(row => {

    if (!row) {
      sql.run (`INSERT INTO userData (userID, currency, totalEarned, currentEarned, ascendPoints, ascends, CPU, GPU, Computer,
        NetworkSpeed, level, runTime, running, items, startRun) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [defineduser.id, 0, 0, 0, 400, 0,
          "Intel Core i3", "Radeon HD 6450", "Dell Desktop", 5, 0, 1, null, null, null]);

          console.log ("Emtpy Row: Inserting...");

          message.channel.send ("`User currently not in database. Inserting data...`");
          return;
    }

    let embed = new Discord.RichEmbed ();
    let currency = commafy (Math.round (row.currency * 100) / 100);

    embed.setColor (0xFFB333);
    embed.setAuthor(defineduser.username,  defineduser.displayAvatarURL, "");
    embed.setDescription ("Cryptominer info on " + defineduser.username + "#" + defineduser.discriminator);
    embed.setThumbnail (defineduser.displayAvatarURL);
    embed.addField ("Cryptocurrency:", "**" + commafy (currency) + "** :diamond_shape_with_a_dot_inside:", true);
    embed.addField ("Computer:", row.Computer, true);
    embed.addField ("CPU:", row.CPU, true);
    embed.addField ("GPU:", row.GPU, true);
    embed.setFooter ("CryptoMiner© | Level " + row.level);

    message.channel.send (embed);
  });
}

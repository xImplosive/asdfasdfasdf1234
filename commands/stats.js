exports.run = (Discord, client, message, args, sql, prefix) => {

  function commafy (num) {
  			return (parseInt (num) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
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
  });

  let embed = new Discord.RichEmbed ();

  embed.setColor (0xFFB333);
  embed.setAuthor(defineduser.username + " stats",  defineduser.displayAvatarURL, "");

  sql.get(`SELECT * FROM userData WHERE userID = ${defineduser.id}`).then(row => {
    sql.get(`SELECT * FROM cpuData WHERE cpuName = "${row.CPU}"`).then(row1 => {
      sql.get(`SELECT * FROM gpuData WHERE gpuName = "${row.GPU}"`).then(row2 => {
        sql.get (`SELECT * FROM compData WHERE computerName = "${row.Computer}"`).then (row3 => {
          let currency = commafy (Math.round (row.totalEarned * 100) / 100);

          embed.setThumbnail ("https://i.imgur.com/QL2Vdhb.png");
          embed.addField ("RPM: ", ":diamond_shape_with_a_dot_inside: **" + commafy (row1.cpuBoost + row2.gpuBoost + row3.baseBoost + row.ascendPoints - row1.energy - row2.energy - row3.energy) + "**", true);
          embed.addField ("Energy Loss: ", ":zap: **" + commafy (row1.energy + row2.energy + row3.energy) + "**", true);
          embed.addField ("Boost:", ":diamond_shape_with_a_dot_inside: **" + commafy (row1.cpuBoost + row2.gpuBoost + row3.baseBoost) + "**", true);
          embed.addField ("Base: ", ":diamond_shape_with_a_dot_inside: **" + commafy (row.ascendPoints) + "**", true);
          embed.addField ("Run Time:", ":hourglass: **" + row.runTime + " minutes**", true);
          embed.addField ("Total Mined:", ":diamond_shape_with_a_dot_inside: **" + commafy (currency) + "**", true);
          embed.setFooter ("CryptoMiner© | Level " + row.level);

          message.channel.send (embed);
        })
      });
    });
  });
}

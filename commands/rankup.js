exports.run = (Discord, client, message, args, sql, prefix) => {
  function commafy (num) {
  			return (num + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}

  sql.get(`SELECT * FROM userData WHERE userID = ${message.author.id}`).then(row => {
    if (!row) {
      sql.run (`INSERT INTO userData (userID, currency, totalEarned, currentEarned, ascendPoints, ascends, CPU, GPU, Computer,
        NetworkSpeed, level, runTime, running, items, startRun) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, 0, 0, 0, 400, 0,
          "Intel Core i3", "Radeon HD 6450", "Dell Desktop", 5, 0, 1, null, null, null]);

          console.log ("Emtpy Row: Inserting...");

          message.channel.send ("`User currently not in database. Inserting data...`");
          return;
    }
    let amount = row.ascendPoints * (row.level + 1);

    if (amount <= row.currency) {
      let embed = new Discord.RichEmbed ();
      let points = (row.level + 1) * 15;
      let lvl = row.level + 1;

      sql.run (`UPDATE userData SET level = level + 1 WHERE userID = ${message.author.id}`);
      sql.run (`UPDATE userData SET currency = currency - ${amount} WHERE userID = ${message.author.id}`);
      sql.run (`UPDATE userData SET ascendPoints = ascendPoints + ${points} WHERE userID = ${message.author.id}`);

      embed.setColor (0xFFB333);
      embed.setAuthor(message.author.username,  message.author.displayAvatarURL, "");
      embed.addField ("Successful Rankup!", `You are now **level ${lvl} ** :fireworks:`, false);
      embed.setFooter ("CryptoMiner© | Level " + lvl);

      message.channel.send (embed);
    }
    else {
      let needed = amount - row.currency;
      let string = commafy (Math.round (needed * 100) / 100);

      message.channel.send (`You need :diamond_shape_with_a_dot_inside: **${string}** more to rankup.`)
    }

  });

}

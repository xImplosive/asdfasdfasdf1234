exports.run = (Discord, client, message, args, sql, prefix) => {

  function commafy (num) {
    			return (num + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }

  sql.get(`SELECT * FROM userData WHERE userID = ${message.author.id}`).then(row => {
    if (!row) {
      sql.run (`INSERT INTO userData (userID, currency, totalEarned, currentEarned, ascendPoints, ascends, CPU, GPU, Computer,
        NetworkSpeed, level, runTime, running, items, startRun) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [defineduser.id, 0, 0, 0, 400, 0,
          "Intel Core i3", "Radeon HD 6450", "Dell Desktop", 5, 0, 1, null, null, null]);

          console.log ("Emtpy Row: Inserting...");

          message.channel.send ("`User currently not in database. Inserting data...`");
          return;
    }

    if (row.startRun < row.running)
    {
      sql.get(`SELECT * FROM cpuData WHERE cpuName = "${row.CPU}"`).then(row1 => {
        sql.get(`SELECT * FROM gpuData WHERE gpuName = "${row.GPU}"`).then(row2 => {
          sql.get (`SELECT * FROM compData WHERE computerName = "${row.Computer}"`).then (row3 => {
            let elapsed;

            if (Date.now () < row.running)
            {
              elapsed = (Date.now () - row.startRun) / 1000;
            }
            else {
              elapsed = (row.running - row.startRun) / 1000;
            }

            let collected = (row1.cpuBoost + row2.gpuBoost + row3.baseBoost + row.ascendPoints - row1.energy - row2.energy - row3.energy) * (elapsed / 60);
            let newRun = Date.now ();
            let collect = commafy (Math.round (collected * 100) / 100);

            sql.run (`UPDATE userData SET startRun = ${newRun} WHERE userID = ${message.author.id}`);
            sql.run (`UPDATE userData SET currency = currency + ${collected} WHERE userID = ${message.author.id}`);
            sql.run (`UPDATE userData SET totalEarned = totalEarned + ${collected} WHERE userID = ${message.author.id}`);
            message.channel.send (`:diamond_shape_with_a_dot_inside: **${collect}** collected!`)
          })
        });
      });
    }
    else
    {
      message.channel.send (`No mining process detected. Use \`?mine\``);
    }
  });
}

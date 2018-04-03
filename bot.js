const Discord = require ("discord.js");
const client = new Discord.Client ();
const prefix = "?";
const sql = require ('sqlite');
sql.open ('./database/data.db');

client.on('ready', () => {

    client.user.setActivity ('?help');

    console.log(`Logged in as ${client.user.tag}`);

    sql.get (`SELECT * FROM userData`).then (row => {
      console.log('[SQLITE] userData successfully opened');
    }).catch (err => {
      return console.log (`[SQLITE] Error: ${err.stack}`);
    })
})

client.on ("message", message => {
  if (message.author.bot || message.content.indexOf (prefix) !== 0) return;
  /*
  sql.get (`SELECT * FROM userData WHERE userID = ${message.author.id}`).then (row => {
    if (!row) {
      sql.run (`INSERT INTO userData (userID, currency, totalEarned, currentEarned, ascendPoints, ascends, CPU, GPU, Computer,
        NetworkSpeed, level, runTime, running, items, startRun) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, 0, 0, 0, 400, 0,
          "Intel Core i3", "Radeon HD 6450", "Dell Desktop", 5, 0, 1, 0, null, null]);

          console.log ("Emtpy Row: Inserting...");

    }}).catch(() => {

		console.error;

    sql.run(`CREATE TABLE IF NOT EXISTS userData (id, userID, currency, totalEarned, currentEarned, ascendPoints, ascends, CPU, GPU, Computer,
      NetworkSpeed, level, runTime, running, items)`).then(() => {

        sql.run (`INSERT INTO userData (userID, currency, totalEarned, currentEarned, ascendPoints, ascends, CPU, GPU, Computer,
          NetworkSpeed, level, runTime, running, items, startRun) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, 0, 0, 0, 400, 0,
            "Intel Core i3", "Radeon HD 6450", "Dell Desktop", 5, 0, 1, 0, null, null]);
    });
  })
  */
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  try
  {
    let commandFile = require (`./commands/${command}.js`);
    commandFile.run (Discord, client, message, args, sql, prefix);
  }
  catch (err)
  {
    console.error (err);
  }
})


client.login ("process.env.BOT_TOKEN");

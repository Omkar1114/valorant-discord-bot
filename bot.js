require('dotenv').config();

const {
  playerStats,
  playerRank,
  playerKDA,
  botCommands,
} = require('./messageEmbed');

const BOT_PREFIX = '!val-';
const PLAYER_STATS = 'stats';
const PLAYER_RANK = 'rank';
const PLAYER_KDA = 'kda';
const HELP = 'help';

const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log('Bot is ready to go!!!');
});

client.on('message', async (msg) => {
  // check the bot command
  if (msg.content.startsWith(BOT_PREFIX)) {
    // check if riot id is specified
    if (msg.content.startsWith(BOT_PREFIX.concat(HELP))) {
      const botCommandsEmbed = botCommands();
      msg.channel.send(botCommandsEmbed);
    } else if (msg.content.split(' ').length == 1) {
      msg.reply('Specify the riot id');
    } else {
      let riotId = msg.content.split(' ')[1];
      // check if id has '#'
      if (!riotId.includes('#')) {
        msg.reply('Give proper riotId');
      }
      // checks for different bot commands
      else {
        if (msg.content.startsWith(BOT_PREFIX.concat(PLAYER_STATS))) {
          const playerStatsEmbed = await playerStats(riotId);
          msg.channel.send(playerStatsEmbed);
        } else if (msg.content.startsWith(BOT_PREFIX.concat(PLAYER_RANK))) {
          // msg.channel.send('RANK');
          const playerRankEmbed = await playerRank(riotId);
          msg.channel.send(playerRankEmbed);
        } else if (msg.content.startsWith(BOT_PREFIX.concat(PLAYER_KDA))) {
          const playerKDAEmbed = await playerKDA(riotId);
          msg.channel.send(playerKDAEmbed);
        } else {
          const botCommandsEmbed = botCommands();
          msg.channel.send(botCommandsEmbed);
        }
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);

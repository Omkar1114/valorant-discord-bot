const { scrapper } = require('./scrapper.js');

const { MessageEmbed, MessageAttachment } = require('discord.js');

//Error embed message
const errorEmbed = function (riotId) {
  const errorMessage = new MessageEmbed()
    .setColor('#008891')
    .setTitle('Profile is private')
    .setDescription(
      'Sign-In with your Riot Id on tracker.gg to make profile public.'
    )
    .setAuthor(
      riotId,
      process.env.VAL_IMG_URL //valorant image
    )
    .setTimestamp();

  return errorMessage;
};

//Player stats embed message
const playerStats = async function (riotId) {
  const idSplit = riotId.split('#');
  let data = await scrapper(idSplit);

  if (data == null) {
    const errorMessage = errorEmbed(riotId);
    return errorMessage;
  }

  const attachment = new MessageAttachment(
    `./assets/agents/${data['agent']}.png`,
    `${data['agent']}.png`
  );

  const embedMessage = new MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(
      riotId,
      process.env.VAL_IMG_URL //valorant image
    )
    .setThumbnail(data['rankImageURL']) //rankImageURL
    .addFields(
      { name: 'Rank', value: data['rank'] }, //rank
      { name: 'PlayTime', value: data['playtime'].slice(0, -9) } //playTime
    )
    .addFields(
      {
        name: 'Damage/Round',
        value: data['damagePerRound'],
        inline: true,
      }, //damagePerRound
      {
        name: 'K/D Ratio',
        value: data['kd'],
        inline: true,
      }, //kd
      {
        name: 'Headshots %',
        value: data['headshotPer'],
        inline: true,
      } //headshotPer
    )
    .addFields(
      { name: 'Win %', value: data['winPer'], inline: true }, //winPer
      { name: 'Wins', value: data['win'], inline: true }, //win
      { name: 'Kills', value: data['kills'], inline: true } //kills
    )
    .addFields(
      { name: 'Headshots', value: data['headshot'], inline: true }, //headshot
      { name: 'First Bloods', value: data['firstBlood'], inline: true }, //firstBlood
      {
        name: 'Most Kills',
        value: data['mostKillsPerMatch'],
        inline: true,
      } //mostKillsPerMatch
    )
    .addFields(
      { name: 'Aces', value: data['ace'], inline: true }, //ace
      { name: 'Clutches', value: data['cluthes'], inline: true }, //cluthes
      { name: 'Flawless', value: data['flawless'], inline: true } //flawless
    )
    .attachFiles(attachment)
    .setImage(`attachment://${data['agent']}.png`)
    .setTimestamp();

  return embedMessage;
};

//Player rank embed message
const playerRank = async function (riotId) {
  const idSplit = riotId.split('#');
  let data = await scrapper(idSplit);

  if (data == null) {
    const errorMessage = errorEmbed(riotId);
    return errorMessage;
  }

  const embedMessage = new MessageEmbed()
    .setColor('#e6b566')
    .setAuthor(
      riotId,
      process.env.VAL_IMG_URL //valorant image
    )
    .setThumbnail(data['rankImageURL']) //rankImageURL
    .addField('Rank', data['rank']) //rank
    .setTimestamp();

  return embedMessage;
};

//Player kda embed message
const playerKDA = async function (riotId) {
  const idSplit = riotId.split('#');
  let data = await scrapper(idSplit);

  if (data == null) {
    const errorMessage = errorEmbed(riotId);
    return errorMessage;
  }

  const embedMessage = new MessageEmbed()
    .setColor('#ef4f4f')
    .setAuthor(
      riotId,
      process.env.VAL_IMG_URL //valorant image
    )
    .setThumbnail(data['rankImageURL']) //rankImageURL
    .addField('Rank', data['rank']) //rank
    .addField('K/D Ratio', data['kd']) //kd
    .addFields(
      { name: 'Kills', value: data['kills'], inline: true }, //kills
      { name: 'Deaths', value: data['deaths'], inline: true }, //deaths
      { name: 'Assits', value: data['assists'], inline: true } //assists
    )
    .setTimestamp();

  return embedMessage;
};

//All bot command list
const botCommands = function () {
  const embedMessage = new MessageEmbed()
    .setColor('#e5707e')
    .setTitle('Bot Commands')
    .addField('\u200b', '\u200b')
    .addFields(
      {
        name: '!val-stats riot-id',
        value: 'Returns player stats in competitive mode',
      },
      { name: '!val-rank riot-id', value: 'Returns player current rank' },
      {
        name: '!val-kda riot-id',
        value: 'Returns player kda in competitive mode',
      }
    )
    .setTimestamp();

  return embedMessage;
};

module.exports = { playerStats, playerRank, playerKDA, botCommands };

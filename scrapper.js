const puppeteer = require('puppeteer');

const scrapper = async function (id) {
  let metaData;
  let url = `${process.env.URL}/${id[0]}%23${id[1]}/overview?playlist=competitive`;

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    let page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {
      //if user not signed-in with tracker.gg
      if (
        document.querySelector(
          'span[class="valorant-highlighted-stat__value"]'
        ) == null
      ) {
        return null;
      }

      let rank = document.querySelector(
        'span[class="valorant-highlighted-stat__value"]'
      ).innerHTML;

      let rankImageURL = document.querySelector(
        'img[class="valorant-rank-icon"]'
      ).src;

      let agent = document.querySelector('span[class="agent__name"]').innerText;
      let playtime = document.querySelector('span[class="playtime"]').innerText;

      let stats = document.querySelectorAll('span[class="value"]');
      let damagePerRound = stats[3].innerHTML;
      let kd = stats[4].innerHTML;
      let headshotPer = stats[5].innerHTML;
      let winPer = stats[6].innerHTML;
      let win = stats[7].innerHTML;
      let kills = stats[8].innerHTML;
      let headshot = stats[9].innerHTML;
      let deaths = stats[10].innerHTML;
      let assists = stats[11].innerHTML;
      let scorePerRound = stats[12].innerHTML;
      let killsPerRound = stats[13].innerHTML;
      let firstBlood = stats[14].innerHTML;
      let ace = stats[15].innerHTML;
      let cluthes = stats[16].innerHTML;
      let flawless = stats[17].innerHTML;
      let mostKillsPerMatch = stats[18].innerHTML;

      return {
        rank,
        rankImageURL,
        agent,
        playtime,
        damagePerRound,
        kd,
        headshotPer,
        winPer,
        win,
        kills,
        headshot,
        deaths,
        assists,
        scorePerRound,
        killsPerRound,
        firstBlood,
        ace,
        cluthes,
        flawless,
        mostKillsPerMatch,
      };
    });

    metaData = data;

    await browser.close();
  } catch (e) {
    console.log(e.message);
  }

  return metaData;
};

module.exports = { scrapper };

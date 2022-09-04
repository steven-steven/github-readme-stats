// @ts-check
const axios = require("axios").default;

const {
  logger,
  CustomError,
  MissingParamError,
} = require("../common/utils");

require("dotenv").config();

/**
 * @param {string} username
 */
const fetcher = (username) => {
  return axios({
    method: 'get',
    url: `https://data.typeracer.com/users?id=tr:${username}`
  }).catch((error) => {
    logger.error(`Fail to fetch TypeRacer statistics: ${error}`);
    throw new CustomError(
      error.message || "Could not fetch typeracer statistic",
      CustomError.USER_NOT_FOUND,
    );
  })
};

/**
 * @param {string} username
 * @returns {Promise<import("./types").StatsData>}
 */
async function fetchStats(username) {
  if (!username) throw new MissingParamError(["username"]);

  const stats = {
    username,
    cg: 0,
    gamesWon: 0,
    bestGameWpm: 0,
    wpm: 0,
    recentAvgWpm: 0,
    recentScores: [],
  };

  let raceResponse = await fetcher(username);
  
  // @ts-ignore
  const { data } = raceResponse;

  if(!data || !data.tstats || data.errors){ 
    logger.error(data.errors);
    throw new CustomError(
      data.errors[0].message || "Could not fetch user",
      CustomError.USER_NOT_FOUND,
    );
  }

  stats.cg = data.tstats.cg;
  stats.gamesWon = data.tstats.gamesWon;
  stats.bestGameWpm = Math.round(data.tstats.bestGameWpm);
  stats.wpm = Math.round(data.tstats.wpm);
  stats.recentAvgWpm = Math.round(data.tstats.recentAvgWpm);
  stats.recentScores = data.tstats.recentScores.map(Math.round);

  return stats;
}

module.exports = fetchStats;

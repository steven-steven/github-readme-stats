require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchStats = require("../src/fetchers/stats-fetcher");

const data = {
  name: "Stevne",
  lastName: "S",
  country: "ca",
  id: `tr:juninight`,
  avatar: null,
  tstats: {
    wpm: 70,
    recentScores: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    recentAvgWpm: 85,
    cg: 9100,
    bestGameWpm: 110,
    gamesWon: 1900,
  },
};

const error = {
  errors: [
    {
      type: "NOT_FOUND",
      path: ["user"],
      locations: [],
      message: "Could not resolve to a User with the login of 'noname'.",
    },
  ],
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test fetchStats", () => {
  it("should fetch correct stats", async () => {
    mock.onGet(`https://data.typeracer.com/users?id=tr:juninight`).reply(200, data);


    let stats = await fetchStats("juninight");

    expect(stats).toStrictEqual({
      username: "juninight",
      cg: 9100,
      gamesWon: 1900,
      bestGameWpm: 110,
      wpm: 70,
      recentAvgWpm: 85,
      recentScores: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    });
  });

  it("should throw error", async () => {
    mock.onGet("https://data.typeracer.com/users?id=tr:abc").reply(200, error);

    await expect(fetchStats("abc")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'.",
    );
  });
});

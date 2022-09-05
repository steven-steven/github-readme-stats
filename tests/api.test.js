require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const api = require("../api/index");
const renderStatsCard = require("../src/cards/stats-card");
const { renderError, CONSTANTS } = require("../src/common/utils");

const stats = {
  username: "juninight",
  cg: 9100,
  gamesWon: 1900,
  bestGameWpm: 110,
  wpm: 70,
  recentAvgWpm: 85,
  recentScores: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
};

const data = {
  name: "Stevne",
  lastName: "S",
  country: "ca",
  id: `tr:${stats.username}`,
  avatar: null,
  tstats: {
    wpm: stats.wpm,
    recentScores: stats.recentScores,
    recentAvgWpm: stats.recentAvgWpm,
    cg: stats.cg,
    bestGameWpm: stats.bestGameWpm,
    gamesWon: stats.gamesWon,
  },
};

const error = {
  errors: [
    {
      type: "NOT_FOUND",
      path: ["user"],
      locations: [],
      message: "Could not fetch user",
    },
  ],
};

const mock = new MockAdapter(axios);

const faker = (query, data) => {
  const req = {
    query: {
      username: "juninight",
      ...query,
    },
  };
  const res = {
    setHeader: jest.fn(),
    send: jest.fn(),
  };
  mock
    .onGet(`https://data.typeracer.com/users?id=tr:${req.query.username}`)
    .reply(200, data);

  return { req, res };
};

afterEach(() => {
  mock.reset();
});

describe("Test /api/", () => {
  it("should test the request", async () => {
    const { req, res } = faker({}, data);

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderStatsCard(stats, { ...req.query }));
  });

  it("should render error card on error", async () => {
    const { req, res } = faker({}, error);

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderError(
        error.errors[0].message,
        "Make sure the provided typeracer username is correct",
      ),
    );
  });

  it("should get the query options", async () => {
    const { req, res } = faker(
      {
        username: "juninight",
        hide: "issues,prs,contribs",
        show_icons: true,
        hide_border: true,
        line_height: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      },
      data,
    );

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderStatsCard(stats, {
        hide: ["issues", "prs", "contribs"],
        show_icons: true,
        hide_border: true,
        line_height: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      }),
    );
  });

  it("should have proper cache", async () => {
    const { req, res } = faker({}, data);

    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      ["Cache-Control", `public, max-age=14400`],
    ]);
  });
});

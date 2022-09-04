require("@testing-library/jest-dom");
const cssToObject = require("@uppercod/css-to-object").cssToObject;
const renderStatsCard = require("../src/cards/stats-card");

const {
  getByTestId,
  queryByTestId,
  queryAllByTestId,
} = require("@testing-library/dom");
const themes = require("../themes");

describe("Test renderStatsCard", () => {
  const stats = {
    username: "juninight",
    cg: 9100,
    gamesWon: 1900,
    bestGameWpm: 110,
    wpm: 70,
    recentAvgWpm: 85,
    recentScores: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
  };

  it("should render correctly", () => {
    document.body.innerHTML = renderStatsCard(stats);

    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "juninight's Typeracer Stats",
    );

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height"),
    ).toBe("220");
    expect(getByTestId(document.body, "cg").textContent).toBe("9.1k");
    expect(getByTestId(document.body, "gamesWon").textContent).toBe("1.9k");
    expect(getByTestId(document.body, "bestGameWpm").textContent).toBe("110 WPM");
    expect(getByTestId(document.body, "wpm").textContent).toBe("70 WPM");
    expect(getByTestId(document.body, "recentAvgWpm").textContent).toBe("85 WPM");
    expect(getByTestId(document.body, "recentScores").textContent).toBe(`[${stats.recentScores.toString()}]`);
    expect(queryByTestId(document.body, "card-bg")).toBeInTheDocument();
    expect(queryByTestId(document.body, "rank-circle")).toBeInTheDocument();
  });

  it("should hide individual stats", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide: ["recentScores", "recentAvgWpm", "cg"],
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height"),
    ).toBe("150"); // height should be 150 because we clamped it.

    expect(queryByTestId(document.body, "wpm")).toBeDefined();
    expect(queryByTestId(document.body, "bestGameWpm")).toBeDefined();
    expect(queryByTestId(document.body, "gamesWon")).toBeDefined();
    expect(queryByTestId(document.body, "cg")).toBeNull();
    expect(queryByTestId(document.body, "recentAvgWpm")).toBeNull();
    expect(queryByTestId(document.body, "recentScores")).toBeNull();
  });

  it("should hide_rank", () => {
    document.body.innerHTML = renderStatsCard(stats, { hide_rank: true });

    expect(queryByTestId(document.body, "rank-circle")).not.toBeInTheDocument();
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderStatsCard(stats);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe("#2f80ed");
    expect(statClassStyles.fill.trim()).toBe("#434d58");
    expect(iconClassStyles.fill.trim()).toBe("#4c71f2");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fffefe",
    );
  });

  it("should render custom colors properly", () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    document.body.innerHTML = renderStatsCard(stats, { ...customColors });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe(`#${customColors.title_color}`);
    expect(statClassStyles.fill.trim()).toBe(`#${customColors.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${customColors.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      title_color: "5a0",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe("#5a0");
    expect(statClassStyles.fill.trim()).toBe(`#${themes.radical.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderStatsCard(stats, {
        theme: name,
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerClassStyles = stylesObject[":host"][".header "];
      const statClassStyles = stylesObject[":host"][".stat "];
      const iconClassStyles = stylesObject[":host"][".icon "];

      expect(headerClassStyles.fill.trim()).toBe(
        `#${themes[name].title_color}`,
      );
      expect(statClassStyles.fill.trim()).toBe(`#${themes[name].text_color}`);
      expect(iconClassStyles.fill.trim()).toBe(`#${themes[name].icon_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`,
      );
    });
  });

  it("should render custom colors with themes and fallback to default colors if invalid", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      title_color: "invalid color",
      text_color: "invalid color",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe(
      `#${themes.default.title_color}`,
    );
    expect(statClassStyles.fill.trim()).toBe(`#${themes.default.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render icons correctly", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      show_icons: true,
    });

    expect(queryAllByTestId(document.body, "icon")[0]).toBeDefined();
    expect(queryByTestId(document.body, "cg")).toBeDefined();
    expect(
      queryByTestId(document.body, "cg").previousElementSibling, // the label
    ).toHaveAttribute("x", "25");
  });

  it("should not have icons if show_icons is false", () => {
    document.body.innerHTML = renderStatsCard(stats, { show_icons: false });

    expect(queryAllByTestId(document.body, "icon")[0]).not.toBeDefined();
    expect(queryByTestId(document.body, "cg")).toBeDefined();
    expect(
      queryByTestId(document.body, "cg").previousElementSibling, // the label
    ).not.toHaveAttribute("x");
  });

  it("should auto resize if hide_rank is true", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide_rank: true,
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("width"),
    ).toBe("285.03125");
  });

  it("should auto resize if hide_rank is true & custom_title is set", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide_rank: true,
      custom_title: "Hello world",
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("width"),
    ).toBe("270");
  });

  it("should render without rounding", () => {
    document.body.innerHTML = renderStatsCard(stats, { border_radius: "0" });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderStatsCard(stats, {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });
});

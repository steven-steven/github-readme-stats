// @ts-check
const Card = require("../common/Card");
const icons = require("../common/icons");
const { getStyles } = require("../getStyles");
const {
  kFormatter,
  flexLayout,
  clampValue,
  measureText,
  getCardColors,
} = require("../common/utils");

const createTextNode = ({
  icon,
  label,
  value,
  id,
  index,
  showIcons,
}) => {
  const kValue = isNaN(value) ? value : kFormatter(value);
  const staggerDelay = (index + 3) * 150;

  const labelOffset = showIcons ? `x="25"` : "";
  const iconSvg = showIcons
    ? `
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      ${icon}
    </svg>
  `
    : "";
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      ${iconSvg}
      <text class="stat bold" ${labelOffset} y="12.5">${label}:</text>
      <text 
        class="stat" 
        x="${(showIcons ? 140 : 120) + 85}" 
        y="12.5" 
        data-testid="${id}"
      >${kValue}</text>
    </g>
  `;
};

/**
 * @param {Partial<import('../fetchers/types').StatsData>} stats
 * @param {Partial<import("./types").StatCardOptions>} options
 * @returns {string}
 */
const renderStatsCard = (stats = {}, options = { hide: [] }) => {
  const {
    username,
    cg,
    gamesWon,
    bestGameWpm,
    wpm,
    recentAvgWpm = 0,
    recentScores = [],
  } = stats;
  const {
    hide = [],
    show_icons = false,
    hide_title = false,
    hide_border = false,
    hide_rank = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    custom_title,
    border_radius,
    border_color,
    disable_animations = false,
  } = options;

  const lheight = parseInt(String(line_height), 10);

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor, borderColor } =
    getCardColors({
      title_color,
      icon_color,
      text_color,
      bg_color,
      border_color,
      theme,
    });

  // Meta data for creating text nodes with createTextNode function
  const STATS = {
    cg: {
      icon: icons.star,
      label: "Total Games Played",
      value: cg,
      id: "cg",
    },
    gamesWon: {
      icon: icons.commits,
      label: "Total Games Won",
      value: gamesWon,
      id: "gamesWon",
    },
    bestGameWpm: {
      icon: icons.prs,
      label: "High score",
      value: `${bestGameWpm} WPM`,
      id: "bestGameWpm",
    },
    WPM: {
      icon: icons.issues,
      label: "Avg speed (all time)",
      value: `${wpm} WPM`,
      id: "wpm",
    },
    recentAvgWpm: {
      icon: icons.contribs,
      label: "Avg speed (last 10 races)",
      value: `${recentAvgWpm} WPM`,
      id: "recentAvgWpm",
    },
    recentScores: {
      icon: icons.contribs,
      label: "Last 10 races",
      value: `[${recentScores.toString()}]`,
      id: "recentScores",
    },
  };

  // filter out hidden stats defined by user & create the text nodes
  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({
        ...STATS[key],
        index,
        showIcons: show_icons,
      }),
    );

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : 150,
  );

  // Conditionally rendered elements
  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle" 
          transform="translate(400, ${height / 2 - 80})">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="60" />
        <circle class="rank-circle" cx="-10" cy="8" r="60" />
        <g class="rank-text">
          <text
            x="-5"
            y="3"
            alignment-baseline="central"
            dominant-baseline="central"
            text-anchor="middle"
          >
            ${recentAvgWpm} WPM
          </text>
        </g>
      </g>`;

  // progress over 100
  const progress = (recentAvgWpm/150)*100;
  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
    show_icons,
    progress,
  });

  const calculateTextWidth = () => {
    return measureText(custom_title ? custom_title : `${username}'s Typeracer Stats`);
  };

  const width = hide_rank
    ? clampValue(
        50 /* padding */ + calculateTextWidth() * 2,
        270 /* min */,
        Infinity,
      )
    : 495;

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: `${username}'s Typeracer Stats`,
    width,
    height,
    border_radius,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
      borderColor,
    },
  });

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(cssStyles);

  if (disable_animations) card.disableAnimations();

  // Accessibility Labels
  const labels = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key) => {
      return `${STATS[key].label}: ${STATS[key].value}`;
    })
    .join(", ");

  card.setAccessibilityLabel({
    title: `${card.title}, WPM: ${recentAvgWpm}`,
    desc: labels,
  });

  return card.render(`
    ${rankCircle}
    <svg x="0" y="0">
      ${flexLayout({
        items: statItems,
        gap: lheight,
        direction: "column",
      }).join("")}
    </svg> 
  `);
};

module.exports = renderStatsCard;

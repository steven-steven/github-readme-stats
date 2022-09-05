Note: This is a fork implementation of [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) and I simply allow it to work with the typeracer API.

<p align="center">
 <h2 align="center">Typeracer Readme stats</h2>
 <p align="center">Get dynamically generated Typeracer stats on your READMEs!</p>
 <p>
</p>
  <p align="center">
    <a href="https://github.com/steven-steven/typeracer-readme-stats/actions">
      <img alt="Tests Passing" src="https://github.com/steven-steven/typeracer-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://codecov.io/gh/steven-steven/typeracer-readme-stats">
      <img src="https://codecov.io/gh/steven-steven/typeracer-readme-stats/branch/master/graph/badge.svg" />
    </a>
    <a href="https://github.com/steven-steven/typeracer-readme-stats/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/steven-steven/typeracer-readme-stats?color=0088ff" />
    </a>
    <a href="https://github.com/steven-steven/typeracer-readme-stats/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/steven-steven/typeracer-readme-stats?color=0088ff" />
    </a>
    <br />
  </p>

  <p align="center">
    <a href="#demo">View Demo</a>
    ·
    <a href="https://github.com/steven-steven/typeracer-readme-stats/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/steven-steven/typeracer-readme-stats/issues/new/choose">Request Feature</a>
    ·
    <a href="https://github.com/steven-steven/typeracer-readme-stats/discussions">Ask Question</a>
  </p>
</p>

# Features

- [Typeracer Stats Card](#typeracer-stats-card)
- [Themes](#themes)
- [Customization](#customization)
  - [Common Options](#common-options)
  - [Stats Card Exclusive Options](#stats-card-exclusive-options)

# Typeracer Stats Card

Copy-paste this into your markdown content, and that's it. Simple!

Change the `?username=` value to your Typeracer username.

```md
[![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29)](https://github.com/steven-steven/typeracer-readme-stats)
```

### Hiding individual stats

To hide any specific stats, you can pass a query parameter `&hide=` with comma-separated values.

> Options: `&hide=cg,gamesWon,bestGameWpm,wpm,recentAvgWpm,recentScores`

```md
![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&hide=cg,gamesWon)
```

### Showing icons

To enable icons, you can pass `show_icons=true` in the query param, like so:

```md
![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&show_icons=true)
```

### Themes

With inbuilt themes, you can customize the look of the card without doing any [manual customization](#customization).

Use `&theme=THEME_NAME` parameter like so :-

```md
![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&theme=onedark)
```

#### All inbuilt themes:-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

You can look at a preview for [all available themes in the forked repo](https://github.com/anuraghazra/github-readme-stats/blob/master/themes/README.md) or checkout the [theme config file](./themes/index.js).

### Customization

You can customize the appearance of your `Stats Card` with URL params.

#### Common Options:

- `title_color` - Card's title color _(hex color)_
- `text_color` - Body text color _(hex color)_
- `icon_color` - Icons color if available _(hex color)_
- `border_color` - Card's border color _(hex color)_. (Does not apply when `hide_border` is enabled)
- `bg_color` - Card's background color _(hex color)_ **or** a gradient in the form of _angle,start,end_
- `hide_border` - Hides the card's border _(boolean)_
- `theme` - name of the theme, choose from [all available themes](./themes/README.md)
- `border_radius` - Corner rounding on the card_

##### Gradient in bg_color

You can provide multiple comma-separated values in the bg_color option to render a gradient, with the following format:

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

#### Stats Card Exclusive Options:

- `hide` - Hides the [specified items](#hiding-individual-stats) from stats _(Comma-separated values)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_ hides the rank and automatically resizes the card width
- `show_icons` - _(boolean)_
- `count_private` - Count private commits _(boolean)_
- `line_height` - Sets the line-height between text _(number)_
- `custom_title` - Sets a custom title for the card
- `disable_animations` - Disables all animations in the card _(boolean)_

---

### All Demos

- Default

![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29)

- Hiding specific stats

![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&hide=gamesWon,recentScores)

- Showing icons

![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&show_icons=true)

- Customize Border Color

![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&border_color=2e4058)

- Themes

Choose from any of the [default themes](#themes)

![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&show_icons=true&theme=radical)

- Gradient

![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Customizing stats card (not working)

![Steven's Typeracer stats](https://typeracer-readme-stats.vercel.app/api?username=juninight29&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](./powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)


Contributions are welcome! <3

Made with :heart: and JavaScript.

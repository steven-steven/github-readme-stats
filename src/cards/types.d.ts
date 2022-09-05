type ThemeNames = keyof typeof import("../../themes");

export type CommonOptions = {
  title_color: string;
  icon_color: string;
  text_color: string;
  bg_color: string;
  theme: ThemeNames;
  border_radius: number;
  border_color: string;
  locale: string;
};

export type StatCardOptions = CommonOptions & {
  hide: string[];
  show_icons: boolean;
  hide_title: boolean;
  hide_border: boolean;
  hide_rank: boolean;
  include_all_commits: boolean;
  line_height: number | string;
  custom_title: string;
  disable_animations: boolean;
};

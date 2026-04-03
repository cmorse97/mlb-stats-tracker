// Primary, secondary, and tertiary brand colors for all 30 MLB teams
export const TEAM_COLORS = {
  AZ: { primary: '#A71930', secondary: '#E3D4AD', tertiary: '#000000' },
  ATL: { primary: '#CE1141', secondary: '#13274F', tertiary: '#EAAA00' },
  BAL: { primary: '#DF4601', secondary: '#000000', tertiary: '#FFFFFF' },
  BOS: { primary: '#BD3039', secondary: '#0C2340', tertiary: '#FFFFFF' },
  CHC: { primary: '#0E3386', secondary: '#CC3433', tertiary: '#FFFFFF' },
  CWS: { primary: '#27251F', secondary: '#C4CED4', tertiary: '#FFFFFF' },
  CIN: { primary: '#C6011F', secondary: '#000000', tertiary: '#FFFFFF' },
  CLE: { primary: '#E31937', secondary: '#0C2340', tertiary: '#FFFFFF' },
  COL: { primary: '#33006F', secondary: '#C4CED4', tertiary: '#000000' },
  DET: { primary: '#0C2340', secondary: '#FA4616', tertiary: '#FFFFFF' },
  HOU: { primary: '#002D62', secondary: '#EB6E1F', tertiary: '#FFFFFF' },
  KC: { primary: '#004687', secondary: '#C09A5B', tertiary: '#FFFFFF' },
  LAA: { primary: '#BA0021', secondary: '#003263', tertiary: '#862633' },
  LAD: { primary: '#005A9C', secondary: '#EF3E42', tertiary: '#FFFFFF' },
  MIA: { primary: '#00A3E0', secondary: '#EF3340', tertiary: '#FF6600' },
  MIL: { primary: '#12284B', secondary: '#FFC52F', tertiary: '#FFFFFF' },
  MIN: { primary: '#002B5C', secondary: '#D31145', tertiary: '#B9975B' },
  NYM: { primary: '#002D72', secondary: '#FF5910', tertiary: '#FFFFFF' },
  NYY: { primary: '#003087', secondary: '#C4CED4', tertiary: '#FFFFFF' },
  ATH: { primary: '#003831', secondary: '#EFB21E', tertiary: '#FFFFFF' },
  PHI: { primary: '#E81828', secondary: '#002D72', tertiary: '#FFFFFF' },
  PIT: { primary: '#27251F', secondary: '#FDB827', tertiary: '#FFFFFF' },
  SD: { primary: '#2F241D', secondary: '#FFC425', tertiary: '#FFFFFF' },
  SF: { primary: '#FD5A1E', secondary: '#27251F', tertiary: '#EFD19F' },
  SEA: { primary: '#0C2C56', secondary: '#005C5C', tertiary: '#C4CED4' },
  STL: { primary: '#C41E3A', secondary: '#0C2340', tertiary: '#FEDB00' },
  TB: { primary: '#092C5C', secondary: '#8FBCE6', tertiary: '#F5D130' },
  TEX: { primary: '#003278', secondary: '#C0111F', tertiary: '#FFFFFF' },
  TOR: { primary: '#134A8E', secondary: '#1D2D5C', tertiary: '#E8291C' },
  WSH: { primary: '#AB0003', secondary: '#14225A', tertiary: '#FFFFFF' },
};

// MLB numeric team IDs — used to load official logos from mlbstatic CDN
export const TEAM_IDS = {
  AZ: 109,
  ATL: 144,
  BAL: 110,
  BOS: 111,
  CHC: 112,
  CWS: 145,
  CIN: 113,
  CLE: 114,
  COL: 115,
  DET: 116,
  HOU: 117,
  KC: 118,
  LAA: 108,
  LAD: 119,
  MIA: 146,
  MIL: 158,
  MIN: 142,
  NYM: 121,
  NYY: 147,
  ATH: 133,
  PHI: 143,
  PIT: 134,
  SD: 135,
  SF: 137,
  SEA: 136,
  STL: 138,
  TB: 139,
  TEX: 140,
  TOR: 141,
  WSH: 120,
};

// Controls which brand color is used as the header background.
// Goal: every team gets a dark background so the white wordmark and white logo pop.
//
// Teams using 'secondary':  their secondary is a dark contrasting navy/black.
// Teams NOT listed:         their primary is already dark enough (navy, charcoal, etc.)
//                           OR their secondary is too light to use (gold, silver, sand).
export const HEADER_BG = {
  ATL: 'secondary', // bright red (#CE1141)  → dark navy  (#13274F)
  BAL: 'secondary', // orange   (#DF4601)    → black      (#000000)
  BOS: 'secondary', // red      (#BD3039)    → dark navy  (#0C2340)
  CIN: 'secondary', // red      (#C6011F)    → black      (#000000)
  CLE: 'secondary', // red      (#E31937)    → dark navy  (#0C2340)
  LAA: 'secondary', // dark red (#BA0021)    → dark navy  (#003263)
  PHI: 'secondary', // red      (#E81828)    → dark navy  (#002D72)
  SF: 'secondary', // orange   (#FD5A1E)    → charcoal   (#27251F)
  STL: 'secondary', // red      (#C41E3A)    → navy       (#0C2340)
  TOR: 'secondary', // blue     (#134A8E)    → dark navy  (#1D2D5C)
  WSH: 'secondary', // dark red (#AB0003)    → navy       (#14225A)
  // NOT switched — secondary too light to use as bg:
  //   AZ (sand), KC (gold), MIA (red), LAD (red), CWS/COL/NYY/SEA (silver)
  // NOT switched — primary is already dark enough:
  //   CHC, CWS, COL, DET, HOU, MIL, MIN, NYM, NYY, ATH, PIT, SD, SEA, TB, TEX
};

// Returns the hex color to use for a team's header background
export const getHeaderBg = (teamAbv) => {
  const colors = TEAM_COLORS[teamAbv] ?? {
    primary: '#1e293b',
    secondary: '#334155',
  };
  return HEADER_BG[teamAbv] === 'secondary' ? colors.secondary : colors.primary;
};

// Returns the URL for a team's wordmark logo (home-uniform script/block name).
// "team-wordmark-on-dark" = white/light SVG, transparent background, all 30 IDs correct.
// Do NOT use "team-wordmark-on-light" — its ID mapping is broken on the CDN.
export const getWordmarkUrl = (teamAbv) => {
  const id = TEAM_IDS[teamAbv];
  if (!id) return null;
  return `https://www.mlbstatic.com/team-logos/team-wordmark-on-dark/${id}.svg`;
};

// Returns the URL for a team's primary mark rendered white-on-transparent.
// Use this for logos displayed on colored backgrounds so they always pop
// regardless of background color — no CSS filter needed.
export const getPrimaryDarkUrl = (teamAbv) => {
  const id = TEAM_IDS[teamAbv];
  if (!id) return null;
  return `https://www.mlbstatic.com/team-logos/team-primary-on-dark/${id}.svg`;
};

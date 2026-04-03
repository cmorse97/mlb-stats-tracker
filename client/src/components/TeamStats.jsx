import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTeamByTeamAbv } from '../services/api';
import {
  TEAM_COLORS,
  getHeaderBg,
  getPrimaryDarkUrl,
  getWordmarkUrl,
} from '../utils/teamConstants';
import Loading from './Loading';

const StatPill = ({ label, value, colorHex }) => (
  <div
    className="flex flex-col items-center px-3 py-1.5 rounded-lg"
    style={{ backgroundColor: colorHex + '22' }}
  >
    <span className="text-[9px] font-bold tracking-widest uppercase text-white/60">
      {label}
    </span>
    <span className="text-base font-bold text-white leading-tight">
      {value ?? '—'}
    </span>
  </div>
);

const TeamStats = () => {
  const [teamData, setTeamData] = useState(null);
  const { teamAbv } = useParams();

  useEffect(() => {
    fetchTeamByTeamAbv(teamAbv).then((data) => {
      if (data) setTeamData(data);
    });
  }, [teamAbv]);

  if (!teamData) {
    return <Loading />;
  }

  const {
    city,
    name,
    runs_allowed,
    runs_scored,
    run_diff,
    league_abv,
    division,
    wins,
    losses,
    streak,
  } = teamData;
  const colors = TEAM_COLORS[teamAbv] ?? {
    primary: '#1e293b',
    secondary: '#334155',
  };
  const headerBg = getHeaderBg(teamAbv);
  const wordmarkUrl = getWordmarkUrl(teamAbv);
  const primaryDarkUrl = getPrimaryDarkUrl(teamAbv);
  const divShort = division?.split(' ').pop(); // "American League East" → "East"
  const runDiffDisplay = run_diff > 0 ? `+${run_diff}` : run_diff;

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Colored header band */}
      <div className="relative h-36" style={{ backgroundColor: headerBg }}>
        {/* Diagonal texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '8px 8px',
          }}
        />
        {/* Wordmark watermark — home-uniform name logo, pre-rendered white */}
        {wordmarkUrl && (
          <img
            src={wordmarkUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none px-6"
          />
        )}

        {/* League / division badge — top left */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white/80 tracking-widest uppercase"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            {league_abv} · {divShort}
          </span>
        </div>

        {/* Streak — top right */}
        {streak && (
          <div className="absolute bottom-3.75 left-30 flex items-center gap-1.5">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
              }}
            >
              streak · {streak}
            </span>
          </div>
        )}

        {/* Bottom: logo + name + record + stat pills */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 flex items-end justify-between gap-4">
          {/* Logo + name */}
          <div className="flex items-end gap-3">
            {primaryDarkUrl && (
              <img
                src={primaryDarkUrl}
                alt={`${city} ${name}`}
                className="w-14 h-14 object-contain drop-shadow-lg"
              />
            )}
            <div>
              <p className="text-white/60 text-xs font-medium leading-none mb-0.5">
                {city}
              </p>
              <h1 className="text-white text-2xl font-bold leading-tight">
                {name}
              </h1>
              <p className="text-white/70 text-sm font-semibold leading-snug">
                {wins}–{losses}
              </p>
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex gap-2 pb-1">
            <StatPill
              label="RS"
              value={runs_scored}
              colorHex={colors.secondary}
            />
            <StatPill
              label="RA"
              value={runs_allowed}
              colorHex={colors.secondary}
            />
            <StatPill
              label="DIFF"
              value={runDiffDisplay}
              colorHex={colors.secondary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;

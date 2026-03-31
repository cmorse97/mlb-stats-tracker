import PropTypes from 'prop-types'

const TEAM_COLORS = {
  ARI: '#A71930', ATL: '#CE1141', BAL: '#DF4601', BOS: '#BD3039',
  CHC: '#0E3386', CWS: '#27251F', CIN: '#C6011F', CLE: '#E31937',
  COL: '#33006F', DET: '#0C2340', HOU: '#002D62', KC:  '#004687',
  LAA: '#BA0021', LAD: '#005A9C', MIA: '#00A3E0', MIL: '#12284B',
  MIN: '#002B5C', NYM: '#002D72', NYY: '#003087', ATH: '#003831',
  PHI: '#E81828', PIT: '#27251F', SD:  '#2F241D', SF:  '#FD5A1E',
  SEA: '#0C2C56', STL: '#C41E3A', TB:  '#092C5C', TEX: '#003278',
  TOR: '#134A8E', WSH: '#AB0003',
}

// MLB numeric team IDs — used to load official team logos from mlbstatic CDN
const TEAM_IDS = {
  ARI: 109, ATL: 144, BAL: 110, BOS: 111, CHC: 112, CWS: 145,
  CIN: 113, CLE: 114, COL: 115, DET: 116, HOU: 117, KC:  118,
  LAA: 108, LAD: 119, MIA: 146, MIL: 158, MIN: 142, NYM: 121,
  NYY: 147, ATH: 133, PHI: 143, PIT: 134, SD:  135, SF:  137,
  SEA: 136, STL: 138, TB:  139, TEX: 140, TOR: 141, WSH: 120,
}

const HITTER_STATS = [
  ['gamesPlayed', 'G'],  ['atBats', 'AB'],   ['hits', 'H'],
  ['homeRuns', 'HR'],    ['rbi', 'RBI'],      ['baseOnBalls', 'BB'],
  ['avg', 'AVG'],        ['obp', 'OBP'],      ['slg', 'SLG'],
  ['ops', 'OPS'],        ['strikeOuts', 'K'], ['stolenBases', 'SB'],
]

const PITCHER_STATS = [
  ['gamesPlayed', 'G'],          ['gamesStarted', 'GS'], ['wins', 'W'],
  ['losses', 'L'],               ['saves', 'SV'],        ['inningsPitched', 'IP'],
  ['era', 'ERA'],                ['whip', 'WHIP'],       ['strikeOuts', 'K'],
  ['baseOnBalls', 'BB'],         ['strikeoutsPer9Inn', 'K/9'], ['walksPer9Inn', 'BB/9'],
]

const calculateAge = bday => {
  if (!bday) return null
  const birth = new Date(bday)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const StatCell = ({ label, value }) => (
  <div className='flex flex-col items-center gap-0.5'>
    <span className='text-[10px] font-bold tracking-wider text-gray-400 uppercase'>
      {label}
    </span>
    <span className='text-sm font-semibold text-gray-800'>
      {value ?? '—'}
    </span>
  </div>
)

const PlayerModal = ({ setPlayerData, handlePlayerModalClose }) => {
  const playerData = setPlayerData
  const {
    name, avatar, position, jersey_number, team_abv,
    bats, throws: playerThrows, height, weight, bday,
  } = playerData

  const isPitcher = position === 'P'
  const teamColor = TEAM_COLORS[team_abv] || '#1e293b'
  const statSource = isPitcher
    ? playerData.stats?.Pitching
    : playerData.stats?.Hitting
  const statDefs = isPitcher ? PITCHER_STATS : HITTER_STATS
  const age = calculateAge(bday)
  const year = new Date().getFullYear()

  const row1 = statDefs.slice(0, 6)
  const row2 = statDefs.slice(6)

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={handlePlayerModalClose}
    >
      {/* Card */}
      <div
        className='relative w-80 lg:w-96 rounded-2xl overflow-hidden shadow-2xl select-none'
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header band ── */}
        <div className='relative h-28' style={{ backgroundColor: teamColor }}>
          {/* subtle diagonal texture */}
          <div className='absolute inset-0 opacity-10'
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }}
          />
          {/* team logo watermark — forced white so it shows on any team color */}
          {TEAM_IDS[team_abv] && (
            <img
              src={`https://www.mlbstatic.com/team-logos/${TEAM_IDS[team_abv]}.svg`}
              alt=''
              aria-hidden='true'
              className='absolute inset-0 w-full h-full object-contain opacity-20 scale-110 pointer-events-none'
              style={{ filter: 'grayscale(1)' }}
            />
          )}
          <button
            onClick={handlePlayerModalClose}
            className='absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition text-xs font-bold'
          >
            ✕
          </button>
          <div className='absolute bottom-3 left-4 text-white font-bold text-sm tracking-widest uppercase'>
            {team_abv}
          </div>
          <div className='absolute bottom-3 right-4 text-white/50 text-xs tracking-widest'>
            {year}
          </div>
        </div>

        {/* ── Body ── */}
        <div className='bg-white px-5 pt-14 pb-5 relative'>

          {/* Avatar — overlaps header */}
          <div className='absolute -top-11 left-1/2 -translate-x-1/2'>
            <div
              className='w-[88px] h-[88px] rounded-full overflow-hidden border-4 border-white shadow-xl'
              style={{ backgroundColor: teamColor + '18' }}
            >
              <img
                src={avatar}
                alt={name}
                className='w-full h-full object-cover'
                onError={e => { e.target.src = `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/0/headshot/67/current` }}
              />
            </div>
          </div>

          {/* Name + position */}
          <div className='text-center mb-3'>
            <h2 className='text-base font-bold text-gray-900 leading-snug'>{name}</h2>
            <div className='flex items-center justify-center gap-2 mt-1'>
              <span
                className='text-[11px] font-bold px-2 py-0.5 rounded-full text-white tracking-wide'
                style={{ backgroundColor: teamColor }}
              >
                {position}
              </span>
              <span className='text-[11px] text-gray-400 font-medium'>
                #{jersey_number}
              </span>
            </div>
          </div>

          {/* Physical details */}
          <div className='flex justify-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-500 mb-4 pb-3 border-b border-gray-100'>
            {age   && <span><b className='text-gray-700'>Age</b> {age}</span>}
            {height && <span><b className='text-gray-700'>Ht</b> {height}</span>}
            {weight && <span><b className='text-gray-700'>Wt</b> {weight} lbs</span>}
            {bats   && <span><b className='text-gray-700'>B/T</b> {bats}/{playerThrows}</span>}
          </div>

          {/* Stats — fixed height keeps all cards uniform */}
          <div className='rounded-xl overflow-hidden border border-gray-100 min-h-[116px]'>
            <div
              className='py-1.5 text-center text-[11px] font-bold tracking-widest uppercase text-white'
              style={{ backgroundColor: teamColor }}
            >
              {isPitcher ? 'Pitching' : 'Hitting'} Stats
            </div>
            {statSource ? (
              <>
                <div className='grid grid-cols-6 gap-y-3 px-2 py-3 bg-gray-50'>
                  {row1.map(([key, label]) => (
                    <StatCell key={key} label={label} value={statSource[key]} />
                  ))}
                </div>
                <div className='grid grid-cols-6 gap-y-3 px-2 pb-3 bg-gray-50 border-t border-gray-100'>
                  {row2.map(([key, label]) => (
                    <StatCell key={key} label={label} value={statSource[key]} />
                  ))}
                </div>
              </>
            ) : (
              <div className='flex items-center justify-center h-[90px] bg-gray-50'>
                <p className='text-xs text-gray-400 italic'>No stats available yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

PlayerModal.propTypes = {
  setPlayerData: PropTypes.object.isRequired,
  handlePlayerModalClose: PropTypes.func.isRequired,
}

export default PlayerModal

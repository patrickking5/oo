import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import courseInfo from "../data/course_info.json";
import liveOpenData from "../data/liveopen.json";
import nameBios from "../data/name_bios.json";
import legacyStats from "../data/stats_output.json";
import historyHtml from "./content/history.html?raw";
import GalleryPage from "./pages/GalleryPage.jsx";
import "./styles.css";

const openModules = import.meta.glob("../data/raw_opens/*.json", {
  eager: true,
  import: "default",
});
const playerNameAliases = {
  "Cary Bottorff": "Cary Bottorff",
  "Carry Bottorff": "Cary Bottorff",
};
const canonicalName = (name) => playerNameAliases[name] || name;
const nicknameFor = (name) =>
  nameBios[canonicalName(name)]?.nicknames?.[0] || "";
const opens = Object.values(openModules)
  .map((open) => ({
    ...open,
    champion_full_name: canonicalName(open.champion_full_name),
    players: (open.players || []).map((player) => ({
      ...player,
      player_full_name: canonicalName(player.player_full_name),
    })),
  }))
  .sort((a, b) => Number(b.year) - Number(a.year));
const liveOpen = {
  ...liveOpenData,
  _live: true,
  players: (liveOpenData.players || []).map((player) => ({
    ...player,
    player_full_name: canonicalName(player.player_full_name),
  })),
};

const icons = {
  Home: "M3 11.5 12 4l9 7.5M5.5 10v10h13V10M9 20v-6h6v6",
  Players:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  Opens:
    "M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4ZM7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4",
  Stats: "M4 20V10M10 20V4M16 20v-7M22 20V7",
  Gallery: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M16 9h.01",
  Search: "M21 21l-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  Chevron: "m9 18 6-6-6-6",
  Arrow: "M5 12h14M13 6l6 6-6 6",
  Close: "M18 6 6 18M6 6l12 12",
  Play: "m8 5 11 7-11 7z",
};

function Icon({ name, size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

const validScores = (scores) => (scores || []).filter((score) => score > 0);
const totalFor = (player) =>
  validScores(player.scores).reduce((sum, score) => sum + score, 0);
const scoreCount = (player) => validScores(player.scores).length;
const leaderboard = (open) =>
  [...(open.players || [])]
    .filter((p) => scoreCount(p))
    .sort((a, b) => {
      const completeA = scoreCount(a) === Number(open.number_of_rounds);
      const completeB = scoreCount(b) === Number(open.number_of_rounds);
      if (completeA !== completeB) return completeB - completeA;
      if (totalFor(a) === totalFor(b)) {
        if (a.player_full_name === open.champion_full_name) return -1;
        if (b.player_full_name === open.champion_full_name) return 1;
      }
      return totalFor(a) - totalFor(b);
    });
const ordinal = (n) =>
  `${n}${n % 100 >= 11 && n % 100 <= 13 ? "th" : n % 10 === 1 ? "st" : n % 10 === 2 ? "nd" : n % 10 === 3 ? "rd" : "th"}`;
const rankAt = (board, index, champion, numberOfRounds) => {
  if (index < 0 || !board[index]) return "—";
  if (scoreCount(board[index]) !== Number(numberOfRounds)) return "";
  if (board[index].player_full_name === champion) return "1st";
  const total = totalFor(board[index]);
  const tied = board.filter((p) => totalFor(p) === total);
  const first = board.findIndex((p) => totalFor(p) === total) + 1;
  return tied.length > 1 ? `T${first}` : ordinal(index + 1);
};
const podiumClassFor = (rank) => {
  if (rank === "1st" || rank === "T1") return "podium-first";
  if (rank === "2nd" || rank === "T2") return "podium-second";
  if (rank === "3rd" || rank === "T3") return "podium-third";
  return "";
};
const formatOpenDates = (dates = []) => {
  if (!dates.length) return "Tournament dates unavailable";
  const parsed = dates.map((date) => {
    const [month, day, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day, 12);
  });
  const sameMonth = parsed.every(
    (date) =>
      date.getMonth() === parsed[0].getMonth() &&
      date.getFullYear() === parsed[0].getFullYear(),
  );
  if (sameMonth)
    return `${parsed[0].toLocaleDateString("en-US", { month: "short" })} ${parsed.map((date) => date.getDate()).join(" · ")}, ${parsed[0].getFullYear()}`;
  return parsed
    .map((date) =>
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    )
    .join(" · ");
};
const formatRoundDate = (date) => {
  if (!date) return "Date unavailable";
  const [month, day, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day, 12).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const allNames = Object.keys(nameBios).sort();
const playerStats = allNames.map((name) => {
  const legacyName =
    Object.keys(playerNameAliases).find(
      (oldName) => playerNameAliases[oldName] === name,
    ) || name;
  const historical =
    legacyStats.player_stats?.[name] || legacyStats.player_stats?.[legacyName];
  const appearances = opens.filter((o) =>
    (o.players || []).some((p) => p.player_full_name === name && scoreCount(p)),
  );
  const entries = appearances.flatMap((o) =>
    o.players.filter((p) => p.player_full_name === name),
  );
  const scores = entries.flatMap((p) => validScores(p.scores));
  const wins = opens
    .filter((o) => o.champion_full_name === name)
    .map((o) => o.year);
  const historicalYears = new Set(
    (historical?.player_opens_data || []).map((entry) => String(entry.year)),
  );
  const newResults = appearances
    .filter((open) => !historicalYears.has(String(open.year)))
    .map((open) => {
      const player = open.players.find(
        (entry) => entry.player_full_name === name,
      );
      const board = leaderboard(open);
      const boardIndex = board.findIndex(
        (entry) => entry.player_full_name === name,
      );
      const eligible = validScores(player.scores);
      return {
        year: String(open.year),
        type:
          scoreCount(player) === Number(open.number_of_rounds)
            ? "full"
            : "partial",
        rounds: (player.scores || []).map((score, index) => ({
          score,
          course: open.courses?.[index] || `Round ${index + 1}`,
          date: open.dates?.[index] || "",
        })),
        rank:
          scoreCount(player) === Number(open.number_of_rounds)
            ? rankAt(
                board,
                boardIndex,
                open.champion_full_name,
                open.number_of_rounds,
              )
            : "-1",
        total_score:
          scoreCount(player) === Number(open.number_of_rounds)
            ? totalFor(player)
            : -1,
        average_score: eligible.length
          ? Number(
              (eligible.reduce((a, b) => a + b, 0) / eligible.length).toFixed(
                2,
              ),
            )
          : null,
      };
    });
  const addedScores = newResults.flatMap((result) =>
    result.rounds.map((round) => round.score).filter((score) => score > 0),
  );
  const completeScores = [
    ...(historical?.eligible_score_history || []),
    ...addedScores,
  ];
  const mergedCourses = structuredClone(historical?.course_data || {});
  newResults.forEach((result) =>
    result.rounds.forEach((round) => {
      if (round.score <= 0) return;
      const current = mergedCourses[round.course] || {
        scores: [],
        num_rounds: 0,
        avg: 0,
        total_strokes: 0,
      };
      current.scores.push({ score: round.score, year: result.year });
      current.num_rounds += 1;
      current.total_strokes += round.score;
      current.avg = Number(
        (current.total_strokes / current.num_rounds).toFixed(2),
      );
      mergedCourses[round.course] = current;
    }),
  );
  const addedSeconds = newResults.filter(
    (result) => result.rank === "2nd" || result.rank === "T2",
  ).length;
  const addedThirds = newResults.filter(
    (result) => result.rank === "3rd" || result.rank === "T3",
  ).length;
  return {
    name,
    nickname: nicknameFor(name) || name.split(" ")[0],
    bio: nameBios[name]?.bio || "",
    opens:
      (historical?.total_opens_num ?? 0) + newResults.length ||
      appearances.length,
    rounds: completeScores.length || scores.length,
    average: completeScores.length
      ? completeScores.reduce((a, b) => a + b, 0) / completeScores.length
      : scores.length
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : null,
    low: completeScores.length
      ? Math.min(...completeScores)
      : scores.length
        ? Math.min(...scores)
        : null,
    wins,
    winCount: wins.length,
    seconds: (historical?.runner_ups ?? 0) + addedSeconds,
    thirds: (historical?.third_place_finishes ?? 0) + addedThirds,
    podiums:
      wins.length +
      (historical?.runner_ups ?? 0) +
      addedSeconds +
      (historical?.third_place_finishes ?? 0) +
      addedThirds,
    strokes: completeScores.reduce((a, b) => a + b, 0),
    under80: completeScores.filter((score) => score < 80).length,
    yearly: [...(historical?.player_opens_data || []), ...newResults].sort(
      (a, b) => Number(a.year) - Number(b.year),
    ),
    courses: mergedCourses,
  };
});

function Kicker({ children }) {
  return <div className="kicker">{children}</div>;
}
function SectionHead({ eyebrow, title, copy, action }) {
  return (
    <div className="section-head">
      <div>
        <Kicker>{eyebrow}</Kicker>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  );
}
function Pill({ children, tone = "" }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

function App() {
  const [tab, setTab] = useState("Home");
  const [selectedOpen, setSelectedOpen] = useState(null);
  const [statsPlayer, setStatsPlayer] = useState(null);
  const [statsMode, setStatsMode] = useState("tournament");
  const [playerPreview, setPlayerPreview] = useState(null);
  const [homeHeaderAtTop, setHomeHeaderAtTop] = useState(true);
  const [previewPosition, setPreviewPosition] = useState({ left: 12, top: 80 });
  const previewCloseTimer = useRef(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab, selectedOpen]);
  useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js");
  }, []);
  useEffect(() => {
    const isHomeHero = tab === "Home" && !selectedOpen;
    const updateHeader = () =>
      setHomeHeaderAtTop(isHomeHero && window.scrollY < 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [tab, selectedOpen]);
  useEffect(() => {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor)
      themeColor.setAttribute(
        "content",
        tab === "Home" && !selectedOpen && homeHeaderAtTop
          ? "#153b2b"
          : "#f4f1e9",
      );
  }, [homeHeaderAtTop, tab, selectedOpen]);
  const navigate = (next) => {
    setSelectedOpen(null);
    if (next === "Stats") {
      setStatsPlayer(null);
      setStatsMode("tournament");
    }
    setTab(next);
  };
  const showPlayerStats = (name) => {
    setSelectedOpen(null);
    setStatsPlayer(name);
    setStatsMode("players");
    setTab("Stats");
  };
  const pages = {
    Home: <Home onNavigate={navigate} onOpen={setSelectedOpen} />,
    Players: <Players onShowStats={showPlayerStats} />,
    Opens: <Opens selected={selectedOpen} onSelect={setSelectedOpen} />,
    Stats: (
      <Stats
        focusPlayer={statsPlayer}
        mode={statsMode}
        setMode={setStatsMode}
      />
    ),
    Gallery: <GalleryPage />,
  };
  const previewData = playerPreview
    ? playerStats.find((p) => p.name === playerPreview)
    : null;
  const findPreviewTarget = (event) => event.target.closest?.("[data-player]");
  const placePreview = (target) => {
    const rect = target.getBoundingClientRect();
    const width = Math.min(285, window.innerWidth - 16);
    const estimatedHeight = window.innerWidth <= 620 ? 205 : 275;
    const left = Math.max(
      8,
      Math.min(rect.left, window.innerWidth - width - 8),
    );
    const below = rect.bottom + 7;
    const top =
      below + estimatedHeight <= window.innerHeight
        ? below
        : Math.max(8, rect.top - estimatedHeight - 7);
    setPreviewPosition({ left, top });
  };
  const openPreview = (target) => {
    window.clearTimeout(previewCloseTimer.current);
    placePreview(target);
    setPlayerPreview(target.dataset.player);
  };
  const schedulePreviewClose = () => {
    window.clearTimeout(previewCloseTimer.current);
    previewCloseTimer.current = window.setTimeout(
      () => setPlayerPreview(null),
      100,
    );
  };
  return (
    <div
      className="app"
      onMouseOver={(event) => {
        const target = findPreviewTarget(event);
        if (tab !== "Players" && target) openPreview(target);
      }}
      onMouseOut={(event) => {
        const target = findPreviewTarget(event);
        if (target && !target.contains(event.relatedTarget))
          schedulePreviewClose();
      }}
      onClickCapture={(event) => {
        const target = findPreviewTarget(event);
        if (tab !== "Players" && target) {
          event.preventDefault();
          event.stopPropagation();
          openPreview(target);
        } else if (!event.target.closest?.(".player-profile-popover"))
          setPlayerPreview(null);
      }}
    >
      <Header
        tab={tab}
        onNavigate={navigate}
        onLive={() => setSelectedOpen(liveOpen)}
        statsMode={statsMode}
        setStatsMode={setStatsMode}
        homeOverlay={tab === "Home" && !selectedOpen}
        homeHeaderAtTop={homeHeaderAtTop}
      />
      <main>
        {selectedOpen ? (
          <OpenDetail
            open={selectedOpen}
            onBack={() => setSelectedOpen(null)}
            onSelect={setSelectedOpen}
            live={selectedOpen._live === true}
          />
        ) : (
          pages[tab]
        )}
      </main>
      {previewData && tab !== "Players" && (
        <aside
          className="player-profile-popover"
          style={{ left: previewPosition.left, top: previewPosition.top }}
          onMouseEnter={() => window.clearTimeout(previewCloseTimer.current)}
          onMouseLeave={schedulePreviewClose}
          role="dialog"
          aria-label={`${previewData.name} profile preview`}
        >
          <button
            className="profile-popover-close"
            onClick={() => setPlayerPreview(null)}
            aria-label="Close profile preview"
          >
            ×
          </button>
          <PlayerProfileCard
            p={previewData}
            index={playerStats.findIndex((p) => p.name === previewData.name)}
            preview
          />
          <button
            className="explore-profiles-button"
            onClick={() => {
              setPlayerPreview(null);
              navigate("Players");
            }}
          >
            Explore All Profiles <Icon name="Arrow" size={14} />
          </button>
        </aside>
      )}
      <MobileNav tab={tab} onNavigate={navigate} />
      <Footer onNavigate={navigate} />
    </div>
  );
}

function Header({
  tab,
  onNavigate,
  onLive,
  statsMode,
  setStatsMode,
  homeOverlay,
  homeHeaderAtTop,
}) {
  const overHomeHero = homeOverlay && homeHeaderAtTop;
  return (
    <header
      className={`site-header ${homeOverlay ? "home-hero-header" : ""} ${overHomeHero ? "over-hero" : ""}`}
    >
      <button
        className="brand"
        onClick={() => onNavigate("Home")}
        aria-label="Oll Open home"
      >
        <img
          className="brand-logo"
          src={
            overHomeHero
              ? "/logos/oll-open-light-current.png"
              : "/logos/oll-open-current.png"
          }
          alt="Oll Open"
        />
      </button>
      {tab !== "Stats" && (
        <button className="live-leaderboard-link" onClick={onLive}>
          <span className="live-play-icon">
            <Icon name="Play" size={11} />
          </span>
          <span>Live Leaderboard</span>
        </button>
      )}
      {tab === "Stats" && (
        <div
          className="header-stats-mode"
          role="tablist"
          aria-label="Statistics view"
        >
          <button
            className={statsMode === "tournament" ? "active" : ""}
            onClick={() => setStatsMode("tournament")}
          >
            <Icon name="Opens" size={14} />
            <span>Tournament</span>
          </button>
          <button
            className={statsMode === "players" ? "active" : ""}
            onClick={() => setStatsMode("players")}
          >
            <Icon name="Players" size={14} />
            <span>Players</span>
          </button>
        </div>
      )}
      <nav className="desktop-nav" aria-label="Main navigation">
        {Object.keys(icons)
          .slice(0, 5)
          .map((item) => (
            <button
              className={tab === item ? "active" : ""}
              onClick={() => onNavigate(item)}
              key={item}
            >
              {item}
            </button>
          ))}
      </nav>
      <div className="since">
        SINCE
        <br />
        <strong>1987</strong>
      </div>
    </header>
  );
}

function MobileNav({ tab, onNavigate }) {
  return (
    <nav className="mobile-nav">
      {["Home", "Players", "Opens", "Stats", "Gallery"].map((item) => (
        <button
          className={tab === item ? "active" : ""}
          onClick={() => onNavigate(item)}
          key={item}
        >
          <Icon name={item} size={20} />
          <span>{item}</span>
        </button>
      ))}
    </nav>
  );
}

const homeRules = [
  "NO GIMMES — not even tap-ins.",
  "LCP in your OWN fairway ONLY. This includes removing balls from divots, aeration holes, burnt-out fairway, etc. Use common sense; for example, #5 at ISU is always GUR.",
  "1st cut / collar around the greens constitutes a fairway.",
  'Ball-in-hand in ALL bunkers for ALL lies. Groom and move ball 6" maximum, no closer to the hole. If you are on a front / back slope, retain relative position.',
  "Group consensus on GROUND UNDER REPAIR for rough in horrible condition. Examples: ISU #5 to the left and ISU #16 to the right.",
  "Metamora Fields — driving range on the left of 7 and 18 fairways is OB.",
];
const homeWagering = [
  "Daily $5 NET skins pool — new game since we are now popping every hole.",
  "Daily $5 GROSS birdie pool. Eagles count as 2 birdies.",
  "Daily $5 QUOTA pool — your quota is 36 minus your current handicap, paying approximately 60% to win, 30% to place, and 10% to show.",
  "Eagles count as 8 points in the Quota calculation.",
  "Longest Putt on #18 for $1 and daily Closest-to-the-Pin for $1.",
  "Optional $100 hole-in-one game. A player with an ace receives $100 from every player opted in.",
  "$51 maximum burn if you are in for every game all three days. Small bills are greatly appreciated.",
];

function Home({ onNavigate, onOpen }) {
  const latest = opens[0];
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <h1>
            Four decades.
            <br />
            <em>One MAJOR weekend.</em>
          </h1>
          <p>
            The Oll Open returns August 7-9, 2026! 3 rounds, lifelong friends,
            and more memories to be made.
          </p>
          <div className="hero-actions">
            <button className="btn gold" onClick={() => onOpen(latest)}>
              View 2025 results <Icon name="Arrow" size={18} />
            </button>
            <button className="btn ghost" onClick={() => onNavigate("Players")}>
              Meet the Players
            </button>
          </div>
        </div>
        <div className="hero-stat">
          <strong>40th</strong>
          <span>
            Anniversary
            <br />
          </span>
        </div>
      </section>
      <div className="page-section home-lower-grid">
        <section className="home-news">
          <div className="home-news-head">
            <div>
              <Kicker>WELCOME</Kicker>
              <h2>News from the Open</h2>
              <p>
                Thank you to everyone who RSVP'd. Please review the information
                below.
              </p>
            </div>
            <strong aria-hidden="true">40th</strong>
          </div>

          {/* <details className="news-detail news-rsvp">
            <summary>
              <span>
                2026 Oll Open RSVPs <small>THE FIELD</small>
              </span>
              <span>+</span>
            </summary>
            <div className="news-rsvp-body">
              <img
                src="/photos/2026rsvplist.png"
                alt="2026 Oll Open RSVP list"
              />
            </div>
          </details> */}
          <details className="news-detail">
            <summary>
              <span>
                Special Oll Open Rules <small>ALL 3 DAYS</small>
              </span>
              <span>+</span>
            </summary>
            <ul>
              {homeRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </details>
          <details className="news-detail">
            <summary>
              <span>
                Optional Wagering <small>MAKE SOME $$$</small>
              </span>

              <span>+</span>
            </summary>
            <div className="news-detail-body">
              <p>
                <strong>
                  Entering a NET game requires a CDGA, GHIN, or documented
                  handicap — no exceptions.
                </strong>
              </p>
              <ul>
                {homeWagering.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </details>
        </section>
        <section className="history-document">
          <div className="history-document-head">
            <div>
              <Kicker>IN CHIEF'S WORDS</Kicker>
              <h2>History of the Oll Open</h2>
              <p>
                The original account of how this great tradition came to be.
              </p>
            </div>
            <img
              className="history-original-logo"
              src="/logos/oll-open-original.png"
              alt="The original Oll Open logo"
            />
          </div>
          <details>
            <summary>
              <span>Read the full original history</span>
              <span className="history-summary-icon">+</span>
            </summary>
            <article
              className="history-prose"
              dangerouslySetInnerHTML={{ __html: historyHtml }}
            />
          </details>
        </section>
      </div>
    </>
  );
}

function PlayerProfileCard({ p, index = 0, onShowStats, preview = false }) {
  const displayNickname = p.nickname || p.name.split(" ")[0];
  const nicknameLength = Math.max(1, displayNickname.length);
  const nicknameSizing = {
    "--nickname-mobile-size": `${Math.max(13, Math.min(23, Math.floor(82 / (nicknameLength * 0.62))))}px`,
    "--nickname-preview-size": `${Math.max(11, Math.min(22, Math.floor(64 / (nicknameLength * 0.62))))}px`,
  };
  return (
    <article className={`player-card ${preview ? "preview-player-card" : ""}`}>
      <div className={`avatar avatar-${index % 6}`}>
        <span className="player-top-name" style={nicknameSizing}>
          {displayNickname}
        </span>
      </div>
      <div className="player-card-body">
        <div className="player-title">
          <div>
            <h3>{p.name}</h3>
          </div>
          {p.wins.length > 0 && (
            <span className="win-badge">
              {p.wins.length}×<Icon name="Opens" size={16} />
            </span>
          )}
        </div>
        <p>{p.bio}</p>
        <div className="mini-stats">
          <div className="mini-stat-values">
            <span>
              <b>{p.opens}</b> Opens
            </span>
            <span>
              <b>{p.rounds}</b> Rounds
            </span>
          </div>
          {!preview && (
            <button
              className="player-stats-link"
              onClick={() => onShowStats(p.name)}
            >
              See all stats <Icon name="Arrow" size={12} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function Players({ onShowStats }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("first-asc");
  const nameParts = (name) => {
    const parts = name.trim().split(/\s+/);
    return { first: parts[0] || "", last: parts.at(-1) || "" };
  };
  const filtered = playerStats
    .filter((p) =>
      `${p.name} ${p.nickname}`.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "opens-desc")
        return b.opens - a.opens || a.name.localeCompare(b.name);
      const field = sortBy.startsWith("last") ? "last" : "first";
      const direction = sortBy.endsWith("desc") ? -1 : 1;
      return (
        nameParts(a.name)[field].localeCompare(nameParts(b.name)[field]) *
          direction || a.name.localeCompare(b.name)
      );
    });
  return (
    <div className="page-section page-top">
      <SectionHead
        eyebrow="THE DUDES"
        title="Players"
        copy={`Meet the ${playerStats.length} players in the Oll Open family who make this such a special event.`}
      />
      <div className="toolbar">
        <label className="search">
          <Icon name="Search" size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players or nicknames"
          />
        </label>
        <label className="player-sort">
          <span>SORT BY</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="first-asc">First name A–Z</option>
            <option value="first-desc">First name Z–A</option>
            <option value="last-asc">Last name A–Z</option>
            <option value="last-desc">Last name Z–A</option>
            <option value="opens-desc">Opens played</option>
          </select>
        </label>
        <span>{filtered.length} PLAYERS</span>
      </div>
      <div className="player-grid">
        {filtered.map((p, i) => (
          <PlayerProfileCard
            p={p}
            index={i}
            onShowStats={onShowStats}
            key={p.name}
          />
        ))}
      </div>
    </div>
  );
}

function Opens({ selected, onSelect }) {
  const [query, setQuery] = useState("");
  const [decade, setDecade] = useState("All");
  const decades = ["All", "2020s", "2010s", "2000s", "1990s", "1980s"];
  const filtered = opens.filter(
    (o) =>
      (decade === "All" ||
        Math.floor(Number(o.year) / 10) * 10 === Number(decade.slice(0, 4))) &&
      `${o.year} ${o.champion_full_name}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="page-section page-top">
      <SectionHead
        eyebrow="THE ARCHIVES"
        title="Every Oll Open"
        copy="Select a year to see the full leaderboard."
      />
      <div className="toolbar open-tools">
        <label className="search">
          <Icon name="Search" size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search year or champion"
          />
        </label>
        <div className="chip-row">
          {decades.map((d) => (
            <button
              className={decade === d ? "active" : ""}
              onClick={() => setDecade(d)}
              key={d}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="opens-list">
        <div className="opens-head">
          <span>YEAR</span>
          <span>CHAMPION</span>
          <span>WINNING TOTAL</span>
          <span />
        </div>
        {filtered.map((open) => {
          const champ = (open.players || []).find(
            (p) => p.player_full_name === open.champion_full_name,
          );
          return (
            <button
              className="open-row"
              onClick={() => onSelect(open)}
              key={open.year}
            >
              <span className="year">
                <small className="open-number">
                  #{Number(open.year) - 1986}
                </small>
                {open.year}
              </span>
              <span className="open-champion-name">
                <b>
                  <span data-player={open.champion_full_name}>
                    {open.champion_full_name}
                  </span>
                </b>
                <small className="player-nickname-label">
                  <span data-player={open.champion_full_name}>
                    {nicknameFor(open.champion_full_name)
                      ? nicknameFor(open.champion_full_name)
                      : "Oll Open Champion"}
                  </span>
                </small>
              </span>
              <span className="winning-score">
                {champ && scoreCount(champ) ? (
                  <>
                    <b>{validScores(champ.scores).join("–")}</b>
                    <small>{totalFor(champ)}</small>
                  </>
                ) : (
                  "—"
                )}
              </span>
              <span className="circle-btn">
                <Icon name="Arrow" size={18} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OpenDetail({ open, onBack, onSelect, live = false }) {
  const liveEligible = (player) =>
    Array.from(
      { length: Number(open.number_of_rounds) },
      (_, index) => player.scores?.[index] !== -1,
    ).every(Boolean);
  const board = live
    ? [...(open.players || [])].sort((a, b) => {
        const eligibleA = liveEligible(a);
        const eligibleB = liveEligible(b);
        if (eligibleA !== eligibleB) return eligibleB - eligibleA;
        if (totalFor(a) !== totalFor(b)) return totalFor(a) - totalFor(b);
        return a.player_full_name.localeCompare(b.player_full_name);
      })
    : leaderboard(open);
  const scores = board.flatMap((p) => validScores(p.scores));
  const hasScoreData = live || scores.length > 0;
  const idx = opens.findIndex((o) => o.year === open.year);
  const liveRankAt = (player, index) => {
    if (!liveEligible(player)) return "";
    const total = totalFor(player);
    const tied = board.filter(
      (entry) => liveEligible(entry) && totalFor(entry) === total,
    );
    const first = board.findIndex(
      (entry) => liveEligible(entry) && totalFor(entry) === total,
    );
    return tied.length > 1 ? `T${first + 1}` : ordinal(index + 1);
  };
  const scoreColumns = {
    gridTemplateColumns: `55px minmax(180px, 1fr) repeat(${Number(open.number_of_rounds)}, 64px) 75px`,
    "--rounds": Number(open.number_of_rounds),
  };
  return (
    <div
      className={`page-section page-top open-page ${live ? "live-open-page" : ""}`}
    >
      <div className="open-sticky-header">
        <div className="open-masthead">
          <button className="back" onClick={onBack}>
            ← {live ? "Back" : "All Opens"}
          </button>
          <h1>{live ? "Live Leaderboard" : `${open.year} Oll Open`}</h1>
          <div className="open-detail-meta">
            <Kicker>
              {live
                ? "LIVE · SCOREBOARD"
                : `${ordinal(Number(open.year) - 1986)} Annual`}
            </Kicker>
            <p>{formatOpenDates(open.dates)}</p>
          </div>
        </div>
        {!live && (
          <div className="year-nav open-year-nav">
            <button
              disabled={!opens[idx + 1]}
              onClick={() => onSelect(opens[idx + 1])}
            >
              ← {opens[idx + 1]?.year}
            </button>
            <button
              disabled={!opens[idx - 1]}
              onClick={() => onSelect(opens[idx - 1])}
            >
              {opens[idx - 1]?.year} →
            </button>
          </div>
        )}
      </div>
      {!hasScoreData ? (
        <section className="open-no-stats" aria-labelledby="no-stats-title">
          <Kicker>OLL OPEN ARCHIVES</Kicker>
          <h2 id="no-stats-title">No stats available for {open.year}</h2>
          <p>
            Individual scores from this edition of the Oll Open were not
            recorded.
          </p>
          <div className="archived-champion">
            <small>CHAMPION</small>
            <strong>
              <span data-player={open.champion_full_name}>
                {open.champion_full_name}
              </span>
            </strong>
            {nicknameFor(open.champion_full_name) && (
              <span data-player={open.champion_full_name}>
                {nicknameFor(open.champion_full_name)}
              </span>
            )}
          </div>
        </section>
      ) : (
        <div className="detail-stack">
          <details className="leader-card leaderboard-disclosure" open>
            <summary className="leader-title">
              <span className="leader-title-copy">
                <small>{ordinal(Number(open.year) - 1986)} ANNUAL</small>
                <h2>
                  {open.year} {live ? "Live" : ""} Leaderboard
                </h2>
              </span>
              <span className="leader-rounds" aria-label="Rounds and courses">
                {Array.from(
                  { length: Number(open.number_of_rounds) },
                  (_, index) => (
                    <span className="leader-round" key={index}>
                      <small>
                        R{index + 1} · {formatRoundDate(open.dates?.[index])}
                      </small>
                      <b title={open.courses?.[index]}>
                        {courseInfo[open.courses?.[index]]?.short_name ||
                          open.courses?.[index] ||
                          "Course unavailable"}
                      </b>
                    </span>
                  ),
                )}
              </span>
              <span className="leaderboard-toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="score-table">
              <div className="score-head" style={scoreColumns}>
                <span>POS</span>
                <span>PLAYER</span>
                {Array.from(
                  { length: Number(open.number_of_rounds) },
                  (_, i) => (
                    <span key={i}>R{i + 1}</span>
                  ),
                )}
                <span>TOTAL</span>
              </div>
              {board.map((p, i) => {
                const position = live
                  ? liveRankAt(p, i)
                  : rankAt(
                      board,
                      i,
                      open.champion_full_name,
                      open.number_of_rounds,
                    );
                const podiumClass =
                  !live || totalFor(p) > 0 ? podiumClassFor(position) : "";
                return (
                  <div
                    className={`score-row ${!live && p.player_full_name === open.champion_full_name ? "winner" : ""} ${live && !liveEligible(p) ? "live-ineligible" : ""} ${podiumClass}`}
                    key={p.player_full_name}
                    style={scoreColumns}
                  >
                    <span>{position}</span>
                    <span className="leader-player-name">
                      <b>
                        <span data-player={p.player_full_name}>
                          {p.player_full_name}
                        </span>
                      </b>
                      <small className="player-nickname-label">
                        <span data-player={p.player_full_name}>
                          {nicknameFor(p.player_full_name)}
                        </span>
                      </small>
                    </span>
                    {Array.from(
                      { length: Number(open.number_of_rounds) },
                      (_, j) => (
                        <span data-label={`R${j + 1}`} key={j}>
                          {p.scores[j] > 0
                            ? p.scores[j]
                            : live && p.scores[j] === -1
                              ? "—"
                              : live && p.scores[j] === 0
                                ? "0"
                                : "—"}
                        </span>
                      ),
                    )}
                    <span data-label="Total">
                      <b>
                        {live
                          ? totalFor(p)
                          : scoreCount(p) === Number(open.number_of_rounds)
                            ? totalFor(p)
                            : "—"}
                      </b>
                    </span>
                  </div>
                );
              })}
            </div>
          </details>
          <aside className="field-card">
            <Kicker>FIELD STATS</Kicker>
            <h3>{open.year} Tournament Stats</h3>
            <div className="field-stats">
              <div>
                <b>{board.length || "—"}</b>
                <span>Players</span>
              </div>
              <div>
                <b>
                  {scores.length
                    ? (
                        scores.reduce((a, b) => a + b, 0) / scores.length
                      ).toFixed(1)
                    : "—"}
                </b>
                <span>Scoring avg.</span>
              </div>
              <div>
                <b>{scores.length ? Math.min(...scores) : "—"}</b>
                <span>Low round</span>
              </div>
              <div>
                <b>{open.number_of_rounds}</b>
                <span>Rounds</span>
              </div>
            </div>
            {open.courses?.length > 0 && (
              <>
                <h4>Courses</h4>
                <ol className="course-list">
                  {open.courses.map((c, i) => (
                    <li key={`${c}-${i}`}>
                      <span>R{i + 1}</span>
                      <b>{c}</b>
                      <small>
                        {(() => {
                          const roundScores = (open.players || [])
                            .map((p) => p.scores?.[i])
                            .filter((score) => score > 0);
                          return roundScores.length
                            ? `${(roundScores.reduce((a, b) => a + b, 0) / roundScores.length).toFixed(1)} avg`
                            : "No scores";
                        })()}
                      </small>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

const chartColors = ["#2f6b4d", "#2878b8", "#b16b2f", "#7d5ab5", "#b84e68"];

function LineChart({
  series,
  valueKey = "value",
  empty = "No scoring data available",
}) {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 760 : window.innerWidth,
  );
  const [activeYear, setActiveYear] = useState(null);
  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const width = 760;
  const height = 240;
  const pad = 30;
  const values = series
    .flatMap((s) => s.points.map((p) => p[valueKey]))
    .filter(Number.isFinite);
  const years = series
    .flatMap((s) => s.points.map((p) => Number(p.year)))
    .filter(Number.isFinite);
  if (!values.length || !years.length)
    return <div className="chart-empty">{empty}</div>;
  const minV = Math.floor(Math.min(...values) - 1);
  const maxV = Math.ceil(Math.max(...values) + 1);
  const minY = Math.min(...years);
  const maxY = Math.max(...years);
  const tickCount =
    viewportWidth < 380
      ? 4
      : viewportWidth < 620
        ? 5
        : viewportWidth < 1000
          ? 7
          : 9;
  const availableYears = [...new Set(years)].sort((a, b) => a - b);
  const yearTicks =
    availableYears.length <= tickCount
      ? availableYears
      : [
          ...new Set(
            Array.from(
              { length: tickCount },
              (_, i) =>
                availableYears[
                  Math.round(
                    ((availableYears.length - 1) * i) /
                      Math.max(1, tickCount - 1),
                  )
                ],
            ),
          ),
        ];
  const x = (year) => {
    const index = Math.max(0, availableYears.indexOf(Number(year)));
    return (
      pad + (index / Math.max(1, availableYears.length - 1)) * (width - pad * 2)
    );
  };
  const y = (value) =>
    height -
    pad -
    ((value - minV) / Math.max(1, maxV - minV)) * (height - pad * 2);
  const activeYearData =
    activeYear == null
      ? []
      : series
          .map((s, i) => {
            const point = s.points.find(
              (p) => Number(p.year) === Number(activeYear),
            );
            return point
              ? {
                  name: s.name,
                  nickname: s.nickname,
                  value: point[valueKey],
                  color: chartColors[i % chartColors.length],
                }
              : null;
          })
          .filter(Boolean);
  const selectNearestYear = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const chartX =
      ((event.clientX - rect.left) / Math.max(1, rect.width)) * width;
    const estimatedIndex =
      ((chartX - pad) / Math.max(1, width - pad * 2)) *
      Math.max(1, availableYears.length - 1);
    const nearestIndex = Math.max(
      0,
      Math.min(availableYears.length - 1, Math.round(estimatedIndex)),
    );
    setActiveYear(availableYears[nearestIndex]);
  };
  const smoothPath = (points) => {
    if (!points.length) return "";
    if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`;
    const tension = 0.65;
    let path = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension;
      const cp1y = Math.max(
        pad,
        Math.min(height - pad, p1[1] + ((p2[1] - p0[1]) / 6) * tension),
      );
      const cp2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension;
      const cp2y = Math.max(
        pad,
        Math.min(height - pad, p2[1] - ((p3[1] - p1[1]) / 6) * tension),
      );
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
    }
    return path;
  };
  return (
    <div className="line-chart" onMouseLeave={() => setActiveYear(null)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Scoring trend chart"
        className="interactive-line-chart"
        onPointerMove={(event) => {
          if (event.pointerType === "mouse") selectNearestYear(event);
        }}
        onPointerDown={selectNearestYear}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((n) => {
          const yy = pad + n * (height - pad * 2);
          const val = Math.round(maxV - n * (maxV - minV));
          return (
            <g key={n}>
              <line
                x1={pad}
                y1={yy}
                x2={width - pad}
                y2={yy}
                className="grid-line"
              />
              <text className="chart-axis-label" x="2" y={yy + 4}>
                {val}
              </text>
            </g>
          );
        })}
        {series.map((s, i) => {
          const sorted = [...s.points].sort(
            (a, b) => Number(a.year) - Number(b.year),
          );
          const points = sorted.map((p) => [x(p.year), y(p[valueKey])]);
          return (
            <g key={s.name}>
              <path
                d={smoothPath(points)}
                fill="none"
                stroke={chartColors[i % chartColors.length]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {sorted.map((p) => (
                <circle
                  key={`${s.name}-${p.year}`}
                  cx={x(p.year)}
                  cy={y(p[valueKey])}
                  r="4.5"
                  fill={chartColors[i % chartColors.length]}
                  stroke="white"
                  strokeWidth="2"
                  className="chart-point"
                />
              ))}
            </g>
          );
        })}
        {yearTicks.map((year, i) => (
          <g
            className="chart-year-target"
            key={year}
            tabIndex="0"
            role="button"
            aria-label={`Show scores for ${year}`}
            onMouseEnter={() => setActiveYear(year)}
            onFocus={() => setActiveYear(year)}
            onPointerDown={(e) => {
              e.preventDefault();
              setActiveYear(year);
            }}
          >
            <rect
              x={x(year) - 24}
              y={height - 27}
              width="48"
              height="27"
              fill="transparent"
            />
            <text
              className="chart-axis-label year-axis-label"
              x={x(year)}
              y={height - 5}
              textAnchor={
                i === 0
                  ? "start"
                  : i === yearTicks.length - 1
                    ? "end"
                    : "middle"
              }
            >
              {year}
            </text>
          </g>
        ))}
      </svg>
      {activeYearData.length > 0 && (
        <div
          className="chart-tooltip year-tooltip"
          style={{
            left: `${Math.min(88, Math.max(12, (x(activeYear) / width) * 100))}%`,
            top: "18%",
            "--tooltip-color": "var(--gold)",
          }}
          role="status"
        >
          <b>{activeYear}</b>
          {activeYearData.map((entry) => (
            <span className="year-tooltip-row" key={entry.name}>
              <i style={{ background: entry.color }} />
              <em className="chart-tooltip-player">
                <span data-player={entry.name}>{entry.name}</span>
                {entry.nickname && <small>{entry.nickname}</small>}
              </em>
              <strong>{Number(entry.value).toFixed(1)}</strong>
            </span>
          ))}
        </div>
      )}
      <div className="chart-legend">
        {series.map((s, i) => (
          <span key={s.name}>
            <i style={{ background: chartColors[i % chartColors.length] }} />
            <span className="chart-legend-player">
              <b>{s.name}</b>
              {s.nickname && <small>{s.nickname}</small>}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function CourseComparison({ players }) {
  const [showFlorida, setShowFlorida] = useState(false);
  const allCourses = [
    ...new Set(players.flatMap((p) => Object.keys(p.courses))),
  ];
  const courses = [
    ...allCourses.filter((course) => courseInfo[course]?.State !== "FL"),
    ...(showFlorida
      ? allCourses.filter((course) => courseInfo[course]?.State === "FL")
      : []),
  ];
  const floridaCount = allCourses.filter(
    (course) => courseInfo[course]?.State === "FL",
  ).length;
  return (
    <div className="course-comparison-wrap">
      <div
        className="course-comparison"
        role="region"
        aria-label="Average scores by course"
        tabIndex="0"
      >
        {courses.map((course) => (
          <div className="course-stat" key={course}>
            <div>
              <b>{courseInfo[course]?.short_name || course}</b>
              <small>{course}</small>
            </div>
            <div>
              {players.map((p, i) => {
                const s = p.courses[course];
                if (!s) return null;
                return (
                  <div className="course-player" key={p.name}>
                    <span style={{ color: chartColors[i] }}>
                      <span data-player={p.name}>{p.nickname}</span>
                    </span>
                    <div>
                      <i
                        style={{
                          width: `${Math.max(8, Math.min(100, (s.avg - 60) * 2.5))}%`,
                          background: chartColors[i],
                        }}
                      />
                    </div>
                    <b>{Number(s.avg).toFixed(1)}</b>
                    <small>{s.num_rounds} rds</small>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {floridaCount > 0 && (
        <label className="florida-course-toggle">
          <input
            type="checkbox"
            checked={showFlorida}
            onChange={(event) => setShowFlorida(event.target.checked)}
          />
          <span>Show FL courses ({floridaCount})</span>
        </label>
      )}
    </div>
  );
}

function TournamentCourseComparison({ courses }) {
  const [showFlorida, setShowFlorida] = useState(false);
  const floridaCourses = courses.filter(
    (course) => courseInfo[course.name]?.State === "FL",
  );
  const visibleCourses = [
    ...courses.filter((course) => courseInfo[course.name]?.State !== "FL"),
    ...(showFlorida ? floridaCourses : []),
  ];
  const maxAverage = Math.max(
    ...visibleCourses.map((course) => course.average),
  );
  const minAverage = Math.min(
    ...visibleCourses.map((course) => course.average),
  );
  return (
    <div
      className="tournament-course-comparison"
      role="region"
      aria-label="Field average and Oll Open appearances by course"
    >
      <div className="tournament-course-chart">
        {visibleCourses.map((course) => {
          const range = Math.max(1, maxAverage - minAverage);
          const barWidth = 45 + ((course.average - minAverage) / range) * 55;
          return (
            <div className="tournament-course-bar" key={course.name}>
              <span className="tournament-course-label">
                <b>{courseInfo[course.name]?.short_name || course.name}</b>
                <small>{course.appearances}× played</small>
              </span>
              <div className="tournament-course-track">
                <i style={{ width: `${barWidth}%` }} />
              </div>
              <span className="tournament-course-value">
                <b>{course.average.toFixed(1)}</b>
                <small>(low {course.low})</small>
              </span>
            </div>
          );
        })}
      </div>
      <label className="florida-course-toggle tournament-florida-toggle">
        <input
          type="checkbox"
          checked={showFlorida}
          onChange={(event) => setShowFlorida(event.target.checked)}
        />
        <span>Show FL courses ({floridaCourses.length})</span>
      </label>
      <p className="tournament-course-note">
        Field average · ordered lowest to highest
      </p>
    </div>
  );
}

function PlayerResults({ players, commonOnly }) {
  let years = [
    ...new Set(players.flatMap((p) => p.yearly.map((y) => String(y.year)))),
  ].sort((a, b) => Number(b) - Number(a));
  if (commonOnly)
    years = years.filter((year) =>
      players.every((p) => p.yearly.some((y) => String(y.year) === year)),
    );
  return (
    <div className="history-ledger">
      {years.map((year) => (
        <div className="ledger-year" key={year}>
          <div className="ledger-year-headrow">
            <h4>{year}</h4>
            <span>PLACE</span>
            {[0, 1, 2].map((r) => {
              const round = players
                .map(
                  (p) =>
                    p.yearly.find((y) => String(y.year) === year)?.rounds?.[r],
                )
                .find(Boolean);
              return (
                <span key={r}>
                  {round
                    ? courseInfo[round.course]?.short_name || `R${r + 1}`
                    : ""}
                </span>
              );
            })}
            <span>TOTAL</span>
          </div>
          {players.map((p, i) => {
            const result = p.yearly.find((y) => String(y.year) === year);
            if (!result) return null;
            return (
              <div
                className="ledger-player"
                style={{ "--player-color": chartColors[i] }}
                key={p.name}
              >
                <b style={{ color: chartColors[i] }}>
                  <span data-player={p.name}>{p.nickname}</span>
                </b>
                <span
                  className={String(result.rank).includes("1st") ? "first" : ""}
                >
                  {String(result.rank).startsWith("-") ? "—" : result.rank}
                </span>
                {[0, 1, 2].map((r) => (
                  <span key={r}>
                    {result.rounds?.[r]?.score > 0
                      ? result.rounds[r].score
                      : "—"}
                  </span>
                ))}
                <strong>
                  {result.total_score > 0 ? result.total_score : "—"}{" "}
                  <small>({result.average_score})</small>
                </strong>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Stats({ focusPlayer = null, mode, setMode }) {
  const [selected, setSelected] = useState(focusPlayer ? [focusPlayer] : []);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const scoredOpens = opens.filter((o) =>
    (o.players || []).some((p) => scoreCount(p)),
  );
  const allScores = opens.flatMap((o) =>
    (o.players || []).flatMap((p) => validScores(p.scores)),
  );
  const champions = playerStats
    .filter((p) => p.winCount)
    .sort((a, b) => b.winCount - a.winCount);
  const ranked = playerStats
    .filter((p) => p.rounds >= 3)
    .sort((a, b) => a.average - b.average);
  const [ranking, setRanking] = useState("average");
  const [commonOnly, setCommonOnly] = useState(false);
  const [playerChartView, setPlayerChartView] = useState("year");
  const [tournamentChartView, setTournamentChartView] = useState("year");
  const compared = selected
    .map((name) => playerStats.find((p) => p.name === name))
    .filter(Boolean);
  const sharedYears = new Set(
    compared.length
      ? compared[0].yearly
          .map((y) => String(y.year))
          .filter((year) =>
            compared.every((p) =>
              p.yearly.some((entry) => String(entry.year) === year),
            ),
          )
      : [],
  );
  const tournamentTrend = opens
    .map((open) => {
      const scores = (open.players || []).flatMap((p) => validScores(p.scores));
      return {
        year: open.year,
        value: scores.length
          ? Number(
              (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
            )
          : null,
      };
    })
    .filter((p) => p.value);
  const tournamentCourses = Object.values(
    opens.reduce((courses, open) => {
      (open.courses || []).forEach((course, roundIndex) => {
        const scores = (open.players || [])
          .map((player) => player.scores?.[roundIndex])
          .filter((score) => score > 0);
        if (!scores.length) return;
        const current = courses[course] || {
          name: course,
          appearances: 0,
          total: 0,
          rounds: 0,
          low: Infinity,
        };
        current.appearances += 1;
        current.total += scores.reduce((sum, score) => sum + score, 0);
        current.rounds += scores.length;
        current.low = Math.min(current.low, ...scores);
        courses[course] = current;
      });
      return courses;
    }, {}),
  )
    .map((course) => ({
      ...course,
      average: course.total / course.rounds,
    }))
    .sort(
      (a, b) =>
        a.average - b.average ||
        b.appearances - a.appearances ||
        a.name.localeCompare(b.name),
    );
  const lowestRounds = playerStats
    .flatMap((p) =>
      p.yearly.flatMap((result) =>
        (result.rounds || [])
          .filter((round) => round.score > 0)
          .map((round) => ({
            ...p,
            roundScore: round.score,
            roundCourse: round.course,
            roundDate: round.date,
          })),
      ),
    )
    .sort((a, b) => a.roundScore - b.roundScore);
  const victoryMargins = opens
    .map((open) => {
      const board = leaderboard(open).filter(
        (player) => scoreCount(player) === Number(open.number_of_rounds),
      );
      const champion = board.find(
        (player) => player.player_full_name === open.champion_full_name,
      );
      const runnerUp = board.find(
        (player) => player.player_full_name !== open.champion_full_name,
      );
      if (!champion || !runnerUp) return null;
      return {
        name: open.champion_full_name,
        nickname: nicknameFor(open.champion_full_name),
        year: open.year,
        margin: totalFor(runnerUp) - totalFor(champion),
        scores: validScores(champion.scores),
        total: totalFor(champion),
      };
    })
    .filter((result) => result && result.margin >= 0)
    .sort((a, b) => b.margin - a.margin || Number(b.year) - Number(a.year));
  const rankingOptions = {
    average: [
      "Lowest career average",
      [...playerStats]
        .filter((p) => p.rounds >= 10)
        .sort((a, b) => a.average - b.average),
      (p) => p.average.toFixed(1),
      (p) => `${p.rounds} rounds`,
      "AVG Score",
      (p) => p.average.toFixed(1),
    ],
    under80: [
      "Most rounds under 80",
      [...playerStats].sort((a, b) => b.under80 - a.under80),
      (p) => p.under80,
      (p) => `${p.rounds} rounds`,
      "RDs < 80",
      (p) => p.under80,
    ],
    strokes: [
      "Most total strokes",
      [...playerStats].sort((a, b) => b.strokes - a.strokes),
      (p) => p.strokes.toLocaleString(),
      (p) => `${p.opens} Opens`,
      "Strokes",
      (p) => p.strokes,
    ],
    opens: [
      "Most Opens played",
      [...playerStats].sort((a, b) => b.opens - a.opens),
      (p) => p.opens,
      (p) => `${p.rounds} rounds`,
      "Opens",
      (p) => p.opens,
    ],
    podiums: [
      "Most podium finishes",
      [...playerStats]
        .filter((p) => p.podiums > 0)
        .sort((a, b) => b.podiums - a.podiums || b.winCount - a.winCount),
      (p) => p.podiums,
      (p) => (
        <span className="podium-ranking-detail">
          {p.winCount > 0 && (
            <span className="podium-gold-text">
              {p.winCount}× {p.winCount === 1 ? "W" : "Ws"}
            </span>
          )}
          {p.seconds > 0 && (
            <span className="podium-silver-text">
              {p.seconds}× {p.seconds === 1 ? "2nd" : "2nds"}
            </span>
          )}
          {p.thirds > 0 && (
            <span className="podium-bronze-text">
              {p.thirds}× {p.thirds === 1 ? "3rd" : "3rds"}
            </span>
          )}
        </span>
      ),
      "Podiums",
      (p) => p.podiums,
    ],
    low: [
      "Lowest individual rounds",
      lowestRounds,
      (p) => p.roundScore,
      (p) =>
        `${courseInfo[p.roundCourse]?.short_name || p.roundCourse} · ${p.roundDate}`,
      "Low RDs",
      (p) => p.roundScore,
    ],
    margin: [
      "Highest margins of victory",
      victoryMargins,
      (p) => p.margin,
      (p) => `${p.year} · ${p.scores.join("–")} = ${p.total}`,
      "Margin",
      (p) => p.margin,
    ],
  };
  const activeRanking = rankingOptions[ranking];
  const rankingPosition = (items, index, valueFor) => {
    const value = valueFor(items[index]);
    const first = items.findIndex((item) => valueFor(item) === value);
    const tied = items.filter((item) => valueFor(item) === value).length > 1;
    return tied ? `T${first + 1}` : String(index + 1).padStart(2, "0");
  };
  const toggle = (name) =>
    setSelected((s) =>
      s.includes(name)
        ? s.filter((n) => n !== name)
        : s.length < 5
          ? [...s, name]
          : s,
    );
  return (
    <div
      className={`page-section page-top ${mode === "players" && selected.length > 0 ? "stats-has-selection" : ""}`}
    >
      {(mode === "tournament" || selected.length === 0) && (
        <SectionHead
          eyebrow="BY THE NUMBERS"
          title={mode === "tournament" ? "Tournament stats" : "Player stats"}
          copy={
            mode === "tournament" ? "Explore records, champions, and more." : ""
          }
        />
      )}
      <div className="stats-controls-sticky">
        <div className="stats-mode" role="tablist" aria-label="Statistics view">
          <button
            role="tab"
            aria-selected={mode === "tournament"}
            className={mode === "tournament" ? "active" : ""}
            onClick={() => setMode("tournament")}
          >
            <Icon name="Opens" size={18} />
            <span>
              <b>Tournament</b>
              <small>Stats and Records</small>
            </span>
          </button>
          <button
            role="tab"
            aria-selected={mode === "players"}
            className={mode === "players" ? "active" : ""}
            onClick={() => setMode("players")}
          >
            <Icon name="Players" size={18} />
            <span>
              <b>Player</b>
              <small>Stats and Records</small>
            </span>
          </button>
        </div>
        {mode === "players" && selected.length > 0 && (
          <div className="player-selection-bar">
            <div className="selected-player-chips">
              {compared.map((p, i) => (
                <button
                  style={{ "--player-color": chartColors[i] }}
                  onClick={() => toggle(p.name)}
                  key={p.name}
                  aria-label={`Remove ${p.name}`}
                >
                  <b>{p.nickname}</b>
                  <strong>×</strong>
                </button>
              ))}
            </div>
            <button
              className="open-player-modal"
              disabled={selected.length >= 5}
              onClick={() => setPlayerModalOpen(true)}
            >
              {selected.length >= 5 ? "5 selected" : "+ Add player"}
            </button>
          </div>
        )}
      </div>
      {playerModalOpen && (
        <div
          className="player-modal-backdrop"
          role="presentation"
          onMouseDown={() => setPlayerModalOpen(false)}
        >
          <section
            className="player-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="player-modal-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="player-modal-head">
              <div>
                <Kicker>PLAYER COMPARISON</Kicker>
                <h2 id="player-modal-title">Select a player</h2>
              </div>
              <button
                onClick={() => setPlayerModalOpen(false)}
                aria-label="Close player selector"
              >
                ×
              </button>
            </div>
            <div className="player-modal-body">
              <Kicker>CHAMPIONS</Kicker>
              <div className="player-modal-grid champions">
                {playerStats
                  .filter((p) => p.rounds && p.winCount)
                  .sort(
                    (a, b) =>
                      b.winCount - a.winCount || a.name.localeCompare(b.name),
                  )
                  .map((p) => (
                    <button
                      disabled={selected.includes(p.name)}
                      onClick={() => {
                        toggle(p.name);
                        setPlayerModalOpen(false);
                      }}
                      key={p.name}
                    >
                      <span>
                        <b>{p.nickname}</b>
                        <small>• {p.name}</small>
                      </span>
                      <span className="win-badge modal-win-badge">
                        {p.winCount}×<Icon name="Opens" size={13} />
                      </span>
                    </button>
                  ))}
              </div>
              <Kicker>ALL PLAYERS</Kicker>
              <div className="player-modal-grid">
                {playerStats
                  .filter((p) => p.rounds && !p.winCount)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((p) => (
                    <button
                      disabled={selected.includes(p.name)}
                      onClick={() => {
                        toggle(p.name);
                        setPlayerModalOpen(false);
                      }}
                      key={p.name}
                    >
                      <span>
                        <b>{p.nickname}</b>
                        <small>• {p.name}</small>
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </section>
        </div>
      )}
      {mode === "tournament" && (
        <>
          <div className="stat-tiles">
            <div>
              <b>{opens.length}</b>
              <span>Opens played</span>
            </div>
            <div>
              <b>{playerStats.length}</b>
              <span>Players</span>
            </div>
            <div>
              <b>{allScores.length}</b>
              <span>Rounds recorded</span>
            </div>
            <div>
              <b>
                {(
                  allScores.reduce((a, b) => a + b, 0) / allScores.length
                ).toFixed(1)}
              </b>
              <span>Overall average</span>
            </div>
            <div>
              <b>{allScores.reduce((a, b) => a + b, 0).toLocaleString()}</b>
              <span>Total strokes</span>
            </div>
            <div>
              <b>{champions.length}</b>
              <span>Champs</span>
            </div>
            <div>
              <b>{Object.keys(courseInfo).length}</b>
              <span>Courses</span>
            </div>
            <div className="fun-stat">
              <b aria-label="Infinite">∞</b>
              <span>Fun</span>
            </div>
          </div>
          <div className="stats-grid">
            <section className="panel trend-panel">
              <div className="panel-head">
                <div>
                  <Kicker>
                    {tournamentChartView === "year"
                      ? `${opens.length} YEARS`
                      : `${tournamentCourses.length} COURSES`}
                  </Kicker>
                  <h3>
                    {tournamentChartView === "year"
                      ? "Average score by year"
                      : "Average score by course"}
                  </h3>
                </div>
                <div className="ranking-tabs performance-toggle tournament-performance-toggle">
                  <button
                    className={tournamentChartView === "year" ? "active" : ""}
                    onClick={() => setTournamentChartView("year")}
                  >
                    By year
                  </button>
                  <button
                    className={tournamentChartView === "course" ? "active" : ""}
                    onClick={() => setTournamentChartView("course")}
                  >
                    By course
                  </button>
                </div>
              </div>
              {tournamentChartView === "year" ? (
                <LineChart
                  series={[{ name: "Field average", points: tournamentTrend }]}
                />
              ) : (
                <TournamentCourseComparison courses={tournamentCourses} />
              )}
            </section>
            <section className="panel">
              <div className="panel-head">
                <div>
                  <Kicker>ALL-TIME</Kicker>
                  <h3>Champions club</h3>
                </div>
                <Icon name="Opens" size={28} />
              </div>
              {champions.map((p, i) => (
                <div className="rank-row" key={p.name}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="stat-player-name">
                    <b>
                      <span data-player={p.name}>{p.name}</span>
                    </b>
                    <small className="player-nickname-label">
                      <span data-player={p.name}>{p.nickname}</span>
                    </small>
                  </span>
                  <small>{p.wins.join(", ")}</small>
                  <strong>{p.winCount}×</strong>
                </div>
              ))}
            </section>
            <section className="panel">
              <div className="panel-head">
                <div>
                  <Kicker>LEADERBOARD</Kicker>
                  <h3>{activeRanking[0]}</h3>
                </div>
                <Pill>TOP 10</Pill>
              </div>
              <div className="ranking-tabs">
                {Object.entries(rankingOptions).map(([key, value]) => (
                  <button
                    className={ranking === key ? "active" : ""}
                    onClick={() => setRanking(key)}
                    key={key}
                  >
                    {value[4]}
                  </button>
                ))}
              </div>
              {activeRanking[1].slice(0, 10).map((p, i) => (
                <div
                  className={`rank-row ${ranking}-ranking-row`}
                  key={`${p.name}-${ranking}-${i}`}
                >
                  <span>
                    {rankingPosition(activeRanking[1], i, activeRanking[5])}
                  </span>
                  <span className="stat-player-name">
                    <b>
                      <span data-player={p.name}>{p.name}</span>
                    </b>
                    <small className="player-nickname-label">
                      <span data-player={p.name}>{p.nickname}</span>
                    </small>
                  </span>
                  <small>{activeRanking[3](p)}</small>
                  {ranking === "margin" ? (
                    <span className="margin-ranking-value">
                      Won by <strong>{activeRanking[2](p)}</strong>
                    </span>
                  ) : (
                    <strong>{activeRanking[2](p)}</strong>
                  )}
                </div>
              ))}
            </section>
          </div>
        </>
      )}
      {mode === "players" && (
        <section className="player-stats-dashboard">
          {compared.length === 0 && (
            <div className="player-stats-empty">
              <div className="empty-player-intro">
                <Kicker>PLAYER STATS DASHBOARD</Kicker>
                <h2>Whose stats do you want to see?</h2>
                <p>Start with any player, then add up to four more!</p>
                <button
                  className="btn gold"
                  onClick={() => setPlayerModalOpen(true)}
                >
                  + Add Player
                </button>
              </div>
              <div className="player-presets">
                <div className="preset-heading">
                  <span>OR START WITH THESE</span>
                </div>
                <button onClick={() => setSelected(["Mike Maher"])}>
                  <span className="preset-mark">GOAT</span>
                  <span>
                    <small>VIEW THE GOAT’S STATS</small>
                    <b>Try Mig</b>
                  </span>
                  <Icon name="Arrow" size={17} />
                </button>
                <button
                  onClick={() => setSelected(["Mike Maher", "Mark Oakley"])}
                >
                  <span className="preset-mark">1·2</span>
                  <span>
                    <small>THE TWO MOST DECORATED</small>
                    <b>Mig vs. Oak</b>
                  </span>
                  <Icon name="Arrow" size={17} />
                </button>
                <button onClick={() => setSelected(["Mike King", "Jeff King"])}>
                  <span className="preset-mark">OO</span>
                  <span>
                    <small>SEE THE BROTHERS’ STATS</small>
                    <b>Oll vs. Duck</b>
                  </span>
                  <Icon name="Arrow" size={17} />
                </button>
                <button
                  onClick={() =>
                    setSelected(["Jeff King", "Mark Hasty", "Scott Dillon"])
                  }
                >
                  <span className="preset-mark">1x</span>
                  <span>
                    <small>"1 HIT WONDERS?"</small>
                    <b>Duck vs. Rae vs. Moose</b>
                  </span>
                  <Icon name="Arrow" size={17} />
                </button>
              </div>
            </div>
          )}
          {compared.length > 0 && (
            <>
              <div className="player-summary-grid">
                <section className="player-summary-card">
                  <div className="player-summary-head">
                    <h3>General stats</h3>
                  </div>
                  <div className="player-summary-labels">
                    <span>PLAYER</span>
                    <span>OPENS</span>
                    <span>ROUNDS</span>
                    <span>AVG</span>
                    <span>STROKES</span>
                  </div>
                  {compared.map((p, i) => (
                    <div
                      className="player-summary-row"
                      style={{ "--player-color": chartColors[i] }}
                      key={p.name}
                    >
                      <span>
                        <b>
                          <span data-player={p.name}>{p.nickname}</span>
                        </b>
                        <small>
                          <span data-player={p.name}>{p.name}</span>
                        </small>
                      </span>
                      <strong>{p.opens}</strong>
                      <strong>{p.rounds}</strong>
                      <strong>{p.average?.toFixed(1) || "—"}</strong>
                      <strong>{p.strokes.toLocaleString()}</strong>
                    </div>
                  ))}
                </section>
                {compared.some((p) => p.podiums > 1) && (
                  <section className="player-summary-card podium-summary-card">
                    <div className="player-summary-head">
                      <h3>Podium finishes</h3>
                    </div>
                    <div className="player-summary-labels">
                      <span>PLAYER</span>
                      <span className="gold-accent">WINS</span>
                      <span className="silver-accent">2NDS</span>
                      <span className="bronze-accent">3RDS</span>
                      <span>TOTAL</span>
                    </div>
                    {compared
                      .filter((p) => p.podiums > 0)
                      .map((p, i) => (
                        <div
                          className="player-summary-row"
                          style={{ "--player-color": chartColors[i] }}
                          key={p.name}
                        >
                          <span>
                            <b>
                              <span data-player={p.name}>{p.nickname}</span>
                            </b>
                            <small>
                              <span data-player={p.name}>{p.name}</span>
                            </small>
                          </span>
                          <strong className="gold-value">{p.winCount}</strong>
                          <strong className="silver-value">{p.seconds}</strong>
                          <strong className="bronze-value">{p.thirds}</strong>
                          <strong>{p.podiums}</strong>
                        </div>
                      ))}
                  </section>
                )}
              </div>
              <div className="player-dashboard-sections">
                <section className="standalone-dashboard-panel player-performance-panel">
                  <div className="compare-subhead">
                    <div>
                      <h3>
                        {playerChartView === "year"
                          ? "Average score by year"
                          : "Average score by course"}
                      </h3>
                    </div>
                    {playerChartView === "year" && compared.length > 1 && (
                      <label className="shared-years-toggle">
                        <input
                          type="checkbox"
                          checked={commonOnly}
                          onChange={(e) => setCommonOnly(e.target.checked)}
                        />
                        <span>Only shared years</span>
                      </label>
                    )}
                  </div>
                  <div className="ranking-tabs performance-toggle">
                    <button
                      className={playerChartView === "year" ? "active" : ""}
                      onClick={() => setPlayerChartView("year")}
                    >
                      By year
                    </button>
                    <button
                      className={playerChartView === "course" ? "active" : ""}
                      onClick={() => setPlayerChartView("course")}
                    >
                      By course
                    </button>
                  </div>
                  {playerChartView === "year" ? (
                    <LineChart
                      series={compared.map((p) => ({
                        name: p.name,
                        nickname: p.nickname,
                        points: p.yearly
                          .map((y) => ({
                            year: y.year,
                            value: y.average_score,
                          }))
                          .filter(
                            (y) =>
                              y.value &&
                              (!commonOnly || sharedYears.has(String(y.year))),
                          ),
                      }))}
                    />
                  ) : (
                    <CourseComparison players={compared} />
                  )}
                </section>
                <section className="standalone-dashboard-panel player-results-column">
                  <div className="compare-subhead">
                    <div>
                      <h3>All results</h3>
                    </div>
                  </div>
                  <PlayerResults players={compared} commonOnly={commonOnly} />
                </section>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer>
      <div className="footer-brand">
        <span className="footer-logo-wrap">
          <img src="/logos/oll-open-light-current.png" alt="Oll Open" />
        </span>
        <div>
          <small>FRIENDSHIP · GOLF · MEMORIES</small>
        </div>
      </div>
      <p>Since 1987, the greatest weekend in golf.</p>
      <nav>
        {["Home", "Players", "Opens", "Stats", "Gallery"].map((x) => (
          <button onClick={() => onNavigate(x)} key={x}>
            {x}
          </button>
        ))}
      </nav>
      <small>© 2026 OLL OPEN</small>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);

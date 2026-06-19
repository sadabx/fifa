(function () {
  /* ══════════════════════════════════════════════════════════════════════════
   FIFA World Cup 2026 – Interactive Wallchart
   ══════════════════════════════════════════════════════════════════════════ */

  // ── Shared Data from script.js ──────────────────────────────────────────

  const TEAMS = window.TEAMS;
  const MATCHES = window.MATCHES;

  // ── Data ────────────────────────────────────────────────────────────────

  // Advance map: winner of matchId → next match slot
  const ADVANCE = {
    // R32 → R16
    73: { match: 90, slot: "home" },
    75: { match: 90, slot: "away" },
    74: { match: 89, slot: "home" },
    77: { match: 89, slot: "away" },
    76: { match: 91, slot: "home" },
    78: { match: 91, slot: "away" },
    79: { match: 92, slot: "home" },
    80: { match: 92, slot: "away" },
    83: { match: 93, slot: "home" },
    84: { match: 93, slot: "away" },
    81: { match: 94, slot: "home" },
    82: { match: 94, slot: "away" },
    86: { match: 95, slot: "home" },
    88: { match: 95, slot: "away" },
    85: { match: 96, slot: "home" },
    87: { match: 96, slot: "away" },
    // R16 → QF
    89: { match: 97, slot: "home" },
    90: { match: 97, slot: "away" },
    93: { match: 98, slot: "home" },
    94: { match: 98, slot: "away" },
    91: { match: 99, slot: "home" },
    92: { match: 99, slot: "away" },
    95: { match: 100, slot: "home" },
    96: { match: 100, slot: "away" },
    // QF → SF
    97: { match: 101, slot: "home" },
    98: { match: 101, slot: "away" },
    99: { match: 102, slot: "home" },
    100: { match: 102, slot: "away" },
    // SF → Final + 3rd place
    101: { match: 104, slot: "home", loser: { match: 103, slot: "home" } },
    102: { match: 104, slot: "away", loser: { match: 103, slot: "away" } },
  };

  // Bracket visual layout (match IDs in display order)
  const BRACKET_LAYOUT = {
    left: {
      r32: [73, 75, 74, 77, 83, 84, 81, 82],
      r16: [90, 89, 93, 94],
      qf: [97, 98],
      sf: [101],
    },
    right: {
      r32: [76, 78, 79, 80, 86, 87, 85, 88],
      r16: [91, 92, 95, 96],
      qf: [99, 100],
      sf: [102],
    },
    final: 104,
    third: 103,
  };

  // Group → R32 slot mapping
  const GROUP_R32_MAP = {
    "Winner A": { match: 79, slot: "home" },
    "Runner-up A": { match: 73, slot: "home" },
    "Winner B": { match: 85, slot: "home" },
    "Runner-up B": { match: 73, slot: "away" },
    "Winner C": { match: 75, slot: "home" },
    "Runner-up C": { match: 76, slot: "away" },
    "Winner D": { match: 81, slot: "home" },
    "Runner-up D": { match: 88, slot: "home" },
    "Winner E": { match: 74, slot: "home" },
    "Runner-up E": { match: 78, slot: "home" },
    "Winner F": { match: 76, slot: "home" },
    "Runner-up F": { match: 75, slot: "away" },
    "Winner G": { match: 82, slot: "home" },
    "Runner-up G": { match: 88, slot: "away" },
    "Winner H": { match: 84, slot: "home" },
    "Runner-up H": { match: 86, slot: "away" },
    "Winner I": { match: 77, slot: "home" },
    "Runner-up I": { match: 78, slot: "away" },
    "Winner J": { match: 86, slot: "home" },
    "Runner-up J": { match: 84, slot: "away" },
    "Winner K": { match: 87, slot: "home" },
    "Runner-up K": { match: 83, slot: "home" },
    "Winner L": { match: 80, slot: "home" },
    "Runner-up L": { match: 83, slot: "away" },
  };

  // ── State ───────────────────────────────────────────────────────────────

  let matchState = {};
  let expandedGroup = null;

  // ── Utilities ───────────────────────────────────────────────────────────

  function getTeamFlag(name) {
    if (!name) return "";
    const t = TEAMS.find((t) => t.name === name);
    return t ? t.flag : "";
  }

  function isPlaceholder(name) {
    if (!name) return true;
    return (
      name.startsWith("Winner") ||
      name.startsWith("Runner-up") ||
      name.startsWith("Best 3rd") ||
      name.startsWith("W") ||
      name.startsWith("L") ||
      name === "?" ||
      name === "TBD"
    );
  }

  function initState() {
    MATCHES.forEach((m) => {
      matchState[m.id] = {
        home: m.home,
        away: m.away,
        homeScore: m.result ? parseInt(m.result.split("-")[0]) : null,
        awayScore: m.result ? parseInt(m.result.split("-")[1]) : null,
        result: m.result || null,
      };
    });
  }

  // ── Group Stage ─────────────────────────────────────────────────────────

  function calculateGroupStandings(groupLetter) {
    const groupTeams = TEAMS.filter((t) => t.group === groupLetter);
    const groupMatches = MATCHES.filter(
      (m) => m.stage === "Group" && m.group === groupLetter,
    );

    const stats = {};
    groupTeams.forEach((t) => {
      stats[t.name] = {
        p: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
        flag: t.flag,
      };
    });

    groupMatches.forEach((m) => {
      const st = matchState[m.id];
      if (!st || st.result === null) return;
      const hs = st.homeScore;
      const as = st.awayScore;
      if (hs === null || as === null) return;

      if (!stats[m.home] || !stats[m.away]) return;

      stats[m.home].p++;
      stats[m.away].p++;
      stats[m.home].gf += hs;
      stats[m.home].ga += as;
      stats[m.away].gf += as;
      stats[m.away].ga += hs;

      if (hs > as) {
        stats[m.home].w++;
        stats[m.home].pts += 3;
        stats[m.away].l++;
      } else if (hs < as) {
        stats[m.away].w++;
        stats[m.away].pts += 3;
        stats[m.home].l++;
      } else {
        stats[m.home].d++;
        stats[m.away].d++;
        stats[m.home].pts += 1;
        stats[m.away].pts += 1;
      }
    });

    Object.keys(stats).forEach((n) => {
      stats[n].gd = stats[n].gf - stats[n].ga;
    });

    return groupTeams
      .map((t) => ({ ...stats[t.name], name: t.name }))
      .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  }

  function renderGroupTables() {
    const grid = document.getElementById("groups-grid");
    const letters = "ABCDEFGHIJKL".split("");
    let html = "";

    letters.forEach((letter) => {
      const standings = calculateGroupStandings(letter);
      const groupMatches = MATCHES.filter(
        (m) => m.stage === "Group" && m.group === letter,
      );
      const isExpanded = expandedGroup === letter;

      html += `<div class="group-card">
      <div class="group-card-header">Group ${letter}</div>
      <table class="group-table">
        <thead>
          <tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr>
        </thead>
        <tbody>`;

      standings.forEach((s, i) => {
        const cls = i < 2 ? ' class="qualified"' : "";
        html += `<tr${cls}>
        <td><span class="flag">${s.flag}</span>${s.name}</td>
        <td>${s.p}</td><td>${s.w}</td><td>${s.d}</td><td>${s.l}</td>
        <td>${s.gf}</td><td>${s.ga}</td><td>${s.gd > 0 ? "+" : ""}${s.gd}</td>
        <td class="pts">${s.pts}</td>
      </tr>`;
      });

      html += `</tbody></table>`;

      // Group matches (collapsible)
      html += `<div class="group-matches-toggle" onclick="toggleGroupMatches('${letter}', this)">
        <span>${isExpanded ? "▾" : "▸"} Matches (${groupMatches.length})</span>
      </div>
      <div class="group-matches ${isExpanded ? "open" : ""}" id="gm-${letter}">`;

      groupMatches.forEach((m) => {
        const st = matchState[m.id];
        const homeFlag = getTeamFlag(st.home);
        const awayFlag = getTeamFlag(st.away);
        const hasResult = st.result !== null;

        html += `<div class="gm-row">
        <span class="gm-teams">${homeFlag} ${st.home} vs ${awayFlag} ${st.away}</span>
        <span class="gm-scores">
          <input type="number" class="gm-input" data-match="${m.id}" data-side="home"
            min="0" max="99" value="${st.homeScore ?? ""}" ${hasResult ? "disabled" : ""}>
          <span class="gm-dash">-</span>
          <input type="number" class="gm-input" data-match="${m.id}" data-side="away"
            min="0" max="99" value="${st.awayScore ?? ""}" ${hasResult ? "disabled" : ""}>
        </span>
      </div>`;
      });

      html += `</div></div>`;
    });

    grid.innerHTML = html;

    // Attach group score handlers
    document.querySelectorAll(".gm-input:not([disabled])").forEach((input) => {
      input.addEventListener("input", (e) => {
        const matchId = parseInt(e.target.dataset.match);
        const side = e.target.dataset.side;
        handleGroupScore(matchId, side, e.target.value);
      });
    });
  }

  function toggleGroupMatches(letter, el) {
    if (expandedGroup === letter) {
      expandedGroup = null;
    } else {
      expandedGroup = letter;
    }
    renderGroupTables();
  }

  function handleGroupScore(matchId, side, value) {
    const st = matchState[matchId];
    if (side === "home") {
      st.homeScore = value === "" ? null : parseInt(value);
    } else {
      st.awayScore = value === "" ? null : parseInt(value);
    }

    if (st.homeScore !== null && st.awayScore !== null) {
      st.result = `${st.homeScore}-${st.awayScore}`;
    } else {
      st.result = null;
    }

    // Re-render group tables
    renderGroupTables();

    // Auto-fill R32 from group results
    autoFillR32();

    // Re-render bracket to show updated teams
    renderBracket();
  }

  function autoFillR32() {
    const letters = "ABCDEFGHIJKL".split("");
    letters.forEach((letter) => {
      const standings = calculateGroupStandings(letter);
      if (standings.length < 3) return;
      // Check if all 6 matches are played
      const groupMatches = MATCHES.filter(
        (m) => m.stage === "Group" && m.group === letter,
      );
      const allPlayed = groupMatches.every(
        (m) => matchState[m.id].result !== null,
      );
      if (!allPlayed) return;

      const first = standings[0];
      const second = standings[1];

      // Fill in Winner and Runner-up
      const winnerKey = `Winner ${letter}`;
      const runnerUpKey = `Runner-up ${letter}`;

      if (GROUP_R32_MAP[winnerKey]) {
        const { match, slot } = GROUP_R32_MAP[winnerKey];
        matchState[match][slot] = first.name;
      }
      if (GROUP_R32_MAP[runnerUpKey]) {
        const { match, slot } = GROUP_R32_MAP[runnerUpKey];
        matchState[match][slot] = second.name;
      }
    });
  }

  // ── Knockout Bracket ────────────────────────────────────────────────────

  function renderBracket() {
    const view = document.getElementById("bracket-view");
    const leftHTML = renderHalf("left");
    const centerHTML = renderCenter();
    const rightHTML = renderHalf("right");

    view.innerHTML = `<div class="bracket-wrapper">${leftHTML}${centerHTML}${rightHTML}</div>`;

    // Attach score handlers
    attachScoreHandlers();
  }

  function renderHalf(side) {
    const data = BRACKET_LAYOUT[side];
    let html = `<div class="bracket-half ${side}">`;

    // R32
    html +=
      '<div class="round-col r32"><span class="round-label">Round of 32</span>';
    for (let i = 0; i < data.r32.length; i += 2) {
      html += '<div class="match-pair">';
      html += renderMatchCard(data.r32[i]);
      html += renderMatchCard(data.r32[i + 1]);
      html += "</div>";
    }
    html += "</div>";

    // R16
    html +=
      '<div class="round-col r16"><span class="round-label">Round of 16</span>';
    for (let i = 0; i < data.r16.length; i += 2) {
      html += '<div class="match-pair">';
      html += renderMatchCard(data.r16[i]);
      html += renderMatchCard(data.r16[i + 1]);
      html += "</div>";
    }
    html += "</div>";

    // QF
    html +=
      '<div class="round-col qf"><span class="round-label">Quarter-Finals</span>';
    for (let i = 0; i < data.qf.length; i += 2) {
      html += '<div class="match-pair">';
      html += renderMatchCard(data.qf[i]);
      html += renderMatchCard(data.qf[i + 1]);
      html += "</div>";
    }
    html += "</div>";

    // SF
    html +=
      '<div class="round-col sf"><span class="round-label">Semi-Finals</span>';
    html += '<div class="match-standalone">';
    html += renderMatchCard(data.sf[0]);
    html += "</div>";
    html += "</div>";

    html += "</div>";
    return html;
  }

  function renderCenter() {
    const finalState = matchState[BRACKET_LAYOUT.final];
    const thirdState = matchState[BRACKET_LAYOUT.third];

    let winnerName = "?";
    let winnerFlag = "";
    if (finalState && finalState.result) {
      const h = finalState.homeScore;
      const a = finalState.awayScore;
      if (h !== null && a !== null && h !== a) {
        const w = h > a ? finalState.home : finalState.away;
        if (!isPlaceholder(w)) {
          winnerName = w;
          winnerFlag = getTeamFlag(w);
        }
      }
    }

    return `
    <div class="bracket-center">
      <div class="center-connector left-conn"></div>
      <div class="center-connector right-conn"></div>
      <div class="final-section">
        <div class="trophy-display">🏆</div>
        <div class="final-label">Final</div>
        ${renderMatchCard(BRACKET_LAYOUT.final)}
        <div class="winner-display">
          <div class="wd-label">🏆 World Champion</div>
          ${winnerFlag ? `<span class="wd-flag">${winnerFlag}</span>` : ""}
          <div class="wd-team">${isPlaceholder(winnerName) ? '<span class="wd-tbd">TBD</span>' : winnerName}</div>
        </div>
      </div>
      <div class="third-section">
        <div class="third-label">Third Place Match</div>
        ${renderMatchCard(BRACKET_LAYOUT.third)}
      </div>
    </div>`;
  }

  function renderMatchCard(matchId) {
    const st = matchState[matchId];
    if (!st) return '<div class="match-card"></div>';

    const homeFlag = getTeamFlag(st.home);
    const awayFlag = getTeamFlag(st.away);
    const homeClass = isPlaceholder(st.home) ? " tbd" : "";
    const awayClass = isPlaceholder(st.away) ? " tbd" : "";

    const hasResult = st.result !== null;
    let homeScoreEl, awayScoreEl;

    if (hasResult) {
      homeScoreEl = `<span class="team-score">${st.homeScore}</span>`;
      awayScoreEl = `<span class="team-score">${st.awayScore}</span>`;
    } else {
      homeScoreEl = `<input type="number" class="score-input" data-match="${matchId}" data-side="home" min="0" max="99" value="${st.homeScore ?? ""}">`;
      awayScoreEl = `<input type="number" class="score-input" data-match="${matchId}" data-side="away" min="0" max="99" value="${st.awayScore ?? ""}">`;
    }

    let winnerClass = "";
    if (hasResult && st.homeScore !== st.awayScore) {
      winnerClass =
        st.homeScore > st.awayScore ? " winner-top" : " winner-bottom";
    }

    return `<div class="match-card${winnerClass}" data-match-id="${matchId}">
    <div class="team-row">
      <span class="team-flag">${homeFlag}</span>
      <span class="team-name${homeClass}">${st.home}</span>
      ${homeScoreEl}
    </div>
    <div class="team-row">
      <span class="team-flag">${awayFlag}</span>
      <span class="team-name${awayClass}">${st.away}</span>
      ${awayScoreEl}
    </div>
  </div>`;
  }

  function attachScoreHandlers() {
    document.querySelectorAll(".score-input").forEach((input) => {
      input.addEventListener("input", (e) => {
        const matchId = parseInt(e.target.dataset.match);
        const side = e.target.dataset.side;
        const value = e.target.value;

        const st = matchState[matchId];
        if (side === "home") {
          st.homeScore = value === "" ? null : parseInt(value);
        } else {
          st.awayScore = value === "" ? null : parseInt(value);
        }

        if (st.homeScore !== null && st.awayScore !== null) {
          st.result = `${st.homeScore}-${st.awayScore}`;
        } else {
          st.result = null;
        }

        processScore(matchId);
      });
    });
  }

  function processScore(matchId) {
    const st = matchState[matchId];
    const h = st.homeScore;
    const a = st.awayScore;

    if (h === null || a === null) {
      st.result = null;
      clearAdvancement(matchId);
      reRenderBracket();
      return;
    }

    if (h === a) {
      st.result = null;
      clearAdvancement(matchId);
      reRenderBracket();
      return;
    }

    st.result = `${h}-${a}`;

    const winner = h > a ? st.home : st.away;
    const loser = h > a ? st.away : st.home;

    // Advance winner
    const adv = ADVANCE[matchId];
    if (adv) {
      matchState[adv.match][adv.slot] = winner;
      // Clear downstream if the new team is different
      clearDownstream(adv.match, adv.slot);
    }

    // Handle loser for SF → 3rd place
    if (adv && adv.loser) {
      matchState[adv.loser.match][adv.loser.slot] = loser;
      clearDownstream(adv.loser.match, adv.loser.slot);
    }

    reRenderBracket();
  }

  function clearAdvancement(matchId) {
    const adv = ADVANCE[matchId];
    if (!adv) return;
    matchState[adv.match][adv.slot] = matchState[adv.match][adv.slot]; // keep current
  }

  function clearDownstream(matchId, slot) {
    // If this match has a result and the downstream needs updating
    const st = matchState[matchId];
    if (st.result) {
      const h = st.homeScore;
      const a = st.awayScore;
      if (h !== null && a !== null && h !== a) {
        const winner = h > a ? st.home : st.away;
        const loser = h > a ? st.away : st.home;
        const adv = ADVANCE[matchId];
        if (adv) {
          matchState[adv.match][adv.slot] = winner;
          clearDownstream(adv.match, adv.slot);
        }
        if (adv && adv.loser) {
          matchState[adv.loser.match][adv.loser.slot] = loser;
          clearDownstream(adv.loser.match, adv.loser.slot);
        }
      }
    }
  }

  function reRenderBracket() {
    renderBracket();
  }

  // ── Init ────────────────────────────────────────────────────────────────

  function init() {
    initState();
    autoFillR32();
    renderGroupTables();
    renderBracket();
  }

  init();

  // Expose functions used by inline HTML event handlers
  window.toggleGroupMatches = toggleGroupMatches;
  window.handleGroupScore = handleGroupScore;

  function syncWallchart() {
    initState();
    autoFillR32();
    renderGroupTables();
    renderBracket();
  }
  window.syncWallchart = syncWallchart;
})();

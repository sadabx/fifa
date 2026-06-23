function etNow() {
  return new Date();
}

let favorites = JSON.parse(localStorage.getItem("wc26_favs") || "[]");
let stageFilter = "all";
let pastExpanded = false;

function saveFavs() {
  try {
    localStorage.setItem("wc26_favs", JSON.stringify(favorites));
  } catch (e) { }
}

function addFav(name) {
  if (!favorites.includes(name)) {
    favorites.push(name);
    saveFavs();
    renderFavChips();
    renderCountdowns();
    renderSchedule();
  }
  document.getElementById("team-search").value = "";
  document.getElementById("team-dropdown").classList.remove("open");
}

function removeFav(name) {
  favorites = favorites.filter((f) => f !== name);
  saveFavs();
  renderFavChips();
  renderCountdowns();
  renderSchedule();
}

function renderFavChips() {
  const el = document.getElementById("fav-chips");
  if (!favorites.length) {
    el.innerHTML = '<span class="no-favs">No teams selected.</span>';
    return;
  }
  el.innerHTML = favorites
    .map((f) => {
      const t = TEAMS.find((t) => t.name === f);
      return `<button class="fav-chip" onclick="removeFav('${f}')"><span>${t ? t.flag : ""}</span> ${f} <span class="remove">✕</span></button>`;
    })
    .join("");
}

function getMatchStatus(m) {
  const now = etNow();
  const end = new Date(m.date.getTime() + 120 * 60000);
  if (m.result) return "done";
  if (now >= m.date && now < end) return "live";
  if (now >= end) return "done";
  return "upcoming";
}

function renderCountdowns() {
  const grid = document.getElementById("countdown-grid");
  const banner = document.getElementById("mobile-fav-banner");

  if (!favorites.length) {
    grid.innerHTML =
      '<div class="empty-countdown"><i class="ti ti-heart" style="font-size:24px;display:block;margin-bottom:8px;color:var(--color-text-tertiary)"></i>Select teams to see countdowns.</div>';
    if (banner) { banner.innerHTML = ""; banner.classList.remove("has-content"); }
    return;
  }
  const now = etNow();
  let cards = [];
  favorites.forEach((teamName) => {
    const teamMatches = MATCHES.filter(
      (m) => m.home === teamName || m.away === teamName,
    );
    const next = teamMatches.find((m) => {
      const status = getMatchStatus(m);
      return status === "upcoming" || status === "live";
    });
    const last = [...teamMatches]
      .reverse()
      .find((m) => m.result || getMatchStatus(m) === "done");
    const target = next || last;
    if (!target) return;
    const t = TEAMS.find((t) => t.name === teamName);
    const opponent = target.home === teamName ? target.away : target.home;
    const oppT = TEAMS.find((t) => t.name === opponent);
    const status = getMatchStatus(target);
    let timerHTML = "";
    if (status === "live") {
      timerHTML = `<a href="https://iptv.trionine.xyz/sports/fifa-live" target="_blank" class="cd-live cd-live-link"><i class="ti ti-circle-filled" style="font-size:8px"></i> Live now</a>`;
    } else if (status === "done") {
      timerHTML = `<div class="cd-done">FT: ${target.result || "Finished"}</div>`;
    } else {
      const diff = target.date - now;
      const days = Math.floor(diff / 86400000);
      const hrs = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      timerHTML = `<div class="cd-timer">
        <div class="cd-unit"><div class="cd-num" data-match="${target.id}" data-unit="d">${days}</div><div class="cd-label">days</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-unit"><div class="cd-num" data-match="${target.id}" data-unit="h">${String(hrs).padStart(2, "0")}</div><div class="cd-label">hrs</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-unit"><div class="cd-num" data-match="${target.id}" data-unit="m">${String(mins).padStart(2, "0")}</div><div class="cd-label">min</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-unit"><div class="cd-num" data-match="${target.id}" data-unit="s">${String(secs).padStart(2, "0")}</div><div class="cd-label">sec</div></div>
      </div>`;
    }
    const dateStr = target.date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    cards.push(`<div class="countdown-card">
      <div class="cd-group">Group ${target.group || target.stage}</div>
      <div class="cd-teams">${t ? t.flag : ""} ${teamName} vs ${oppT ? oppT.flag : ""} ${opponent}</div>
      <div class="cd-meta">${dateStr} · ${target.venue}</div>
      ${timerHTML}
    </div>`);
  });

  grid.innerHTML =
    cards.join("") ||
    '<div class="empty-countdown">No upcoming matches found.</div>';

  // Mobile banner: show only the first favourite team's card
  if (banner) {
    if (cards.length) {
      banner.innerHTML = cards[0];
      banner.classList.add("has-content");
    } else {
      banner.innerHTML = "";
      banner.classList.remove("has-content");
    }
  }
}

function tickCountdowns() {
  const now = etNow();
  document.querySelectorAll("[data-unit]").forEach((el) => {
    const mid = parseInt(el.getAttribute("data-match"));
    const unit = el.getAttribute("data-unit");
    const m = MATCHES.find((x) => x.id === mid);
    if (!m) return;
    const diff = m.date - now;
    if (diff <= 0) {
      renderCountdowns();
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    if (unit === "d") el.textContent = days;
    else if (unit === "h") el.textContent = String(hrs).padStart(2, "0");
    else if (unit === "m") el.textContent = String(mins).padStart(2, "0");
    else if (unit === "s") el.textContent = String(secs).padStart(2, "0");
  });
}

function filterTeams(q) {
  const dd = document.getElementById("team-dropdown");
  const lower = q.toLowerCase();
  const matches = TEAMS.filter((t) => t.name.toLowerCase().includes(lower));
  if (!matches.length || !q) {
    dd.classList.remove("open");
    return;
  }
  dd.innerHTML = matches
    .map(
      (t) =>
        `<div class="team-opt" onclick="addFav('${t.name}')"><span class="team-flag">${t.flag}</span>${t.name} <span style="color:var(--color-text-tertiary);font-size:11px;margin-left:auto">Group ${t.group}</span></div>`,
    )
    .join("");
  dd.classList.add("open");
}

function openDropdown() {
  const q = document.getElementById("team-search").value;
  if (q) filterTeams(q);
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".team-picker")) {
    document.getElementById("team-dropdown").classList.remove("open");
  }
});

function formatMatchTime(date) {
  return date.toLocaleString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDayLabel(date) {
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function setStageFilter(stage, btn) {
  stageFilter = stage;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderSchedule();
}

const STAGE_LABELS = {
  Group: "Group Stage",
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarterfinal",
  SF: "Semifinal",
  "3rd": "3rd Place",
  Final: "Final",
};

function renderSchedule() {
  const liveContainer = document.getElementById("schedule-live");
  const pastWrapper = document.getElementById("past-wrapper");
  const pastContainer = document.getElementById("past-container");
  const pastInner = document.getElementById("past-inner");

  const now = etNow();

  // ── "Results" filter: show all completed matches newest-first ──
  if (stageFilter === "results") {
    pastWrapper.style.display = "none";
    const done = MATCHES.filter((m) => m.result || getMatchStatus(m) === "done")
      .slice()
      .reverse();

    if (!done.length) {
      liveContainer.innerHTML =
        '<div class="no-matches">No completed matches yet.</div>';
      return;
    }

    const dayMap = {};
    done.forEach((m) => {
      const key = m.date.toLocaleDateString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      if (!dayMap[key])
        dayMap[key] = { label: formatDayLabel(m.date), matches: [] };
      dayMap[key].matches.push(m);
    });

    let html = "";
    Object.values(dayMap).forEach((day) => {
      html += `<div class="day-block"><div class="day-header">${day.label}</div>`;
      day.matches.forEach((m) => (html += matchRowHTML(m, true)));
      html += "</div>";
    });
    liveContainer.innerHTML = html;
    return;
  }

  // ── Normal filters ─────────────────────────────────────────────
  let filtered =
    stageFilter === "all"
      ? MATCHES
      : MATCHES.filter((m) => m.stage === stageFilter);

  const upcoming = [];
  const live = [];
  const past = [];

  filtered.forEach((m) => {
    const status = getMatchStatus(m);
    if (status === "live") live.push(m);
    else if (status === "done") past.push(m);
    else upcoming.push(m);
  });

  let html = "";
  if (live.length) {
    html += `<div class="day-block"><div class="day-header" style="color:#c0392b;">⚫ Live now</div>`;
    live.forEach((m) => (html += matchRowHTML(m)));
    html += "</div>";
  }

  const dayMap = {};
  upcoming.forEach((m) => {
    const key = m.date.toLocaleDateString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (!dayMap[key])
      dayMap[key] = { label: formatDayLabel(m.date), matches: [] };
    dayMap[key].matches.push(m);
  });
  Object.values(dayMap).forEach((day) => {
    const today = now.toLocaleDateString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const dayKey = day.matches[0].date.toLocaleDateString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    html += `<div class="day-block"><div class="day-header">${day.label}${dayKey === today ? ' <span class="day-tag">Today</span>' : ""}</div>`;
    day.matches.forEach((m) => (html += matchRowHTML(m)));
    html += "</div>";
  });
  liveContainer.innerHTML =
    html ||
    '<div class="no-matches">No upcoming or live matches for this filter.</div>';

  if (past.length) {
    pastWrapper.style.display = "block";
    let pastHTML = '<div class="past-separator">Completed matches</div>';
    const pastDays = {};
    past.forEach((m) => {
      const key = m.date.toLocaleDateString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      if (!pastDays[key])
        pastDays[key] = { label: formatDayLabel(m.date), matches: [] };
      pastDays[key].matches.push(m);
    });
    Object.values(pastDays).forEach((day) => {
      pastHTML += `<div class="day-block"><div class="day-header">${day.label}</div>`;
      day.matches.forEach((m) => (pastHTML += matchRowHTML(m, true)));
      pastHTML += "</div>";
    });
    pastInner.innerHTML = pastHTML;
    if (pastExpanded) {
      pastContainer.classList.add("expanded");
      document.getElementById("past-toggle").classList.add("open");
    } else {
      pastContainer.classList.remove("expanded");
      document.getElementById("past-toggle").classList.remove("open");
    }
  } else {
    pastWrapper.style.display = "none";
  }
}

function matchRowHTML(m, isPast = false) {
  const isFav = favorites.some((f) => f === m.home || f === m.away);
  let cls = "match-row";
  if (isFav && !isPast) cls += " highlight";
  if (isPast) cls += " past-match";
  const stageLabel = m.group
    ? `<span class="match-group">Grp ${m.group}</span>`
    : `<span class="stage-chip">${STAGE_LABELS[m.stage] || m.stage}</span>`;
  const status = getMatchStatus(m);
  let resultCell = "";
  if (m.result)
    resultCell = `<div class="match-result final">${m.result}</div>`;
  else if (status === "live")
    resultCell = `<div class="match-result"><a href="https://iptv.trionine.xyz/sports/fifa-live" target="_blank" class="cd-live cd-live-link">${m.liveScore ? m.liveScore + " 🔴" : "Live"}</a></div>`;
  else resultCell = `<div class="match-time">${formatMatchTime(m.date)}</div>`;
  return `<div class="${cls}">
    ${stageLabel}
    <div class="match-teams">${m.home} <span>vs</span> ${m.away}</div>
    ${resultCell}
    <div class="match-venue">${m.venue || ""}</div>
  </div>`;
}

function togglePast() {
  pastExpanded = !pastExpanded;
  const container = document.getElementById("past-container");
  const toggle = document.getElementById("past-toggle");
  if (pastExpanded) {
    container.classList.add("expanded");
    toggle.classList.add("open");
  } else {
    container.classList.remove("expanded");
    toggle.classList.remove("open");
  }
}

// Initial render
renderFavChips();
renderSchedule();
renderCountdowns();
setInterval(tickCountdowns, 1000);

// ─── Auto Score Sync (ESPN API) ────────────────────────────────────────────
const ESPN_NAME_MAP = {
  "Cote D'Ivoire": "Ivory Coast",
  "Ivory Coast": "Ivory Coast",
  "Bosnia-Herzegovina": "Bosnia & Herzegovina",
  "Turkey": "Türkiye",
  "Türkiye": "Türkiye",
  "Czech Republic": "Czechia",
  "Korea Republic": "South Korea",
  "South Korea": "South Korea",
  "Curacao": "Curaçao",
  "DR Congo": "DR Congo",
  "Democratic Republic of Congo": "DR Congo",
  "Congo DR": "DR Congo",
  "New Zealand": "New Zealand",
  "Saudi Arabia": "Saudi Arabia",
  "Cape Verde": "Cape Verde",
};

function espnName(name) {
  return ESPN_NAME_MAP[name] || name;
}

function updateSyncIndicator(ok, time) {
  const el = document.getElementById("score-sync");
  if (!el) return;
  if (ok) {
    el.textContent = `↻ ${time}`;
    el.className = "score-sync score-sync--ok";
    el.title = "Scores synced from ESPN";
  } else {
    el.textContent = "⚠ sync failed";
    el.className = "score-sync score-sync--err";
    el.title = "Score sync failed – showing cached data";
  }
}

async function fetchScores() {
  const LEAGUE = "fifa.world";
  // Fetch a wide range covering the whole tournament
  const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${LEAGUE}/scoreboard?limit=100&dates=20260611-20260719`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    let changed = false;

    (data.events || []).forEach((event) => {
      const comp = event.competitions?.[0];
      if (!comp) return;

      const isCompleted = comp.status?.type?.completed === true;
      const isLive = comp.status?.type?.state === "in";

      const homeComp = comp.competitors?.find((c) => c.homeAway === "home");
      const awayComp = comp.competitors?.find((c) => c.homeAway === "away");
      if (!homeComp || !awayComp) return;

      const homeName = espnName(homeComp.team.displayName);
      const awayName = espnName(awayComp.team.displayName);

      const match = MATCHES.find(
        (m) =>
          (m.home === homeName && m.away === awayName) ||
          (m.home === awayName && m.away === homeName),
      );
      if (!match) return;

      const hScore = homeComp.score ?? "";
      const aScore = awayComp.score ?? "";

      if (isCompleted && hScore !== "" && aScore !== "") {
        const result =
          match.home === homeName
            ? `${hScore}-${aScore}`
            : `${aScore}-${hScore}`;
        if (match.result !== result) {
          match.result = result;
          delete match.liveScore;
          changed = true;
        }
      } else if (isLive && hScore !== "" && aScore !== "") {
        const liveScore =
          match.home === homeName
            ? `${hScore}-${aScore}`
            : `${aScore}-${hScore}`;
        if (match.liveScore !== liveScore) {
          match.liveScore = liveScore;
          changed = true;
        }
      }
    });

    if (changed) {
      renderSchedule();
      renderCountdowns();
      if (typeof window.syncWallchart === "function") {
        window.syncWallchart();
      }
    }

    const now = new Date();
    updateSyncIndicator(
      true,
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    );
  } catch (err) {
    console.warn("[score-sync] fetch failed:", err);
    updateSyncIndicator(false);
  }
}

// Run immediately, then every 60 seconds
fetchScores();
setInterval(fetchScores, 60000);

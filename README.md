# FIFA World Cup 2026 Dashboard

A client-side web application providing real-time schedules, match countdowns, group standings, and knockout brackets for the FIFA World Cup 2026.

## Features

- **Interactive Schedule**: View all tournament matches filtered by stage (Group Stage, Round of 32, Round of 16, Quarterfinals, Semifinals, and Final) or completed results.
- **Favorite Teams**: Search and select favorite teams to track their specific upcoming matches with active countdown timers.
- **Group Standings**: Live standings table detailing positions, points, and statistics for all groups.
- **Knockout Bracket**: Interactive wallchart visualizing team progression through the knockout rounds.
- **Live Sync**: Support for live-updating scores and match state indicators.
- **Responsive Layout**: Designed for mobile, tablet, and desktop environments.

## Project Structure

```
.
├── CNAME          # Custom domain configuration (fifa.trionine.xyz)
├── data.js        # Static tournament data (schedules, groups, teams, venues)
├── fifa.png       # Application icon asset
├── index.html     # Main entry point and view templates
├── script.js      # Core logic (favorites, search, countdowns, score sync)
├── style.css      # Custom styles and responsive layouts
└── wallchart.js   # Bracket and group standings rendering engine
```

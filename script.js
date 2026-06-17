function etNow() {
  return new Date();
}

const TEAMS = [
  { name: "Mexico", flag: "🇲🇽", group: "A" },
  { name: "South Africa", flag: "🇿🇦", group: "A" },
  { name: "South Korea", flag: "🇰🇷", group: "A" },
  { name: "Czechia", flag: "🇨🇿", group: "A" },
  { name: "Canada", flag: "🇨🇦", group: "B" },
  { name: "Bosnia & Herzegovina", flag: "🇧🇦", group: "B" },
  { name: "Switzerland", flag: "🇨🇭", group: "B" },
  { name: "Qatar", flag: "🇶🇦", group: "B" },
  { name: "Brazil", flag: "🇧🇷", group: "C" },
  { name: "Morocco", flag: "🇲🇦", group: "C" },
  { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },
  { name: "Haiti", flag: "🇭🇹", group: "C" },
  { name: "USA", flag: "🇺🇸", group: "D" },
  { name: "Paraguay", flag: "🇵🇾", group: "D" },
  { name: "Australia", flag: "🇦🇺", group: "D" },
  { name: "Türkiye", flag: "🇹🇷", group: "D" },
  { name: "Germany", flag: "🇩🇪", group: "E" },
  { name: "Ivory Coast", flag: "🇨🇮", group: "E" },
  { name: "Ecuador", flag: "🇪🇨", group: "E" },
  { name: "Curaçao", flag: "🇨🇼", group: "E" },
  { name: "Netherlands", flag: "🇳🇱", group: "F" },
  { name: "Japan", flag: "🇯🇵", group: "F" },
  { name: "Sweden", flag: "🇸🇪", group: "F" },
  { name: "Tunisia", flag: "🇹🇳", group: "F" },
  { name: "Belgium", flag: "🇧🇪", group: "G" },
  { name: "Egypt", flag: "🇪🇬", group: "G" },
  { name: "Iran", flag: "🇮🇷", group: "G" },
  { name: "New Zealand", flag: "🇳🇿", group: "G" },
  { name: "Spain", flag: "🇪🇸", group: "H" },
  { name: "Cape Verde", flag: "🇨🇻", group: "H" },
  { name: "Saudi Arabia", flag: "🇸🇦", group: "H" },
  { name: "Uruguay", flag: "🇺🇾", group: "H" },
  { name: "France", flag: "🇫🇷", group: "I" },
  { name: "Senegal", flag: "🇸🇳", group: "I" },
  { name: "Iraq", flag: "🇮🇶", group: "I" },
  { name: "Norway", flag: "🇳🇴", group: "I" },
  { name: "Argentina", flag: "🇦🇷", group: "J" },
  { name: "Algeria", flag: "🇩🇿", group: "J" },
  { name: "Austria", flag: "🇦🇹", group: "J" },
  { name: "Jordan", flag: "🇯🇴", group: "J" },
  { name: "Portugal", flag: "🇵🇹", group: "K" },
  { name: "DR Congo", flag: "🇨🇩", group: "K" },
  { name: "Colombia", flag: "🇨🇴", group: "K" },
  { name: "Uzbekistan", flag: "🇺🇿", group: "K" },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  { name: "Croatia", flag: "🇭🇷", group: "L" },
  { name: "Ghana", flag: "🇬🇭", group: "L" },
  { name: "Panama", flag: "🇵🇦", group: "L" },
];

function etDate(y, mo, d, h, m) {
  // Times are stored as ET (UTC-4). Convert to UTC for correct Date objects.
  const utcMs = Date.UTC(y, mo - 1, d, h + 4, m, 0, 0);
  return new Date(utcMs);
}

const MATCHES = [
  {
    id: 1,
    stage: "Group",
    group: "A",
    home: "Mexico",
    away: "South Africa",
    date: etDate(2026, 6, 11, 15, 0),
    venue: "Estadio Azteca, Mexico City",
    result: "2-0",
  },
  {
    id: 2,
    stage: "Group",
    group: "A",
    home: "South Korea",
    away: "Czechia",
    date: etDate(2026, 6, 11, 18, 0),
    venue: "Estadio Akron, Zapopan",
    result: "2-1",
  },
  {
    id: 3,
    stage: "Group",
    group: "B",
    home: "Canada",
    away: "Bosnia & Herzegovina",
    date: etDate(2026, 6, 12, 15, 0),
    venue: "BMO Field, Toronto",
    result: "1-1",
  },
  {
    id: 4,
    stage: "Group",
    group: "D",
    home: "USA",
    away: "Paraguay",
    date: etDate(2026, 6, 12, 21, 0),
    venue: "SoFi Stadium, Inglewood",
    result: "4-1",
  },
  {
    id: 5,
    stage: "Group",
    group: "B",
    home: "Qatar",
    away: "Switzerland",
    date: etDate(2026, 6, 13, 13, 0),
    venue: "Levi's Stadium, Santa Clara",
    result: "1-1",
  },
  {
    id: 6,
    stage: "Group",
    group: "C",
    home: "Brazil",
    away: "Morocco",
    date: etDate(2026, 6, 13, 16, 0),
    venue: "MetLife Stadium, E. Rutherford",
    result: "1-1",
  },
  {
    id: 7,
    stage: "Group",
    group: "C",
    home: "Haiti",
    away: "Scotland",
    date: etDate(2026, 6, 13, 19, 0),
    venue: "Gillette Stadium, Foxborough",
    result: "0-1",
  },
  {
    id: 8,
    stage: "Group",
    group: "D",
    home: "Australia",
    away: "Türkiye",
    date: etDate(2026, 6, 14, 12, 0),
    venue: "BC Place, Vancouver",
    result: "2-0",
  },
  {
    id: 9,
    stage: "Group",
    group: "E",
    home: "Germany",
    away: "Curaçao",
    date: etDate(2026, 6, 14, 15, 0),
    venue: "NRG Stadium, Houston",
    result: "7-1",
  },
  {
    id: 10,
    stage: "Group",
    group: "F",
    home: "Netherlands",
    away: "Japan",
    date: etDate(2026, 6, 14, 18, 0),
    venue: "AT&T Stadium, Arlington",
    result: "2-2",
  },
  {
    id: 11,
    stage: "Group",
    group: "E",
    home: "Ivory Coast",
    away: "Ecuador",
    date: etDate(2026, 6, 14, 19, 0),
    venue: "Lincoln Financial Field, PHI",
    result: "1-0",
  },
  {
    id: 12,
    stage: "Group",
    group: "F",
    home: "Sweden",
    away: "Tunisia",
    date: etDate(2026, 6, 14, 22, 0),
    venue: "Estadio BBVA, Monterrey",
    result: "5-1",
  },
  {
    id: 13,
    stage: "Group",
    group: "H",
    home: "Spain",
    away: "Cape Verde",
    date: etDate(2026, 6, 15, 12, 0),
    venue: "Mercedes-Benz Stadium, ATL",
    result: "0-0",
  },
  {
    id: 14,
    stage: "Group",
    group: "G",
    home: "Belgium",
    away: "Egypt",
    date: etDate(2026, 6, 15, 15, 0),
    venue: "Lumen Field, Seattle",
    result: "1-1",
  },
  {
    id: 15,
    stage: "Group",
    group: "H",
    home: "Saudi Arabia",
    away: "Uruguay",
    date: etDate(2026, 6, 15, 18, 0),
    venue: "Hard Rock Stadium, Miami",
    result: "1-1",
  },
  {
    id: 16,
    stage: "Group",
    group: "G",
    home: "Iran",
    away: "New Zealand",
    date: etDate(2026, 6, 15, 21, 0),
    venue: "SoFi Stadium, Inglewood",
    result: "2-2",
  },
  {
    id: 17,
    stage: "Group",
    group: "I",
    home: "France",
    away: "Senegal",
    date: etDate(2026, 6, 16, 15, 0),
    venue: "MetLife Stadium, E. Rutherford",
    result: "3-1",
  },
  {
    id: 18,
    stage: "Group",
    group: "I",
    home: "Iraq",
    away: "Norway",
    date: etDate(2026, 6, 16, 18, 0),
    venue: "Gillette Stadium, Foxborough",
    result: "1-4",
  },
  {
    id: 19,
    stage: "Group",
    group: "J",
    home: "Argentina",
    away: "Algeria",
    date: etDate(2026, 6, 16, 21, 0),
    venue: "Arrowhead Stadium, Kansas City",
    result: "3-0",
  },
  {
    id: 20,
    stage: "Group",
    group: "J",
    home: "Austria",
    away: "Jordan",
    date: etDate(2026, 6, 17, 0, 0),
    venue: "Levi's Stadium, Santa Clara",
    result: "0-1",
  },
  {
    id: 21,
    stage: "Group",
    group: "K",
    home: "Portugal",
    away: "DR Congo",
    date: etDate(2026, 6, 17, 13, 0),
    venue: "NRG Stadium, Houston",
  },
  {
    id: 22,
    stage: "Group",
    group: "L",
    home: "England",
    away: "Croatia",
    date: etDate(2026, 6, 17, 16, 0),
    venue: "AT&T Stadium, Arlington",
  },
  {
    id: 23,
    stage: "Group",
    group: "L",
    home: "Ghana",
    away: "Panama",
    date: etDate(2026, 6, 17, 19, 0),
    venue: "BMO Field, Toronto",
  },
  {
    id: 24,
    stage: "Group",
    group: "K",
    home: "Uzbekistan",
    away: "Colombia",
    date: etDate(2026, 6, 17, 22, 0),
    venue: "Estadio Azteca, Mexico City",
  },
  {
    id: 25,
    stage: "Group",
    group: "A",
    home: "Czechia",
    away: "South Africa",
    date: etDate(2026, 6, 18, 12, 0),
    venue: "Mercedes-Benz Stadium, ATL",
  },
  {
    id: 26,
    stage: "Group",
    group: "B",
    home: "Switzerland",
    away: "Bosnia & Herzegovina",
    date: etDate(2026, 6, 18, 15, 0),
    venue: "SoFi Stadium, Inglewood",
  },
  {
    id: 27,
    stage: "Group",
    group: "B",
    home: "Canada",
    away: "Qatar",
    date: etDate(2026, 6, 18, 18, 0),
    venue: "BC Place, Vancouver",
  },
  {
    id: 28,
    stage: "Group",
    group: "A",
    home: "Mexico",
    away: "South Korea",
    date: etDate(2026, 6, 18, 21, 0),
    venue: "Estadio Akron, Zapopan",
  },
  {
    id: 29,
    stage: "Group",
    group: "D",
    home: "USA",
    away: "Australia",
    date: etDate(2026, 6, 19, 15, 0),
    venue: "Lumen Field, Seattle",
  },
  {
    id: 30,
    stage: "Group",
    group: "C",
    home: "Scotland",
    away: "Morocco",
    date: etDate(2026, 6, 19, 18, 0),
    venue: "Gillette Stadium, Foxborough",
  },
  {
    id: 31,
    stage: "Group",
    group: "C",
    home: "Brazil",
    away: "Haiti",
    date: etDate(2026, 6, 19, 20, 30),
    venue: "Lincoln Financial Field, PHI",
  },
  {
    id: 32,
    stage: "Group",
    group: "D",
    home: "Türkiye",
    away: "Paraguay",
    date: etDate(2026, 6, 19, 23, 0),
    venue: "Levi's Stadium, Santa Clara",
  },
  {
    id: 33,
    stage: "Group",
    group: "F",
    home: "Netherlands",
    away: "Sweden",
    date: etDate(2026, 6, 20, 13, 0),
    venue: "NRG Stadium, Houston",
  },
  {
    id: 34,
    stage: "Group",
    group: "E",
    home: "Germany",
    away: "Ivory Coast",
    date: etDate(2026, 6, 20, 16, 0),
    venue: "BMO Field, Toronto",
  },
  {
    id: 35,
    stage: "Group",
    group: "E",
    home: "Ecuador",
    away: "Curaçao",
    date: etDate(2026, 6, 20, 20, 0),
    venue: "Arrowhead Stadium, Kansas City",
  },
  {
    id: 36,
    stage: "Group",
    group: "F",
    home: "Tunisia",
    away: "Japan",
    date: etDate(2026, 6, 21, 0, 0),
    venue: "Estadio BBVA, Monterrey",
  },
  {
    id: 37,
    stage: "Group",
    group: "H",
    home: "Spain",
    away: "Saudi Arabia",
    date: etDate(2026, 6, 21, 12, 0),
    venue: "Mercedes-Benz Stadium, ATL",
  },
  {
    id: 38,
    stage: "Group",
    group: "G",
    home: "Belgium",
    away: "Iran",
    date: etDate(2026, 6, 21, 15, 0),
    venue: "SoFi Stadium, Inglewood",
  },
  {
    id: 39,
    stage: "Group",
    group: "H",
    home: "Uruguay",
    away: "Cape Verde",
    date: etDate(2026, 6, 21, 18, 0),
    venue: "Hard Rock Stadium, Miami",
  },
  {
    id: 40,
    stage: "Group",
    group: "G",
    home: "New Zealand",
    away: "Egypt",
    date: etDate(2026, 6, 21, 21, 0),
    venue: "BC Place, Vancouver",
  },
  {
    id: 41,
    stage: "Group",
    group: "J",
    home: "Argentina",
    away: "Austria",
    date: etDate(2026, 6, 22, 13, 0),
    venue: "AT&T Stadium, Arlington",
  },
  {
    id: 42,
    stage: "Group",
    group: "I",
    home: "France",
    away: "Iraq",
    date: etDate(2026, 6, 22, 17, 0),
    venue: "Lincoln Financial Field, PHI",
  },
  {
    id: 43,
    stage: "Group",
    group: "I",
    home: "Norway",
    away: "Senegal",
    date: etDate(2026, 6, 22, 20, 0),
    venue: "MetLife Stadium, E. Rutherford",
  },
  {
    id: 44,
    stage: "Group",
    group: "J",
    home: "Jordan",
    away: "Algeria",
    date: etDate(2026, 6, 22, 23, 0),
    venue: "Levi's Stadium, Santa Clara",
  },
  {
    id: 45,
    stage: "Group",
    group: "K",
    home: "Portugal",
    away: "Uzbekistan",
    date: etDate(2026, 6, 23, 13, 0),
    venue: "NRG Stadium, Houston",
  },
  {
    id: 46,
    stage: "Group",
    group: "L",
    home: "England",
    away: "Ghana",
    date: etDate(2026, 6, 23, 16, 0),
    venue: "Gillette Stadium, Foxborough",
  },
  {
    id: 47,
    stage: "Group",
    group: "L",
    home: "Panama",
    away: "Croatia",
    date: etDate(2026, 6, 23, 19, 0),
    venue: "BMO Field, Toronto",
  },
  {
    id: 48,
    stage: "Group",
    group: "K",
    home: "Colombia",
    away: "DR Congo",
    date: etDate(2026, 6, 23, 22, 0),
    venue: "Estadio Akron, Zapopan",
  },
  {
    id: 49,
    stage: "Group",
    group: "B",
    home: "Switzerland",
    away: "Canada",
    date: etDate(2026, 6, 24, 15, 0),
    venue: "BC Place, Vancouver",
  },
  {
    id: 50,
    stage: "Group",
    group: "B",
    home: "Bosnia & Herzegovina",
    away: "Qatar",
    date: etDate(2026, 6, 24, 15, 0),
    venue: "Lumen Field, Seattle",
  },
  {
    id: 51,
    stage: "Group",
    group: "C",
    home: "Scotland",
    away: "Brazil",
    date: etDate(2026, 6, 24, 18, 0),
    venue: "Hard Rock Stadium, Miami",
  },
  {
    id: 52,
    stage: "Group",
    group: "C",
    home: "Morocco",
    away: "Haiti",
    date: etDate(2026, 6, 24, 18, 0),
    venue: "Mercedes-Benz Stadium, ATL",
  },
  {
    id: 53,
    stage: "Group",
    group: "A",
    home: "Czechia",
    away: "Mexico",
    date: etDate(2026, 6, 24, 21, 0),
    venue: "Estadio Azteca, Mexico City",
  },
  {
    id: 54,
    stage: "Group",
    group: "A",
    home: "South Africa",
    away: "South Korea",
    date: etDate(2026, 6, 24, 21, 0),
    venue: "Estadio BBVA, Monterrey",
  },
  {
    id: 55,
    stage: "Group",
    group: "E",
    home: "Curaçao",
    away: "Ivory Coast",
    date: etDate(2026, 6, 25, 16, 0),
    venue: "Lincoln Financial Field, PHI",
  },
  {
    id: 56,
    stage: "Group",
    group: "E",
    home: "Ecuador",
    away: "Germany",
    date: etDate(2026, 6, 25, 16, 0),
    venue: "MetLife Stadium, E. Rutherford",
  },
  {
    id: 57,
    stage: "Group",
    group: "F",
    home: "Japan",
    away: "Sweden",
    date: etDate(2026, 6, 25, 19, 0),
    venue: "AT&T Stadium, Arlington",
  },
  {
    id: 58,
    stage: "Group",
    group: "F",
    home: "Tunisia",
    away: "Netherlands",
    date: etDate(2026, 6, 25, 19, 0),
    venue: "Arrowhead Stadium, Kansas City",
  },
  {
    id: 59,
    stage: "Group",
    group: "D",
    home: "Türkiye",
    away: "USA",
    date: etDate(2026, 6, 25, 22, 0),
    venue: "SoFi Stadium, Inglewood",
  },
  {
    id: 60,
    stage: "Group",
    group: "D",
    home: "Paraguay",
    away: "Australia",
    date: etDate(2026, 6, 25, 22, 0),
    venue: "Levi's Stadium, Santa Clara",
  },
  {
    id: 61,
    stage: "Group",
    group: "I",
    home: "Norway",
    away: "France",
    date: etDate(2026, 6, 26, 15, 0),
    venue: "Gillette Stadium, Foxborough",
  },
  {
    id: 62,
    stage: "Group",
    group: "I",
    home: "Senegal",
    away: "Iraq",
    date: etDate(2026, 6, 26, 15, 0),
    venue: "BMO Field, Toronto",
  },
  {
    id: 63,
    stage: "Group",
    group: "H",
    home: "Cape Verde",
    away: "Saudi Arabia",
    date: etDate(2026, 6, 26, 20, 0),
    venue: "NRG Stadium, Houston",
  },
  {
    id: 64,
    stage: "Group",
    group: "H",
    home: "Uruguay",
    away: "Spain",
    date: etDate(2026, 6, 26, 20, 0),
    venue: "Estadio Akron, Zapopan",
  },
  {
    id: 65,
    stage: "Group",
    group: "G",
    home: "Egypt",
    away: "Iran",
    date: etDate(2026, 6, 26, 23, 0),
    venue: "Lumen Field, Seattle",
  },
  {
    id: 66,
    stage: "Group",
    group: "G",
    home: "New Zealand",
    away: "Belgium",
    date: etDate(2026, 6, 26, 23, 0),
    venue: "BC Place, Vancouver",
  },
  {
    id: 67,
    stage: "Group",
    group: "L",
    home: "Panama",
    away: "England",
    date: etDate(2026, 6, 27, 17, 0),
    venue: "MetLife Stadium, E. Rutherford",
  },
  {
    id: 68,
    stage: "Group",
    group: "L",
    home: "Croatia",
    away: "Ghana",
    date: etDate(2026, 6, 27, 17, 0),
    venue: "Lincoln Financial Field, PHI",
  },
  {
    id: 69,
    stage: "Group",
    group: "K",
    home: "Colombia",
    away: "Portugal",
    date: etDate(2026, 6, 27, 19, 30),
    venue: "Hard Rock Stadium, Miami",
  },
  {
    id: 70,
    stage: "Group",
    group: "K",
    home: "DR Congo",
    away: "Uzbekistan",
    date: etDate(2026, 6, 27, 19, 30),
    venue: "Mercedes-Benz Stadium, ATL",
  },
  {
    id: 71,
    stage: "Group",
    group: "J",
    home: "Algeria",
    away: "Austria",
    date: etDate(2026, 6, 27, 22, 0),
    venue: "Arrowhead Stadium, Kansas City",
  },
  {
    id: 72,
    stage: "Group",
    group: "J",
    home: "Jordan",
    away: "Argentina",
    date: etDate(2026, 6, 27, 22, 0),
    venue: "AT&T Stadium, Arlington",
  },
  {
    id: 73,
    stage: "R32",
    home: "Runner-up A",
    away: "Runner-up B",
    date: etDate(2026, 6, 28, 15, 0),
    venue: "SoFi Stadium, Inglewood",
  },
  {
    id: 74,
    stage: "R32",
    home: "Winner E",
    away: "Best 3rd",
    date: etDate(2026, 6, 29, 16, 30),
    venue: "Gillette Stadium, Foxborough",
  },
  {
    id: 75,
    stage: "R32",
    home: "Winner C",
    away: "Runner-up F",
    date: etDate(2026, 6, 29, 13, 0),
    venue: "NRG Stadium, Houston",
  },
  {
    id: 76,
    stage: "R32",
    home: "Winner F",
    away: "Runner-up C",
    date: etDate(2026, 6, 29, 21, 0),
    venue: "Estadio BBVA, Monterrey",
  },
  {
    id: 77,
    stage: "R32",
    home: "Winner I",
    away: "Best 3rd",
    date: etDate(2026, 6, 30, 17, 0),
    venue: "MetLife Stadium, E. Rutherford",
  },
  {
    id: 78,
    stage: "R32",
    home: "Runner-up E",
    away: "Runner-up I",
    date: etDate(2026, 6, 30, 13, 0),
    venue: "AT&T Stadium, Arlington",
  },
  {
    id: 79,
    stage: "R32",
    home: "Winner A",
    away: "Best 3rd",
    date: etDate(2026, 6, 30, 21, 0),
    venue: "Estadio Azteca, Mexico City",
  },
  {
    id: 80,
    stage: "R32",
    home: "Winner L",
    away: "Best 3rd",
    date: etDate(2026, 7, 1, 12, 0),
    venue: "Mercedes-Benz Stadium, ATL",
  },
  {
    id: 81,
    stage: "R32",
    home: "Winner D",
    away: "Best 3rd",
    date: etDate(2026, 7, 1, 20, 0),
    venue: "Levi's Stadium, Santa Clara",
  },
  {
    id: 82,
    stage: "R32",
    home: "Winner G",
    away: "Best 3rd",
    date: etDate(2026, 7, 1, 16, 0),
    venue: "Lumen Field, Seattle",
  },
  {
    id: 83,
    stage: "R32",
    home: "Runner-up K",
    away: "Runner-up L",
    date: etDate(2026, 7, 2, 19, 0),
    venue: "BMO Field, Toronto",
  },
  {
    id: 84,
    stage: "R32",
    home: "Winner H",
    away: "Runner-up J",
    date: etDate(2026, 7, 2, 15, 0),
    venue: "SoFi Stadium, Inglewood",
  },
  {
    id: 85,
    stage: "R32",
    home: "Winner B",
    away: "Best 3rd",
    date: etDate(2026, 7, 2, 23, 0),
    venue: "BC Place, Vancouver",
  },
  {
    id: 86,
    stage: "R32",
    home: "Winner J",
    away: "Runner-up H",
    date: etDate(2026, 7, 3, 18, 0),
    venue: "Hard Rock Stadium, Miami",
  },
  {
    id: 87,
    stage: "R32",
    home: "Winner K",
    away: "Best 3rd",
    date: etDate(2026, 7, 3, 21, 30),
    venue: "Arrowhead Stadium, Kansas City",
  },
  {
    id: 88,
    stage: "R32",
    home: "Runner-up D",
    away: "Runner-up G",
    date: etDate(2026, 7, 3, 14, 0),
    venue: "AT&T Stadium, Arlington",
  },
  {
    id: 89,
    stage: "R16",
    home: "W74",
    away: "W77",
    date: etDate(2026, 7, 4, 17, 0),
    venue: "Lincoln Financial Field, PHI",
  },
  {
    id: 90,
    stage: "R16",
    home: "W73",
    away: "W75",
    date: etDate(2026, 7, 4, 13, 0),
    venue: "NRG Stadium, Houston",
  },
  {
    id: 91,
    stage: "R16",
    home: "W76",
    away: "W78",
    date: etDate(2026, 7, 5, 16, 0),
    venue: "MetLife Stadium, E. Rutherford",
  },
  {
    id: 92,
    stage: "R16",
    home: "W79",
    away: "W80",
    date: etDate(2026, 7, 5, 20, 0),
    venue: "Estadio Azteca, Mexico City",
  },
  {
    id: 93,
    stage: "R16",
    home: "W83",
    away: "W84",
    date: etDate(2026, 7, 6, 15, 0),
    venue: "AT&T Stadium, Arlington",
  },
  {
    id: 94,
    stage: "R16",
    home: "W81",
    away: "W82",
    date: etDate(2026, 7, 6, 20, 0),
    venue: "Lumen Field, Seattle",
  },
  {
    id: 95,
    stage: "R16",
    home: "W86",
    away: "W88",
    date: etDate(2026, 7, 7, 12, 0),
    venue: "Mercedes-Benz Stadium, ATL",
  },
  {
    id: 96,
    stage: "R16",
    home: "W85",
    away: "W87",
    date: etDate(2026, 7, 7, 16, 0),
    venue: "BC Place, Vancouver",
  },
  {
    id: 97,
    stage: "QF",
    home: "W89",
    away: "W90",
    date: etDate(2026, 7, 9, 16, 0),
    venue: "Gillette Stadium, Foxborough",
  },
  {
    id: 98,
    stage: "QF",
    home: "W93",
    away: "W94",
    date: etDate(2026, 7, 10, 15, 0),
    venue: "SoFi Stadium, Inglewood",
  },
  {
    id: 99,
    stage: "QF",
    home: "W91",
    away: "W92",
    date: etDate(2026, 7, 11, 17, 0),
    venue: "Hard Rock Stadium, Miami",
  },
  {
    id: 100,
    stage: "QF",
    home: "W95",
    away: "W96",
    date: etDate(2026, 7, 11, 21, 0),
    venue: "Arrowhead Stadium, Kansas City",
  },
  {
    id: 101,
    stage: "SF",
    home: "W97",
    away: "W98",
    date: etDate(2026, 7, 14, 15, 0),
    venue: "AT&T Stadium, Arlington",
  },
  {
    id: 102,
    stage: "SF",
    home: "W99",
    away: "W100",
    date: etDate(2026, 7, 15, 15, 0),
    venue: "Mercedes-Benz Stadium, ATL",
  },
  {
    id: 103,
    stage: "3rd",
    home: "L101",
    away: "L102",
    date: etDate(2026, 7, 18, 17, 0),
    venue: "Hard Rock Stadium, Miami",
  },
  {
    id: 104,
    stage: "Final",
    home: "W101",
    away: "W102",
    date: etDate(2026, 7, 19, 15, 0),
    venue: "MetLife Stadium, E. Rutherford",
  },
];

let favorites = JSON.parse(localStorage.getItem("wc26_favs") || "[]");
let stageFilter = "all";
let pastExpanded = false;

function saveFavs() {
  try {
    localStorage.setItem("wc26_favs", JSON.stringify(favorites));
  } catch (e) {}
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
  if (!favorites.length) {
    grid.innerHTML =
      '<div class="empty-countdown"><i class="ti ti-heart" style="font-size:24px;display:block;margin-bottom:8px;color:var(--color-text-tertiary)"></i>Select teams to see countdowns.</div>';
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
      timerHTML = `<a href="https://iptv.trionine.xyz/tv/fifa-wc-2026" target="_blank" class="cd-live cd-live-link"><i class="ti ti-circle-filled" style="font-size:8px"></i> Live now</a>`;
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
    resultCell = `<div class="match-result"><a href="https://iptv.trionine.xyz/tv/fifa-wc-2026" target="_blank" class="cd-live cd-live-link">${m.liveScore ? m.liveScore + " 🔴" : "Live"}</a></div>`;
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

# 🎬 Movie Buff's Rabbit Hole

> **A Cinephile's Chrome Extension: Go deeper down the cinematic rabbit hole while you watch.**

[![GitHub](https://img.shields.io/badge/GitHub-movie--buffs--rabbit--hole-e11d48)](https://github.com/grmbudhiraja3010-droid/movie-buffs-rabbit-hole)
[![Manifest](https://img.shields.io/badge/Chrome_Manifest-V3-f59e0b)](https://developer.chrome.com/docs/extensions/develop)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)

**Movie Buff's Rabbit Hole** is a film-lover's browser companion. As you watch films on **Netflix** or trailers/essays on **YouTube** (or search any cinematic title), it surfaces rich subtext, witty audience consensus, frame analyses, creative director blueprints, thematic connections, and plays soothing atmospheric cinema scores in the background.

---

## 🌟 Key Features

### 1. 🎞️ Filmy Aesthetic & Rabbit Hole Depth
- **Cinematic Atmosphere**: Noir background with subtle film grain, projector light glow, and celluloid borders.
- **Progressive Disclosure**: Rounded, smooth cards and progressive depth disclosure (Surface Buzz → Frame Subtext → Cast & Director Vault → Thematic Abyss → Alternate Realities).
- **Popup & Dashboard Modes**: Use as a sleek toolbar popup or pop out into a full-width dashboard tab.

### 2. 🎵 Ambient Cinema Soundtrack Player
- **In-Browser Audio Engine**: Real Web Audio synthesizer generating authentic atmospheric cinema drones (Noir Drone, Sci-Fi Synth, Tension Strings, Lo-Fi Tape, Orchestral Glow).
- **Volume & Mute Controls**: Play ambient background music side-by-side while watching films or browsing.

### 3. 🍿 Quirky Reddit Summary
- Distills witty consensus from highly upvoted discussions on `r/movies`, `r/TrueFilm`, and `r/flicks`.

### 4. 🔍 Current Frame: "Says vs. Means"
- **Surface Action**: Literal dialogue spoken and visible characters.
- **Subtext & Symbolism**: Visual metaphors, psychological subversion, lighting ratios, and color palette breakdowns.

### 5. ⭐ Critics & Audience Reviews Matrix
- Side-by-side Rotten Tomatoes Tomatometer, Audience Score, IMDb rating, and specialized journals (Cahiers du Cinéma, Sight & Sound, Roger Ebert).
- Instant filtering:
  - **Best (5★ / Raves)**
  - **Mid (3★ / Mixed)**
  - **Worst (<3★ / Critical)**
  - **Certified Critics vs. Normal Audience**

### 6. 🎭 Cast Rabbit Hole: Main Leads to Ensemble
- Explores actor filmographies ranked by:
  - **Best Rated** (highest Rotten Tomatoes / IMDb scores)
  - **Most Popular** (box office & cultural hits)
  - **Other Works / Obscure Gems**
- **Interview Vault**: Categorized into:
  - *Latest Interviews*
  - *Best In-Depth Conversations* (Actors on Actors, BAFTA Life in Pictures)
  - *Dramatic / On-Set Friction*
  - *Fun & Quirky Banter*

### 7. 🎬 Director's Cut Section
- Deep breakdown of creative vision, pacing tempo, and why scenes were excised.
- Remakes vs. Originals comparison.
- **Book Adaptations**: Details of original books with direct links to **Goodreads** and divergence notes.

### 8. 🌐 Expandable Genre Table (Country & Language)
- Interactive genre catalogue expandable into dedicated **Country Sections** (e.g. South Korean Cinema, French New Wave, Hollywood) and **Language Sections**.
- Sorted by highest ratings and trending titles.

### 9. 💡 Thematic Topics (Beyond Genre)
- Non-genre thematic filters: *Women's Independence*, *Existential Dread*, *Class Division*, *Moral Compromise*, *Indie Spirit*, *Kidnapping & Conflict*.
- Jumping links to other landmark cinema exploring the exact same theme.

### 10. 🌀 Ending Explained & Movie Bridges
- Unraveling climax theories and ambiguities.
- **Similar Movies**: For continued viewing in the same stylistic orbit.
- **Completely Opposite Movies (Palate Cleansers)**: Contrast recommendations when you need complete tonal relief after heavy films.

### 11. 🎪 Bloopers & BTS Outtakes
- Categorized into *Funny Bloopers* (corpsing, unscripted prop mishaps) and *Dramatic Hazards* (stunt near-misses, intense improvisation).

### 12. 💬 Cultural Discussions, Quotes & Debates
- Iconic memorable quotes (` “ ” `) with context and cultural uses.
- Active controversies and debates sorted by **Highest Relevancy Score** or **Latest Date**.
- Curated Reddit threads and in-depth Substack cinephile essays.

---

## 🚀 Quick Start & Installation

### Requirements
- **Node.js ≥ 20.12**
- Google Chrome or Microsoft Edge

### 1. Build the Extension
```bash
# Clone the repository
git clone https://github.com/grmbudhiraja3010-droid/movie-buffs-rabbit-hole.git
cd movie-buffs-rabbit-hole

# Generate icons (if needed)
npm run icons

# Build production bundle -> dist/
npm run build
```

### 2. Load into Chrome
1. Open Google Chrome and navigate to `chrome://extensions`.
2. Toggle **Developer mode** on in the top-right corner.
3. Click **Load unpacked** in the top-left corner.
4. Select the `dist/` directory inside this repository.
5. The **Movie Buff's Rabbit Hole** extension icon 🎬 will appear in your extensions toolbar!

---

## 🔒 Privacy & Permissions

Built strictly privacy-first:
- **No analytics, tracking, or remote telemetry**.
- **No credentials or video streams accessed**: The extension inspects only public page title metadata to determine what film you are watching.
- **Offline-capable**: Ambient soundtrack audio and curated databases operate completely offline inside the browser.

---

## 📜 License
MIT License. Built for movie buffs everywhere.

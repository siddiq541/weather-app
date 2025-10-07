# 🌦️ Next Weather App

A responsive **Next.js weather app** that displays a 7-day forecast using the **OpenWeather API**, styled with **Tailwind CSS** and tested with **Jest** (TDD-ready).

---

## 🚀 Getting Started (For Team Members)

Follow these steps to clone and set up the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/next-weather-app.git
cd next-weather-app
```

### 2️⃣ Switch to the Develop Branch

```bash
git checkout develop
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Set Up Environment Variables

Create a `.env.local` file in the project root and add your API key:

```ini
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
```

(Optional) You can copy from .env.example if available.

### 5️⃣ Run the Development Server

```bash
npm run dev
```

Visit the app at `http://localhost:3000`

### 6️⃣ Run Tests

```bash
npm test
```

## 🧠 Task Division (4 Team Members)

### Project Setup & API

**Branch:** `setup-api`

- Initialize Next.js + Tailwind + Jest

- Configure OpenWeatherMap API in `lib/weatherService.js`

- Fetch 7-day forecast for a fixed location (e.g., London)

- Store `.env.local` and add `.env.example`

### UI & Components

**Branch:** `ui-daycard`

- Create `DayCard.jsx `(props: date, icon, summary, tempMax, tempMin, windSpeed)

- Use Tailwind for consistent layout

- Reuse component 5–7 times in `WeatherSummary`

### Location Selector

**Branch:** `location-selector`

- Build `LocationSelector.jsx`

- Allow city search / dropdown

- Update forecast dynamically via prop or context

### Testing & Integration

**Branch:** `tests-integration`

- Write unit tests for each component (`tests/`)

- Integration test for API fetch & render flow

- Run `npm test` regularly for TDD

- Final styling and responsiveness polish

## 🌿 Git Branch Workflow

- `main` → Stable release
- `develop` → Active development branch
- `issues`\* → Each new task or feature

### Example:

```bash
git fetch origin
git checkout 01-ui-daycard
```

### When finished:

1. Commit your changes

2. Push your branch

3. Create a Pull Request → base: develop

4. Request review and merge after approval

## 🧪 TDD Approach

1. Write a failing test

2. Write the minimum code to pass

3. Refactor and keep tests green

### Run tests anytime with:

```bash
npm test
```

## 🤝 Contribution Guidelines

- Always create a feature branch from develop

- Keep commits small and meaningful

- Run tests before pushing

- Ensure PRs pass review before merging

## 🗓️ Project Goal

Deliver a simple, clean, and fully functional Weather Forecast SPA built with modern tools and best practices.

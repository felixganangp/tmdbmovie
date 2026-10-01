# TMDB Movies

A modern, responsive movie browsing web application built with React.js, TypeScript, and Tailwind CSS. It integrates with the TMDB API to provide real-time movie exploration, category filtering, instant searching, infinite scrolling, detailed cast views, and watchlist management.

## 🚀 Features

- **Category Filtering:**: Browse movies across Popular, Now Playing, Top Rated, and Upcoming categories.

- **Realtime Search With Debounce:**: Instantly search movies by title, optimized with custom debounce hooks to reduce unnecessary API requests.

- **Infinite Scrolling:**: Seamlessly load more movies automatically as you scroll down the page.

- **Movie Detail Page:**: View comprehensive movie details, including backdrop posters, synopsis, release year, runtime, vote average, director, and main cast members.

- **Abort Controller:**: Automatically cancels pending network requests to prevent memory leaks and race conditions.

- **Unit Testing:**: Component testing implemented using React Testing Library and Jest.

- **Responsive Design:** Fully optimized for seamless viewing across desktops, tablets, and smartphones.

## 🛠️ Tech Stack

- **React.js:** - React UI Library for web application
- **Typescript:** - Strongly typed superset of JavaScript
- **Tailwind:** - Utility first CSS framework
- **Axios:** - Popular promise-based JavaScript library
- **Vite:** - Fast frontend build tool for web development
- **React Testing Library:** - Testing library for React applications
- **Context API:** - React library that simplifies state management

## Getting Started

1. Clone the repository or set up the folder structure.

2. Install all the depedencies from root folder:

```bash
pnpm install
```

3. Configure your TMDB API Key: Create a .env file in the root directory of your project then add your TMDB API key: VITE_TMDB_API_KEY and TMDB base API Url: VITE_API_URL

4. Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the frontend result.

5. Run unit test:

```bash
pnpm run test
```

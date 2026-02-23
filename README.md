# Google Cloud Tech Conference - 1-Day Schedule Site (Next.js Version)

This is a 1-day technical conference informational site detailing a mock 8-talk Google Cloud Event schedule. Setup to run entirely using a unified Next.js App Router stack.

## Features Included

- **Strongly Typed Data Structure:** The schedule talks and speaker data has been formalized utilizing TypeScript interfaces (`src/data/schedule.ts`).
- **React Frontend:** Utilizing React hooks (`useState`, `useEffect`) allows instant and seamless state responses to search and categorization filtering.
- **Dynamic Search & Filtering:** Filter the schedule effectively in real-time by keyword (title, category, or speaker) or by utilizing category buttons.
- **Responsive Layout:** Formatted beautifully to adjust to mobile phones or desktop size displays.
- **Premium Aesthetics:** Colorful UI drawing inspiration from Google Cloud color themes such as deep blues, sharp reds, and yellow highlights within the base `.css`.
- **Lunch Break Element:** Highlights exactly when the 60 min lunch break takes place.

## Technologies Used

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS3 variables (`globals.css`) for high performance theming without Tailwind overhead.

---

## 🚀 Setup & Launch Instructions

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
You can verify it's installed by typing `node -v` in your terminal.

### 1. Installation

1. Navigate to the project directory:
   ```bash
   cd next-conference-site
   ```

2. Install the necessary dependencies (Next.js):
   ```bash
   npm install
   ```

### 2. Running the Server

1. Start the Next.js dev server by running:
   ```bash
   npm run dev
   ```
2. You should see a console message confirming the server has started:
   ```
   Ready in ... ms
   ```
3. Open a browser and navigate to: [http://localhost:3000](http://localhost:3000)


## 🛠️ Making Changes

### How to modify the data
The core schedule talks and speaker relationships are typed and stored in `src/data/schedule.ts`. 

### How to modify the UI design
The UI styles live inside the `src/app/globals.css` file.
We use CSS variables attached to the `:root` pseudo-class (at the top of the file) for quick-access theme swapping. Modifying the `var(--primary-blue)` variable will echo completely through the layout.

### How to modify filtering logic
The active filtering React logic is located in the client component `src/app/page.tsx`.
It uses standard ES6 `.filter()` logic over an array dependent on `searchTerm` and `activeFilter` React state variable combinations. 

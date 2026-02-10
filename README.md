# Finance Tracker (Next.js)

A **full-stack personal finance dashboard** built with **Next.js**, designed to help users track income, expenses, budgets, and savings goals. This app features a clean, responsive, and accessible user interface with interactive dashboards and charts.

---

## **Features**

- **Dashboard Overview**: View your current balance, income, expenses, and summaries of budgets, pots, and recurring bills.
- **Transactions Management**: Add, view, and categorize transactions (e.g., Dining, Groceries, Bills).
- **Budgets**: Create and monitor category-specific budgets with visual charts.
- **Saving Pots**: Track your savings goals (pots) and see progress toward targets.
- **Recurring Bills**: Automatically track recurring bills and their payment status.
- **Responsive & Accessible UI**: Works on desktop and mobile, with keyboard navigation support.
- **Collapsible Sidebar**: Minimize and expand the navigation for a cleaner layout.
- **Dynamic Visualizations**: Charts and graphs for budgets and spending habits.

---

## **Tech Stack**

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS, React
- **Backend**: Serverless API routes (Next.js)
- **Database**: [Neon PostgreSQL](https://neon.tech/) (or any Postgres-compatible DB)
- **Icons & Graphics**: Heroicons, Custom SVG assets
- **Charts**: Recharts or similar React charting library

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jackspence6/finance-tracker-nextjs.git
cd finance-tracker-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add your database connection string

```env
DATABASE_URL=your_database_connection_string
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### 5. Deployment

This app has been deployed to Vercel. You can view the live version here: [https://finance-tracker-six-jet.vercel.app](https://finance-tracker-six-jet.vercel.app)

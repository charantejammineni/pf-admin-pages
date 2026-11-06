# PONDFISH – MODERN DATA-DRIVEN ADMIN PANEL UI PROTOTYPE

A standalone, modern, data-driven administrative web interface prototype for **PondFish** — designed for commercial aquaculture operations, cold-chain refrigerated logistics, B2B restaurant supply, retail subscriptions, and financial settlement monitoring.

---

## 🌊 Overview & Design Direction

This prototype redesigns the PondFish administration system into an enterprise-grade commercial SaaS platform while faithfully preserving PondFish's brand identity:

- **Sidebar & Core Surfaces**: Deep Navy (`#0B192C` / `#132440`) with subtle slate borders (`#1E293B`).
- **Primary Actions & Accents**: PondFish Ocean Blue (`#0284C7`), Electric Cyan (`#06B6D4`), and Sky Blue (`#38BDF8`).
- **Clean SaaS Canvas**: Light slate background (`#F8FAFC`) with crisp white card containers (`#FFFFFF`), refined borders (`#E2E8F0`), and gentle elevation shadows.
- **Semantic Color Tokens**:
  - 🟢 **Success / Optimal / Paid / Completed**: Emerald Green (`#10B981`)
  - 🟡 **Pending / Warning / In-Transit / Low Stock**: Amber Orange (`#F59E0B`)
  - 🔴 **Critical / Delayed / Cancelled / Failed**: Rose Red (`#EF4444`)
  - 🔵 **Info / Scheduled / Route Active**: Cyan Blue (`#0284C7`)

---

## 🛠️ Technology Stack

Strictly aligned with requirements:
- **HTML5**: Clean, accessible, semantic markup.
- **CSS3**: Unified custom design system (`assets/css/style.css`) with CSS custom properties, responsive grid systems, pill badges, and animations.
- **Vanilla JavaScript**: Pure zero-framework DOM manipulation and local state management (`assets/js/app.js` and `assets/js/dashboard.js`).
- **Chart.js**: Smooth line charts, area charts, bar charts, and doughnut distributions.
- **Local Realistic Mock Data**: Stored in `assets/js/data.js` covering aquaculture ponds, reefer temperature sensors, B2B restaurant buyers, and transactions.
- **Zero Build Tools or Heavy Frameworks**: No React, Vue, Angular, Bootstrap, Tailwind, Node build steps, or backend databases required.

---

## 📁 Project Structure

```
pf-admin-pages/
│
├── index.html                           # PAGE 1: Executive Operations Dashboard
│
├── pages/
│   ├── bookings.html                    # PAGE 2: Bookings & Harvest Orders
│   ├── transactions.html                # PAGE 3: Financial Transactions & Settlements
│   ├── notifications.html               # PAGE 4: Centralized Notifications & Broadcasts
│   ├── gps-journey.html                 # PAGE 5: GPS Truck Fleet & Cold-Chain Telemetry
│   ├── settings.html                    # PAGE 6: Enterprise Business Settings
│   ├── reports.html                     # PAGE 7: Reports & Data Analytics Exports
│   ├── fish.html                        # PAGE 8: Fish & Shellfish Holding Inventory
│   ├── categories.html                  # PAGE 9: Aquaculture Product Categories
│   ├── discounts.html                   # PAGE 10: Discounts & Commercial Promotions
│   ├── subscription-plans.html          # PAGE 11: Recurring Subscription Plan Tiers
│   ├── customer-subscriptions.html      # PAGE 12: Customer Subscriptions & Deliveries
│   ├── customers.html                   # PAGE 13: Customer Directory (B2B & Retail)
│   ├── workers.html                     # PAGE 14: Field Staff & Fleet Drivers Roster
│   ├── audit-trail.html                 # PAGE 15: Administrative Audit Trail & Log
│   ├── exceptions.html                  # PAGE 16: Operations Exceptions Center
│   ├── security.html                    # PAGE 17: Admin Security & Session RBAC
│   └── profile.html                     # PAGE 18: Admin Profile & Credentials
│
├── assets/
│   ├── css/
│   │   └── style.css                    # Unified Design System & Component Styles
│   ├── js/
│   │   ├── data.js                      # Realistic Mock Datasets & State Store
│   │   ├── app.js                       # Layout Engine, Sidebar, Modals, Drawers, Toasts
│   │   └── dashboard.js                 # Chart.js Controllers & Analytics Bindings
│   └── images/
│       └── logo.svg                     # Vector PondFish Logo & Badge Mark
│
└── README.md                            # Documentation & Quickstart Guide
```

---

## 🚀 How to Run the Prototype Locally

The prototype requires no compilation, installation, or package managers.

### Option A: VS Code Live Server (Recommended)
1. Open the project folder `pf-admin-pages` in **VS Code**.
2. Right-click on `index.html` and choose **"Open with Live Server"**.
3. The dashboard will launch in your default web browser at `http://127.0.0.1:5500/index.html`.

### Option B: Direct File Open
- Simply double-click `index.html` in Windows File Explorer to open it directly in Chrome, Edge, Safari, or Firefox.

### Option C: Python Simple Server
In a terminal inside the project directory:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080/index.html`.

---

## 🧭 Navigation & Page Directory (All 18 Pages)

| Page | File | Primary Modules & Key Features |
| :--- | :--- | :--- |
| **1. Executive Dashboard** | `index.html` | 6 KPI cards, Revenue vs Logistics Line Chart, Booking Status Doughnut, Top Species Rankings, Recent Orders Table, Real-time Audit Stream, Date Range Selector. |
| **2. Bookings** | `pages/bookings.html` | Bookings lifecycle, search by customer/species, filter by status & pond, interactive order details drawer, "+ Create Booking" modal, CSV export. |
| **3. Transactions** | `pages/transactions.html` | Gross settlement tracking, payment method doughnut (ACH Wire, Stripe, Net Banking), fee deduction breakdown, transaction receipt modal, CSV export. |
| **4. Notifications** | `pages/notifications.html` | Priority-based alerts (Critical, Warning, Normal), category filtering, "Mark All Read" interaction, Broadcast Notification modal to drivers/staff. |
| **5. GPS Truck Journey** | `pages/gps-journey.html` | Vector map simulation with active highway routes, reefer temperature telemetry gauge (-2.4°C optimal vs -0.5°C warning), vehicle manifests, driver ping. |
| **6. Business Settings** | `pages/settings.html` | Tabbed settings: Corporate Legal Profile, Cold-Chain Logistics rules, Aquaculture Ponds registry, Stripe/ACH Gateways, and Notification toggles. |
| **7. Reports & Exports** | `pages/reports.html` | Custom report builder, Operating Margin Chart, Harvest Biomass Breakdown, Driver On-Time Audit, Instant CSV and PDF export generation. |
| **8. Fish Management** | `pages/fish.html` | 12 cataloged varieties, holding biomass (kg), safety stock alerts, unit pricing, water salinity presets, Add/Edit Species modal with stock quick-adjust. |
| **9. Categories** | `pages/categories.html` | Shellfish & Crustaceans, Freshwater Aquaculture, Marine & Coastal Fish, and Seed Stock cards, revenue contribution matrix, Add/Edit Category modal. |
| **10. Discounts** | `pages/discounts.html` | B2B volume codes (`PONDFRESH15`, `BULKRESTO25`), usage limits, expiration rules, Create Discount Coupon modal. |
| **11. Subscription Plans** | `pages/subscription-plans.html` | 4 pricing tiers ($180 - $1,850/mo), recurring MRR contribution, feature checklists, Add/Edit Tier modal. |
| **12. Customer Subscriptions**| `pages/customer-subscriptions.html` | Active subscriber registry, renewal dates, scheduled delivery slots, subscriber growth trajectory chart, pause/resume controls. |
| **13. Customers** | `pages/customers.html` | Commercial B2B, wholesale, and retail accounts, LTV metrics, customer growth bar chart, Add Customer modal, customer dossier drawer. |
| **14. Workers** | `pages/workers.html` | Reefer fleet drivers, pond biologists, and harvest crew, duty status badges, CDL licenses, rating scores, Add Staff modal, personnel dossier. |
| **15. Audit Trail** | `pages/audit-trail.html` | SOC2 compliant immutable log, administrator identity, source IP, affected module, change details, severity pills, CSV export. |
| **16. Exceptions Center** | `pages/exceptions.html` | Critical issues tracker (Reefer Temp breach, Gateway Webhook timeout, DO dip), impact assessment, resolution workflow drawer. |
| **17. Admin Security** | `pages/security.html` | Security Health Score (94/100), active session monitor with remote token revoke, WAF blocked brute-force log, IP whitelisting rules. |
| **18. Profile & Identity** | `pages/profile.html` | Admin profile (Rajesh Sharma - Super Admin), credentials management, password update with strength policy, 2FA status indicator. |

---

## 💡 Interactive Demonstrations to Try

1. **Create a Booking**: Click the topbar **"+ New Booking"** button on any page. Select a restaurant, fish species, quantity in kg, delivery window, and reefer truck. Submit to observe the booking added to the registry and toast feedback displayed.
2. **Interactive GPS Fleet Map**: Navigate to **GPS Truck Journey**. Click on any truck marker on the highway to inspect real-time reefer temperature (-2.4°C optimal vs -0.5°C warning), driver details, and waypoint progress.
3. **Filter and Search Tables**: Type in any table search box (e.g. "Marina Bay" on Bookings, or "Prawns" on Fish Inventory) to experience live client-side filtering.
4. **Data Exports**: Click **"Export CSV"** or **"Generate Executive PDF Report"** on Reports or Transactions to trigger simulated compliance exports.
5. **Sidebar Collapse**: Click the hamburger icon in the sidebar header to toggle between the 260px expanded view and the 76px compact icon view (state persisted in localStorage).
6. **Notification Panel**: Click the bell icon in the top header to view unread telemetry alerts and click "Mark all read".
7. **Keyboard Shortcut**: Press `Ctrl + K` (or `Cmd + K`) anywhere to focus the global search bar.

---

## 🏆 Presentation Quality Highlights

- **Consistent Typography & Spacing**: Precise 8pt grid alignment with high-contrast, readable typography.
- **Zero Generic AI Aesthetics**: Clean borders, professional data density, and contextual domain terminology (ppt salinity, dissolved oxygen, reefer temperature thresholds, cold-chain waypoints).
- **Graceful Fallbacks**: Fully operational even without an active internet connection.


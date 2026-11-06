/**
 * PONDFISH ADMIN - CORE APPLICATION CONTROLLER
 * Handles global layout rendering, sidebar state, topbar interactions,
 * SVG icons, modals, drawers, toasts, and search.
 */

// Icon Registry (Modern, Eye-Catching Duotone SVG Icons matching PondFish palette)
const PondIcons = {
  get: function(name) {
    const icons = {
      dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="2" fill="currentColor" fill-opacity="0.28"/><rect x="14" y="3" width="7" height="5" rx="2" fill="currentColor" fill-opacity="0.16"/><rect x="14" y="12" width="7" height="9" rx="2" fill="currentColor" fill-opacity="0.28"/><rect x="3" y="16" width="7" height="5" rx="2" fill="currentColor" fill-opacity="0.16"/><circle cx="6.5" cy="7.5" r="1.2" fill="currentColor"/><circle cx="17.5" cy="16.5" r="1.2" fill="currentColor"/></svg>`,
      bookings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="currentColor" fill-opacity="0.2"/><path d="M14 2v6h6"/><path d="M8.5 13.5l2.5 2.5 4.5-4.5" stroke-width="2"/><line x1="8" y1="18.5" x2="16" y2="18.5"/></svg>`,
      transactions: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3" fill="currentColor" fill-opacity="0.2"/><line x1="2" y1="9" x2="22" y2="9"/><rect x="5.5" y="12.5" width="4" height="3" rx="0.8" fill="currentColor" fill-opacity="0.45"/><circle cx="17.5" cy="14" r="1.6" fill="currentColor" fill-opacity="0.45"/></svg>`,
      notifications: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="currentColor" fill-opacity="0.22"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><circle cx="18" cy="4" r="2.5" fill="currentColor"/></svg>`,
      truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="14" height="12" rx="1.5" fill="currentColor" fill-opacity="0.24"/><path d="M15 8h4.5l2.5 3.5V16h-7V8z" fill="currentColor" fill-opacity="0.14"/><circle cx="6" cy="18" r="2.2" fill="currentColor" fill-opacity="0.45"/><circle cx="18" cy="18" r="2.2" fill="currentColor" fill-opacity="0.45"/><line x1="5" y1="8.5" x2="11" y2="8.5"/><line x1="5" y1="11.5" x2="9" y2="11.5"/></svg>`,
      fish: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 16.5C4 11 9.5 4 19 6c-1.5 2.5-1.5 6 0 8.5-9.5 2-15-5-16.5-2z" fill="currentColor" fill-opacity="0.25"/><path d="M19 6l3.5-3.5v7L19 6z" fill="currentColor" fill-opacity="0.35"/><path d="M11 5c1 1.8 1.5 3.5 1.5 5.5"/><circle cx="6.5" cy="11.5" r="1.3" fill="currentColor"/><path d="M14 14.5c-2 1.5-4 1.5-6 1"/></svg>`,
      categories: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" fill-opacity="0.32"/><rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" fill-opacity="0.14"/><rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" fill-opacity="0.14"/><rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" fill-opacity="0.32"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="17" cy="17" r="1" fill="currentColor"/></svg>`,
      discounts: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" fill="currentColor" fill-opacity="0.2"/><circle cx="7" cy="7" r="1.8" fill="currentColor"/><line x1="10" y1="14" x2="14" y2="10" stroke-width="2"/><circle cx="10" cy="10" r="0.8" fill="currentColor"/><circle cx="14" cy="14" r="0.8" fill="currentColor"/></svg>`,
      plans: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fill-opacity="0.28"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/><circle cx="12" cy="7" r="1.6" fill="currentColor"/></svg>`,
      subscriptions: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><polyline points="3 21 3 16 8 16" fill="currentColor" fill-opacity="0.3"/><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><polyline points="16 8 21 8 21 3" fill="currentColor" fill-opacity="0.3"/><circle cx="12" cy="12" r="2.2" fill="currentColor" fill-opacity="0.35"/></svg>`,
      customers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="currentColor" fill-opacity="0.2"/><circle cx="9" cy="7" r="4" fill="currentColor" fill-opacity="0.3"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      workers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="currentColor" fill-opacity="0.2"/><circle cx="9" cy="7" r="4" fill="currentColor" fill-opacity="0.3"/><path d="M5.5 6.5C5.5 4.8 7 3.5 9 3.5s3.5 1.3 3.5 3H5.5z" fill="currentColor" fill-opacity="0.45"/><circle cx="18" cy="12" r="3.2" fill="currentColor" fill-opacity="0.28"/><path d="M16.5 12l1 1 2-2"/></svg>`,
      reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="4" height="9" rx="1.2" fill="currentColor" fill-opacity="0.22"/><rect x="10" y="7" width="4" height="14" rx="1.2" fill="currentColor" fill-opacity="0.32"/><rect x="17" y="3" width="4" height="18" rx="1.2" fill="currentColor" fill-opacity="0.42"/><path d="M3 9l7-5 7 3 4-4" stroke-width="2"/><circle cx="17" cy="7" r="1.3" fill="currentColor"/></svg>`,
      audit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.2"/><polyline points="12 7 12 12 15.5 14" stroke-width="2"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>`,
      exceptions: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" fill-opacity="0.24"/><line x1="12" y1="8" x2="12" y2="13" stroke-width="2.2"/><circle cx="12" cy="16.5" r="1.3" fill="currentColor"/></svg>`,
      security: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fill-opacity="0.24"/><circle cx="12" cy="10" r="2.2" fill="currentColor" fill-opacity="0.45"/><path d="M12 12.2V15.5" stroke-width="2"/></svg>`,
      settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2" fill="currentColor" fill-opacity="0.35"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="currentColor" fill-opacity="0.16"/></svg>`,
      profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" fill-opacity="0.18"/><circle cx="12" cy="10" r="3.5" fill="currentColor" fill-opacity="0.35"/><path d="M7 18c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>`,
      search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7.5" fill="currentColor" fill-opacity="0.22"/><line x1="21" y1="21" x2="16.5" y2="16.5" stroke-width="2.2"/><circle cx="11" cy="11" r="3.2" fill="currentColor" fill-opacity="0.28"/></svg>`,
      plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.2"/><line x1="12" y1="7.5" x2="12" y2="16.5"/><line x1="7.5" y1="12" x2="16.5" y2="12"/></svg>`,
      download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="currentColor" fill-opacity="0.18"/><polyline points="7 10 12 15 17 10" stroke-width="2"/><line x1="12" y1="15" x2="12" y2="3" stroke-width="2.2"/></svg>`,
      filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" fill="currentColor" fill-opacity="0.24"/><line x1="6" y1="7" x2="18" y2="7"/></svg>`,
      close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5" fill="currentColor" fill-opacity="0.2"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="currentColor" fill-opacity="0.2"/><circle cx="12" cy="12" r="3.2" fill="currentColor" fill-opacity="0.45"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/></svg>`,
      edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" fill="currentColor" fill-opacity="0.14"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="currentColor" fill-opacity="0.28"/></svg>`,
      trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" fill="currentColor" fill-opacity="0.22"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>`,
      menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="16" y2="12"/><line x1="3" y1="18" x2="19" y2="18"/></svg>`,
      check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5" fill="currentColor" fill-opacity="0.24"/><polyline points="8 12.5 11 15.5 16.5 9.5"/></svg>`,
      alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="currentColor" fill-opacity="0.24"/><line x1="12" y1="9" x2="12" y2="13" stroke-width="2.2"/><circle cx="12" cy="17" r="1.3" fill="currentColor"/></svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="currentColor" fill-opacity="0.24"/><line x1="12" y1="9" x2="12" y2="13" stroke-width="2.2"/><circle cx="12" cy="17" r="1.3" fill="currentColor"/></svg>`,
      refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6" fill="currentColor" fill-opacity="0.28"/><path d="M2.5 22v-6h6" fill="currentColor" fill-opacity="0.28"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L21.5 8M2.5 16l3.14 2.36A9 9 0 0 0 20.49 15"/></svg>`,
      chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`
    };
    return icons[name] || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" fill-opacity="0.2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`;
  }
};

const PondApp = {
  // Navigation structure definition
  navConfig: [
    {
      group: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Executive Dashboard", icon: "dashboard", url: "index.html", pageKey: "dashboard" }
      ]
    },
    {
      group: "OPERATIONS",
      items: [
        { id: "bookings", label: "Bookings", icon: "bookings", url: "bookings.html", pageKey: "bookings", badge: "38" },
        { id: "transactions", label: "Transactions", icon: "transactions", url: "transactions.html", pageKey: "transactions" },
        { id: "notifications", label: "Notifications", icon: "notifications", url: "notifications.html", pageKey: "notifications", badge: "3", badgeClass: "danger" },
        { id: "gps-journey", label: "GPS Truck Journey", icon: "truck", url: "gps-journey.html", pageKey: "gps-journey" }
      ]
    },
    {
      group: "BUSINESS MANAGEMENT",
      items: [
        { id: "fish", label: "Fish Management", icon: "fish", url: "fish.html", pageKey: "fish" },
        { id: "categories", label: "Categories", icon: "categories", url: "categories.html", pageKey: "categories" },
        { id: "discounts", label: "Discounts", icon: "discounts", url: "discounts.html", pageKey: "discounts" },
        { id: "subscription-plans", label: "Subscription Plans", icon: "plans", url: "subscription-plans.html", pageKey: "subscription-plans" },
        { id: "customer-subscriptions", label: "Customer Subscriptions", icon: "subscriptions", url: "customer-subscriptions.html", pageKey: "customer-subscriptions" }
      ]
    },
    {
      group: "PEOPLE MANAGEMENT",
      items: [
        { id: "customers", label: "Customers", icon: "customers", url: "customers.html", pageKey: "customers" },
        { id: "workers", label: "Workers", icon: "workers", url: "workers.html", pageKey: "workers" }
      ]
    },
    {
      group: "INSIGHTS & CONTROL",
      items: [
        { id: "reports", label: "Reports & Exports", icon: "reports", url: "reports.html", pageKey: "reports" },
        { id: "audit-trail", label: "Audit Trail", icon: "audit", url: "audit-trail.html", pageKey: "audit-trail" },
        { id: "exceptions", label: "Exceptions Center", icon: "exceptions", url: "exceptions.html", pageKey: "exceptions", badge: "2", badgeClass: "danger" }
      ]
    },
    {
      group: "SYSTEM",
      items: [
        { id: "settings", label: "Business Settings", icon: "settings", url: "settings.html", pageKey: "settings" },
        { id: "security", label: "Admin Security", icon: "security", url: "security.html", pageKey: "security" },
        { id: "profile", label: "Profile & Identity", icon: "profile", url: "profile.html", pageKey: "profile" }
      ]
    }
  ],

  // Determine current active page
  getCurrentPageKey: function() {
    const path = window.location.pathname.toLowerCase();
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    if (filename === 'index.html' || filename === '') return 'dashboard';
    
    for (const grp of this.navConfig) {
      for (const item of grp.items) {
        if (filename.includes(item.url)) {
          return item.pageKey;
        }
      }
    }
    return 'dashboard';
  },

  // Check if currently inside pages/ directory
  isInsidePagesDir: function() {
    return window.location.pathname.toLowerCase().includes('/pages/') || 
           window.location.href.toLowerCase().includes('/pages/');
  },

  // Get base prefix for assets and page links
  getBasePrefixes: function() {
    const inPages = this.isInsidePagesDir();
    return {
      assets: inPages ? '../assets/' : 'assets/',
      pages: inPages ? '' : 'pages/',
      root: inPages ? '../' : './'
    };
  },

  // Resolve any icon placeholders and data-icon attributes across DOM
  resolveIcons: function() {
    // 1. Resolve elements with data-icon attribute
    document.querySelectorAll('[data-icon]').forEach(el => {
      const name = el.getAttribute('data-icon');
      if (name && PondIcons.get(name)) {
        el.innerHTML = PondIcons.get(name);
      }
    });

    // 2. Scan and replace any literal ${PondIcons.get('...')} in text nodes
    try {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodesToReplace = [];
      while (walker.nextNode()) {
        if (walker.currentNode.nodeValue && walker.currentNode.nodeValue.includes('${PondIcons.get(')) {
          nodesToReplace.push(walker.currentNode);
        }
      }
      nodesToReplace.forEach(node => {
        const parent = node.parentNode;
        if (!parent) return;
        const span = document.createElement('span');
        span.className = 'pf-icon-resolved';
        span.innerHTML = node.nodeValue.replace(/\$\{PondIcons\.get\(['"]([^'"]+)['"]\)\}/g, (match, iconName) => {
          return PondIcons.get(iconName);
        });
        parent.replaceChild(span, node);
      });
    } catch (err) {
      console.warn('Icon resolver error:', err);
    }
  },

  // Initialize global framework
  init: function(activeKeyOverride) {
    const activeKey = activeKeyOverride || this.getCurrentPageKey();
    const prefixes = this.getBasePrefixes();

    // 0. Initial icon resolution for static HTML elements
    this.resolveIcons();

    // 1. Render Sidebar if placeholder exists
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
      this.renderSidebar(sidebarContainer, activeKey, prefixes);
    }

    // 2. Render Top Header if placeholder exists
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      this.renderHeader(headerContainer, activeKey, prefixes);
    }

    // 3. Inject global modals and toast containers
    this.injectGlobalComponents(prefixes);

    // 4. Attach event listeners
    this.attachGlobalEvents();

    // 5. Final icon resolution for injected components
    this.resolveIcons();
  },

  // Render unified sidebar
  renderSidebar: function(container, activeKey, prefixes) {
    let navGroupsHtml = '';

    this.navConfig.forEach(grp => {
      let itemsHtml = '';
      grp.items.forEach(item => {
        const isActive = item.pageKey === activeKey ? 'active' : '';
        const itemUrl = item.pageKey === 'dashboard' ? (prefixes.root + 'index.html') : (prefixes.pages + item.url);
        const badgeHtml = item.badge ? `<span class="nav-badge ${item.badgeClass || ''}">${item.badge}</span>` : '';

        itemsHtml += `
          <li>
            <a href="${itemUrl}" class="nav-link ${isActive}" data-page="${item.pageKey}" title="${item.label}">
              <span class="nav-icon">${PondIcons.get(item.icon)}</span>
              <span class="nav-text">${item.label}</span>
              ${badgeHtml}
            </a>
          </li>
        `;
      });

      navGroupsHtml += `
        <div class="nav-group">
          <div class="nav-group-title">${grp.group}</div>
          <ul class="nav-list">
            ${itemsHtml}
          </ul>
        </div>
      `;
    });

    const logoUrl = prefixes.assets + 'images/logo.svg';
    const profileUrl = prefixes.pages + 'profile.html';

    container.innerHTML = `
      <aside class="app-sidebar" id="appSidebar">
        <div class="sidebar-header">
          <a href="${prefixes.root}index.html" class="brand-link" title="PondFish Operations">
            <img src="${logoUrl}" alt="PondFish" class="brand-logo-img">
          </a>
          <button type="button" class="sidebar-collapse-btn" id="sidebarCollapseToggle" title="Toggle Sidebar">
            ${PondIcons.get('menu')}
          </button>
        </div>

        <nav class="sidebar-nav">
          ${navGroupsHtml}
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-avatar">RS</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">Rajesh Sharma</div>
            <div class="sidebar-user-role">Head of Operations</div>
          </div>
          <a href="${profileUrl}" class="sidebar-collapse-btn" title="View Profile" style="margin-left: auto;">
            ${PondIcons.get('profile')}
          </a>
        </div>
      </aside>
    `;
  },

  // Render unified top header
  renderHeader: function(container, activeKey, prefixes) {
    // Find page metadata
    let currentTitle = "Executive Dashboard";
    let currentGroup = "OVERVIEW";

    for (const grp of this.navConfig) {
      for (const item of grp.items) {
        if (item.pageKey === activeKey) {
          currentTitle = item.label;
          currentGroup = grp.group;
          break;
        }
      }
    }

    container.innerHTML = `
      <header class="app-header">
        <div class="header-left">
          <button type="button" class="topbar-sidebar-btn" id="topbarSidebarToggle" title="Toggle Navigation Sidebar">
            ${PondIcons.get('menu')}
          </button>
          <div class="header-breadcrumbs">
            <a href="${prefixes.root}index.html">PondFish</a>
            <span class="divider">/</span>
            <span>${currentGroup}</span>
            <span class="divider">/</span>
            <span class="current">${currentTitle}</span>
          </div>
        </div>

        <div class="header-center">
          <div class="global-search-wrapper">
            <span class="search-icon-left">${PondIcons.get('search')}</span>
            <input type="text" class="global-search-input" id="globalSearchInput" placeholder="Search orders, fish species, trucks, customers...">
            <span class="search-shortcut-badge">Ctrl K</span>
          </div>
        </div>

        <div class="header-right">
          <button type="button" class="header-action-btn btn-primary" id="globalNewBookingBtn" onclick="PondApp.openNewBookingModal()">
            ${PondIcons.get('plus')}
            <span>New Booking</span>
          </button>

          <!-- Notification Dropdown Button -->
          <div style="position: relative;">
            <button type="button" class="header-icon-btn" id="notifBellBtn" title="Notifications">
              ${PondIcons.get('notifications')}
              <span class="notification-badge-dot"></span>
            </button>

            <!-- Notifications Dropdown Panel -->
            <div class="notifications-panel" id="notificationsFlyout">
              <div class="notif-header">
                <div class="notif-header-title">
                  <span>Operational Alerts</span>
                  <span class="notif-count-pill">3 New</span>
                </div>
                <button type="button" class="btn btn-sm btn-secondary" onclick="PondApp.markAllNotificationsRead()" style="font-size: 11px; padding: 2px 8px;">
                  Mark all read
                </button>
              </div>
              <div class="notif-list" id="notifDropdownList">
                <!-- Injected dynamically from data -->
              </div>
              <div class="notif-footer">
                <a href="${prefixes.pages}notifications.html">View All Notifications (${window.PondData ? PondData.notifications.length : 7}) →</a>
              </div>
            </div>
          </div>

          <!-- User Menu Dropdown -->
          <div class="user-menu-wrapper">
            <button type="button" class="user-profile-trigger" id="userMenuBtn">
              <div class="user-avatar-small">RS</div>
              <div style="text-align: left; display: none; @media(min-width: 768px){display: block;}">
                <div class="user-name-small">Rajesh Sharma</div>
                <div class="user-role-small">Super Admin</div>
              </div>
              <span style="color: #94a3b8; width: 14px; height: 14px; display: flex; align-items: center;">${PondIcons.get('chevronDown')}</span>
            </button>

            <div class="dropdown-menu" id="userDropdownMenu">
              <div class="dropdown-header-info">
                <div class="name">Rajesh Sharma</div>
                <div class="email">rajesh.sharma@pondfish.com</div>
              </div>
              <a href="${prefixes.pages}profile.html" class="dropdown-item">
                <span style="width: 16px; height: 16px;">${PondIcons.get('profile')}</span>
                <span>Profile & Identity</span>
              </a>
              <a href="${prefixes.pages}security.html" class="dropdown-item">
                <span style="width: 16px; height: 16px;">${PondIcons.get('security')}</span>
                <span>Admin Security</span>
              </a>
              <a href="${prefixes.pages}settings.html" class="dropdown-item">
                <span style="width: 16px; height: 16px;">${PondIcons.get('settings')}</span>
                <span>Business Settings</span>
              </a>
              <div class="dropdown-divider"></div>
              <button type="button" class="dropdown-item danger" onclick="PondApp.simulateLogout()" style="width: 100%; text-align: left;">
                <span style="width: 16px; height: 16px;">${PondIcons.get('close')}</span>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    `;

    // Populate dropdown notifications
    this.populateNotificationDropdown(prefixes);
  },

  // Fill notifications panel with actual records
  populateNotificationDropdown: function(prefixes) {
    const listEl = document.getElementById('notifDropdownList');
    if (!listEl || !window.PondData) return;

    const notifs = PondData.notifications.slice(0, 4);
    let html = '';

    notifs.forEach(n => {
      let iconClass = 'normal';
      if (n.priority === 'Critical') iconClass = 'critical';
      else if (n.priority === 'Warning') iconClass = 'warning';

      const unreadClass = !n.read ? 'unread' : '';
      const actionUrl = prefixes.pages + n.actionUrl;

      html += `
        <div class="notif-item ${unreadClass}" onclick="window.location.href='${actionUrl}'">
          <div class="notif-item-icon ${iconClass}">
            ${PondIcons.get('notifications')}
          </div>
          <div class="notif-body">
            <div class="notif-body-title">${n.title}</div>
            <div class="notif-body-msg">${n.message}</div>
            <div class="notif-body-time">${n.timestamp} • <strong style="color: ${iconClass === 'critical' ? '#ef4444' : '#0284c7'}">${n.category}</strong></div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;
  },

  // Mark all notifications read demo
  markAllNotificationsRead: function() {
    if (window.PondData) {
      PondData.notifications.forEach(n => n.read = true);
    }
    const dot = document.querySelector('.notification-badge-dot');
    if (dot) dot.style.display = 'none';

    const pill = document.querySelector('.notif-count-pill');
    if (pill) pill.textContent = '0 New';

    const unreadItems = document.querySelectorAll('.notif-item.unread');
    unreadItems.forEach(el => el.classList.remove('unread'));

    PondApp.toast('All notifications marked as read', 'success');
  },

  // Inject New Booking Modal, Global Drawer, and Toast Container
  injectGlobalComponents: function(prefixes) {
    if (document.getElementById('globalModalContainer')) return;

    const div = document.createElement('div');
    div.id = 'globalModalContainer';
    div.innerHTML = `
      <!-- Global Quick Action Modal: New Booking -->
      <div class="modal-backdrop" id="newBookingModal">
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-title">Create New Harvest Booking</div>
            <button type="button" class="modal-close-btn" onclick="PondApp.closeModal('newBookingModal')">
              ${PondIcons.get('close')}
            </button>
          </div>
          <div class="modal-body">
            <form id="newBookingForm" onsubmit="PondApp.handleCreateBooking(event)">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Customer / Establishment <span class="required">*</span></label>
                  <select class="form-control" id="modalCustomerSelect" required>
                    <option value="">Select customer...</option>
                    <option value="Marina Bay Seafood Bistro">Marina Bay Seafood Bistro (Commercial B2B)</option>
                    <option value="Grand Hyatt Coastal Dining">Grand Hyatt Coastal Dining (Commercial B2B)</option>
                    <option value="The Oberoi Grand Seafood Lounge">The Oberoi Grand Seafood Lounge (Commercial B2B)</option>
                    <option value="Blue Harbor Oyster & Grill">Blue Harbor Oyster & Grill (Commercial B2B)</option>
                    <option value="Seafood Wholesalers Ltd">Seafood Wholesalers Ltd (Wholesale)</option>
                    <option value="Anita & Rajiv Sharma">Anita & Rajiv Sharma (Retail Gourmet)</option>
                    <option value="Dr. Alistair Finch">Dr. Alistair Finch (Retail Gourmet)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Harvest Pond Source <span class="required">*</span></label>
                  <select class="form-control" id="modalPondSelect" required>
                    <option value="Coastal Brackish Ponds Delta-4">Coastal Brackish Ponds Delta-4</option>
                    <option value="Pond Krishna Basin-2">Pond Krishna Basin-2</option>
                    <option value="Saline Estuary Pond Delta-2">Saline Estuary Pond Delta-2</option>
                    <option value="Deep Open Cage Marine Unit 1">Deep Open Cage Marine Unit 1</option>
                    <option value="Mangrove Tidal Lagoon Enclosure">Mangrove Tidal Lagoon Enclosure</option>
                    <option value="Krishna Inland Farm Pond 5">Krishna Inland Farm Pond 5</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Fish / Shellfish Variety <span class="required">*</span></label>
                  <select class="form-control" id="modalFishSelect" required>
                    <option value="Black Tiger Prawns (Jumbo Grade A)">Black Tiger Prawns (Jumbo Grade A) - $22.50/kg</option>
                    <option value="Freshwater Salmon Trout">Freshwater Salmon Trout - $19.00/kg</option>
                    <option value="Asian Sea Bass (Barramundi)">Asian Sea Bass (Barramundi) - $14.50/kg</option>
                    <option value="Golden Pomfret Premium">Golden Pomfret Premium - $16.80/kg</option>
                    <option value="Live Mud Crab (Mangrove)">Live Mud Crab (Mangrove) - $28.00/kg</option>
                    <option value="Rohu & Catla Fresh Catch">Rohu & Catla Fresh Catch - $4.80/kg</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Order Quantity (kg) <span class="required">*</span></label>
                  <input type="number" class="form-control" id="modalQuantityInput" min="1" max="5000" value="100" required>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Required Delivery Date & Time <span class="required">*</span></label>
                  <input type="datetime-local" class="form-control" id="modalDeliveryDateInput" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Assign Reefer Truck Fleet</label>
                  <select class="form-control" id="modalTruckSelect">
                    <option value="Truck #PF-104 (Volvo Reefer)">Truck #PF-104 (Volvo FL Reefer 8-Ton) - Vikramaditya</option>
                    <option value="Truck #PF-108 (Isuzu Reefer)">Truck #PF-108 (Isuzu ColdChain 14ft) - Devendra</option>
                    <option value="Truck #PF-101 (Sprinter Van)">Truck #PF-101 (Express Insulated Sprinter) - Ramesh</option>
                    <option value="Truck #PF-112 (Tata Reefer)">Truck #PF-112 (Tata Ultra Reefer Heavy) - Suresh</option>
                    <option value="Auto-Assign Upon Dispatch">Auto-Assign Best Route Upon Dispatch</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Special Harvest & Handling Instructions</label>
                <textarea class="form-control" id="modalNotesInput" rows="2" placeholder="e.g. Chill at -2°C immediately after harvest. Chef requires whole fish in ice slurry."></textarea>
              </div>

              <div class="modal-footer" style="padding-left: 0; padding-right: 0; margin-bottom: -10px; background: transparent;">
                <button type="button" class="btn btn-secondary" onclick="PondApp.closeModal('newBookingModal')">Cancel</button>
                <button type="submit" class="btn btn-primary">
                  ${PondIcons.get('check')}
                  <span>Create & Confirm Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Global Side Drawer (Reusable for details) -->
      <div class="drawer-backdrop" id="globalDrawerBackdrop" onclick="PondApp.closeDrawer()">
        <div class="side-drawer" id="globalSideDrawer" onclick="event.stopPropagation()">
          <div class="drawer-header">
            <div class="modal-title" id="drawerTitle">Record Details</div>
            <button type="button" class="modal-close-btn" onclick="PondApp.closeDrawer()">
              ${PondIcons.get('close')}
            </button>
          </div>
          <div class="drawer-body" id="drawerBody">
            <!-- Dynamic content -->
          </div>
          <div class="drawer-footer" id="drawerFooter">
            <button type="button" class="btn btn-secondary" onclick="PondApp.closeDrawer()">Close</button>
          </div>
        </div>
      </div>

      <!-- Toast Container -->
      <div class="toast-container" id="toastContainer"></div>
    `;

    document.body.appendChild(div);

    // Set default tomorrow morning for delivery date
    const dateInput = document.getElementById('modalDeliveryDateInput');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(6, 30, 0, 0);
      const iso = tomorrow.toISOString().slice(0, 16);
      dateInput.value = iso;
    }
  },

  // Unified Sidebar Collapse/Expand Toggle
  toggleSidebar: function() {
    const wrapper = document.querySelector('.app-wrapper');
    const sidebar = document.getElementById('appSidebar');
    const collapseBtn = document.getElementById('sidebarCollapseToggle');
    const topbarBtn = document.getElementById('topbarSidebarToggle');

    if (window.innerWidth <= 992) {
      if (sidebar) sidebar.classList.toggle('mobile-open');
    } else {
      if (wrapper) {
        wrapper.classList.toggle('sidebar-collapsed');
        const isCollapsed = wrapper.classList.contains('sidebar-collapsed');
        localStorage.setItem('pf_sidebar_collapsed', isCollapsed ? '1' : '0');
        const titleText = isCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar';
        if (collapseBtn) collapseBtn.title = titleText;
        if (topbarBtn) topbarBtn.title = titleText;
      }
    }
  },

  // Attach global interactions
  attachGlobalEvents: function() {
    // 1. Sidebar collapse toggle (sidebar header button)
    const collapseBtn = document.getElementById('sidebarCollapseToggle');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleSidebar();
      });
    }

    // 2. Topbar sidebar toggle (top header button)
    const topbarBtn = document.getElementById('topbarSidebarToggle');
    if (topbarBtn) {
      topbarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleSidebar();
      });
    }

    // 3. Click anywhere on collapsed sidebar header to expand
    const sidebarHeader = document.querySelector('.sidebar-header');
    if (sidebarHeader) {
      sidebarHeader.addEventListener('click', (e) => {
        const wrapper = document.querySelector('.app-wrapper');
        if (wrapper && wrapper.classList.contains('sidebar-collapsed')) {
          this.toggleSidebar();
        }
      });
    }

    // Restore collapsed state if saved in localStorage (desktop only)
    if (localStorage.getItem('pf_sidebar_collapsed') === '1' && window.innerWidth > 992) {
      const wrapper = document.querySelector('.app-wrapper');
      if (wrapper) wrapper.classList.add('sidebar-collapsed');
      if (collapseBtn) collapseBtn.title = 'Expand Navigation Sidebar';
      if (topbarBtn) topbarBtn.title = 'Expand Navigation Sidebar';
    }

    // Close mobile sidebar when clicking outside
    document.addEventListener('click', (e) => {
      const sidebar = document.getElementById('appSidebar');
      const topbarBtn = document.getElementById('topbarSidebarToggle');
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        if (!sidebar.contains(e.target) && (!topbarBtn || !topbarBtn.contains(e.target))) {
          sidebar.classList.remove('mobile-open');
        }
      }
    });

    // 3. Notifications bell toggle
    const notifBtn = document.getElementById('notifBellBtn');
    const notifPanel = document.getElementById('notificationsFlyout');
    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifPanel.classList.toggle('show');
        const userMenu = document.getElementById('userDropdownMenu');
        if (userMenu) userMenu.classList.remove('show');
      });
    }

    // 4. User profile dropdown toggle
    const userBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userDropdownMenu');
    if (userBtn && userMenu) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('show');
        if (notifPanel) notifPanel.classList.remove('show');
      });
    }

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
      if (notifPanel) notifPanel.classList.remove('show');
      if (userMenu) userMenu.classList.remove('show');
    });

    // 5. Global Search Keyboard Shortcut (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) searchInput.focus();
      }
    });

    // Global Search Filter simulation
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = searchInput.value.trim().toLowerCase();
          if (val) {
            PondApp.toast(`Searching across PondFish databases for "${val}"...`, 'info');
            // If on bookings page or fish page, trigger local table filter
            const tableSearch = document.getElementById('tableSearchInput');
            if (tableSearch) {
              tableSearch.value = val;
              tableSearch.dispatchEvent(new Event('input'));
            }
          }
        }
      });
    }
  },

  // Modal open & close
  openModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      this.resolveIcons();
    }
  },

  closeModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  },

  openNewBookingModal: function() {
    this.openModal('newBookingModal');
  },

  // Handle Create Booking submit
  handleCreateBooking: function(e) {
    e.preventDefault();
    const customer = document.getElementById('modalCustomerSelect').value;
    const fish = document.getElementById('modalFishSelect').value;
    const qty = document.getElementById('modalQuantityInput').value;
    const date = document.getElementById('modalDeliveryDateInput').value;
    const pond = document.getElementById('modalPondSelect').value;
    const truck = document.getElementById('modalTruckSelect').value;
    const notes = document.getElementById('modalNotesInput').value;

    const newId = "BK-" + Math.floor(8500 + Math.random() * 500);

    const newRecord = {
      id: newId,
      customer: customer,
      contact: "ops@" + customer.toLowerCase().replace(/[^a-z]/g, '') + ".com",
      phone: "+1 (555) 492-" + Math.floor(1000 + Math.random() * 9000),
      customerType: "Commercial B2B",
      items: `${fish} (${qty}kg)`,
      bookingDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      deliveryDate: date ? date.replace('T', ' ') : '2026-11-06 06:00',
      pondSource: pond,
      amount: (parseFloat(qty) * 20.0).toFixed(2),
      bookingStatus: "Confirmed",
      paymentStatus: "Paid",
      assignedTruck: truck,
      assignedWorker: "Vikramaditya Roy",
      notes: notes || "Priority cold-chain batch."
    };

    if (window.PondData && PondData.bookings) {
      PondData.bookings.unshift(newRecord);
    }

    this.closeModal('newBookingModal');
    this.toast(`Booking #${newId} created successfully for ${customer}!`, 'success');

    // If on bookings page or dashboard, trigger refresh
    if (window.refreshBookingsTable) {
      window.refreshBookingsTable();
    }
  },

  // Side Drawer helpers
  openDrawer: function(title, contentHtml, footerHtml) {
    const backdrop = document.getElementById('globalDrawerBackdrop');
    const titleEl = document.getElementById('drawerTitle');
    const bodyEl = document.getElementById('drawerBody');
    const footerEl = document.getElementById('drawerFooter');

    if (titleEl) titleEl.innerHTML = title;
    if (bodyEl) bodyEl.innerHTML = contentHtml;
    if (footerEl && footerHtml) footerEl.innerHTML = footerHtml;

    if (backdrop) backdrop.classList.add('show');
    this.resolveIcons();
  },

  closeDrawer: function() {
    const backdrop = document.getElementById('globalDrawerBackdrop');
    if (backdrop) backdrop.classList.remove('show');
  },

  // Toast feedback
  toast: function(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'check';
    if (type === 'error') iconName = 'close';
    if (type === 'info') iconName = 'notifications';

    toast.innerHTML = `
      <div style="color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0284c7'}; width: 20px; height: 20px; flex-shrink: 0;">
        ${PondIcons.get(iconName)}
      </div>
      <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 3800);
  },

  // CSV Export utility
  exportTableToCSV: function(filename, headers, rows) {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.map(h => `"${h}"`).join(",") + "\r\n";

    rows.forEach(row => {
      csvContent += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.toast(`Exported ${filename} successfully`, 'success');
  },

  // Simulate logout
  simulateLogout: function() {
    this.toast("Signing out of PondFish Admin Session...", "info");
    setTimeout(() => {
      window.location.href = this.getBasePrefixes().root + "index.html";
    }, 1000);
  }
};

// Auto-run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  PondApp.init();
});


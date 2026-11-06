/**
 * PONDFISH ADMIN - EXECUTIVE DASHBOARD ANALYTICS & CHARTS
 * Powered by Chart.js with responsive data bindings and date-range filtering.
 */

const PondDashboard = {
  charts: {},

  init: function() {
    this.renderKPIs();
    this.initRevenueChart();
    this.initBookingStatusChart();
    this.initBookingTrendChart();
    this.initTransactionDistChart();
    this.renderTopFishList();
    this.renderRecentBookings();
    this.renderRecentTransactions();
    this.renderActivityTimeline();
    this.setupDateFilter();
  },

  // Render KPI cards with trend indicators
  renderKPIs: function() {
    const kpis = PondData.dashboard.kpis;
    const grid = document.getElementById('dashboardKpiGrid');
    if (!grid) return;

    grid.innerHTML = `
      <!-- Total Revenue -->
      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Total Revenue</span>
          <div class="kpi-icon-pill primary">${PondIcons.get('transactions')}</div>
        </div>
        <div class="kpi-value" id="kpiRevenueValue">${kpis.totalRevenue.value}</div>
        <div class="kpi-bottom">
          <span class="trend-badge up">↑ ${kpis.totalRevenue.change}</span>
          <span class="trend-period">${kpis.totalRevenue.period}</span>
        </div>
      </div>

      <!-- Total Bookings -->
      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Total Bookings</span>
          <div class="kpi-icon-pill info">${PondIcons.get('bookings')}</div>
        </div>
        <div class="kpi-value" id="kpiBookingsValue">${kpis.totalBookings.value}</div>
        <div class="kpi-bottom">
          <span class="trend-badge up">↑ ${kpis.totalBookings.change}</span>
          <span class="trend-period">${kpis.totalBookings.period}</span>
        </div>
      </div>

      <!-- Active Customers -->
      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Active Customers</span>
          <div class="kpi-icon-pill success">${PondIcons.get('customers')}</div>
        </div>
        <div class="kpi-value" id="kpiCustomersValue">${kpis.activeCustomers.value}</div>
        <div class="kpi-bottom">
          <span class="trend-badge up">↑ ${kpis.activeCustomers.change}</span>
          <span class="trend-period">${kpis.activeCustomers.period}</span>
        </div>
      </div>

      <!-- Total Transactions -->
      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Settled Transactions</span>
          <div class="kpi-icon-pill primary">${PondIcons.get('transactions')}</div>
        </div>
        <div class="kpi-value" id="kpiTxnValue">${kpis.totalTransactions.value}</div>
        <div class="kpi-bottom">
          <span class="trend-badge up">↑ ${kpis.totalTransactions.change}</span>
          <span class="trend-period">${kpis.totalTransactions.period}</span>
        </div>
      </div>

      <!-- Active Workers -->
      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Active On-Duty Staff</span>
          <div class="kpi-icon-pill info">${PondIcons.get('workers')}</div>
        </div>
        <div class="kpi-value" id="kpiWorkersValue">${kpis.activeWorkers.value} <span style="font-size: 14px; font-weight: 500; color: #64748b;">drivers & crew</span></div>
        <div class="kpi-bottom">
          <span class="trend-badge up">● 95.5%</span>
          <span class="trend-period">${kpis.activeWorkers.period}</span>
        </div>
      </div>

      <!-- Pending Bookings -->
      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Pending Dispatch</span>
          <div class="kpi-icon-pill warning">${PondIcons.get('truck')}</div>
        </div>
        <div class="kpi-value" id="kpiPendingValue">${kpis.pendingBookings.value}</div>
        <div class="kpi-bottom">
          <span class="trend-badge down">↓ 4.1%</span>
          <span class="trend-period">${kpis.pendingBookings.period}</span>
        </div>
      </div>
    `;
  },

  // 1. Revenue & Profit Area Chart
  initRevenueChart: function() {
    const canvas = document.getElementById('revenueOverviewChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(2, 132, 199, 0.28)');
    gradient.addColorStop(1, 'rgba(2, 132, 199, 0.01)');

    const data = PondData.dashboard.revenueMonthly;

    this.charts.revenue = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Monthly Revenue ($)',
            data: data.revenue,
            borderColor: '#0284c7',
            backgroundColor: gradient,
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointBackgroundColor: '#0284c7',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Cold-Chain Logistics Cost ($)',
            data: data.logisticsCost,
            borderColor: '#94a3b8',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 12,
              font: { family: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto', size: 12, weight: 600 },
              color: '#475569'
            }
          },
          tooltip: {
            backgroundColor: '#0b192c',
            titleFont: { size: 12, weight: 700 },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { size: 11.5, weight: 500 } }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: {
              color: '#64748b',
              font: { size: 11.5 },
              callback: function(val) { return '$' + (val / 1000) + 'k'; }
            }
          }
        }
      }
    });
  },

  // 2. Booking Status Distribution Doughnut Chart
  initBookingStatusChart: function() {
    const canvas = document.getElementById('bookingStatusChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const data = PondData.dashboard.bookingStatusDistribution;

    this.charts.bookingStatus = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
          backgroundColor: data.colors,
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              padding: 12,
              font: { family: '-apple-system, BlinkMacSystemFont, Segoe UI', size: 11.5, weight: 600 },
              color: '#475569'
            }
          },
          tooltip: {
            backgroundColor: '#0b192c',
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const val = context.parsed;
                const pct = ((val / total) * 100).toFixed(1);
                return ` ${context.label}: ${val.toLocaleString()} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  },

  // 3. Weekly Booking Trends by Channel
  initBookingTrendChart: function() {
    const canvas = document.getElementById('bookingTrendChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const data = PondData.dashboard.bookingTrends;

    this.charts.bookingTrend = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Commercial B2B',
            data: data.commercial,
            backgroundColor: '#0284c7',
            borderRadius: 6
          },
          {
            label: 'Retail Gourmet',
            data: data.retail,
            backgroundColor: '#38bdf8',
            borderRadius: 6
          },
          {
            label: 'Subscription Plans',
            data: data.subscription,
            backgroundColor: '#10b981',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 10,
              font: { family: '-apple-system, BlinkMacSystemFont, Segoe UI', size: 11.5, weight: 600 },
              color: '#475569'
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });
  },

  // 4. Transaction Status Distribution
  initTransactionDistChart: function() {
    const canvas = document.getElementById('transactionDistChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const data = PondData.dashboard.transactionDistribution;

    this.charts.txnDist = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
          backgroundColor: data.colors,
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 10, padding: 10, font: { size: 11, weight: 600 } }
          }
        }
      }
    });
  },

  // 5. Render Top Performing Fish Products
  renderTopFishList: function() {
    const container = document.getElementById('topFishListContainer');
    if (!container) return;

    let html = '';
    PondData.dashboard.topPerformingFish.forEach(fish => {
      html += `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 16px;">
              ${PondIcons.get('fish')}
            </div>
            <div>
              <div style="font-weight: 600; font-size: 13.5px; color: #0f172a;">${fish.name}</div>
              <div style="font-size: 12px; color: #64748b;">${fish.category} • ${fish.weightKg} harvested</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; font-size: 14px; color: #0f172a;">${fish.revenue}</div>
            <span class="trend-badge up" style="font-size: 11px;">${fish.growth}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // 6. Render Recent Bookings Table
  renderRecentBookings: function() {
    const tbody = document.getElementById('recentBookingsTbody');
    if (!tbody) return;

    const list = PondData.bookings.slice(0, 5);
    let html = '';

    list.forEach(b => {
      let badgeClass = 'status-confirmed';
      if (b.bookingStatus === 'Completed') badgeClass = 'status-completed';
      else if (b.bookingStatus === 'Pending') badgeClass = 'status-pending';
      else if (b.bookingStatus === 'Cancelled') badgeClass = 'status-cancelled';

      html += `
        <tr>
          <td><span class="cell-primary" style="font-family: monospace;">${b.id}</span></td>
          <td>
            <div class="cell-primary">${b.customer}</div>
            <div class="cell-secondary">${b.customerType}</div>
          </td>
          <td>${b.items}</td>
          <td>
            <div style="font-weight: 600; font-size: 13px;">$${b.amount.toFixed(2)}</div>
            <div class="cell-secondary">${b.paymentStatus}</div>
          </td>
          <td><span class="status-badge ${badgeClass}">${b.bookingStatus}</span></td>
          <td>
            <button type="button" class="btn btn-sm btn-secondary" onclick="PondDashboard.showBookingModal('${b.id}')" title="View Booking Details">
              View
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  // 7. Render Recent Transactions Table
  renderRecentTransactions: function() {
    const tbody = document.getElementById('recentTxnTbody');
    if (!tbody) return;

    const list = PondData.transactions.slice(0, 5);
    let html = '';

    list.forEach(t => {
      let badgeClass = 'status-successful';
      if (t.status === 'Pending') badgeClass = 'status-pending';
      else if (t.status === 'Failed') badgeClass = 'status-failed';

      html += `
        <tr>
          <td><span class="cell-primary" style="font-family: monospace;">${t.id}</span></td>
          <td>
            <div class="cell-primary">${t.customer}</div>
            <div class="cell-secondary">${t.method}</div>
          </td>
          <td style="font-weight: 700; color: #0f172a;">$${t.amount.toFixed(2)}</td>
          <td><span class="status-badge ${badgeClass}">${t.status}</span></td>
          <td style="font-size: 12px; color: #64748b;">${t.date}</td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  // 8. Render Activity Timeline
  renderActivityTimeline: function() {
    const container = document.getElementById('recentActivityFeed');
    if (!container) return;

    const logs = PondData.auditLogs.slice(0, 5);
    let html = '';

    logs.forEach(log => {
      let iconColor = '#0284c7';
      if (log.severity === 'Warning') iconColor = '#f59e0b';
      else if (log.severity === 'Security') iconColor = '#ef4444';

      html += `
        <div style="display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${iconColor}; margin-top: 6px; flex-shrink: 0;"></div>
          <div style="flex: 1;">
            <div style="font-size: 13px; font-weight: 600; color: #0f172a;">${log.action} <span style="font-weight: 400; color: #64748b;">by ${log.admin}</span></div>
            <div style="font-size: 12px; color: #475569; margin-top: 2px;">${log.details}</div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 3px;">${log.timestamp} • IP: ${log.ipAddress}</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Booking detail drawer helper
  showBookingModal: function(bookingId) {
    const booking = PondData.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-family: monospace; font-weight: 700; font-size: 15px; color: #0284c7;">${booking.id}</span>
            <span class="status-badge status-${booking.bookingStatus.toLowerCase()}">${booking.bookingStatus}</span>
          </div>
          <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${booking.customer}</div>
          <div style="font-size: 12.5px; color: #64748b; margin-top: 2px;">${booking.contact} • ${booking.phone}</div>
        </div>

        <div>
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">Harvest & Logistics Information</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px;">
            <div><strong>Pond Source:</strong><br><span style="color: #475569;">${booking.pondSource}</span></div>
            <div><strong>Assigned Reefer Truck:</strong><br><span style="color: #475569;">${booking.assignedTruck}</span></div>
            <div><strong>Assigned Driver:</strong><br><span style="color: #475569;">${booking.assignedWorker}</span></div>
            <div><strong>Delivery Slot:</strong><br><span style="color: #475569;">${booking.deliveryDate}</span></div>
          </div>
        </div>

        <div>
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">Ordered Fish Species & Value</h4>
          <div style="background: #f1f5f9; padding: 12px 14px; border-radius: 8px; font-size: 13.5px; margin-bottom: 8px;">
            <strong>Items:</strong> ${booking.items}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: 700; padding: 6px 0; border-top: 1px solid #e2e8f0;">
            <span>Total Value:</span>
            <span style="color: #0284c7;">$${booking.amount.toFixed(2)} (${booking.paymentStatus})</span>
          </div>
        </div>

        <div>
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 6px;">Handling Notes</h4>
          <p style="font-size: 12.5px; color: #475569; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px;">
            ${booking.notes}
          </p>
        </div>
      </div>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" onclick="PondApp.toast('Dispatch gate pass printed for ${booking.id}', 'info')">Print Gate Pass</button>
      <button type="button" class="btn btn-primary" onclick="PondDashboard.markBookingCompleted('${booking.id}')">Mark as Completed</button>
    `;

    PondApp.openDrawer(`Booking Summary #${booking.id}`, contentHtml, footerHtml);
  },

  // Mark booking completed demo
  markBookingCompleted: function(id) {
    const booking = PondData.bookings.find(b => b.id === id);
    if (booking) {
      booking.bookingStatus = 'Completed';
      booking.paymentStatus = 'Paid';
      PondApp.toast(`Booking #${id} marked as Completed & Delivered!`, 'success');
      PondApp.closeDrawer();
      this.renderRecentBookings();
    }
  },

  // Date range filter interaction
  setupDateFilter: function() {
    const select = document.getElementById('dashboardDateRange');
    if (!select) return;

    select.addEventListener('change', () => {
      const range = select.value;
      PondApp.toast(`Dashboard recalculated for: ${select.options[select.selectedIndex].text}`, 'info');

      // Random slight variance simulation for date filter
      const multiplier = range === '7days' ? 0.25 : range === 'quarter' ? 2.8 : range === 'ytd' ? 10.5 : 1.0;
      const kpiRev = document.getElementById('kpiRevenueValue');
      if (kpiRev) {
        kpiRev.textContent = '$' + Math.round(482950 * multiplier).toLocaleString();
      }

      // Update Chart
      if (this.charts.revenue) {
        const base = PondData.dashboard.revenueMonthly.revenue;
        this.charts.revenue.data.datasets[0].data = base.map(v => Math.round(v * (0.85 + Math.random() * 0.3)));
        this.charts.revenue.update();
      }
    });
  }
};

// Global hook for booking table refresh
window.refreshBookingsTable = function() {
  if (PondDashboard.renderRecentBookings) {
    PondDashboard.renderRecentBookings();
  }
};


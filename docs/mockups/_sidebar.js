/* Sidebar — single source of truth for all mockup pages.
 * Edit navigation here; every page picks it up automatically.
 * Works with file:// (no fetch needed). */
(function () {
  var sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  var page = location.pathname.split('/').pop() || 'index.html';

  var links = [
    { href: 'dashboard.html', icon: '\u268F', label: 'Dashboard' },
    { href: 'notifications.html', icon: '\uD83D\uDD14', label: 'Notifications', badge: '3' },
    { section: 'Widgets' },
    { href: 'interview-prep.html', icon: '\uD83D\uDCBB', label: 'Interview Prep' },
    { href: 'fitness.html', icon: '\uD83C\uDFCB\uFE0F', label: 'Fitness Tracker' },
    { href: 'budget.html', icon: '\uD83D\uDCB0', label: 'Budget Planner' },
    { section: 'Account' },
    { href: 'settings.html', icon: '\u2699\uFE0F', label: 'Settings' },
    { href: 'login.html', icon: '\u21A9\uFE0E', label: 'Sign out' }
  ];

  /* Sub-pages highlight their parent nav item */
  var parentMap = {
    'coding-problems.html': 'interview-prep.html',
    'coding-problem-form.html': 'interview-prep.html',
    'system-design.html': 'interview-prep.html',
    'workout-logger.html': 'fitness.html',
    'meal-diary.html': 'fitness.html',
    'body-weight.html': 'fitness.html',
    'budget-accounts.html': 'budget.html',
    'transactions.html': 'budget.html',
    'forecast.html': 'budget.html',
    'trip-budget.html': 'budget.html'
  };

  var activePage = parentMap[page] || page;

  var html = '<div class="brand"><span class="logo">\uD83C\uDFAF</span> Life Goals</div>\n<nav class="nav">\n';

  for (var i = 0; i < links.length; i++) {
    var item = links[i];
    if (item.section) {
      html += '  <div class="section-label">' + item.section + '</div>\n';
    } else {
      var cls = item.href === activePage ? ' class="active"' : '';
      var badge = item.badge
        ? ' <span style="margin-left:auto; background: var(--accent); color: white; font-size:10px; padding:2px 7px; border-radius:999px;">' + item.badge + '</span>'
        : '';
      html += '  <a' + cls + ' href="' + item.href + '"><span class="ico">' + item.icon + '</span> ' + item.label + badge + '</a>\n';
    }
  }

  html += '</nav>';
  sidebar.innerHTML = html;
})();

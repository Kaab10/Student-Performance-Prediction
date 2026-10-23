(function () {
  var search = document.getElementById('history-search');
  var table = document.getElementById('history-table');
  var matchCount = document.getElementById('match-count');
  var noMatch = document.getElementById('no-match');
  var chips = document.querySelectorAll('.filter-chip');
  if (!search || !table) return;

  var statusFilter = 'all';
  var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));

  function applyFilters() {
    var query = search.value.trim().toLowerCase();
    var visible = 0;

    rows.forEach(function (row) {
      var name = row.getAttribute('data-name') || '';
      var status = row.getAttribute('data-status') || '';
      var matchesQuery = !query || name.indexOf(query) !== -1;
      var matchesStatus = statusFilter === 'all' || status === statusFilter;
      var show = matchesQuery && matchesStatus;
      row.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });

    if (matchCount) {
      matchCount.textContent = visible + ' of ' + rows.length + ' shown';
    }
    if (noMatch) {
      noMatch.hidden = visible !== 0;
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      statusFilter = chip.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  search.addEventListener('input', applyFilters);
  applyFilters();
})();

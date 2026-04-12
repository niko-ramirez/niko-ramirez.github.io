(function () {
  'use strict';

  // ── Data ──────────────────────────────────────────────────────────────
  var REGIONS = {
    americas: { label: 'Americas', color: '#1B5299', center: [35, -95], zoom: 4 },
    europe: { label: 'Europe', color: '#8EB8E5', center: [44, 15], zoom: 5 },
    asia: { label: 'Asia', color: '#FFC107', center: [30, 105], zoom: 5 },
  };

  var travelLocations = [
    { name: "Los Angeles, California", coordinates: [34.0522, -118.2437], country: "USA", region: "americas", date: "Life", description: "Born and raised." },
    { name: "San Francisco, California", coordinates: [37.7749, -122.4194], country: "USA", region: "americas", date: "Summer 2022", description: "Explored the Golden Gate Bridge, Fisherman's Wharf, and the vibrant neighborhoods of the City by the Bay." },
    { name: "San Diego, California", coordinates: [32.7157, -117.1611], country: "USA", region: "americas", date: "Summer 2018", description: "Trip with friends." },
    { name: "San Luis Obispo, California", coordinates: [35.2828, -120.6595], country: "USA", region: "americas", date: "Winter 2018", description: "Trip to Jonathan's college with Kevin." },
    { name: "South Lake Tahoe, California", coordinates: [38.9936, -119.9589], country: "USA", region: "americas", date: "Summer 2016", description: "Fun road trip with friends." },
    { name: "Sacramento, California", coordinates: [38.5816, -121.4944], country: "USA", region: "americas", date: "Summer 2009", description: "All stars state championship." },
    { name: "Monterey Bay, California", coordinates: [36.6197, -121.8949], country: "USA", region: "americas", date: "2016", description: "Family trip up north." },
    { name: "Boston, Massachusetts", coordinates: [42.3555, -71.0565], country: "USA", region: "americas", date: "2018–2023", description: "Undergrad and grad school." },
    { name: "Cape Cod, Massachusetts", coordinates: [41.6593, -70.2992], country: "USA", region: "americas", date: "Spring 2018", description: "Trip with friends." },
    { name: "New York, New York", coordinates: [40.7128, -74.0060], country: "USA", region: "americas", date: "Winter 2022", description: "Experienced the energy of Times Square, walked through Central Park, and enjoyed the city's diverse food scene." },
    { name: "Ithaca, New York", coordinates: [42.4437, -76.4730], country: "USA", region: "americas", date: "Winter 2024", description: "Fun road trip with friends." },
    { name: "Buffalo, New York", coordinates: [42.8820, -78.8781], country: "USA", region: "americas", date: "Winter 2024", description: "Fun road trip with friends." },
    { name: "Homer, Alaska", coordinates: [59.6430, -151.5486], country: "USA", region: "americas", date: "Winter 2021", description: "Trip to Alaska." },
    { name: "Anchorage, Alaska", coordinates: [61.2181, -149.9003], country: "USA", region: "americas", date: "Winter 2021", description: "Trip to Alaska." },
    { name: "Omaha, Nebraska", coordinates: [41.2524, -95.9980], country: "USA", region: "americas", date: "Winter 2021", description: "Friend visit." },
    { name: "Kansas City, Missouri", coordinates: [39.0997, -94.5786], country: "USA", region: "americas", date: "Winter 2021", description: "Mac's wedding." },
    { name: "Louisville, Kentucky", coordinates: [38.2527, -85.7585], country: "USA", region: "americas", date: "Life", description: "Kentucky Derby." },
    { name: "Detroit, Michigan", coordinates: [42.3314, -83.0457], country: "USA", region: "americas", date: "Spring 2024", description: "Visited friends." },
    { name: "Miami, Florida", coordinates: [25.7617, -80.1918], country: "USA", region: "americas", date: "Spring 2023", description: "Spring break." },
    { name: "Key West, Florida", coordinates: [24.5551, -81.7818], country: "USA", region: "americas", date: "Spring 2023", description: "Spring break." },
    { name: "Myrtle Beach, South Carolina", coordinates: [33.6891, -79.0193], country: "USA", region: "americas", date: "Winter 2025", description: "Visited Jonathan." },
    { name: "Florence, South Carolina", coordinates: [34.1954, -79.7626], country: "USA", region: "americas", date: "Winter 2025", description: "Visited Jonathan." },
    { name: "Philadelphia, Pennsylvania", coordinates: [39.9526, -75.1652], country: "USA", region: "americas", date: "Winter 2019", description: "Thanksgiving trip with Lay and squad." },
    { name: "Washington, D.C.", coordinates: [38.9072, -77.0369], country: "USA", region: "americas", date: "Spring 2017", description: "Trip with family." },
    { name: "San Juan, Puerto Rico", coordinates: [18.4663, -66.1004], country: "Puerto Rico", region: "americas", date: "Spring 2022", description: "Spring break." },
    { name: "St John, USVI", coordinates: [18.3368, -64.7281], country: "USVI", region: "americas", date: "Spring 2022", description: "Spring break." },
    { name: "St Thomas, USVI", coordinates: [18.3381, -64.8941], country: "USVI", region: "americas", date: "Spring 2022", description: "Spring break." },
    { name: "Cancun, Mexico", coordinates: [21.1619, -86.8515], country: "Mexico", region: "americas", date: "Winter 2025", description: "Brad and Lay trip." },
    { name: "Valladolid, Mexico", coordinates: [20.6896, -88.2022], country: "Mexico", region: "americas", date: "Winter 2025", description: "Brad and Lay trip." },
    { name: "Florence, Italy", coordinates: [43.7696, 11.2558], country: "Italy", region: "europe", date: "Fall 2024", description: "GoLab conference." },
    { name: "Florence, Italy", coordinates: [43.7696, 11.2558], country: "Italy", region: "europe", date: "Summer 2025", description: "Jubilee 2025 with family." },
    { name: "Rome, Italy", coordinates: [41.9033, 12.4534], country: "Italy", region: "europe", date: "Fall 2024", description: "GoLab single-day trip." },
    { name: "Rome, Italy", coordinates: [41.9033, 12.4534], country: "Italy", region: "europe", date: "Summer 2025", description: "Jubilee 2025 with family." },
    { name: "Naples, Italy", coordinates: [40.8394, 14.2528], country: "Italy", region: "europe", date: "Summer 2025", description: "Visited Mt. Vesuvius and Pompeii with family." },
    { name: "Capri, Italy", coordinates: [40.5524, 14.2423], country: "Italy", region: "europe", date: "Summer 2025", description: "Visited during choppy waters with family." },
    { name: "Assisi, Italy", coordinates: [43.0731, 12.6184], country: "Italy", region: "europe", date: "Summer 2025", description: "Jubilee 2025 with family." },
    { name: "Venice, Italy", coordinates: [45.4408, 12.3155], country: "Italy", region: "europe", date: "Summer 2025", description: "Trip with family." },
    { name: "Cortina d'Ampezzo, Italy", coordinates: [46.5369, 12.1357], country: "Italy", region: "europe", date: "Summer 2025", description: "Dolomites with family." },
    { name: "London, England", coordinates: [51.5074, -0.0901], country: "England", region: "europe", date: "Spring 2025", description: "KubeCon conference." },
    { name: "Athens, Greece", coordinates: [37.9795, 23.7166], country: "Greece", region: "europe", date: "Summer 2023", description: "Family trip." },
    { name: "Mykonos, Greece", coordinates: [37.4416, 25.3312], country: "Greece", region: "europe", date: "Summer 2023", description: "Family trip." },
    { name: "Santorini, Greece", coordinates: [36.4196, 25.4384], country: "Greece", region: "europe", date: "Summer 2023", description: "Family trip." },
    { name: "Las Vegas, Nevada", coordinates: [36.1699, -115.1398], country: "USA", region: "americas", date: "Summer 2025", description: "Pi reunion." },
    { name: "Las Vegas, Nevada", coordinates: [36.1699, -115.1398], country: "USA", region: "americas", date: "Fall 2025", description: "Family trip for Dad's birthday." },
    { name: "Austin, Texas", coordinates: [30.2672, -97.7431], country: "USA", region: "americas", date: "Winter 2026", description: "Baker 1W trip." },
    { name: "Houston, Texas", coordinates: [29.7604, -95.3698], country: "USA", region: "americas", date: "Spring 2026", description: "Trip with Credit Guys." },
    { name: "Beijing, China", coordinates: [39.9042, 116.4074], country: "China", region: "asia", date: "Winter 2026", description: "Trip with Brad and Abi." },
    { name: "Chengdu, China", coordinates: [30.5728, 104.0668], country: "China", region: "asia", date: "Winter 2026", description: "Trip with Brad and Abi." },
    { name: "Leshan, China", coordinates: [29.5522, 103.7660], country: "China", region: "asia", date: "Winter 2026", description: "Trip with Brad and Abi." },
    { name: "Chongqing, China", coordinates: [29.5628, 106.5522], country: "China", region: "asia", date: "Winter 2026", description: "Trip with Brad and Abi." },
    { name: "Zhangjiajie, China", coordinates: [29.1274, 110.4798], country: "China", region: "asia", date: "Winter 2026", description: "Trip with Brad and Abi." },
    { name: "Wulong, China", coordinates: [29.3255, 107.7601], country: "China", region: "asia", date: "Winter 2026", description: "Trip with Brad and Abi." },
    { name: "Shanghai, China", coordinates: [31.2304, 121.4737], country: "China", region: "asia", date: "Winter 2026", description: "Trip with Brad and Abi." },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────
  function consolidate(locations) {
    var map = {};
    locations.forEach(function (loc) {
      var key = loc.name;
      if (!map[key]) {
        map[key] = { name: loc.name, coordinates: loc.coordinates, country: loc.country, region: loc.region, visits: [] };
      }
      map[key].visits.push({ date: loc.date, description: loc.description });
    });
    return Object.keys(map).map(function (k) { return map[k]; });
  }

  function computeStats(consolidated) {
    var countries = {};
    var continents = {};
    consolidated.forEach(function (loc) {
      countries[loc.country] = true;
      var regionToContinent = { europe: 'Europe', asia: 'Asia', americas: 'North America' };
      var cont = regionToContinent[loc.region] || 'Other';
      continents[cont] = true;
    });
    return {
      countries: Object.keys(countries).length,
      cities: consolidated.length,
      continents: Object.keys(continents).length,
    };
  }

  function yearFromDate(d) {
    var m = d.match(/(\d{4})/);
    return m ? parseInt(m[1], 10) : 0;
  }

  // ── Map setup ─────────────────────────────────────────────────────────
  var map = L.map('travel-map', {
    center: [30, 0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 14,
    scrollWheelZoom: false,
    worldCopyJump: false,
    maxBounds: [[-85, -200], [85, 200]],
    maxBoundsViscosity: 1.0,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  var consolidated = consolidate(travelLocations);
  var markers = [];
  var activeFilter = 'all';
  var activeMarkerEl = null;

  // ── Markers ───────────────────────────────────────────────────────────
  function makeIcon(region, active) {
    var color = REGIONS[region] ? REGIONS[region].color : '#1B5299';
    var size = active ? 16 : 11;
    var cls = 'travel-marker' + (active ? ' travel-marker--active' : '');
    return L.divIcon({
      className: cls,
      html: '<span style="width:' + size + 'px;height:' + size + 'px;background:' + color + '"></span>',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }

  consolidated.forEach(function (loc) {
    var marker = L.marker(loc.coordinates, { icon: makeIcon(loc.region, false) }).addTo(map);
    marker._travelData = loc;
    marker.on('click', function () { openDetail(loc, marker); });
    markers.push(marker);
  });

  // ── Detail panel ──────────────────────────────────────────────────────
  var panelEl = document.getElementById('detail-panel');
  var bodyEl = document.getElementById('detail-body');
  var closeBtn = document.getElementById('detail-close');

  function openDetail(loc, marker) {
    if (activeMarkerEl) activeMarkerEl.setIcon(makeIcon(activeMarkerEl._travelData.region, false));
    marker.setIcon(makeIcon(loc.region, true));
    activeMarkerEl = marker;

    var html = '<h3>' + loc.name + '</h3>';
    html += '<span class="detail-country">' + loc.country + '</span>';
    if (loc.visits.length === 1) {
      html += '<p class="detail-date">' + loc.visits[0].date + '</p>';
      html += '<p class="detail-desc">' + loc.visits[0].description + '</p>';
    } else {
      loc.visits.forEach(function (v) {
        html += '<div class="detail-visit"><p class="detail-date">' + v.date + '</p>';
        html += '<p class="detail-desc">' + v.description + '</p></div>';
      });
    }
    bodyEl.innerHTML = html;
    panelEl.classList.add('is-open');

    map.flyTo(loc.coordinates, Math.max(map.getZoom(), 6), { duration: 0.8 });
  }

  function closeDetail() {
    panelEl.classList.remove('is-open');
    if (activeMarkerEl) {
      activeMarkerEl.setIcon(makeIcon(activeMarkerEl._travelData.region, false));
      activeMarkerEl = null;
    }
  }

  closeBtn.addEventListener('click', closeDetail);

  // ── Filter pills ──────────────────────────────────────────────────────
  var filtersEl = document.getElementById('travel-filters');

  function renderFilters() {
    var html = '<button class="filter-pill is-active" data-region="all">All</button>';
    Object.keys(REGIONS).forEach(function (key) {
      html += '<button class="filter-pill" data-region="' + key + '">' +
        '<span class="filter-dot" style="background:' + REGIONS[key].color + '"></span>' +
        REGIONS[key].label + '</button>';
    });
    filtersEl.innerHTML = html;
    filtersEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-pill');
      if (!btn) return;
      var region = btn.dataset.region;
      if (region === activeFilter) return;
      activeFilter = region;
      filtersEl.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      applyFilter(region);
    });
  }

  function applyFilter(region) {
    closeDetail();
    markers.forEach(function (m) {
      var show = region === 'all' || m._travelData.region === region;
      if (show) { m.addTo(map); } else { map.removeLayer(m); }
    });
    if (region !== 'all' && REGIONS[region]) {
      map.flyTo(REGIONS[region].center, REGIONS[region].zoom, { duration: 0.8 });
    } else {
      map.flyTo([30, 0], 2, { duration: 0.8 });
    }
    renderTripList(region);
  }

  // ── Trip list ─────────────────────────────────────────────────────────
  var tripListEl = document.getElementById('trip-list');

  function renderTripList(region) {
    var filtered = consolidated.filter(function (loc) {
      return region === 'all' || loc.region === region;
    });

    var byYear = {};
    filtered.forEach(function (loc) {
      loc.visits.forEach(function (v) {
        var y = yearFromDate(v.date) || 'Other';
        if (!byYear[y]) byYear[y] = [];
        byYear[y].push({ loc: loc, visit: v });
      });
    });

    var years = Object.keys(byYear).sort(function (a, b) { return b - a; });

    var html = '<h2 class="trip-list-title">All Trips</h2>';
    years.forEach(function (year) {
      html += '<div class="trip-year-group">';
      html += '<h3 class="trip-year">' + year + '</h3>';
      html += '<div class="trip-cards">';
      byYear[year].forEach(function (item) {
        html += '<button class="trip-card" data-name="' + item.loc.name.replace(/"/g, '&quot;') + '">' +
          '<span class="trip-card-dot" style="background:' + (REGIONS[item.loc.region] ? REGIONS[item.loc.region].color : '#1B5299') + '"></span>' +
          '<div class="trip-card-info">' +
          '<strong>' + item.loc.name + '</strong>' +
          '<span>' + item.visit.date + '</span>' +
          '</div></button>';
      });
      html += '</div></div>';
    });

    tripListEl.innerHTML = html;

    tripListEl.addEventListener('click', function (e) {
      var card = e.target.closest('.trip-card');
      if (!card) return;
      var name = card.dataset.name;
      for (var i = 0; i < markers.length; i++) {
        if (markers[i]._travelData.name === name) {
          openDetail(markers[i]._travelData, markers[i]);
          document.getElementById('travel-map').scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    });
  }

  // ── Stats ─────────────────────────────────────────────────────────────
  function renderStats() {
    var s = computeStats(consolidated);
    document.getElementById('stat-countries').textContent = s.countries;
    document.getElementById('stat-cities').textContent = s.cities;
    document.getElementById('stat-continents').textContent = s.continents;
  }

  // ── Init ──────────────────────────────────────────────────────────────
  renderFilters();
  renderTripList('all');
  renderStats();
})();

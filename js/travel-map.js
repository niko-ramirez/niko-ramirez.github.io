// Initialize the map
const map = L.map('travel-map').setView([20, 0], 2);

// Add the tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Custom marker icon
const customIcon = L.icon({
    iconUrl: '../references/images/map_icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Sample travel locations data
const travelLocations = [
    {
        name: "San Francisco, California",
        coordinates: [37.7749, -122.4194],
        date: "Summer 2022",
        description: "Walked along the Seine River, visited the Eiffel Tower, and explored the rich art and culture of the City of Light."
    },
    {
        name: "New York, USA",
        coordinates: [40.7128, -74.0060],
        date: "Winter 2022",
        description: "Experienced the energy of Times Square, walked through Central Park, and enjoyed the city's diverse food scene."
    },
    {
        name: "Boston, Massachusetts",
        coordinates: [42.3555, -71.0565],
        date: "2018-2023",
        description: "Undergrad and grad school."
    },
    {
        name: "Homer, Alaska",
        coordinates: [59.6430, -151.5486],
        date: "Winter 2021",
        description: "Undergrad and grad school."
    },
    {
        name: "Achorage, Alaska",
        coordinates: [61.2181, -149.9003],
        date: "Winter 2021",
        description: "Undergrad and grad school."
    },
    {
        name: "Florence, Italy",
        coordinates: [43.7696, 11.2558],
        date: "Fall 2024",
        description: "Golab Conference."
    },
    {
        name: "London, England",
        coordinates: [51.5074, -0.0901],
        date: "Spring 2025",
        description: "KubeCon Conference."
    },
    {
        name: "Omaha, Nebraska",
        coordinates: [41.2524, -95.9980],
        date: "Winter 2021",
        description: "Friend Visit."
    },
    {
        name: "Kansas City, Missouri",
        coordinates: [39.0997, -94.5786],
        date: "Winter 2021",
        description: "Mac's Wedding."
    },
    {
        name: "Los Angeles, California",
        coordinates: [34.0522, -118.2437],
        date: "Spring 2024",
        description: "Born and Raised."
    },
    {
        name: "Louisville, Kentucky",
        coordinates: [38.2527, -85.7585],
        date: "Life",
        description: "Kentucky Derby."
    },
    {
        name: "San Juan, Puerto Rico",
        coordinates: [18.4663, -66.1004],
        date: "Spring 2022",
        description: "Spring Break."
    },
    {
        name: "St John, US Virgin Islands",
        coordinates: [18.3368, -64.7281],   
        date: "Spring 2022",
        description: "Spring Break."
    },
    {
        name: "St Thomas, US Virgin Islands",
        coordinates: [18.3381, -64.8941],  
        date: "Spring 2022",
        description: "Spring Break."
    },
    {
        name: "Miami, Florida",
        coordinates: [25.7617, -80.1918],   
        date: "Spring 2023",
        description: "Spring Break."
    },
    {
        name: "Key West, Florida",
        coordinates: [24.5551, -81.7818],   
        date: "Spring 2023",
        description: "Spring Break."
    },
    {
        name: "Ithaca, New York",
        coordinates: [42.4437, -76.4730],   
        date: "Winter 2024",
        description: "Fun road trip with friends."
    },
    {
        name: "Buffalo, New York",
        coordinates: [42.8820, -78.8781],   
        date: "Winter 2024",
        description: "Fun road trip with friends."
    },
    {
        name: "South Lake Tahoe, California",
        coordinates: [38.9936, -119.9589],   
        date: "Summer 2016",
        description: "Fun road trip with friends."
    },
    {
        name: "Sacramento, California",
        coordinates: [38.5816, -121.4944],   
        date: "Summer 2009",
        description: "All stars state championship."
    },
    {
        name: "Detroit, Michigan",
        coordinates: [42.3314, -83.0457],   
        date: "Spring 2024",
        description: "Visited friends."
    },
    {
        name: "Athens, Greece",
        coordinates: [37.9795, 23.7166],   
        date: "Summer 2023",
        description: "Family trip."
    },
    {
        name: "Mykonos, Greece",
        coordinates: [37.4416, 25.3312],   
        date: "Summer 2023",
        description: "Family trip."
    },
    {
        name: "Santorini, Greece",
        coordinates: [36.4196, 25.4384],   
        date: "Summer 2023",
        description: "Family trip."
    },
    {
        name: "Myrtle Beach, South Carolina",
        coordinates: [33.6891, -79.0193],   
        date: "Winter 2025",
        description: "Visted Jonathan."
    },
    {
        name: "Florence, South Carolina",
        coordinates: [34.1954, -81.1637],   
        date: "Winter 2025",
        description: "Visted Jonathan."
    },
    {
        name: "Cancun, Mexico",
        coordinates: [21.1619, -86.8515],   
        date: "Winter 2025",
        description: "Brad and Lay Trip."
    },
    {
        name: "Valladolid, Mexico",
        coordinates: [20.6896, -88.2022],
        date: "Winter 2025",
        description: "Brad and Lay Trip."
    },
    {
        name: "Philadelphia, Pennsylvania",
        coordinates: [39.9526, -75.1652],   
        date: "Winter 2019",
        description: "ThanksgivingTrip with Lay and Squad."
    },
    {
        name: "Cape Cod, Massachusetts",
        coordinates: [41.6593, -70.2992],   
        date: "Spring 2018",
        description: "Trip with friends."
    },
    {
        name: "Washington, D.C.",
        coordinates: [38.9072, -77.0369],   
        date: "Spring 2017",
        description: "Trip with family."
    },
    {
        name: "San Luis Obispo, California",
        coordinates: [35.2828, -120.6595],   
        date: "Winter 2018",
        description: "Trip to Jonathan college with Kevin."
    },
    {
        name: "San Diego, California",
        coordinates: [32.7157, -117.1611],   
        date: "Summer 2018",
        description: "Trip with friends."
    },
    {
        name: "Monterey Bay, California",
        coordinates: [36.6197, -121.8949],   
        date: "2016",
        description: "Family Trip up north."
    },
    {
        name: "Rome, Italy",
        coordinates: [41.9033, 12.4534],   
        date: "Fall 2024",
        description: "Golab single day trip."
    },
    {
        name: "Naples, Italy",
        coordinates: [40.8394, 14.2528],   
        date: "Summer 2025",
        description: "Visted Mt. Vesuvius and Pompeii with family."
    },
    {
        name: "Capri, Italy",
        coordinates: [40.5524, 14.2423],   
        date: "Summer 2025",
        description: "Visted during choppy waters with family."
    },  
    {
        name: "Florence, Italy",
        coordinates: [43.7696, 11.2558],   
        date: "Summer 2025",
        description: "Jubilee 2025 with family."
    },
    {
        name: "Rome, Italy",
        coordinates: [41.9033, 12.4534],   
        date: "Summer 2025",
        description: "Jubilee 2025 with family."
    },
    {
        name: "Assisi, Italy",
        coordinates: [43.0731, 12.6184],   
        date: "Summer 2025",
        description: "Jubilee 2025 with family."
    },
    {
        name: "Venice, Italy",
        coordinates: [45.4408, 12.3155],   
        date: "Summer 2025",
        description: "Trip with family."
    },
    {
        name: "Cortina d'Ampezzo, Italy",
        coordinates: [46.2500, 12.5667],   
        date: "Summer 2025",
        description: "Dolomites with family."
    },




    
    // Add more locations as needed
];

// Add markers for each location
travelLocations.forEach(location => {
    const marker = L.marker(location.coordinates, { icon: customIcon }).addTo(map);
    
    // Create popup content
    const popupContent = `
        <div class="location-popup">
            <h3>${location.name}</h3>
            <p>${location.description}</p>
            <span class="visit-date">Visited: ${location.date}</span>
        </div>
    `;
    
    marker.bindPopup(popupContent);
});

// Add click event to markers
map.on('click', function(e) {
    // You can add additional functionality here if needed
});

// Update stats based on actual data
document.addEventListener('DOMContentLoaded', function() {
    // Calculate unique countries visited (excluding US states)
    const countriesVisited = new Set(travelLocations.map(loc => {
        const parts = loc.name.split(',');
        const location = parts[parts.length - 1].trim();
        // List of US states to exclude from country count
        const usStates = [
            'California', 'Massachusetts', 'Alaska', 'Nebraska', 'Missouri',
            'Kentucky', 'Florida', 'New York', 'Michigan', 'South Carolina',
            'Pennsylvania', 'D.C.', 'US Virgin Islands'
        ];
        // Only count if it's not a US state
        return usStates.includes(location) ? null : location;
    }).filter(Boolean)).size;

    // Calculate total cities explored
    const citiesExplored = travelLocations.length;

    // Calculate continents visited
    const continentMap = {
        'California': 'North America',
        'Massachusetts': 'North America',
        'Alaska': 'North America',
        'Nebraska': 'North America',
        'Missouri': 'North America',
        'Kentucky': 'North America',
        'Florida': 'North America',
        'New York': 'North America',
        'Michigan': 'North America',
        'South Carolina': 'North America',
        'Pennsylvania': 'North America',
        'District of Columbia': 'North America',
        'Italy': 'Europe',
        'England': 'Europe',
        'Greece': 'Europe',
        'Puerto Rico': 'North America',
        'US Virgin Islands': 'North America',
        'Mexico': 'North America'
    };

    const continents = new Set(travelLocations.map(loc => {
        const parts = loc.name.split(',');
        const location = parts[parts.length - 1].trim();
        return continentMap[location] || 'Unknown';
    })).size;

    // Update the stats in the DOM
    document.querySelectorAll('.stat-number')[0].textContent = countriesVisited;
    document.querySelectorAll('.stat-number')[1].textContent = citiesExplored;
    document.querySelectorAll('.stat-number')[2].textContent = continents;
}); 
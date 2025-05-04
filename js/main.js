'use strict';

// Modern JavaScript with ES6+ features
const projects = [
	{
		id: "projectTykOperator",
		url: "https://github.com/TykTechnologies/tyk-operator"
	},
	{
		id: "projectCloudixia",
		url: "https://ajtima.com"
	},
	{
		id: "projectServ",
		url: "https://www.getserv.io"
	},
	{
		id: "projectSedkodes",
		url: "https://www.youtube.com/channel/UCXR-k7wwwhdovpXXkRitJ_g"
	}
];

// Initialize projects with modern event handling
const initializeProjects = () => {
	projects.forEach(project => {
		const projectElement = document.getElementById(project.id);
		if (projectElement) {
			projectElement.style.cursor = 'pointer';
			projectElement.addEventListener('click', () => {
				window.open(project.url, '_blank');
			});
		}
	});
};

// Mobile detection using modern feature detection
const isMobile = {
	any: () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
};

// Modern animation handling
const setupAnimations = () => {
	const animateElements = document.querySelectorAll('.animate-box');
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animated');
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.1
	});

	animateElements.forEach(element => observer.observe(element));
};

// Responsive menu handling
const setupMenu = () => {
	const menuToggle = document.querySelector('.js-colorlib-nav-toggle');
	const body = document.body;

	if (menuToggle) {
		menuToggle.addEventListener('click', (e) => {
			e.preventDefault();
			body.classList.toggle('offcanvas');
			menuToggle.classList.toggle('active');
		});
	}

	// Close menu when clicking outside
	document.addEventListener('click', (e) => {
		const container = document.querySelector('#colorlib-aside, .js-colorlib-nav-toggle');
		if (!container.contains(e.target) && body.classList.contains('offcanvas')) {
			body.classList.remove('offcanvas');
			menuToggle.classList.remove('active');
		}
	});
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	initializeProjects();
	setupAnimations();
	setupMenu();
});

// Handle window resize with debounce
let resizeTimer;
window.addEventListener('resize', () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		// Handle any responsive layout changes here
	}, 250);
});

// Add loading state for images
document.addEventListener('DOMContentLoaded', () => {
	const images = document.querySelectorAll('img[data-src]');
	const imageObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.removeAttribute('data-src');
				imageObserver.unobserve(img);
			}
		});
	});

	images.forEach(img => imageObserver.observe(img));
});

// Projects Page Functionality
document.addEventListener('DOMContentLoaded', function() {
	const searchInput = document.getElementById('projectSearch');
	const filterButtons = document.querySelectorAll('.filter-btn');
	const projectItems = document.querySelectorAll('.project-item');

	// Search functionality
	if (searchInput) {
		searchInput.addEventListener('input', function() {
			const searchTerm = this.value.toLowerCase();
			const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

			projectItems.forEach(item => {
				const title = item.querySelector('h3').textContent.toLowerCase();
				const description = item.querySelector('.project-description').textContent.toLowerCase();
				const category = item.dataset.category;

				const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
				const matchesFilter = activeFilter === 'all' || category === activeFilter;

				if (matchesSearch && matchesFilter) {
					item.style.display = '';
				} else {
					item.style.display = 'none';
				}
			});
		});
	}

	// Filter functionality
	if (filterButtons.length) {
		filterButtons.forEach(button => {
			button.addEventListener('click', function() {
				// Remove active class from all buttons
				filterButtons.forEach(btn => btn.classList.remove('active'));
				// Add active class to clicked button
				this.classList.add('active');

				const filter = this.dataset.filter;
				const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

				projectItems.forEach(item => {
					const title = item.querySelector('h3').textContent.toLowerCase();
					const description = item.querySelector('.project-description').textContent.toLowerCase();
					const category = item.dataset.category;

					const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
					const matchesFilter = filter === 'all' || category === filter;

					if (matchesSearch && matchesFilter) {
						item.style.display = '';
					} else {
						item.style.display = 'none';
					}
				});
			});
		});
	}
});
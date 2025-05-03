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

// Smooth scrolling with modern Intersection Observer
const setupNavigation = () => {
	const sections = document.querySelectorAll('section[data-section]');
	const navLinks = document.querySelectorAll('#navbar a');
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const sectionId = entry.target.dataset.section;
				navLinks.forEach(link => {
					link.classList.toggle('active', link.dataset.navSection === sectionId);
				});
			}
		});
	}, {
		threshold: 0.5
	});

	sections.forEach(section => observer.observe(section));

	// Smooth scroll for navigation links
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetSection = document.querySelector(`[data-section="${link.dataset.navSection}"]`);
			if (targetSection) {
				targetSection.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});
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
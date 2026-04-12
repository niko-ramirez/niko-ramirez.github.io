'use strict';

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

const setupLazyImages = () => {
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
};

const setupProjectSearch = () => {
	const searchInput = document.getElementById('projectSearch');
	const filterButtons = document.querySelectorAll('.filter-btn');
	const projectItems = document.querySelectorAll('.project-item');

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

	if (filterButtons.length) {
		filterButtons.forEach(button => {
			button.addEventListener('click', function() {
				filterButtons.forEach(btn => btn.classList.remove('active'));
				this.classList.add('active');

				const filter = this.dataset.filter;
				const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

				projectItems.forEach(item => {
					const title = item.querySelector('h3').textContent.toLowerCase();
					const description = item.querySelector('.project-description').textContent.toLowerCase();
					const category = item.dataset.category;

					const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
					const matchesFilter = filter === 'all' || category.includes(filter);

					if (matchesSearch && matchesFilter) {
						item.style.display = '';
					} else {
						item.style.display = 'none';
					}
				});
			});
		});
	}
};

const setupMobileMenu = () => {
	const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
	const mobileMenu = document.querySelector('.mobile-menu');
	const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
	const mobileMenuClose = document.querySelector('.mobile-menu-close');
	const body = document.body;

	function toggleMenu() {
		mobileMenuBtn.classList.toggle('active');
		mobileMenu.classList.toggle('active');
		mobileMenuOverlay.classList.toggle('active');
		body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
	}

	if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
		mobileMenuBtn.addEventListener('click', toggleMenu);
		mobileMenuOverlay.addEventListener('click', toggleMenu);

		if (mobileMenuClose) {
			mobileMenuClose.addEventListener('click', toggleMenu);
		}

		const mobileMenuLinks = mobileMenu.querySelectorAll('a');
		mobileMenuLinks.forEach(link => {
			link.addEventListener('click', () => {
				if (mobileMenu.classList.contains('active')) {
					toggleMenu();
				}
			});
		});

		window.addEventListener('resize', () => {
			if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
				toggleMenu();
			}
		});
	}
};

document.addEventListener('DOMContentLoaded', () => {
	setupAnimations();
	setupLazyImages();
	setupProjectSearch();
	setupMobileMenu();
});

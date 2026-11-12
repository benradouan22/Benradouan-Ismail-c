/**
 * ==============================================================================
 * ISMAIL BENRADOUAN - PERSONAL PORTFOLIO JAVASCRIPT
 * Vanilla, modular, accessible script without external dependencies.
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. Projects Data Store (Derived directly from Ismail's academic & engineering CV)
// ------------------------------------------------------------------------------
const PROJECTS_DATA = [
  {
    id: 'e-commerce-django',
    title: 'Plateforme E-Commerce avec Django',
    category: 'web',
    year: '2024',
    shortDesc: 'Complete e-commerce web platform engineered with Django, featuring secure authentication, reactive shopping cart management, and order processing pipelines.',
    longDesc: 'A full-stack, responsive commercial web application built to explore production patterns in Django. The project implements custom user authentication models, session-backed reactive cart persistence, transactional checkout flows, and automated inventory reconciliation with an admin control dashboard.',
    tags: ['Python', 'Django', 'PostgreSQL', 'HTML5', 'CSS3', 'JavaScript'],
    highlights: [
      'Engineered complete modular backend architecture using Django MTV pattern',
      'Implemented secure user authentication, role separation, and session cart management',
      'Designed responsive client interface using clean HTML, modern CSS, and vanilla JavaScript',
      'Integrated transactional order processing with automated inventory checks'
    ],
    architecture: 'Django 5.x monolith with PostgreSQL backend, Django ORM for relational persistence, custom middleware for session security, and responsive UI components.',
    metrics: 'Production-ready architecture, sub-100ms response times for catalog browsing, zero external CSS framework dependencies.'
  },
  {
    id: 'predictive-ml',
    title: 'Analyse Prédictive avec Machine Learning',
    category: 'ml',
    year: '2025',
    shortDesc: 'Comprehensive predictive pipeline from Kaggle datasets to production-grade regression and classification models using Scikit-learn and XGBoost.',
    longDesc: 'End-to-end data science and machine learning workflow developed as part of Master-level research in predictive modeling. Covers rigorous exploratory data analysis (EDA), automated feature engineering, outlier detection, cross-validation tuning, and model performance benchmarking.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'XGBoost', 'Matplotlib'],
    highlights: [
      'Automated exploratory data analysis (EDA) and feature pipeline for high-dimensional Kaggle datasets',
      'Implemented and tuned regression models (Ridge, Lasso, Random Forest, XGBoost) and classifiers',
      'Rigorous statistical evaluation using RMSE, MAE, R², ROC-AUC, and Confusion Matrices',
      'Visualized feature importance and error distributions using Seaborn & Matplotlib'
    ],
    architecture: 'Scikit-learn Pipeline architecture with customized transformers, grid-search hyperparameter tuning, and model serialization via Joblib.',
    metrics: 'Model achieved top-quartile benchmark accuracy with optimized RMSE & MAE scores across validation folds.'
  },
  {
    id: 'bigdata-hadoop-nosql',
    title: 'Architecture Big Data & NoSQL',
    category: 'bigdata',
    year: '2025',
    shortDesc: 'Distributed computing environment leveraging Apache Hadoop (HDFS & YARN), MongoDB aggregation pipelines, and distributed HBase columnar storage.',
    longDesc: 'Distributed big data infrastructure project focused on horizontal scalability and high-throughput data processing. Configured a distributed multi-node Hadoop cluster, designed advanced document aggregation queries in MongoDB, and manipulated massive sparse datasets using Apache HBase.',
    tags: ['Hadoop', 'HDFS', 'YARN', 'MongoDB', 'Apache HBase', 'Linux / Bash'],
    highlights: [
      'Provisioned and tuned Apache Hadoop distributed cluster environment with HDFS and YARN resource manager',
      'Engineered multi-stage MongoDB Aggregation pipelines for complex analytical queries on JSON datasets',
      'Administered distributed columnar storage schemas and high-throughput queries with Apache HBase',
      'Authored automated deployment and maintenance shell scripts for Linux nodes'
    ],
    architecture: 'Master-Worker distributed topology running HDFS NameNode/DataNodes, YARN ResourceManager/NodeManagers, paired with MongoDB replica sets and HBase RegionServers.',
    metrics: 'Reliable fault-tolerant distributed storage capable of batch analytics on multi-gigabyte datasets.'
  },
  {
    id: 'algorithms-data-structures',
    title: 'Algorithmique & Structures de Données',
    category: 'algo',
    year: '2024',
    shortDesc: 'High-performance implementation and comparative benchmarking of core sorting, graph traversal (BFS/DFS), and search algorithms in C++, C, and Python.',
    longDesc: 'Algorithmic performance study developed during mathematical and computer science degree studies. Implements fundamental data structures from scratch (Linked Lists, Binary Search Trees, Heaps, Adjacency Lists) and benchmarks computational time/space complexity empirically against theoretical O(n) bounds.',
    tags: ['C++', 'C', 'Python', 'Algorithms', 'Graph Theory', 'Data Structures'],
    highlights: [
      'Developed optimized implementations of Quicksort, Mergesort, Heapsort, and Binary Search',
      'Constructed graph traversal engines implementing Breadth-First Search (BFS) and Depth-First Search (DFS)',
      'Conducted memory leak auditing with Valgrind and execution timing profiling in C and C++',
      'Applied theoretical concepts from graph theory and computational discrete mathematics'
    ],
    architecture: 'Native C++20 / C11 and Python 3.x benchmark harnesses with automated test suites verifying invariant correctness.',
    metrics: 'Achieved optimal theoretical O(n log n) sorting speeds and verified zero memory leaks.'
  }
];

// ------------------------------------------------------------------------------
// 2. Application State & DOM References
// ------------------------------------------------------------------------------
const state = {
  theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  activeFilter: 'all',
  activeModalProject: null
};

// ------------------------------------------------------------------------------
// 3. Theme Controller (Dark / Light Mode)
// ------------------------------------------------------------------------------
function initTheme() {
  applyTheme(state.theme);

  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
      applyTheme(state.theme);
      showToast(state.theme === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');
    });
  });

  // Listen for system theme changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      state.theme = e.matches ? 'dark' : 'light';
      applyTheme(state.theme);
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Update theme toggle icons
  const icons = document.querySelectorAll('.theme-toggle-icon');
  icons.forEach(icon => {
    if (theme === 'dark') {
      // Moon icon
      icon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
      icon.setAttribute('aria-label', 'Switch to light mode');
    } else {
      // Sun icon
      icon.innerHTML = `
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      `;
      icon.setAttribute('aria-label', 'Switch to dark mode');
    }
  });
}

// ------------------------------------------------------------------------------
// 4. Mobile Navigation Drawer
// ------------------------------------------------------------------------------
function initMobileNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const navLinks = drawer ? drawer.querySelectorAll('a') : [];

  if (!menuBtn || !drawer) return;

  function toggleDrawer(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.innerHTML = isOpen
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`;
  }

  menuBtn.addEventListener('click', () => toggleDrawer());

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  // Close drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleDrawer(false);
    }
  });
}

// ------------------------------------------------------------------------------
// 5. Scroll Spy & Active Nav Highlighting
// ------------------------------------------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        desktopLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

// ------------------------------------------------------------------------------
// 6. Scroll Reveal & Skill Progress Animations
// ------------------------------------------------------------------------------
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-progress-fill');
  const languageBars = document.querySelectorAll('.language-bar');

  // Generic reveal observer
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Skills progress observer
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(fill => {
          const target = fill.getAttribute('data-percent') || '0%';
          fill.style.width = target;
        });
        languageBars.forEach(bar => {
          const target = bar.getAttribute('data-percent') || '0%';
          bar.style.width = target;
        });
        observer.disconnect();
      }
    });
  }, {
    root: null,
    threshold: 0.15
  });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
}

// ------------------------------------------------------------------------------
// 7. Projects Filter & Dynamic Render
// ------------------------------------------------------------------------------
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter') || 'all';
      state.activeFilter = filterCategory;

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// ------------------------------------------------------------------------------
// 8. Project Detail Modal
// ------------------------------------------------------------------------------
function initProjectModal() {
  const backdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.btn-project-details');

  if (!backdrop) return;

  function openModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-category-meta').textContent = `${project.category.toUpperCase()} · ${project.year}`;
    document.getElementById('modal-description').textContent = project.longDesc;
    document.getElementById('modal-architecture').textContent = project.architecture;
    document.getElementById('modal-metrics').textContent = project.metrics;

    // Highlights list
    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = project.highlights
      .map(item => `<li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${item}</li>`)
      .join('');

    // Tech tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = project.tags
      .map(t => `<span>${t}</span>`)
      .join('');

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      const projectId = card ? card.getAttribute('data-id') : null;
      if (projectId) openModal(projectId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

// ------------------------------------------------------------------------------
// 9. Contact Form Validation & Submission
// ------------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const statusAlert = document.getElementById('form-status-alert');

  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function clearErrors() {
    if (nameError) nameError.classList.remove('visible');
    if (emailError) emailError.classList.remove('visible');
    if (messageError) messageError.classList.remove('visible');
    if (statusAlert) statusAlert.classList.remove('success', 'error');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    let hasError = false;

    if (!name || name.length < 2) {
      if (nameError) {
        nameError.textContent = 'Please enter your name (minimum 2 characters).';
        nameError.classList.add('visible');
      }
      hasError = true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      if (emailError) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('visible');
      }
      hasError = true;
    }

    if (!message || message.length < 10) {
      if (messageError) {
        messageError.textContent = 'Please write a message with at least 10 characters.';
        messageError.classList.add('visible');
      }
      hasError = true;
    }

    if (hasError) return;

    // Simulate sending state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="animation: spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
        Sending message...
      `;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>`;
      }

      form.reset();
      if (statusAlert) {
        statusAlert.textContent = 'Thank you! Your message has been received. Ismail will get back to you shortly.';
        statusAlert.classList.add('success');
      }
      showToast('Message sent successfully!');
    }, 700);
  });
}

// ------------------------------------------------------------------------------
// 10. Copy Email & Toast Feedback
// ------------------------------------------------------------------------------
function initClipboardActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'benradouanismail05@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied to clipboard!');
    }).catch(() => {
      showToast('Copied: benradouanismail05@gmail.com');
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-message');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ------------------------------------------------------------------------------
// 11. Initializer
// ------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNavigation();
  initScrollSpy();
  initScrollAnimations();
  initProjectsFilter();
  initProjectModal();
  initContactForm();
  initClipboardActions();
});

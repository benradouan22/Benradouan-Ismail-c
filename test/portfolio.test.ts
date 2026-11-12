import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  validateContactForm,
  getNextTheme,
  Project
} from '../src/portfolio-logic.js';

const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Plateforme E-commerce avec Django',
    category: 'web',
    year: 2024,
    description: 'Django web application with auth and order processing',
    tags: ['Django', 'Python', 'HTML/CSS/JS'],
    features: ['Authentication', 'Shopping Cart', 'Responsive UI']
  },
  {
    id: 'p2',
    title: 'Analyse Prédictive avec Machine Learning',
    category: 'ml',
    year: 2025,
    description: 'Exploratory data analysis and predictive modeling',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
    features: ['EDA', 'Regression', 'Classification']
  },
  {
    id: 'p3',
    title: 'Architecture Big Data et NoSQL',
    category: 'bigdata',
    year: 2025,
    description: 'Hadoop distributed environment and MongoDB pipeline',
    tags: ['Hadoop', 'MongoDB', 'HBase'],
    features: ['HDFS/YARN', 'Aggregation Pipelines', 'HBase']
  },
  {
    id: 'p4',
    title: 'Algorithmique et Structures de Données',
    category: 'algo',
    year: 2024,
    description: 'Quicksort, Mergesort, and Graph Traversal algorithms',
    tags: ['C++', 'C', 'Python'],
    features: ['Sorting', 'BFS/DFS', 'Binary Search']
  }
];

test('filterProjects returns all projects when category is "all"', () => {
  const result = filterProjects(mockProjects, 'all');
  assert.equal(result.length, 4);
});

test('filterProjects filters properly by specific category', () => {
  const mlProjects = filterProjects(mockProjects, 'ml');
  assert.equal(mlProjects.length, 1);
  assert.equal(mlProjects[0].title, 'Analyse Prédictive avec Machine Learning');

  const bigDataProjects = filterProjects(mockProjects, 'bigdata');
  assert.equal(bigDataProjects.length, 1);
  assert.equal(bigDataProjects[0].category, 'bigdata');
});

test('validateContactForm rejects empty submissions', () => {
  const result = validateContactForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test('validateContactForm rejects invalid email address', () => {
  const result = validateContactForm({
    name: 'Ismail',
    email: 'not-an-email',
    message: 'Hello, this is a valid message over 10 chars.'
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, 'Please provide a valid email address.');
  assert.equal(result.errors.name, undefined);
  assert.equal(result.errors.message, undefined);
});

test('validateContactForm accepts valid form submission', () => {
  const result = validateContactForm({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    message: 'Interested in collaborating on a Machine Learning project.'
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('getNextTheme toggles correctly', () => {
  assert.equal(getNextTheme('dark'), 'light');
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme(null), 'dark');
});

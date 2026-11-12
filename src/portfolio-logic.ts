/**
 * Pure portfolio utility and helper functions for testing and verification
 */

export interface Project {
  id: string;
  title: string;
  category: 'all' | 'ml' | 'bigdata' | 'web' | 'algo';
  year: number;
  description: string;
  tags: string[];
  features: string[];
  metrics?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

/**
 * Filter projects by category
 */
export function filterProjects(projects: Project[], category: string): Project[] {
  if (!category || category === 'all') {
    return projects;
  }
  return projects.filter(p => p.category === category);
}

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: { name?: string; email?: string; message?: string } = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Please enter your name.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Please enter your message.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates toggle theme
 */
export function getNextTheme(current: 'light' | 'dark' | null): 'light' | 'dark' {
  return current === 'dark' ? 'light' : 'dark';
}

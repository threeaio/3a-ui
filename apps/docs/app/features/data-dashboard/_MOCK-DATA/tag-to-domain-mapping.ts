import { ExpertiseDomain } from '../types/domain'

// This mapping simulates what an LLM would do in the real app
const TAG_TO_DOMAIN_MAPPING: Record<string, ExpertiseDomain[]> = {
  // Frontend related tags
  'browser-compatibility': ['frontend', 'qa'],
  'css-fixes': ['frontend'],
  'legacy-support': ['frontend', 'qa'],
  'cross-browser': ['frontend', 'qa'],
  'ie11': ['frontend'],
  'mobile-ux': ['ux', 'mobile'],
  'service-worker': ['frontend'],
  'local-storage': ['frontend'],
  'offline-first': ['frontend', 'mobile'],
  'data-sync': ['frontend', 'backend'],
  'conflict-resolution': ['backend'],
  'state-management': ['frontend'],
  'url-sync': ['frontend'],
  'performance-optimization': ['frontend', 'backend'],
  'ui-component': ['frontend'],
  'responsive-design': ['frontend', 'design'],
  'form-handling': ['frontend'],
  'user-feedback': ['frontend', 'ux'],
  'form-validation': ['frontend'],
  'internationalization': ['frontend'],
  'accessibility': ['frontend'],
  'state-persistence': ['frontend'],
  'offline-support': ['frontend'],
  'shadcn-ui': ['frontend'],
  'unit-testing': ['qa'],
  'regression-testing': ['qa'],
  'data-persistence': ['frontend', 'backend'],
  'user-settings': ['frontend'],
  'profile-management': ['frontend'],
  'design-system': ['frontend', 'design'],
  'tailwind': ['frontend'],
  'performance': ['frontend'],
  'image-optimization': ['frontend'],
  'lazy-loading': ['frontend'],
  'next-image': ['frontend'],
  'web-vitals': ['frontend'],
  'mobile-responsive': ['frontend'],
  'navigation': ['frontend'],
  'user-experience': ['ux'],

  // Backend related tags
  'api-development': ['backend'],
  'rest-api': ['backend'],
  'api-documentation': ['backend'],
  'versioning': ['backend'],
  'swagger': ['backend'],
  'background-services': ['backend'],
  'api-integration': ['backend'],
  'error-handling': ['backend', 'frontend'],
  'payment-processing': ['backend'],
  'timeout-handling': ['backend'],
  'network-resilience': ['backend'],
  'email-templates': ['backend'],
  'order-processing': ['backend'],
  'transactional-email': ['backend'],
  'data-validation': ['backend', 'qa'],
  'customer-communication': ['backend'],
  'security': ['backend', 'devops'],
  'auth': ['backend'],
  'jwt': ['backend'],
  'oauth2': ['backend'],
  'role-based-access': ['backend'],
  'next-auth': ['backend', 'frontend'],
  'pci-compliance': ['backend', 'devops'],
  'stripe-integration': ['backend'],

  // Mobile related tags
  'mobile-integration': ['mobile'],
  'mobile-tracking': ['mobile'],
  'firebase-fcm': ['mobile', 'backend'],
  'push-notifications': ['mobile', 'backend'],
  'real-time': ['backend'],
  'firebase-analytics': ['mobile'],
  'event-tracking': ['mobile'],
  'mobile-payments': ['mobile', 'backend'],
  'stripe-sdk': ['mobile'],
  'apple-pay': ['mobile'],
  'google-pay': ['mobile'],
  'payment-security': ['backend', 'devops'],
  'in-app-purchases': ['mobile'],

  // Analytics and metrics
  'analytics': ['other'],
  'user-behavior': ['ux'],
  'metrics': ['other'],
  'data-visualization': ['frontend'],

  // E-commerce specific
  'search': ['frontend', 'backend'],
  'filtering': ['frontend', 'backend'],
  'query-params': ['frontend', 'backend'],
  'order-management': ['backend'],
  'real-time-updates': ['frontend', 'backend'],
  'user-dashboard': ['frontend'],
  'cart': ['frontend', 'backend'],
  'session-management': ['backend'],
  'checkout-flow': ['frontend', 'backend'],
  'price-calculation': ['frontend', 'backend'],
  'address-verification': ['backend'],
  'discount-handling': ['frontend', 'backend'],
  'edge-cases': ['qa'],
  'bugfix': ['qa'],
  'payments': ['backend'],
  'user-management': ['frontend', 'backend'],

  // Performance and monitoring
  'lighthouse': ['frontend', 'qa'],
  'monitoring': ['devops', 'qa'],
  'optimization': ['frontend', 'backend'],
  'metrics-analysis': ['qa', 'devops'],

  // DevOps and maintenance
  'dependency-update': ['devops', 'qa'],
  'npm': ['devops'],
  'security-patches': ['devops', 'qa'],
  'version-management': ['devops'],
  'breaking-changes': ['devops', 'qa'],
  'compatibility-testing': ['qa'],

  // Project Management
  'project-management': ['pm'],
  'team-coordination': ['pm'],
  'sprint-planning': ['pm'],
  'agile-ceremonies': ['pm'],
  'resource-allocation': ['pm'],
  'stakeholder-communication': ['pm']
}

export function mapTagToDomains(tag: string): ExpertiseDomain[] {
  return TAG_TO_DOMAIN_MAPPING[tag] || ['other']
}

export function getDomainsFromTags(tags: string[]): ExpertiseDomain[] {
  const domains = new Set<ExpertiseDomain>()
  tags.forEach(tag => {
    mapTagToDomains(tag).forEach(domain => domains.add(domain))
  })
  return Array.from(domains)
} 
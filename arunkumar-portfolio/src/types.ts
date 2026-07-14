/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
  category: 'Java' | 'Python' | 'ML' | 'SQL' | 'All';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  iconName: string;
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
  span?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

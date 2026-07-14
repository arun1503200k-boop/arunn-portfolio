/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Certification, EducationItem, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'grade-tracker',
    title: 'Student Grade Tracker',
    description: 'A comprehensive Java-based academic tool featuring dynamic data management for student records and performance analytics.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-eiCS3e2nnWTeuLK2NKGB9suJVEHLh2WlRVR-JrWRuxKDfA9_DWkKN1_-VUagIC2rsLFM7Ofhdc_RJdX1vRRCnlMzhf98kps8_DncMoSvnvbSEVmFjdbiUJ8JmOtZeNyYZRKsQsnAFsBBNsiWIzr_P01v1EdZWiQo6RGurUv10V8_KK4iJWUN-BTKhA5liOX-6C1HVuQdUyklTknAjrgRFQ4egjMbTEgE_yIvNdOnDL80YBugfJ8IEKyiJ8Ne9LE6O0LbgWbU2yY',
    tags: ['Java', 'OOP', 'Collections'],
    liveUrl: '#',
    codeUrl: '#',
    category: 'Java'
  },
  {
    id: 'stock-trading',
    title: 'Stock Trading Platform',
    description: 'Engineered using Java OOP principles, this simulator provides real-time market logic and portfolio management capabilities.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnUnDfiQ96yiHGKDtNnoD0O5Chld3ZmQjMBOQ7qXXdZQpt7rGjr1DGJIhBIqdnSzzQ3NAmYzwkb4Xh7j-nb4OtPz37-j1WtgNzkBhhJIfSwiv5nosmA52YldoS4PPmAu-dQq5owtH5ijOBOd7q4SE0zb_TGbBd_TVXVImNsdWSHEN4UFL-KE9TeFXEwZqdwVIZ9zzgii0eEhxpPn54Kw4BGTc4FtKzFOMpvVkjwWC4CrWyw5BiO9AUXn4qlsDItYEHx7cIMshe93c',
    tags: ['Java OOP', 'Multithreading'],
    liveUrl: '#',
    codeUrl: '#',
    category: 'Java'
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description: 'A Python-powered conversational agent utilizing Natural Language Processing to facilitate intelligent user interactions and task automation.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEXFsUFivq7v3Bzgj1ycLwgV4g4LpZP4Ngn7TCQA9kgTiAh4gM_jZQMHuk9fgEoJJXslTJLxLMNrnfNxzo-3bwAb27XWuJgj0hsmnyc_D4722bQN8S1fvqjacFR8wuOrlAXQnZhq-UxoQEfYj-EYVcTWdfdmIspY4u14qexGK9MqBnF2UzeLcArPF_mZJ7-IRJhaSxEebywInexJuAuEZTm4g5HBWPObpWM0DQZMB7UWs7W_gkmTGiQisywMy8ZMQfOF_zj1Tefcw',
    tags: ['Python', 'NLP', 'Spacy'],
    liveUrl: '#',
    codeUrl: '#',
    category: 'Python'
  },
  {
    id: 'hotel-reservation',
    title: 'Hotel Reservation System',
    description: 'A robust CRUD application integrating Java with SQL for efficient data persistence and guest lifecycle management.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmcL_OUxrIeIvzXnjn7T-ZfSV7p20FatHsWqC3yxFNskF3RDbjGGu4oar0nQjMlHcHe5sXkBQqZxhas-jJjUwH2-CivHA2KCrM-zZU60ctxsHr3zzDNn7x_FwsWzcgxfkdxqBT3-7IBdTqiFlQea4a7E4I46AhBFsgkR9UqdIlfG5Zdm44Vp8jA6j10W46gGAN-YzcWXncCan7F_Kgy7ZOKOQ6a9-gxl81olTd5-wgZLO9IZiAQFYve7wl2khKBBKqI7xKKyk6p4I',
    tags: ['Java', 'SQL', 'JDBC'],
    liveUrl: '#',
    codeUrl: '#',
    category: 'SQL'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    period: '2020 — 2024',
    degree: 'Bachelor of Engineering (B.E.)',
    institution: 'Sethu Institute of Technology',
    description: 'Focused on Computer Science and Engineering with a strong emphasis on Software Architecture and Machine Learning fundamentals.'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'AI Certification',
    issuer: 'Infosys Springboard',
    description: 'Deep dive into Artificial Intelligence foundations, neural networks, and Python-based modeling.',
    iconName: 'brain'
  },
  {
    id: 'cert-2',
    title: 'DBMS Masterclass',
    issuer: 'Udemy Professional Certificate',
    description: 'Advanced SQL optimization, database normalization, and large-scale data management strategies.',
    iconName: 'database'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    icon: 'code',
    skills: ['Java', 'Python', 'C']
  },
  {
    title: 'Web Dev',
    icon: 'web',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React']
  },
  {
    title: 'Database',
    icon: 'database',
    skills: ['SQL', 'MySQL', 'NoSQL']
  },
  {
    title: 'Artificial Intelligence',
    icon: 'brain',
    skills: ['ML (Scikit-learn)', 'DL (TensorFlow)', 'NLP (Transformers)', 'CV (OpenCV)'],
    span: 2
  },
  {
    title: 'Concepts',
    icon: 'layers',
    skills: ['OOP', 'DSA', 'Cloud']
  },
  {
    title: 'Tools & Environment',
    icon: 'build',
    skills: ['Git', 'VS Code', 'Docker', 'Jupyter', 'Postman'],
    span: 3
  }
];

export const SAMPLE_STUDENTS = [
  { id: 1, name: 'Arunkumar S.', math: 98, cs: 99, physics: 95 },
  { id: 2, name: 'Vikram R.', math: 85, cs: 92, physics: 88 },
  { id: 3, name: 'Priya K.', math: 90, cs: 87, physics: 91 }
];

export const MOCK_PROJECT_CODE: Record<string, string> = {
  'grade-tracker': `// StudentGradeTracker.java
import java.util.*;

public class StudentGradeTracker {
    private List<Student> students = new ArrayList<>();

    public void addStudent(String name, double[] grades) {
        Student s = new Student(name, grades);
        students.add(s);
    }

    public double calculateAverageGPA() {
        return students.stream()
            .mapToDouble(Student::getGPA)
            .average()
            .orElse(0.0);
    }
}`,
  'stock-trading': `// StockSimulator.java
import java.util.concurrent.*;

public class StockSimulator implements Runnable {
    private final ConcurrentHashMap<String, Double> prices = new ConcurrentHashMap<>();
    
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            prices.forEach((symbol, price) -> {
                double change = (ThreadLocalRandom.current().nextDouble() - 0.5) * 2.0;
                prices.put(symbol, Math.max(1.0, price + change));
            });
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                break;
            }
        }
    }
}`,
  'ai-chatbot': `# chatbot_agent.py
import spacy
from typing import Dict

class ChatbotAgent:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.intent_responses = {
            "greet": "Hello! I am Arun's AI assistant. How can I help you today?",
            "nlp": "Natural Language Processing covers text analysis, parsing, and semantic understanding.",
            "skills": "Arunkumar specializes in Python, Java, Deep Learning, and SQL databases."
        }

    def respond(self, message: str) -> str:
        doc = self.nlp(message.lower())
        # Entity extraction and basic classification
        ...`,
  'hotel-reservation': `// HotelReservationService.java
import java.sql.*;

public class HotelReservationService {
    public void createBooking(String guestName, String roomType, int nights) throws SQLException {
        String sql = "INSERT INTO bookings (guest_name, room_type, nights) VALUES (?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, guestName);
            stmt.setString(2, roomType);
            stmt.setInt(3, nights);
            stmt.executeUpdate();
        }
    }
}`
};

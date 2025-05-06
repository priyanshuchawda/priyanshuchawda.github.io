import React from 'react';
import { Code, Database, Layout, Server, PenTool, Shapes, Command, GitBranch, Monitor, Palette } from 'lucide-react';
import Badge from '../ui/Badge';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animation';

interface Skill {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  highlight?: boolean;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: <Layout className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      skills: [
        { name: 'HTML/CSS', proficiency: 'expert', category: 'frontend', highlight: true },
        { name: 'JavaScript', proficiency: 'advanced', category: 'frontend', highlight: true },
        { name: 'React', proficiency: 'advanced', category: 'frontend', highlight: true },
        { name: 'TypeScript', proficiency: 'intermediate', category: 'frontend', highlight: true },
        { name: 'Tailwind CSS', proficiency: 'advanced', category: 'frontend' },
        { name: 'Next.js', proficiency: 'intermediate', category: 'frontend' },
        { name: 'Redux', proficiency: 'intermediate', category: 'frontend' },
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: <Server className="w-10 h-10 text-teal-600 dark:text-teal-400" />,
      skills: [
        { name: 'Node.js', proficiency: 'advanced', category: 'backend', highlight: true },
        { name: 'Express', proficiency: 'intermediate', category: 'backend' },
        { name: 'Python', proficiency: 'intermediate', category: 'backend' },
        { name: 'REST API', proficiency: 'advanced', category: 'backend', highlight: true },
        { name: 'GraphQL', proficiency: 'beginner', category: 'backend' },
        { name: 'Authentication', proficiency: 'intermediate', category: 'backend' },
      ]
    },
    {
      id: 'database',
      title: 'Database',
      icon: <Database className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
      skills: [
        { name: 'MongoDB', proficiency: 'intermediate', category: 'database', highlight: true },
        { name: 'PostgreSQL', proficiency: 'intermediate', category: 'database' },
        { name: 'MySQL', proficiency: 'beginner', category: 'database' },
        { name: 'Firebase', proficiency: 'intermediate', category: 'database', highlight: true },
      ]
    },
    {
      id: 'other',
      title: 'Other Skills',
      icon: <Code className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      skills: [
        { name: 'Git', proficiency: 'expert', category: 'other', highlight: true },
        { name: 'Docker', proficiency: 'intermediate', category: 'other' },
        { name: 'CI/CD', proficiency: 'advanced', category: 'other' },
        { name: 'Testing', proficiency: 'advanced', category: 'other', highlight: true },
      ]
    },
    {
      id: 'design',
      title: 'Design',
      icon: <PenTool className="w-10 h-10 text-pink-600 dark:text-pink-400" />,
      skills: [
        { name: 'Figma', proficiency: 'advanced', category: 'design', highlight: true },
        { name: 'UI/UX', proficiency: 'advanced', category: 'design' },
        { name: 'Responsive Design', proficiency: 'expert', category: 'design', highlight: true },
      ]
    },
    {
      id: 'architecture',
      title: 'Architecture',
      icon: <Shapes className="w-10 h-10 text-orange-600 dark:text-orange-400" />,
      skills: [
        { name: 'System Design', proficiency: 'advanced', category: 'architecture', highlight: true },
        { name: 'Microservices', proficiency: 'intermediate', category: 'architecture' },
        { name: 'API Design', proficiency: 'advanced', category: 'architecture', highlight: true },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('up')}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Skills</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I've developed a diverse set of skills throughout my career. Here's an overview of my technical expertise and competencies.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {skillCategories.map((category, idx) => (
              <motion.div 
                variants={fadeIn('up', idx * 0.1)}
                key={category.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold ml-4">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, index) => {
                    const getBadgeVariant = () => {
                      switch (skill.proficiency) {
                        case 'expert': return 'success';
                        case 'advanced': return 'primary';
                        case 'intermediate': return 'secondary';
                        case 'beginner': return 'default';
                        default: return 'default';
                      }
                    };
                    
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + idx * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        key={`${category.id}-${index}`}
                      >
                        <Badge
                          variant={getBadgeVariant()}
                          className={`text-sm py-1.5 px-3 ${skill.highlight ? 'font-medium' : ''}`}
                        >
                          {skill.name}
                          {skill.proficiency === 'expert' && ' ★★★'}
                          {skill.proficiency === 'advanced' && ' ★★'}
                          {skill.proficiency === 'intermediate' && ' ★'}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
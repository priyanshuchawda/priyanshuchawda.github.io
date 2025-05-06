import React from 'react';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
                show: { 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 100, 
                    duration: 0.8 
                  } 
                }
              }}
              className="rounded-lg overflow-hidden shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-800 flex items-center justify-center p-8 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 opacity-30"
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                    backgroundSize: ["100% 100%", "120% 120%"]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 8 
                  }}
                  style={{ 
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                  }}
                />
                <div className="text-center text-white relative z-10">
                  <h3 className="text-3xl font-bold mb-3">Priyanshu Chawda</h3>
                  <p className="text-lg font-light">Full Stack Developer</p>
                  <div className="mt-6 border-t border-white/20 pt-4">
                    <p className="text-sm">Creating elegant solutions to complex problems</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
              }}
            >
              <h3 className="text-2xl font-bold mb-6">
                I'm <span className="text-blue-600 dark:text-blue-400 relative">
                  Priyanshu Chawda
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600/30 dark:bg-blue-400/30"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </span>, a Full Stack Developer
              </h3>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                I am passionate about building excellent software that improves the lives of those around me. With a focus on web development, I specialize in creating dynamic, engaging interfaces through clean and efficient code. My expertise spans both front-end and back-end development, allowing me to build complete, scalable solutions.
              </motion.p>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                With a strong foundation in Computer Science, I've collaborated with startups and established companies alike to create innovative digital products. I'm constantly exploring new technologies and techniques to enhance my skill set and deliver cutting-edge solutions.
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-200">Pune, India</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-200">Available for Freelance, Internships</span>
                </div>
                
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-200">Full Stack Developer</span>
                </div>
                
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-200">Computer Science</span>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Download Resume
                </a>
              </div>
            </motion.div> 
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

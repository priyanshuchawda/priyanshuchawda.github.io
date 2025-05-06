import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { event, trackOutboundLink } from '../../utils/analytics';

const socialLinks = [
  { Icon: Github, url: 'https://github.com/priyanshuchawda', label: 'GitHub' },
  { Icon: Linkedin, url: 'https://linkedin.com/in/priyanshuchawda', label: 'LinkedIn' },
];

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const mouse = { x: 0, y: 0, radius: 150 };
    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (Math.random() > 0.95) event('interaction', 'hero_animation', 'mousemove');
    };

    window.addEventListener('mousemove', handleMove);

    const handleClick = () => event('click', 'hero_animation', 'canvas_click');
    canvas.addEventListener('click', handleClick);

    class Particle {
      x = Math.random() * canvas.width;
      y = Math.random() * canvas.height;
      base = Math.random() * 3 + 1;
      size = this.base;
      vx = Math.random() * .5 - .25;
      vy = Math.random() * .5 - .25;
      color = '#6366f1';
      density = Math.random() * 30;

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * this.density;
          this.y -= (dy / dist) * force * this.density;
          this.size = this.base + 1.5;
        } else if (this.size > this.base) {
          this.size -= 0.1;
        }
      }

      draw() {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: Math.min(canvas.width / 20, 40) }, () => new Particle());

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100) {
            ctx.globalAlpha = 0.05;
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connect();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  const scrollTo = (id: string, label: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    event('click', 'navigation', `hero_cta_${label}`);
  };

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen pt-16" aria-label="Hero section">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" aria-hidden />

      <div className="container mx-auto text-center px-4">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl md:text-6xl font-bold mb-4">
          Hi, I'm <span className="text-blue-600">Priyanshu Chawda</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          I build extraordinary digital experiences combining design & functionality.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollTo('projects', 'projects')} className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg focus:ring-2 focus:ring-blue-700">
            View My Work
          </motion.button>
        </div>

        <nav className="flex justify-center space-x-6 mb-12" aria-label="Social links">
          {socialLinks.map(({ Icon, url, label }) => (
            <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} onClick={() => trackOutboundLink(url, label, 'social')} className="text-gray-600 hover:text-blue-600">
              <Icon className="w-7 h-7" />
              <span className="sr-only">{label}</span>
            </motion.a>
          ))}
        </nav>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => scrollTo('about', 'about')} className="mx-auto p-2 bg-white dark:bg-gray-800 rounded-full shadow focus:ring-2 focus:ring-blue-400">
          <ArrowDown className="w-5 h-5 text-blue-600" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;

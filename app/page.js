"use client"
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Wait for AOS to be available
    const initializeEffects = () => {
      // Initialize AOS if available
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
        });
      }

      const navbar = document.querySelector('.navbar');
      const scrollTop = document.getElementById('scrollTop');
      const handleNavbarScroll = () => {
        if (window.scrollY > 100) {
          navbar?.classList.add('scrolled');
          if (scrollTop) scrollTop.style.display = 'flex';
        } else {
          navbar?.classList.remove('scrolled');
          if (scrollTop) scrollTop.style.display = 'none';
        }
      };
      window.addEventListener('scroll', handleNavbarScroll);

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });

      // Scroll to top
      document.getElementById('scrollTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Typing animation
      const heroTitle = document.querySelector('.hero h1');
      if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          }
        };
        setTimeout(typeWriter, 1000);
      }

      // Particle effect
      const createParticles = () => {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
          `;
          hero?.appendChild(particle);
        }
      };

      // Add CSS for particle animation
      const particleStyle = document.createElement('style');
      particleStyle.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
      `;
      document.head.appendChild(particleStyle);

      // Create particles after a short delay
      setTimeout(createParticles, 100);

      // Skill item hover
      document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateX(10px) scale(1.02)';
        });
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateX(0) scale(1)';
        });
      });

      // Button ripple
      const rippleStyle = document.createElement('style');
      rippleStyle.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .btn {
          position: relative;
          overflow: hidden;
        }
      `;
      document.head.appendChild(rippleStyle);

      document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', e => {
          const ripple = document.createElement('span');
          const rect = button.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
          `;
          button.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
        });
      });

      // Timeline animation
      const animateStyle = document.createElement('style');
      animateStyle.textContent = `
        .timeline-item {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.6s ease;
        }
        .timeline-item.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
      `;
      document.head.appendChild(animateStyle);

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
      });

      // Parallax scroll for hero
      const handleParallax = () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
          hero.style.transform = `translateY(${scrolled * -0.5}px)`;
        }
      };
      window.addEventListener('scroll', handleParallax);

      // Loading screen
      const showLoader = () => {
        const loader = document.createElement('div');
        loader.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.5s ease;
        `;

        const spinner = document.createElement('div');
        spinner.style.cssText = `
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        `;
        loader.appendChild(spinner);
        document.body.appendChild(loader);

        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(spinStyle);

        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => loader.remove(), 500);
        }, 1500);
      };

      // Show loader immediately
      showLoader();

      // Cursor trail
      const trail = [];
      const trailLength = 10;
      const handleMouseMove = (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        if (trail.length > trailLength) trail.shift();

        trail.forEach((point, index) => {
          const dot = document.createElement('div');
          dot.style.cssText = `
            position: fixed;
            width: ${4 - index * 0.3}px;
            height: ${4 - index * 0.3}px;
            background: rgba(52, 152, 219, ${1 - index * 0.1});
            border-radius: 50%;
            pointer-events: none;
            left: ${point.x}px;
            top: ${point.y}px;
            z-index: 9998;
            transition: all 0.1s ease;
          `;
          document.body.appendChild(dot);
          setTimeout(() => dot.remove(), 100);
        });
      };
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('scroll', handleNavbarScroll);
        window.removeEventListener('scroll', handleParallax);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    };

    // Wait a bit for external scripts to load
    const timer = setTimeout(initializeEffects, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <section id="home" className="hero bg-animated">
        <div className="container">
          <div className="hero-content">
            <div className="floating">
              <i className="fas fa-code" style={{ fontSize: '4rem', marginBottom: '2rem' }}></i>
            </div>
            <h1>Sivapriya R</h1>
            <p className="lead">DevOps Engineer & Full Stack Developer</p>
            <p className="mb-4">
              Passionate about cloud technologies, automation, and creating innovative solutions
            </p>
            <a href="#about" className="btn btn-custom">
              Explore My Work
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>About Me</h2>
            <p className="lead">Driven by passion for technology and continuous learning</p>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="custom-card">
                <h3 className="mb-3">Professional Objective</h3>
                <p>
                  Looking forward to working with an organisation where I can continue my knowledge and
                  training to enrich my professional experience in a real environment outside the academic
                  field.
                </p>
                <p>
                  With a strong foundation in computer science and hands-on experience in modern DevOps
                  technologies, I am passionate about creating efficient, scalable solutions and
                  contributing to innovative projects.
                </p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="custom-card">
                <h3 className="mb-3">Personal Details</h3>
                <div className="row">
                  <div className="col-12 mb-2">
                    <strong>Date of Birth:</strong> 09.06.2000
                  </div>
                  <div className="col-12 mb-2">
                    <strong>Languages:</strong> English, Tamil
                  </div>
                  <div className="col-12 mb-2">
                    <strong>Location:</strong> Chennai, Tamil Nadu
                  </div>
                  <div className="col-12">
                    <strong>GitHub:</strong>{' '}
                    <a
                      href="https://github.com/Rsivapriya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      github.com/Rsivapriya
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-5 bg-light">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Education</h2>
            <p className="lead">Academic journey and achievements</p>
          </div>
          <div className="timeline">
            {[
              {
                title: 'Master of Science (M.SC)',
                year: '2023',
                institute: 'Annamalai University',
                details: 'CGPA: 8.22/10',
              },
              {
                title: 'Bachelor of Science (B.SC)',
                year: '2021',
                institute: 'Thiruvalluvar University',
                details: 'Percentage: 91.9%',
              },
              {
                title: 'Higher Secondary Certificate (H.S.C)',
                year: '2018',
                institute: 'Government Girls Higher Secondary School',
                details: 'Percentage: 79.2%',
              },
              {
                title: 'Secondary School Leaving Certificate (S.S.L.C)',
                year: '2016',
                institute: 'Sri Nataraja Matriculation School',
                details: 'Percentage: 92.6%',
              },
            ].map((edu, i) => (
              <div className="timeline-item" data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'} key={i}>
                <div className="timeline-content">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="mb-1">{edu.title}</h4>
                    <span className="badge bg-primary">{edu.year}</span>
                  </div>
                  <h6 className="text-muted mb-2">{edu.institute}</h6>
                  <p className="mb-1"><strong>{edu.details.split(':')[0]}:</strong> {edu.details.split(':')[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-5">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Technical Skills</h2>
            <p className="lead">Technologies and tools I work with</p>
          </div>
          <div className="row">
            {[
              { icon: 'fab fa-html5', title: 'Frontend Technologies', tools: 'HTML, CSS, JavaScript' },
              { icon: 'fab fa-aws', title: 'Cloud Technology', tools: 'AWS (Amazon Web Services)' },
              { icon: 'fas fa-infinity', title: 'CI/CD', tools: 'Jenkins, CodePipeline, CodeDeploy' },
              { icon: 'fab fa-docker', title: 'Containerization', tools: 'Docker, Kubernetes' },
              { icon: 'fas fa-cogs', title: 'Configuration & IaaC', tools: 'Ansible, CloudFormation' },
              { icon: 'fas fa-chart-line', title: 'Monitoring Tools', tools: 'Prometheus, Grafana, Splunk' },
            ].map((skill, i) => (
              <div className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={100 * (i + 1)} key={i}>
                <div className="skill-item d-flex align-items-center">
                  <div className="skill-icon">
                    <i className={skill.icon}></i>
                  </div>
                  <div>
                    <h5 className="mb-1">{skill.title}</h5>
                    <p className="mb-0">{skill.tools}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-5 bg-light">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Experience & Certifications</h2>
            <p className="lead">Professional experience and achievements</p>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4" data-aos="fade-right">
              <div className="custom-card">
                <i className="fas fa-laptop-code mb-3"></i>
                <h4>Internship Experience</h4>
                <p><strong>2-Month Internship</strong> at Soft Tech Ashram</p>
                <p>Focused on HTML, CSS, and JavaScript development. Gained hands-on experience in web development and user interface design.</p>
              </div>
            </div>
            <div className="col-lg-6 mb-4" data-aos="fade-left">
              <div className="custom-card">
                <i className="fas fa-certificate mb-3"></i>
                <h4>Certifications</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">✓ AWS and DevOps Course - Green Technology</li>
                  <li className="mb-2">✓ Complete UI/UX Course - Novi Tech</li>
                  <li className="mb-2">✓ Senior Grade Typewriting English - First class</li>
                  <li className="mb-2">✓ Department of Technical Education Certification</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12" data-aos="fade-up">
              <div className="custom-card">
                <h4 className="mb-3">Core Competencies</h4>
                <div className="row">
                  {[
                    { icon: 'fas fa-keyboard', label: 'Typewriting', note: 'Senior Grade' },
                    { icon: 'fas fa-comments', label: 'Communication', note: 'Excellent Skills' },
                    { icon: 'fas fa-lightbulb', label: 'Creative', note: 'Thinking' },
                    { icon: 'fas fa-puzzle-piece', label: 'Problem', note: 'Solving' },
                  ].map((item, i) => (
                    <div className="col-md-3 col-6 text-center mb-3" key={i}>
                      <i className={`${item.icon} fa-2x mb-2 text-primary`}></i>
                      <p className="mb-0"><strong>{item.label}</strong><br />{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Get In Touch</h2>
            <p className="lead">Let`&apos;`s connect and discuss opportunities</p>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="contact-info" data-aos="fade-up">
                <div className="row text-center">
                  <div className="col-md-4 mb-4">
                    <div className="contact-item flex-column">
                      <i className="fas fa-envelope fa-2x mb-3"></i>
                      <h5>Email</h5>
                      <p>sivapriya1689@gmail.com</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="contact-item flex-column">
                      <i className="fas fa-phone fa-2x mb-3"></i>
                      <h5>Phone</h5>
                      <p>+91 6382081***</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="contact-item flex-column">
                      <i className="fas fa-map-marker-alt fa-2x mb-3"></i>
                      <h5>Location</h5>
                      <p>Chennai, Tamil Nadu<br />India</p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <a
                    href="https://github.com/Rsivapriya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light me-3"
                  >
                    <i className="fab fa-github me-2"></i>GitHub
                  </a>
                  <a href="mailto:sivapriya1689@gmail.com" className="btn btn-outline-light">
                    <i className="fas fa-envelope me-2"></i>Email Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
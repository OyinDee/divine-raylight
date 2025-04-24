import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { id: 1, value: 6, label: 'Years in Business' },
  { id: 2, value: 540, label: 'Visas Processed' },
  { id: 3, value: 470, label: 'Clients Processed' },
  { id: 4, value: 12, label: 'Destinations' }
];

const Counter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const observerRef = useRef(null);
  const countedRef = useRef(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !countedRef.current) {
        countedRef.current = true;
        let start = 0;
        const end = parseInt(target);
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
          start += increment;
          if (start > end) {
            clearInterval(timer);
            setCount(end);
          } else {
            setCount(Math.floor(start));
          }
        }, 16.6);
      }
    });

    if (nodeRef.current) {
      observerRef.current.observe(nodeRef.current);
    }

    return () => {
      if (observerRef.current && nodeRef.current) {
        observerRef.current.unobserve(nodeRef.current);
      }
    };
  }, [target, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

const StatsSection = () => {
  return (
    <section className="py-12 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              className="text-center animate-on-scroll"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.id * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                <Counter target={stat.value} />
              </h3>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

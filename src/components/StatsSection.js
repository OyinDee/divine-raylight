import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaRegClock, FaPassport, FaUserFriends, FaGlobeAmericas } from 'react-icons/fa';

const stats = [
	{ id: 1, value: 2, label: 'Years in Business', desc: 'Building trust and expertise since our founding.', icon: <FaRegClock /> },
	{ id: 2, value: 210, label: 'Visas Processed', desc: 'Successfully guided hundreds through visa journeys.', icon: <FaPassport /> },
	{ id: 3, value: 100, label: 'Clients Processed', desc: 'Personalized support for every unique story.', icon: <FaUserFriends /> },
	{ id: 4, value: 6, label: 'Destinations', desc: 'Opportunities in top countries worldwide.', icon: <FaGlobeAmericas /> },
];

const Counter = ({ target, duration = 2 }) => {
	const [count, setCount] = useState(0);
	const nodeRef = useRef(null);
	const observerRef = useRef(null);
	// Changed from `countedRef` to `hasAnimatedRef` for clarity
	const hasAnimatedRef = useRef(false);

	useEffect(() => {
		observerRef.current = new IntersectionObserver((entries) => {
			const [entry] = entries;
			if (entry.isIntersecting && !hasAnimatedRef.current) {
				hasAnimatedRef.current = true;
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

		const node = nodeRef.current;
		if (node) {
			observerRef.current.observe(node);
		}

		return () => {
			if (observerRef.current && node) {
				observerRef.current.unobserve(node);
			}
		};
	}, [target, duration]);

	return <span ref={nodeRef}>{count}</span>;
};

const StatsSection = () => {
	return (
		<section className="py-20 bg-gradient-to-br from-primary to-accent/80 text-white font-poppins">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
					{stats.map((stat, idx) => (
						<motion.div
							key={stat.id}
							className="flex flex-col items-center bg-white/10 rounded-2xl shadow-xl py-10 px-4 hover:scale-105 transition-transform duration-300"
							initial={{ opacity: 0, y: 40, scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							viewport={{ once: true }}
						>
							<div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white text-3xl shadow-lg border-4 border-white">
								{stat.icon}
							</div>
							<h3 className="text-5xl font-extrabold mb-2 text-white font-bricolage drop-shadow-lg">
								<Counter target={stat.value} />
							</h3>
							<div className="text-lg font-semibold text-white/90 mb-2 text-center">{stat.label}</div>
							<div className="text-white/70 text-center text-sm">{stat.desc}</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default StatsSection;

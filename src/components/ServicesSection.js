import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaPassport, FaPlane } from 'react-icons/fa';

const services = [
	{
		id: 1,
		icon: <FaGraduationCap className="text-4xl mb-4 text-accent" />,
		title: 'Personalized Guidance',
		description:
			'Receive tailored advice for your travel, study, or relocation plans. Our experts help you identify the best opportunities and destinations based on your unique goals and background.',
	},
	{
		id: 2,
		icon: <FaPassport className="text-4xl mb-4 text-accent" />,
		title: 'Document Assistance',
		description:
			'We review and organize your documents for smooth application processes. From visa paperwork to admission forms, our team ensures accuracy and compliance every step of the way.',
	},
	{
		id: 3,
		icon: <FaPlane className="text-4xl mb-4 text-accent animate-bounce" />,
		title: 'Travel & Logistics',
		description:
			'Let us handle your travel arrangements, including flights and accommodation. We secure the best deals and provide ongoing support to make your journey stress-free.',
	},
];

const ServicesSection = () => {
	return (
		<section id="services" className="section-padding bg-gray-100">
			<div className="container mx-auto px-6">
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl md:text-4xl font-bricolage font-bold mb-4 text-primary">
						What We <span className="text-accent">Offer</span>
					</h2>
					<p className="text-gray-700 font-poppins">
						Unlock new opportunities for education, work, and adventure. We provide end-to-end support for your international aspirations.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<motion.div
							key={service.id}
							className="service-card bg-white rounded-xl shadow-lg p-8 text-center animate-on-scroll border-t-4 border-accent"
							initial={{ opacity: 0, y: 30, scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<div>{service.icon}</div>
							<h3 className="text-xl font-bold mb-3 text-primary font-bricolage">
								{service.title}
							</h3>
							<p className="text-gray-600 font-poppins">
								{service.description}
							</p>
						</motion.div>
					))}
				</div>

				<motion.div
					className="text-center mt-12 animate-on-scroll"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
				>
					<a
						href="https://wa.me/2348131057809"
						target="_blank"
						rel="noopener noreferrer"
						className="btn-animate inline-block bg-accent text-white px-8 py-3 rounded-md font-bold font-poppins shadow hover:bg-primary transition-all"
					>
						Apply Now
					</a>
				</motion.div>
			</div>
		</section>
	);
};

export default ServicesSection;

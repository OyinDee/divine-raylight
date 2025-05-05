import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaPassport, FaPlane } from 'react-icons/fa';

const services = [
	{
		id: 1,
		icon: <FaGraduationCap className="text-4xl mb-4 text-accent" />,
		title: 'Academic Services',
		description:
			'Complete admission processing, educational research papers, and compelling personal statements. We guide you through the entire academic journey.',
	},
	{
		id: 2,
		icon: <FaPassport className="text-4xl mb-4 text-accent" />,
		title: 'Immigration Services',
		description:
			'Expert handling of study visas, Canadian PR applications, tourist visas, and strategic visa application planning for optimal success rates.',
	},
	{
		id: 3,
		icon: <FaPlane className="text-4xl mb-4 text-accent animate-bounce" />,
		title: 'Travel & Settlement',
		description:
			'Comprehensive flight bookings and accommodation arrangements to ensure a smooth transition to your destination country.',
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
						Our <span className="text-accent">Services</span>
					</h2>
					<p className="text-gray-700 font-poppins mb-4">
						With 7 years of expertise, we've successfully guided countless individuals through their international journey.
					</p>
					<p className="text-gray-700 font-poppins">
						Our expertise spans across major destinations including Canada, United Kingdom, United States, Ireland, Malta, Australia, New Zealand, and other European countries.
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
					className="text-center mt-16 animate-on-scroll"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
				>
					<div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
						<h3 className="text-xl font-bold mb-4 text-primary font-bricolage">
							Our Complete Service List:
						</h3>
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left text-gray-700 font-poppins">
							<li className="flex items-center gap-2">✓ Admission Processing</li>
							<li className="flex items-center gap-2">✓ Study Visa Processing</li>
							<li className="flex items-center gap-2">✓ Visa Application Strategy</li>
							<li className="flex items-center gap-2">✓ Canadian Permanent Residency</li>
							<li className="flex items-center gap-2">✓ Tourist Visa Application</li>
							<li className="flex items-center gap-2">✓ Flight Booking</li>
							<li className="flex items-center gap-2">✓ Accommodation Booking</li>
							<li className="flex items-center gap-2">✓ Educational Research Papers</li>
							<li className="flex items-center gap-2">✓ Personal Statement</li>
							<li className="flex items-center gap-2">✓ Visa refusal appeal services</li>
						</ul>
					</div>
				</motion.div>

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

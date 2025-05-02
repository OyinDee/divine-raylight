import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const whatsappNumber = "2348131057809"; // Update with your WhatsApp number

const jiggleVariants = {
  animate: {
    rotate: [0, 2, -2, 2, -2, 0],
    transition: {
      duration: 0.7,
      repeat: Infinity,
      repeatDelay: 1.5,
      ease: "easeInOut"
    }
  },
  stop: { rotate: 0 }
};

const ContactSection = () => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then(() => {
        setSubmitted(true);
        setSending(false);
        formRef.current.reset();
      })
      .catch((err) => {
        // Log the full error object for debugging
        console.error("EmailJS error:", err);
        alert('Failed to send message.');
        setSending(false);
      });
  };

  return (
    <section id="contact" className="section-padding bg-gray-100 font-poppins">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-2xl mx-auto rounded-xl shadow-lg p-0 animate-on-scroll bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Collapsible Header */}
          <motion.button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-8 py-6 bg-primary text-white rounded-t-xl focus:outline-none font-bricolage text-2xl font-bold"
            aria-expanded={open}
            aria-controls="contact-form-content"
            variants={jiggleVariants}
            animate={open ? "stop" : "animate"}
            whileTap="stop"
          >
            <span>
              Contact <span className="text-accent">Us</span>
            </span>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </motion.button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="contact-form-content"
                key="contact-form"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-8 py-8 bg-gray-50 rounded-b-xl">
                  <p className="text-gray-700 mb-8 text-center">
                    Have a question or want to get started? Send us a message and we'll get back to you soon.
                  </p>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-primary font-bold mb-2" htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-md border border-accent focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-primary font-bold mb-2" htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-md border border-accent focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-primary font-bold mb-2" htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-md border border-accent focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                      ></textarea>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                      <button
                        type="submit"
                        className="btn-animate bg-accent text-white px-8 py-3 rounded-md font-bold shadow hover:bg-primary transition-all"
                        disabled={sending}
                      >
                        {sending ? "Sending..." : "Send Message"}
                      </button>
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-md font-bold shadow hover:bg-green-600 transition-all"
                      >
                        <FaWhatsapp size={22} /> Chat on WhatsApp
                      </a>
                    </div>
                    {submitted && (
                      <div className="text-green-600 font-bold mt-4 text-center">
                        Thank you! Your message has been sent.
                      </div>
                    )}
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

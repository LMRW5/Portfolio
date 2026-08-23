import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Contact({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md border border-[#d8d1c6] bg-[#faf8f4] p-6 shadow-[0_8px_40px_rgba(182,75,50,0.12),8px_8px_0_#d8d1c6] animate-pop-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="Close modal"
        >
          ✕
        </button>

          <h2 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#1b1a18]">Get in touch</h2>
        <p className="mt-2 text-sm text-[#7c7469]">
          Have a project in mind? Send me a note.
        </p>

        {submitted ? (
          <div className="my-8 text-center font-medium text-emerald-600 animate-fade-in">
            ✓ Message sent successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full border border-[#d8d1c6] bg-[#f4f1eb] p-2.5 text-sm text-[#1b1a18] outline-none transition-all duration-300 focus:border-[#b64b32] focus:shadow-[0_0_0_3px_rgba(182,75,50,0.1)] focus:scale-[1.01]"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full border border-[#d8d1c6] bg-[#f4f1eb] p-2.5 text-sm text-[#1b1a18] outline-none transition-all duration-300 focus:border-[#b64b32] focus:shadow-[0_0_0_3px_rgba(182,75,50,0.1)] focus:scale-[1.01]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 w-full border border-[#d8d1c6] bg-[#f4f1eb] p-2.5 text-sm text-[#1b1a18] outline-none transition-all duration-300 focus:border-[#b64b32] focus:shadow-[0_0_0_3px_rgba(182,75,50,0.1)] focus:scale-[1.01]"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-[#1b1a18] py-2.5 font-medium text-[#f4f1eb] transition-all duration-300 hover:bg-[#b64b32] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#b64b32]/20 disabled:opacity-50 btn-ripple"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
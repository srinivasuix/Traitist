import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Shirt } from 'lucide-react';

interface CustomDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomDesignModal: React.FC<CustomDesignModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [story, setStory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errors, setErrors] = useState<{ story?: string; fullName?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  // Handle ESC keyboard press to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    // Reset state after exit transition if submission was completed
    if (isSuccess) {
      setTimeout(() => {
        setStep(1);
        setStory('');
        setInstructions('');
        setFullName('');
        setEmail('');
        setWhatsapp('');
        setErrors({});
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 250);
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: { story?: string } = {};
    if (!story.trim()) {
      newErrors.story = 'Please share the story or concept behind your design.';
    } else if (story.trim().length < 10) {
      newErrors.story = 'Please add a little more detail (at least 10 characters) so our designers understand your vision.';
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: { fullName?: string; email?: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Full recipient name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Simulate studio queueing delay
    setTimeout(() => {
      const generatedId = `TR-CST-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmissionId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="custom-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
        >
          {/* Backdrop matching Guest Checkout / Cart Drawer overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container — Matching Guest Checkout warm off-white, border & radius */}
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6, transition: { duration: 0.16 } }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative max-w-xl w-full max-h-[92vh] overflow-y-auto bg-[#ECEBE6] rounded-sm p-5 sm:p-7 shadow-2xl border border-neutral-300 z-10 text-left"
          >
            {/* Accessible Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer text-neutral-800"
              aria-label="Close custom design dialog"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Modal Content */}
            {!isSuccess ? (
              <div>
                {/* Header — Large Geometric Sans-Serif Heading & Monospace Kicker */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600">
                    BESPOKE GRAPHIC STUDIO
                  </span>
                </div>

                <h2
                  id="custom-modal-title"
                  className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 tracking-tight leading-tight"
                >
                  Create Your Custom Design
                </h2>

                <p className="text-xs text-neutral-600 font-sans mt-1 leading-relaxed">
                  Turn your story, thesis milestone, or concept into an original TRAITIST front-centre graphic.
                </p>

                {/* Two-step Progress Indicator — Clean Monospace Steps & Neutral Track */}
                <div className="mt-4 mb-4 pt-3 border-t border-neutral-300">
                  <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-wider mb-2">
                    <span className={step === 1 ? 'text-[#FF5722] font-bold' : 'text-neutral-500'}>
                      Step 01: Tell Us Your Story
                    </span>
                    <span className={step === 2 ? 'text-[#FF5722] font-bold' : 'text-neutral-500'}>
                      Step 02: Your Details
                    </span>
                  </div>

                  <div
                    className="h-1 w-full bg-neutral-300 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={step === 1 ? 50 : 100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full bg-[#FF5722] transition-all duration-300 ease-out"
                      style={{ width: step === 1 ? '50%' : '100%' }}
                    />
                  </div>
                </div>

                {/* Restrained Neutral Info Panel — Matching Checkout Order Summary */}
                <div className="p-3 bg-[#DFDDD7] rounded-sm border border-neutral-300 mb-4 flex items-start gap-2.5 text-neutral-700">
                  <Shirt className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-xs leading-relaxed font-sans">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-800 block mb-0.5">
                      Studio Specifications
                    </span>
                    Handcrafted exclusively for our <strong className="text-neutral-950 font-semibold">heavyweight 200 GSM Black T-shirt</strong> with <strong className="text-neutral-950 font-semibold">fixed centre-front placement</strong>.
                  </div>
                </div>

                {/* Form Steps */}
                {step === 1 ? (
                  /* Step 1: Tell us your story */
                  <form onSubmit={handleContinue} noValidate className="space-y-3.5">
                    {/* Story Textarea (Required) */}
                    <div>
                      <label
                        htmlFor="custom-story"
                        className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                      >
                        What's the story behind your design? <span className="text-[#FF5722]">*</span>
                      </label>
                      <p className="text-[11px] text-neutral-600 font-sans mb-1.5 leading-relaxed">
                        Share memories, personality, inside jokes, research experiences, breakthroughs, or creative ideas.
                      </p>
                      <textarea
                        id="custom-story"
                        name="story"
                        rows={4}
                        value={story}
                        onChange={(e) => {
                          setStory(e.target.value);
                          if (errors.story) {
                            setErrors((prev) => ({ ...prev, story: undefined }));
                          }
                        }}
                        placeholder="e.g. Spent 4 years in a wet lab researching CRISPR while surviving on cold brew. I want a gritty typographic quote from my failed thesis defense mixed with a schematic diagram..."
                        aria-required="true"
                        aria-invalid={!!errors.story}
                        aria-describedby={errors.story ? 'story-error' : undefined}
                        className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition placeholder:text-neutral-400 text-neutral-900 ${
                          errors.story
                            ? 'border-red-500 bg-red-50/20'
                            : 'border-neutral-300 focus:border-black'
                        }`}
                      />
                      {errors.story && (
                        <p id="story-error" className="text-[10px] font-mono text-red-600 mt-1">
                          {errors.story}
                        </p>
                      )}
                    </div>

                    {/* Additional Design Instructions (Optional) */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1">
                        <label htmlFor="custom-instructions">
                          Additional design instructions
                        </label>
                        <span className="text-neutral-500 font-normal">Optional</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans mb-1.5 leading-relaxed">
                        Mention any specific quotes, technical layout preferences, vintage vs. minimalist styling, or mood.
                      </p>
                      <textarea
                        id="custom-instructions"
                        name="instructions"
                        rows={2}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. High contrast typography, keep the tone dry and academic, include 'EST. 2026' in fine print."
                        className="w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition border-neutral-300 focus:border-black placeholder:text-neutral-400 text-neutral-900"
                      />
                    </div>

                    {/* Action Controls — Matching Guest Checkout Orange CTA */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="group relative overflow-hidden w-full py-3.5 min-h-[48px] bg-[#FF5722] hover:bg-[#e64a19] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-75"
                      >
                        <span>Continue to Your Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Step 2: Your details */
                  <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="custom-name"
                        className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="custom-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        placeholder="e.g. Alex Mitchell"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'name-error' : undefined}
                        className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition placeholder:text-neutral-400 text-neutral-900 ${
                          errors.fullName
                            ? 'border-red-500 bg-red-50/20'
                            : 'border-neutral-300 focus:border-black'
                        }`}
                      />
                      {errors.fullName && (
                        <p id="name-error" className="text-[10px] font-mono text-red-600 mt-0.5">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="custom-email"
                        className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="custom-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="scholar@university.edu"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition placeholder:text-neutral-400 text-neutral-900 ${
                          errors.email
                            ? 'border-red-500 bg-red-50/20'
                            : 'border-neutral-300 focus:border-black'
                        }`}
                      />
                      <p className="text-[11px] text-neutral-500 font-sans mt-1">
                        Our design team will email your custom mock-up and concept sketch directly to this inbox.
                      </p>
                      {errors.email && (
                        <p id="email-error" className="text-[10px] font-mono text-red-600 mt-0.5">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* WhatsApp Number (Optional) */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1">
                        <label htmlFor="custom-whatsapp">
                          WhatsApp Number
                        </label>
                        <span className="text-neutral-500 font-normal">Optional</span>
                      </div>
                      <input
                        id="custom-whatsapp"
                        name="whatsapp"
                        type="tel"
                        autoComplete="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition border-neutral-300 focus:border-black placeholder:text-neutral-400 text-neutral-900"
                      />
                      <p className="text-[11px] text-neutral-500 font-sans mt-1">
                        Optional. If provided, our studio team can also share progress sketches and quick previews via WhatsApp.
                      </p>
                    </div>

                    {/* Design Summary Panel — Matching Checkout Order Summary */}
                    <div className="p-3 bg-[#DFDDD7] rounded-sm border border-neutral-300 text-xs">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                        Your Design Summary
                      </span>
                      <p className="text-xs text-neutral-800 font-sans italic line-clamp-2">
                        "{story}"
                      </p>
                      {instructions && (
                        <p className="text-[11px] text-neutral-600 font-sans mt-1 line-clamp-1">
                          Note: {instructions}
                        </p>
                      )}
                    </div>

                    {/* Action Controls — Matching Guest Checkout Orange CTA & Back Button */}
                    <div className="pt-2 space-y-2.5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative overflow-hidden w-full py-3.5 min-h-[48px] bg-[#FF5722] hover:bg-[#e64a19] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-wait"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Transmitting Brief...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Design Request</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                          </>
                        )}
                      </button>

                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="text-xs font-mono text-neutral-600 hover:text-black underline cursor-pointer min-h-[44px] inline-flex items-center gap-1"
                        >
                          ← Back to Story
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Step 3: Success Screen — Featuring Traitist Mascot Panda & Studio Spec Sheet */
              <div className="py-2 sm:py-4 text-center flex flex-col items-center select-none">
                {/* Panda Mascot Character Illustration */}
                <div className="w-44 sm:w-52 mx-auto mb-3 hover:scale-[1.03] transition-transform duration-300 flex items-center justify-center">
                  <img
                    src="/images/empty-states/order-success.png"
                    alt="Brief Received! Traitist Studio is crafting your design"
                    className="w-full h-auto drop-shadow-md select-none pointer-events-none"
                  />
                </div>

                {/* Status Indicator Pill */}
                <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#DFDDD7] border border-neutral-300/90 font-mono text-[10px] sm:text-[10.5px] text-neutral-800 uppercase font-bold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" aria-hidden="true" />
                  <span>BRIEF CONFIRMED • {submissionId}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 tracking-tight">
                  Story Received. The Studio is on It.
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed font-sans">
                  Thank you, <strong className="text-neutral-900 font-semibold">{fullName}</strong>! Our design team has queued your concept. We will craft an original centre-front graphic for our 200 GSM black T-shirt and send an initial mock-up directly to <strong className="text-neutral-900 font-semibold">{email}</strong> within 48–72 hours.
                </p>

                {/* Brief Spec Sheet — Matching Checkout Summary Card */}
                <div className="my-4.5 p-4 bg-[#DFDDD7]/80 rounded-sm border border-neutral-300 text-left w-full max-w-md space-y-2.5 text-xs font-mono shadow-2xs">
                  <div className="flex justify-between border-b border-neutral-300/80 pb-2">
                    <span className="text-neutral-600 uppercase text-[10px] font-medium">CANVAS</span>
                    <span className="font-semibold text-neutral-900">200 GSM Black Combed Cotton</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-300/80 pb-2">
                    <span className="text-neutral-600 uppercase text-[10px] font-medium">PLACEMENT</span>
                    <span className="font-semibold text-neutral-900">Centre Front Print</span>
                  </div>
                  {whatsapp.trim() && (
                    <div className="flex justify-between border-b border-neutral-300/80 pb-2">
                      <span className="text-neutral-600 uppercase text-[10px] font-medium">WHATSAPP</span>
                      <span className="font-semibold text-neutral-900">{whatsapp.trim()}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-neutral-300/80 pb-2">
                    <span className="text-neutral-600 uppercase text-[10px] font-medium">MOCKUP TIMELINE</span>
                    <span className="font-semibold text-neutral-900">48–72 Hours via Email</span>
                  </div>
                  <div className="flex justify-between pt-0.5 items-center">
                    <span className="text-neutral-600 uppercase text-[10px] font-medium">STUDIO STATUS</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-[#FF5722]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
                      Queued for Artist Review
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-8 py-3.5 min-h-[48px] bg-neutral-950 hover:bg-[#FF5722] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-md inline-flex items-center justify-center gap-2"
                >
                  <span>RETURN TO SHOP</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

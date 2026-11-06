import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Shirt, Compass, ShieldAlert } from 'lucide-react';

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
        setErrors({});
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 250);
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: { story?: string } = {};
    if (!story.trim()) {
      newErrors.story = "Please share the story or concept behind your custom design.";
    } else if (story.trim().length < 10) {
      newErrors.story = "Please add a little more detail (at least 10 characters) so our designers understand your vision.";
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: { fullName?: string; email?: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.16 } }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative max-w-xl w-full max-h-[92vh] overflow-y-auto bg-[#ECEBE6] rounded-sm p-5 sm:p-8 shadow-2xl border border-neutral-300 z-10 text-left"
          >
            {/* Close Button */}
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
                {/* Eyebrow & Header */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-semibold">
                    BESPOKE GRAPHIC STUDIO
                  </span>
                </div>

                <h2
                  id="custom-modal-title"
                  className="text-2xl sm:text-3xl font-bold font-display text-neutral-950 tracking-tight leading-snug"
                >
                  Create Your Custom Design
                </h2>

                <p className="text-xs text-neutral-600 font-sans mt-1 leading-relaxed">
                  Turn your story, thesis milestone, or concept into an original TRAITIST front-centre graphic.
                </p>

                {/* Two-step Progress Indicator */}
                <div className="mt-5 mb-6">
                  <div className="flex items-center justify-between text-[10.5px] font-mono uppercase tracking-wider mb-2">
                    <span
                      className={`flex items-center gap-1.5 font-bold transition-colors ${
                        step === 1 ? 'text-[#FF5722]' : 'text-neutral-500'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                        step === 1 ? 'bg-[#FF5722] text-white' : 'bg-neutral-300 text-neutral-700'
                      }`}>
                        1
                      </span>
                      01 · Tell Us Your Story
                    </span>
                    <span
                      className={`flex items-center gap-1.5 font-bold transition-colors ${
                        step === 2 ? 'text-[#FF5722]' : 'text-neutral-500'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                        step === 2 ? 'bg-[#FF5722] text-white' : 'bg-neutral-300 text-neutral-700'
                      }`}>
                        2
                      </span>
                      02 · Your Details
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="h-1 w-full bg-neutral-300/80 rounded-full overflow-hidden" role="progressbar" aria-valuenow={step === 1 ? 50 : 100} aria-valuemin={0} aria-valuemax={100}>
                    <div
                      className="h-full bg-neutral-950 transition-all duration-300 ease-out"
                      style={{ width: step === 1 ? '50%' : '100%' }}
                    />
                  </div>
                </div>

                {/* Important Product Constraints Banner */}
                <div className="p-3 bg-[#DFDDD7]/70 rounded-xs border border-neutral-300/90 mb-6 flex items-start gap-2.5 text-neutral-700">
                  <Shirt className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-[11px] leading-relaxed font-sans">
                    <strong className="font-semibold text-neutral-900 block font-mono text-[10.5px] uppercase">
                      Studio Specifications:
                    </strong>
                    All custom graphics are exclusively created for our <strong>heavyweight 200 GSM Black T-shirt</strong> with <strong>fixed centre-front placement</strong>.
                  </div>
                </div>

                {/* Form Steps */}
                {step === 1 ? (
                  /* Step 1: Tell us your story */
                  <form onSubmit={handleContinue} noValidate className="space-y-5">
                    {/* Story Textarea (Required) */}
                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <label
                          htmlFor="custom-story"
                          className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900"
                        >
                          What's the story behind your design? <span className="text-[#FF5722]">*</span>
                        </label>
                        <span className="text-[10px] font-mono text-neutral-500">REQUIRED</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans mb-2 leading-relaxed">
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
                        className={`w-full p-3 text-base sm:text-xs font-sans rounded-xs bg-white border ${
                          errors.story
                            ? 'border-red-600 ring-1 ring-red-600'
                            : 'border-neutral-300 focus:border-black focus:ring-1 focus:ring-black'
                        } outline-none transition placeholder:text-neutral-400 text-neutral-900`}
                      />
                      {errors.story && (
                        <p id="story-error" className="mt-1.5 text-xs text-red-600 font-mono flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.story}</span>
                        </p>
                      )}
                    </div>

                    {/* Additional Design Instructions (Optional) */}
                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <label
                          htmlFor="custom-instructions"
                          className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900"
                        >
                          Additional design instructions
                        </label>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">Optional</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans mb-2 leading-relaxed">
                        Mention any specific quotes, technical layout preferences, vintage vs. minimalist styling, or mood.
                      </p>
                      <textarea
                        id="custom-instructions"
                        name="instructions"
                        rows={2}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. High contrast typography, keep the tone dry and academic, include 'EST. 2026' in fine print."
                        className="w-full p-3 text-base sm:text-xs font-sans rounded-xs bg-white border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition placeholder:text-neutral-400 text-neutral-900"
                      />
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 hover:bg-[#FF5722] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer min-h-[46px] shadow-sm active:scale-[0.98]"
                      >
                        <span>CONTINUE TO YOUR DETAILS</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Step 2: Your details */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <label
                          htmlFor="custom-name"
                          className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900"
                        >
                          Full name <span className="text-[#FF5722]">*</span>
                        </label>
                        <span className="text-[10px] font-mono text-neutral-500">REQUIRED</span>
                      </div>
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
                        placeholder="e.g. Alex Morgan"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'name-error' : undefined}
                        className={`w-full p-3 text-base sm:text-xs font-sans rounded-xs bg-white border ${
                          errors.fullName
                            ? 'border-red-600 ring-1 ring-red-600'
                            : 'border-neutral-300 focus:border-black focus:ring-1 focus:ring-black'
                        } outline-none transition placeholder:text-neutral-400 text-neutral-900`}
                      />
                      {errors.fullName && (
                        <p id="name-error" className="mt-1.5 text-xs text-red-600 font-mono flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <label
                          htmlFor="custom-email"
                          className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900"
                        >
                          Email address <span className="text-[#FF5722]">*</span>
                        </label>
                        <span className="text-[10px] font-mono text-neutral-500">REQUIRED</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans mb-2 leading-relaxed">
                        Our design team will email your custom mock-up and concept sketch directly to this inbox.
                      </p>
                      <input
                        id="custom-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="alex.morgan@university.edu"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full p-3 text-base sm:text-xs font-sans rounded-xs bg-white border ${
                          errors.email
                            ? 'border-red-600 ring-1 ring-red-600'
                            : 'border-neutral-300 focus:border-black focus:ring-1 focus:ring-black'
                        } outline-none transition placeholder:text-neutral-400 text-neutral-900`}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-red-600 font-mono flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Brief Summary Box */}
                    <div className="p-3 bg-[#DFDDD7]/50 rounded-xs border border-neutral-300/80">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                        YOUR DESIGN SUMMARY
                      </span>
                      <p className="text-xs text-neutral-800 font-sans line-clamp-2 italic">
                        "{story}"
                      </p>
                      {instructions && (
                        <p className="text-[11px] text-neutral-600 font-sans mt-1 line-clamp-1">
                          Note: {instructions}
                        </p>
                      )}
                    </div>

                    {/* Navigation Buttons: Back and Submit */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-neutral-300 hover:border-black bg-white hover:bg-neutral-100 text-neutral-900 font-mono text-xs uppercase tracking-wider font-semibold rounded-sm transition cursor-pointer min-h-[46px]"
                      >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        <span>BACK TO STORY</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 hover:bg-[#FF5722] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer min-h-[46px] shadow-sm disabled:opacity-60 active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>TRANSMITTING BRIEF...</span>
                          </>
                        ) : (
                          <>
                            <span>SUBMIT DESIGN REQUEST</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Step 3: Success Screen */
              <div className="py-4 sm:py-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mb-4 text-emerald-800 shadow-sm animate-scale-up">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>

                <div className="inline-flex items-center gap-2 mb-2 px-2.5 py-0.5 rounded-full bg-neutral-200/80 font-mono text-[10px] text-neutral-700 uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                  BRIEF CONFIRMED • {submissionId}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-950 tracking-tight">
                  Story Received. The Studio is on It.
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed font-sans">
                  Thank you, <strong className="text-neutral-900">{fullName}</strong>! Our design team has queued your concept. We will craft an original centre-front graphic for our 200 GSM black T-shirt and send an initial mock-up directly to <strong className="text-neutral-900">{email}</strong> within 48–72 hours.
                </p>

                {/* Brief Spec Sheet */}
                <div className="my-6 p-4 bg-[#DFDDD7]/70 rounded-xs border border-neutral-300 text-left w-full max-w-md space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-neutral-300 pb-1.5">
                    <span className="text-neutral-500 uppercase">CANVAS</span>
                    <span className="font-semibold text-neutral-900">200 GSM Black Combed Cotton</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-300 pb-1.5">
                    <span className="text-neutral-500 uppercase">PLACEMENT</span>
                    <span className="font-semibold text-neutral-900">Centre Front Print</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 uppercase">STUDIO STATUS</span>
                    <span className="font-semibold text-[#FF5722]">Queued for Artist Review</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3.5 bg-neutral-950 hover:bg-[#FF5722] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer min-h-[46px] shadow-sm active:scale-[0.98]"
                >
                  RETURN TO SHOP
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

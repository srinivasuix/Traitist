import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  // Handle keyboard Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const measurements = [
    { size: 'XS', chestIn: '38"', chestCm: '96.5 cm', lengthIn: '27"', lengthCm: '68.5 cm', shoulderIn: '18.5"', shoulderCm: '47 cm', sleeveIn: '8.0"', sleeveCm: '20.5 cm' },
    { size: 'S', chestIn: '40"', chestCm: '102 cm', lengthIn: '28"', lengthCm: '71 cm', shoulderIn: '19.5"', shoulderCm: '49.5 cm', sleeveIn: '8.5"', sleeveCm: '21.5 cm' },
    { size: 'M', chestIn: '42"', chestCm: '107 cm', lengthIn: '29"', lengthCm: '73.5 cm', shoulderIn: '20.5"', shoulderCm: '52 cm', sleeveIn: '9.0"', sleeveCm: '23 cm' },
    { size: 'L', chestIn: '44"', chestCm: '112 cm', lengthIn: '30"', lengthCm: '76 cm', shoulderIn: '21.5"', shoulderCm: '54.5 cm', sleeveIn: '9.5"', sleeveCm: '24 cm' },
    { size: 'XL', chestIn: '46"', chestCm: '117 cm', lengthIn: '31"', lengthCm: '78.5 cm', shoulderIn: '22.5"', shoulderCm: '57 cm', sleeveIn: '10.0"', sleeveCm: '25.5 cm' },
    { size: '2XL', chestIn: '48"', chestCm: '122 cm', lengthIn: '32"', lengthCm: '81 cm', shoulderIn: '23.5"', shoulderCm: '59.5 cm', sleeveIn: '10.5"', sleeveCm: '26.5 cm' },
    { size: '3XL', chestIn: '50"', chestCm: '127 cm', lengthIn: '33"', lengthCm: '83.5 cm', shoulderIn: '24.5"', shoulderCm: '62 cm', sleeveIn: '11.0"', sleeveCm: '28 cm' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sizeguide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="fixed inset-0 bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />
      <div data-lenis-prevent className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto bg-[#ECEBE6] rounded-sm p-4 sm:p-8 shadow-2xl border border-neutral-300 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5 text-neutral-800" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Ruler className="w-5 h-5 text-black" aria-hidden="true" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-semibold">
            FIT & SPECIFICATIONS
          </span>
        </div>
        <h2 id="sizeguide-title" className="text-2xl font-bold font-display text-neutral-950">
          Boxy Streetwear Fit Guide
        </h2>
        <p className="text-xs text-neutral-600 mt-1 font-sans">
          All Traitist tees are cut with an intentional drop-shoulder boxy drape in 240 GSM bio-washed heavy cotton.
        </p>

        {/* Units toggle */}
        <div className="flex items-center justify-between my-4 pt-4 border-t border-neutral-300">
          <span className="text-xs font-mono font-bold uppercase text-neutral-900">
            Garment Measurements
          </span>
          <div className="relative flex items-center bg-[#DFDDD7] p-1 rounded-sm border border-neutral-300" role="group" aria-label="Measurement units">
            <button
              type="button"
              aria-pressed={unit === 'inches'}
              onClick={() => setUnit('inches')}
              className={`relative z-10 px-3.5 py-1.5 min-h-[34px] text-xs font-mono font-semibold rounded-xs cursor-pointer transition-colors duration-150 ${
                unit === 'inches' ? 'text-white' : 'text-neutral-700 hover:text-black'
              }`}
            >
              {unit === 'inches' && (
                <motion.span
                  layoutId="active-unit-pill"
                  className="absolute inset-0 bg-neutral-950 rounded-xs -z-10 shadow-xs"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              INCHES
            </button>
            <button
              type="button"
              aria-pressed={unit === 'cm'}
              onClick={() => setUnit('cm')}
              className={`relative z-10 px-3.5 py-1.5 min-h-[34px] text-xs font-mono font-semibold rounded-xs cursor-pointer transition-colors duration-150 ${
                unit === 'cm' ? 'text-white' : 'text-neutral-700 hover:text-black'
              }`}
            >
              {unit === 'cm' && (
                <motion.span
                  layoutId="active-unit-pill"
                  className="absolute inset-0 bg-neutral-950 rounded-xs -z-10 shadow-xs"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              CENTIMETERS
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <caption className="visually-hidden">Traitist Boxy Fit Measurement Chart</caption>
            <thead>
              <tr className="border-b border-neutral-300 text-neutral-600 uppercase text-[10px]">
                <th scope="col" className="py-2 pr-3">Size</th>
                <th scope="col" className="py-2 px-3">Chest</th>
                <th scope="col" className="py-2 px-3">Length</th>
                <th scope="col" className="py-2 px-3">Shoulder</th>
                <th scope="col" className="py-2 pl-3">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-neutral-200/50">
                  <th scope="row" className="py-2.5 pr-3 font-bold text-neutral-900">{row.size}</th>
                  <td className="py-2.5 px-3 text-neutral-700">
                    {unit === 'inches' ? row.chestIn : row.chestCm}
                  </td>
                  <td className="py-2.5 px-3 text-neutral-700">
                    {unit === 'inches' ? row.lengthIn : row.lengthCm}
                  </td>
                  <td className="py-2.5 px-3 text-neutral-700">
                    {unit === 'inches' ? row.shoulderIn : row.shoulderCm}
                  </td>
                  <td className="py-2.5 pl-3 text-neutral-700">
                    {unit === 'inches' ? row.sleeveIn : row.sleeveCm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sizing recommendation */}
        <div className="mt-5 p-3.5 bg-[#DFDDD7] rounded border border-neutral-300 text-xs text-neutral-700 space-y-1 font-sans">
          <p className="font-bold text-neutral-900 font-mono uppercase text-[11px]">
            FIT RECOMMENDATION:
          </p>
          <p>
            • <strong>For signature relaxed streetwear drape:</strong> Pick your regular t-shirt size.
          </p>
          <p>
            • <strong>For standard traditional fit:</strong> Size down one size.
          </p>
          <p>• Pre-shrunk with enzyme wash. Minimal shrinkage after warm wash.</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full py-3 min-h-[44px] bg-black text-white text-xs font-mono uppercase tracking-widest font-semibold rounded-sm hover:bg-neutral-800 active:scale-[0.97] hover:scale-[1.01] transition-all duration-200 ease-out cursor-pointer shadow-sm"
        >
          Got It
        </button>
      </div>
    </div>
  );
};

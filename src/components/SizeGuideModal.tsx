import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const measurements = [
    { size: 'S', chestIn: '40"', chestCm: '102 cm', lengthIn: '28"', lengthCm: '71 cm', shoulderIn: '19.5"', shoulderCm: '49.5 cm', sleeveIn: '8.5"', sleeveCm: '21.5 cm' },
    { size: 'M', chestIn: '42"', chestCm: '107 cm', lengthIn: '29"', lengthCm: '73.5 cm', shoulderIn: '20.5"', shoulderCm: '52 cm', sleeveIn: '9.0"', sleeveCm: '23 cm' },
    { size: 'L', chestIn: '44"', chestCm: '112 cm', lengthIn: '30"', lengthCm: '76 cm', shoulderIn: '21.5"', shoulderCm: '54.5 cm', sleeveIn: '9.5"', sleeveCm: '24 cm' },
    { size: 'XL', chestIn: '46"', chestCm: '117 cm', lengthIn: '31"', lengthCm: '78.5 cm', shoulderIn: '22.5"', shoulderCm: '57 cm', sleeveIn: '10.0"', sleeveCm: '25.5 cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-lg w-full bg-[#ECEBE6] rounded-sm p-6 sm:p-8 shadow-2xl border border-neutral-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-200 transition cursor-pointer"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5 text-neutral-800" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Ruler className="w-5 h-5 text-black" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
            FIT & SPECIFICATIONS
          </span>
        </div>
        <h3 className="text-2xl font-bold font-display text-neutral-950">
          Boxy Streetwear Fit Guide
        </h3>
        <p className="text-xs text-neutral-600 mt-1 font-sans">
          All Traitist tees are cut with an intentional drop-shoulder boxy drape in 240 GSM bio-washed heavy cotton.
        </p>

        {/* Units toggle */}
        <div className="flex items-center justify-between my-4 pt-4 border-t border-neutral-300">
          <span className="text-xs font-mono font-bold uppercase text-neutral-900">
            Garment Measurements
          </span>
          <div className="flex items-center gap-1 bg-[#DFDDD7] p-1 rounded border border-neutral-300">
            <button
              onClick={() => setUnit('inches')}
              className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition ${
                unit === 'inches' ? 'bg-black text-white font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              INCHES
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition ${
                unit === 'cm' ? 'bg-black text-white font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              CENTIMETERS
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-300 text-neutral-500 uppercase text-[10px]">
                <th className="py-2 pr-3">Size</th>
                <th className="py-2 px-3">Chest</th>
                <th className="py-2 px-3">Length</th>
                <th className="py-2 px-3">Shoulder</th>
                <th className="py-2 pl-3">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-neutral-200/50">
                  <td className="py-2.5 pr-3 font-bold text-neutral-900">{row.size}</td>
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
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-black text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-neutral-800 transition cursor-pointer"
        >
          Got It
        </button>
      </div>
    </div>
  );
};

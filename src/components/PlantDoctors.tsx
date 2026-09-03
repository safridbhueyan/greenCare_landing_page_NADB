import React, { useState } from 'react';
import { DOCTORS } from '../data/mockData';
import type { Doctor } from '../types';
import { Stethoscope, Star, CheckCircle2, Video, X, Sparkles } from 'lucide-react';

interface PlantDoctorsProps {
  onOpenSubscription: () => void;
}

export const PlantDoctors: React.FC<PlantDoctorsProps> = ({ onOpenSubscription }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  return (
    <section id="plant-doctors" className="py-24 bg-[#F4F1EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E1E]/5 text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-[#3A7D44]" />
            <span>Human Expert Consultation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#132E1E]">
            When your plant needs{' '}
            <span className="font-serif-editorial italic font-normal text-[#2D6A4F]">
              more than AI.
            </span>
          </h2>

          <p className="text-base text-[#132E1E]/75 max-w-xl mx-auto">
            Connect with plant-care professionals, plant pathologists, and soil agronomists for 1-on-1 video guidance when you need expert intervention.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="card-organic p-6 bg-white flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-300 border border-[#132E1E]/10"
            >
              <div className="space-y-4">
                {/* Avatar & Badge */}
                <div className="relative flex items-center justify-between">
                  <div className="relative">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[#FAF8F5] shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#3A7D44] border-2 border-white" />
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-600 justify-end">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-sm text-[#132E1E]">{doctor.rating}</span>
                    </div>
                    <p className="text-xs text-[#132E1E]/50">({doctor.reviewsCount} reviews)</p>
                  </div>
                </div>

                {/* Doctor Bio */}
                <div>
                  <h3 className="text-xl font-bold text-[#132E1E]">{doctor.name}</h3>
                  <p className="text-xs font-semibold text-[#2D6A4F]">{doctor.title}</p>
                  <p className="text-xs font-medium text-[#52796F] mt-0.5">{doctor.specialty}</p>
                </div>

                <p className="text-xs text-[#132E1E]/70 leading-relaxed line-clamp-3">
                  {doctor.bio}
                </p>
              </div>

              {/* Status & Action */}
              <div className="pt-4 border-t border-[#132E1E]/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-[#2D6A4F] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#3A7D44]" />
                    <span>Available for consultation</span>
                  </span>
                  <span className="font-bold text-[#132E1E]">{doctor.experienceYears} yrs exp</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setBookingSuccess(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#132E1E] text-[#FAF8F5] font-semibold text-xs hover:bg-[#2D6A4F] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Video className="w-4 h-4 text-[#A3B18A]" />
                  <span>Book Consultation</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Booking Consultation Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-[#132E1E]/20 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#132E1E]/60 hover:text-[#132E1E] hover:bg-[#132E1E]/5"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSuccess ? (
              <>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedDoctor.avatar}
                    alt={selectedDoctor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#132E1E]/10"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#132E1E]">{selectedDoctor.name}</h3>
                    <p className="text-xs font-semibold text-[#2D6A4F]">{selectedDoctor.title}</p>
                    <p className="text-xs text-[#132E1E]/60">{selectedDoctor.consultationFee}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                      Select Preferred Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Today (4 PM)', 'Tomorrow (10 AM)', 'Friday (2 PM)'].map((slot, i) => (
                        <button
                          key={i}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            i === 0
                              ? 'bg-[#132E1E] text-white border-[#132E1E]'
                              : 'bg-white text-[#132E1E] border-[#132E1E]/10 hover:border-[#2D6A4F]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                      Brief Plant Problem Note
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe what issue your plant is experiencing..."
                      className="w-full p-3 rounded-xl bg-white border border-[#132E1E]/15 text-xs text-[#132E1E] focus:outline-none focus:border-[#2D6A4F]"
                      defaultValue="My Monstera has yellow spots on leaves that are spreading quickly."
                    />
                  </div>
                </div>

                <button
                  onClick={() => setBookingSuccess(true)}
                  className="w-full py-3.5 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#A3B18A]" />
                  <span>Confirm Consultation Booking</span>
                </button>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#A3B18A]/30 text-[#132E1E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#2D6A4F]" />
                </div>
                <h3 className="text-2xl font-bold text-[#132E1E]">Consultation Reserved!</h3>
                <p className="text-xs text-[#132E1E]/70 max-w-sm mx-auto">
                  A video call link with <span className="font-bold">{selectedDoctor.name}</span> has been created. Connect your GreenCare Premium account to join.
                </p>
                <button
                  onClick={() => {
                    setSelectedDoctor(null);
                    onOpenSubscription();
                  }}
                  className="px-6 py-3 rounded-full bg-[#132E1E] text-white text-xs font-semibold hover:bg-[#2D6A4F] transition-all"
                >
                  Unlock Premium to Join Call
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

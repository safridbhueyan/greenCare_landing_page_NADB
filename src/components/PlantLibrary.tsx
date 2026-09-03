import React, { useState } from 'react';
import { PLANTS_LIBRARY } from '../data/mockData';
import type { Plant } from '../types';
import { BookOpen, Search, Sun, Droplets, ShieldCheck, Sparkles, X, ChevronRight } from 'lucide-react';

interface PlantLibraryProps {
  onOpenSubscription: () => void;
}

export const PlantLibrary: React.FC<PlantLibraryProps> = ({ onOpenSubscription }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const categories = [
    { id: 'all', label: 'All Plants' },
    { id: 'indoor', label: 'Indoor Foliage' },
    { id: 'tropical', label: 'Tropicals' },
    { id: 'succulent', label: 'Succulents' },
    { id: 'herbs', label: 'Herbs & Edibles' },
  ];

  const filteredPlants = PLANTS_LIBRARY.filter((plant) => {
    const matchesCategory = activeCategory === 'all' || plant.category === activeCategory;
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="plant-library" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E1E]/5 text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#3A7D44]" />
            <span>Botanical Encyclopedia</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#132E1E]">
            A library for{' '}
            <span className="font-serif-editorial italic font-normal text-[#2D6A4F]">
              every plant lover.
            </span>
          </h2>

          <p className="text-base text-[#132E1E]/75 max-w-xl mx-auto">
            Comprehensive care guides, ideal soil mixes, light specifications, and watering cadences curated by expert agronomists.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#132E1E] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#F4F1EA] text-[#132E1E] hover:bg-[#132E1E]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#132E1E]/40" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#132E1E]/15 text-xs text-[#132E1E] focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>

        </div>

        {/* Plant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => setSelectedPlant(plant)}
              className="group card-organic overflow-hidden bg-white border border-[#132E1E]/10 cursor-pointer flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Plant Photography Viewport */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#E8ECE5]">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[11px] font-bold text-[#2D6A4F] shadow-2xs">
                    {plant.difficulty} friendly
                  </div>

                  {plant.petSafe && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#132E1E]/80 backdrop-blur-md text-[10px] font-semibold text-white flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#A3B18A]" />
                      <span>Pet Safe</span>
                    </div>
                  )}
                </div>

                {/* Info Card Content */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#132E1E] group-hover:text-[#2D6A4F] transition-colors">
                      {plant.name}
                    </h3>
                    <p className="text-xs font-serif-editorial italic text-[#52796F]">
                      {plant.scientificName}
                    </p>
                  </div>

                  <p className="text-xs text-[#132E1E]/70 line-clamp-2">
                    {plant.description}
                  </p>

                  <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#FAF8F5] border border-[#132E1E]/5">
                      <Sun className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span className="truncate text-[#132E1E]/80">{plant.light}</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#FAF8F5] border border-[#132E1E]/5">
                      <Droplets className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span className="truncate text-[#132E1E]/80">{plant.water}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Footer Action */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#2D6A4F] group-hover:translate-x-1 transition-transform">
                <span>View Full Care Guide</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenSubscription}
            className="px-8 py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#A3B18A]" />
            <span>Explore 5,000+ Species in Full Plant Library</span>
          </button>
        </div>

      </div>

      {/* Plant Detail Modal */}
      {selectedPlant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-3xl overflow-hidden border border-[#132E1E]/20 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            
            {/* Modal Image Banner */}
            <div className="relative aspect-16/9 bg-[#132E1E]">
              <img
                src={selectedPlant.image}
                alt={selectedPlant.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A3B18A]">
                  {selectedPlant.category}
                </span>
                <h3 className="text-3xl font-bold">{selectedPlant.name}</h3>
                <p className="text-sm font-serif-editorial italic text-white/80">
                  {selectedPlant.scientificName}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <p className="text-sm text-[#132E1E]/80 leading-relaxed">
                {selectedPlant.description}
              </p>

              {/* Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white border border-[#132E1E]/10">
                  <Sun className="w-5 h-5 mx-auto text-[#2D6A4F] mb-1" />
                  <span className="block text-[10px] uppercase font-bold text-[#52796F]">Light</span>
                  <span className="text-xs font-bold text-[#132E1E]">{selectedPlant.light}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#132E1E]/10">
                  <Droplets className="w-5 h-5 mx-auto text-[#2D6A4F] mb-1" />
                  <span className="block text-[10px] uppercase font-bold text-[#52796F]">Water</span>
                  <span className="text-xs font-bold text-[#132E1E]">{selectedPlant.water}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#132E1E]/10">
                  <ShieldCheck className="w-5 h-5 mx-auto text-[#2D6A4F] mb-1" />
                  <span className="block text-[10px] uppercase font-bold text-[#52796F]">Pet Safe</span>
                  <span className="text-xs font-bold text-[#132E1E]">{selectedPlant.petSafe ? 'Yes' : 'No'}</span>
                </div>
              </div>

              {/* Care Tips */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                  Care Instructions
                </h4>
                <ul className="space-y-2">
                  {selectedPlant.careTips.map((tip, idx) => (
                    <li key={idx} className="text-xs text-[#132E1E]/80 flex items-start gap-2 bg-white p-3 rounded-xl border border-[#132E1E]/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3A7D44] mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Soil & Propagation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#132E1E]/10 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#52796F]">Ideal Soil Recipe</span>
                  <p className="text-xs text-[#132E1E]/80">{selectedPlant.soilMix}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#132E1E]/10 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#52796F]">Propagation Method</span>
                  <p className="text-xs text-[#132E1E]/80">{selectedPlant.propagation}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPlant(null);
                  onOpenSubscription();
                }}
                className="w-full py-3.5 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-white font-semibold text-xs transition-all shadow-md"
              >
                Save {selectedPlant.name} to My Digital Garden
              </button>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import allDiseases from '../data/diseases.json';
import DiseaseHero from '../components/diseases/detail/DiseaseHero';
import QuickInfoBar from '../components/diseases/detail/QuickInfoBar';
import {
  DetailSymptomsCard,
  CausesCard,
  DetailTreatmentCard,
  DetailPreventionCard,
  AffectedStatesCard,
  DetailSidebar,
  RelatedDiseases,
} from '../components/diseases/detail/DetailComponents';
import LibraryCTABanner from '../components/diseases/LibraryCTABanner';

export default function DiseaseDetail() {
  const { slug } = useParams();
  const disease = allDiseases.find(d => d.slug === slug);

  if (!disease) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 font-nunito">
        <span className="text-[72px] mb-4">🔍</span>
        <h1 className="font-playfair font-bold text-[28px] text-[#1C1C1C] mb-2 text-center">Disease Not Found</h1>
        <p className="font-nunito text-[16px] text-gray-400 text-center mb-6">
          We couldn't find this disease in our library.
        </p>
        <Link
          to="/diseases"
          className="bg-[#1A6B2F] text-white font-nunito font-bold px-8 py-3 rounded-xl hover:bg-[#155824] transition-colors"
        >
          Browse All Diseases
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-nunito">
      {/* Hero */}
      <div className="pt-16">
        <DiseaseHero disease={disease} />
      </div>

      {/* Quick Info Bar */}
      <QuickInfoBar disease={disease} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Main Cards */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <DetailSymptomsCard disease={disease} />
            <CausesCard disease={disease} />
            <DetailTreatmentCard disease={disease} />
            <DetailPreventionCard disease={disease} />
            <AffectedStatesCard disease={disease} />
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:w-[320px] xl:w-[360px] flex-shrink-0">
            <DetailSidebar disease={disease} />
          </div>
        </div>
      </div>

      {/* Related Diseases */}
      <RelatedDiseases disease={disease} />

      {/* CTA */}
      <LibraryCTABanner />
    </div>
  );
}

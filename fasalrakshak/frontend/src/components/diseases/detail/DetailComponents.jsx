import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import allDiseases from '../../../data/diseases.json';
import { useLanguage } from '../../../context/LanguageContext';

const cardIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

// ─── Symptoms Card ───────────────────────────────────────────────
export const DetailSymptomsCard = ({ disease }) => {
  const { t, lang } = useLanguage();
  
  const PART_PROPS = {
    leaf: { label: t('disease.leaf'), bg: '#dcfce7', color: '#15803d', icon: '🍃' },
    stem: { label: t('disease.stem'), bg: '#fef3c7', color: '#92400e', icon: '🌿' },
    root: { label: t('disease.root'), bg: '#fed7aa', color: '#c2410c', icon: '🌱' },
    fruit: { label: t('disease.fruit'), bg: '#fee2e2', color: '#b91c1c', icon: '🍎' },
    flower: { label: t('disease.flower'), bg: '#fce7f3', color: '#be185d', icon: '🌸' },
  };

  const symptoms = disease[`symptoms_${lang.toLowerCase()}`] || disease.symptoms || [];

  return (
    <motion.div {...cardIn(0)} className="bg-white border border-[#E0EDD5] rounded-2xl overflow-hidden shadow-sm text-left">
      <div className="border-l-4 border-[#E53E3E] p-5 md:p-6">
        <h2 className="font-playfair font-bold text-[22px] text-[#1C1C1C] mb-4">🔍 {t('disease.symptoms')}</h2>

        {/* Affected parts */}
        <div className="flex gap-2 flex-wrap mb-5">
          {Object.entries(PART_PROPS).map(([key, p]) => {
            const active = disease.affectedParts?.includes(key);
            return (
              <motion.span
                key={key}
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.05 }}
                style={active ? { background: p.bg, color: p.color } : { background: '#f5f5f5', color: '#9ca3af' }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full font-nunito font-bold text-[13px]"
              >
                {p.icon} {p.label}
              </motion.span>
            );
          })}
        </div>

        <ul className="flex flex-col divide-y divide-[#F5F5F5]">
          {symptoms.map((s, i) => (
            <li key={i} className="flex items-start gap-3 py-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
              <span className="font-nunito text-[16px] text-[#1C1C1C] leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// ─── Causes Card ─────────────────────────────────────────────────
export const CausesCard = ({ disease }) => {
  const { t, lang } = useLanguage();
  const causes = disease[`causes_${lang.toLowerCase()}`] || disease.causes || [];
  const weather = disease[`weather_${lang.toLowerCase()}`] || disease.weatherConditions;

  return (
    <motion.div {...cardIn(0.05)} className="bg-white border border-[#E0EDD5] rounded-2xl overflow-hidden shadow-sm text-left">
      <div className="border-l-4 border-[#F5A623] p-5 md:p-6">
        <h2 className="font-playfair font-bold text-[22px] text-[#1C1C1C] mb-4">⚡ {t('disease.what_causes')}</h2>
        <ul className="flex flex-col divide-y divide-[#F5F5F5] mb-5">
          {causes.map((c, i) => (
            <li key={i} className="flex items-start gap-3 py-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span className="font-nunito text-[16px] text-[#1C1C1C] leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
        {weather && (
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex gap-3">
            <span className="text-2xl">☁️</span>
            <div className="text-left">
              <p className="font-nunito font-bold text-[15px] text-[#1E40AF] mb-1">{t('disease.weather')}</p>
              <p className="font-nunito text-[14px] text-[#1E40AF]">{weather}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Treatment Card ───────────────────────────────────────────────
export const DetailTreatmentCard = ({ disease }) => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: lang === 'HI' ? 'सभी' : lang === 'GUJ' ? 'બધા' : 'All' },
    { id: 'chemical', label: t('disease.chemical') },
    { id: 'organic', label: t('disease.organic') },
    { id: 'cultural', label: t('disease.cultural') }
  ];

  const treatments = disease[`treatments_${lang.toLowerCase()}`] || disease.treatments || [];
  const filtered = activeTab === 'all' ? treatments : treatments.filter(tr => tr.type === activeTab);
  const TYPE_COLORS = { chemical: 'bg-yellow-100 text-yellow-800', organic: 'bg-green-100 text-green-800', cultural: 'bg-blue-100 text-blue-800' };

  return (
    <motion.div {...cardIn(0.1)} className="bg-white border border-[#E0EDD5] rounded-2xl overflow-hidden shadow-sm text-left">
      <div className="border-l-4 border-[#1A6B2F] p-5 md:p-6">
        <h2 className="font-playfair font-bold text-[22px] text-[#1C1C1C] mb-4">💊 {t('disease.treatment_plan')}</h2>
        <div className="flex gap-2 flex-wrap mb-5">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`h-9 px-4 rounded-full font-nunito font-bold text-[13px] border transition-all ${activeTab === tab.id ? 'bg-[#1A6B2F] text-white border-[#1A6B2F]' : 'border-[#E0EDD5] text-[#1A6B2F] hover:bg-[#F0F7EC]'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {filtered.map((tr, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-[#F9F6EE] rounded-xl p-4 flex gap-4 text-left">
              <div className="w-9 h-9 bg-[#1A6B2F] text-white rounded-full flex items-center justify-center font-playfair font-bold flex-shrink-0">{tr.step}</div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <span className="font-nunito font-bold text-[16px] text-[#1C1C1C]">{tr.action}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-nunito font-bold text-[11px] ${TYPE_COLORS[tr.type]}`}>{t(`disease.${tr.type}`)}</span>
                </div>
                <p className="font-nunito text-[14px] text-gray-600 mb-1 leading-relaxed">{tr.detail}</p>
                <p className="font-nunito text-[12px] text-gray-400">⏱️ {tr.timing}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {(disease[`organicAlternative_${lang.toLowerCase()}`] || disease.organicAlternative) && (
          <div className="bg-[#F0FFF4] border border-[#1A6B2F]/40 rounded-xl p-4 flex gap-3 mt-5">
            <span className="text-2xl">🌿</span>
            <div className="text-left">
              <p className="font-nunito font-bold text-[15px] text-[#1A6B2F] mb-1">{t('disease.organic_alt')}</p>
              <p className="font-nunito text-[14px] text-[#1A6B2F]">{disease[`organicAlternative_${lang.toLowerCase()}`] || disease.organicAlternative}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Prevention Card ──────────────────────────────────────────────
export const DetailPreventionCard = ({ disease }) => {
  const { t, lang } = useLanguage();
  const tips = disease[`preventionTips_${lang.toLowerCase()}`] || disease.preventionTips || [];
  const firstAid = disease[`firstAid_${lang.toLowerCase()}`] || disease.firstAidTip;

  return (
    <motion.div {...cardIn(0.15)} className="bg-white border border-[#E0EDD5] rounded-2xl overflow-hidden shadow-sm text-left">
      <div className="border-l-4 border-[#2E8B57] p-5 md:p-6">
        <h2 className="font-playfair font-bold text-[22px] text-[#1C1C1C] mb-4">🛡️ {t('disease.prevent')}</h2>
        <ul className="flex flex-col divide-y divide-[#F5F5F5] mb-5">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 py-3">
              <span className="text-[#1A6B2F] text-lg flex-shrink-0">✅</span>
              <span className="font-nunito text-[16px] text-[#1C1C1C] leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
        {firstAid && (
          <div className="bg-[#FFFBF0] border border-[#F5A623] rounded-xl p-4 flex gap-3">
            <span className="text-2xl">🚑</span>
            <div className="text-left">
              <p className="font-nunito font-bold text-[15px] text-[#92400e] mb-1">{t('disease.first_aid')}</p>
              <p className="font-nunito text-[14px] text-[#92400e]">{firstAid}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Affected States Card ─────────────────────────────────────────
export const AffectedStatesCard = ({ disease }) => {
  const { t, lang } = useLanguage();
  
  const stateMap = {
    'Gujarat': lang === 'HI' ? 'गुजरात' : lang === 'GUJ' ? 'ગુજરાત' : 'Gujarat',
    'Punjab': lang === 'HI' ? 'पंजाब' : lang === 'GUJ' ? 'પંજાબ' : 'Punjab',
    'Haryana': lang === 'HI' ? 'हरियाणा' : lang === 'GUJ' ? 'હરિયાણા' : 'Haryana',
    'Rajasthan': lang === 'HI' ? 'राजस्थान' : lang === 'GUJ' ? 'રાજસ્થાન' : 'Rajasthan',
    'Maharashtra': lang === 'HI' ? 'महाराष्ट्र' : lang === 'GUJ' ? 'મહારાષ્ટ્ર' : 'Maharashtra',
    'Madhya Pradesh': lang === 'HI' ? 'मध्य प्रदेश' : lang === 'GUJ' ? 'મધ્ય પ્રદેશ' : 'Madhya Pradesh',
    'Uttar Pradesh': lang === 'HI' ? 'उत्तर प्रदेश' : lang === 'GUJ' ? 'ઉત્તર પ્રદેશ' : 'Uttar Pradesh',
  };

  return (
    <motion.div {...cardIn(0.2)} className="bg-white border border-[#E0EDD5] rounded-2xl p-5 md:p-6 shadow-sm text-left">
      <h2 className="font-playfair font-bold text-[22px] text-[#1C1C1C] mb-4">📍 {t('disease.states')}</h2>
      <div className="flex flex-wrap gap-2">
        {(disease.states || []).map(state => (
          <span
            key={state}
            className={`font-nunito font-bold text-[13px] px-3 py-1.5 rounded-full border ${
              state === 'Gujarat'
                ? 'bg-[#1A6B2F] text-white border-[#1A6B2F]'
                : 'bg-[#F0F7EC] text-[#1A6B2F] border-[#E0EDD5]'
            }`}
          >
            {stateMap[state] || state}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Detail Sidebar ────────────────────────────────────────────────
export const DetailSidebar = ({ disease }) => {
  const { t, lang } = useLanguage();
  
  const similar = allDiseases
    .filter(d => d.id !== disease.id && (d.cropName === disease.cropName || d.diseaseType === disease.diseaseType))
    .slice(0, 3);

  const shareWhatsApp = () => {
    const displayName = disease[`name_${lang.toLowerCase()}`] || disease.name;
    const firstAid = disease[`firstAid_${lang.toLowerCase()}`] || disease.firstAidTip;
    const text = `🌿 ${t('disease.expert_title')}: ${displayName}%0A${firstAid}%0A${t('disease.expert_more')}: ${window.location.href}`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyTreatment = () => {
    const treatments = disease[`treatments_${lang.toLowerCase()}`] || disease.treatments || [];
    const text = treatments.map(tr => `${t('disease.step')} ${tr.step}: ${tr.action}\n${tr.detail}\n${t('disease.when')}: ${tr.timing}`).join('\n\n');
    navigator.clipboard.writeText(text);
  };

  const SEVE_DOT = { severe: 'bg-red-500', moderate: 'bg-amber-400', mild: 'bg-green-500' };

  return (
    <div className="flex flex-col gap-5 sticky top-24 text-left">
      {/* Quick Actions */}
      <div className="bg-white border border-[#E0EDD5] rounded-2xl p-5">
        <h3 className="font-playfair font-bold text-[18px] text-[#1C1C1C] mb-4">{t('disease.quick_actions')}</h3>
        <div className="flex flex-col gap-3">
          <Link to="/detect" className="bg-[#1A6B2F] text-white font-nunito font-bold text-[15px] h-12 flex items-center justify-center rounded-xl hover:bg-[#155824] transition-colors">{t('hero.scan_now')}</Link>
          <button onClick={shareWhatsApp} className="bg-[#25D366] text-white font-nunito font-bold text-[15px] h-12 flex items-center justify-center rounded-xl hover:opacity-90 transition-opacity">{t('disease.share_wa')}</button>
          <button onClick={copyTreatment} className="border-2 border-[#1A6B2F] text-[#1A6B2F] font-nunito font-bold text-[14px] h-11 flex items-center justify-center rounded-xl hover:bg-[#F0F7EC] transition-colors text-center px-2">{t('disease.copy_steps')}</button>
        </div>
      </div>

      {/* At a Glance */}
      <div className="bg-white border border-[#E0EDD5] rounded-2xl p-5">
        <h3 className="font-playfair font-bold text-[18px] text-[#1C1C1C] mb-4">{t('disease.glance')}</h3>
        <div className="flex flex-col gap-3">
          {[
            { label: t('disease.crop'), value: `${disease.cropEmoji} ${lang === 'HI' ? (disease.cropName === 'Wheat' ? 'गेहूं' : disease.cropName === 'Cotton' ? 'कपास' : disease.cropName) : lang === 'GUJ' ? (disease.cropName === 'Wheat' ? 'ઘઉં' : disease.cropName === 'Cotton' ? 'કપાસ' : disease.cropName) : disease.cropName}` },
            { label: t('disease.type'), value: t(`disease.${disease.diseaseType}`) || (disease.diseaseType.charAt(0).toUpperCase() + disease.diseaseType.slice(1)) },
            { label: t('disease.severity'), value: t(`disease.${disease.severity}`) || (disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)), dot: SEVE_DOT[disease.severity] },
            { label: t('disease.spreads_fast_label'), value: t(`disease.${disease.spreadRate}`) || (disease.spreadRate.charAt(0).toUpperCase() + disease.spreadRate.slice(1)) },
            { label: t('disease.season'), value: (disease.season || []).map(s => t(`season.${s.toLowerCase()}`) || s).join(', ') },
            { label: t('disease.yield_loss'), value: disease.estimatedYieldLoss },
            { label: t('disease.contagious'), value: disease.contagious ? `⚠️ ${lang === 'HI' ? 'हाँ' : lang === 'GUJ' ? 'હા' : 'Yes'}` : `✅ ${lang === 'HI' ? 'नहीं' : lang === 'GUJ' ? 'ના' : 'No'}` },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center text-[14px]">
              <span className="font-nunito text-gray-500">{row.label}</span>
              <div className="flex items-center gap-1.5">
                {row.dot && <span className={`w-2 h-2 rounded-full ${row.dot}`} />}
                <span className="font-nunito font-bold text-[#1C1C1C]">{row.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Diseases */}
      {similar.length > 0 && (
        <div className="bg-white border border-[#E0EDD5] rounded-2xl p-5">
          <h3 className="font-playfair font-bold text-[18px] text-[#1C1C1C] mb-4">{t('disease.similar')}</h3>
          <div className="flex flex-col gap-3">
            {similar.map(d => {
              const dName = d[`name_${lang.toLowerCase()}`] || d.name;
              return (
                <Link key={d.id} to={`/diseases/${d.slug}`} className="flex items-center gap-3 hover:bg-[#F9F6EE] p-2 rounded-xl transition-colors group">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#F0F7EC] flex items-center justify-center">
                    {d.thumbnailImage ? (
                      <img src={d.thumbnailImage} alt={dName} className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                    ) : (
                      <span className="text-2xl">{d.cropEmoji}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-nunito font-bold text-[14px] text-[#1C1C1C] truncate">{dName}</p>
                    <span className={`text-[11px] font-nunito ${d.severity === 'severe' ? 'text-red-500' : d.severity === 'moderate' ? 'text-amber-500' : 'text-green-600'}`}>● {t(`disease.${d.severity}`)}</span>
                  </div>
                  <span className="font-nunito text-[12px] text-[#1A6B2F] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              );
            })}
          </div>
          <Link to="/diseases" className="block text-center font-nunito font-bold text-[13px] text-[#1A6B2F] mt-4 hover:underline">
            {t('disease.view_all_crop')} →
          </Link>
        </div>
      )}
    </div>
  );
};

// ─── Related Diseases ─────────────────────────────────────────────
export const RelatedDiseases = ({ disease }) => {
  const { t, lang } = useLanguage();
  const related = allDiseases.filter(d => d.id !== disease.id && d.cropName === disease.cropName).slice(0, 6);
  if (!related.length) return null;

  const displayCropName = lang === 'HI' ? (disease.cropName === 'Wheat' ? 'गेहूं' : disease.cropName === 'Cotton' ? 'कपास' : disease.cropName) : 
                        lang === 'GUJ' ? (disease.cropName === 'Wheat' ? 'ઘઉં' : disease.cropName === 'Cotton' ? 'કપાસ' : disease.cropName) : 
                        disease.cropName;

  return (
    <section className="py-12 px-4 md:px-6 bg-[#F0F7EC] text-left">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair font-bold text-[26px] text-[#1C1C1C] mb-6">{lang === 'HI' ? `अन्य ${displayCropName} रोग` : lang === 'GUJ' ? `અન્ય ${displayCropName} રોગ` : `Other ${disease.cropName} Diseases`}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((d, i) => {
            const dName = d[`name_${lang.toLowerCase()}`] || d.name;
            return (
              <Link key={d.id} to={`/diseases/${d.slug}`}
                className="bg-white border border-[#E0EDD5] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex items-center gap-4 p-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#F0F7EC] flex items-center justify-center">
                  <img src={d.thumbnailImage} alt={dName} className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-playfair font-bold text-[16px] text-[#1C1C1C] truncate">{dName}</p>
                  <p className="font-nunito text-[13px] text-gray-500 truncate">{t(`disease.${d.diseaseType}`)}</p>
                </div>
                <span className="font-nunito font-bold text-[13px] text-[#1A6B2F] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};


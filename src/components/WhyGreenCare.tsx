import React from 'react';
import {
  ScanLine, Tractor, Home, TreePine, ShieldCheck,
  Zap, FlaskConical, Sprout, Globe,
} from 'lucide-react';

const reasons = [
  {
    icon: ScanLine,
    color: '#52B788',
    bg: 'rgba(82,183,136,0.12)',
    title: '175+ Disease Detection',
    desc: 'Instantly identify over 175 plant diseases from a single photo — fungal, bacterial, viral, and pest-related — with 98.4% AI accuracy.',
  },
  {
    icon: Home,
    color: '#A3B18A',
    bg: 'rgba(163,177,138,0.12)',
    title: 'Indoor Plants',
    desc: 'Monstera, Pothos, Peace Lily, Snake Plant & more. Keep your houseplants thriving with tailored care schedules and disease alerts.',
  },
  {
    icon: TreePine,
    color: '#74C69D',
    bg: 'rgba(116,198,157,0.12)',
    title: 'Outdoor & Garden Plants',
    desc: 'Roses, tomatoes, fruit trees, and garden beds. Diagnose outdoor diseases caused by weather, pests, and soil imbalances.',
  },
  {
    icon: Tractor,
    color: '#D4A017',
    bg: 'rgba(212,160,23,0.12)',
    title: 'Agricultural Support',
    desc: 'Built for farmers too. Detect crop diseases in rice, wheat, jute, and vegetables early — before they devastate your entire harvest.',
  },
  {
    icon: Zap,
    color: '#F4A261',
    bg: 'rgba(244,162,97,0.12)',
    title: 'Instant Results in Seconds',
    desc: 'No waiting. Point your camera, scan the leaf, and get a full diagnosis with treatment recommendations within 3 seconds.',
  },
  {
    icon: FlaskConical,
    color: '#80B918',
    bg: 'rgba(128,185,24,0.12)',
    title: 'Organic Treatment Plans',
    desc: 'Every diagnosis comes with eco-friendly, chemical-free treatment options first — protecting your soil, family, and environment.',
  },
  {
    icon: ShieldCheck,
    color: '#52B788',
    bg: 'rgba(82,183,136,0.1)',
    title: 'Prevent Crop Loss',
    desc: 'Early disease detection prevents up to 60% crop loss. GreenCare acts as your 24/7 field guard so problems never go unnoticed.',
  },
  {
    icon: Globe,
    color: '#A3B18A',
    bg: 'rgba(163,177,138,0.1)',
    title: 'Works Offline Too',
    desc: 'No internet? No problem. Core scanning features work offline — perfect for farmers in remote fields without reliable connectivity.',
  },
];

const stats = [
  { value: '175+', label: 'Plant Diseases Detected' },
  { value: '98.4%', label: 'AI Scan Accuracy' },
  { value: '500+', label: 'Plant Species Covered' },
  { value: '3 sec', label: 'Average Diagnosis Time' },
];

export const WhyGreenCare: React.FC = () => {
  return (
    <section
      id="why-greencare"
      style={{
        padding: '110px 0 120px',
        background: 'linear-gradient(175deg, #FAF8F5 0%, #EEF4EC 60%, #E0EEE6 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle decorative blobs */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(82,183,136,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(45,106,79,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: 'rgba(45,106,79,0.08)',
            border: '1px solid rgba(45,106,79,0.2)',
            marginBottom: '20px',
          }}>
            <Sprout size={14} color="#2D6A4F" />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#2D6A4F', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Why GreenCare?
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900,
            color: '#132E1E', lineHeight: 1.1, margin: '0 0 20px',
          }}>
            The plant doctor in your pocket —{' '}
            <em style={{
              background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontWeight: 400, fontStyle: 'italic',
            }}>
              for every grower.
            </em>
          </h2>

          <p style={{
            fontSize: '1.1rem', color: 'rgba(19,46,30,0.65)',
            maxWidth: '600px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Whether you're a home gardener, balcony plant lover, or a rice farmer — GreenCare detects
            <strong style={{ color: '#2D6A4F' }}> 175+ plant diseases</strong> across indoor, outdoor, and
            agricultural crops, giving you expert-level diagnosis in seconds.
          </p>
        </div>

        {/* ── STAT BAR ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '72px',
          boxShadow: '0 4px 40px rgba(19,46,30,0.1)',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              padding: '28px 20px',
              background: i % 2 === 0 ? '#132E1E' : '#1B4332',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, color: '#52B788', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(163,177,138,0.8)', marginTop: '6px', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── USE CASE CALLOUT BANNER ── */}
        <div style={{
          borderRadius: '24px',
          padding: '36px 40px',
          background: 'linear-gradient(135deg, #132E1E 0%, #2D6A4F 100%)',
          border: '1px solid rgba(82,183,136,0.2)',
          marginBottom: '64px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '32px',
          boxShadow: '0 20px 60px rgba(19,46,30,0.2)',
        }}>
          {[
            {
              icon: Home,
              color: '#A3B18A',
              title: 'Home & Indoor',
              points: ['Houseplants & succulents', 'Balcony & terrace gardens', 'Office plant collections'],
            },
            {
              icon: TreePine,
              color: '#74C69D',
              title: 'Outdoor Gardens',
              points: ['Flower beds & rose bushes', 'Vegetable patches', 'Fruit trees & shrubs'],
            },
            {
              icon: Tractor,
              color: '#D4A017',
              title: 'Agriculture & Farms',
              points: ['Rice, wheat & jute fields', 'Vegetable crop monitoring', 'Early blight & pest alerts'],
            },
          ].map(({ icon: Icon, color, title, points }) => (
            <div key={title}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={color} />
                </div>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#FAF8F5' }}>{title}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {points.map((p) => (
                  <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'rgba(250,248,245,0.7)' }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── REASONS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'white',
                border: '1px solid rgba(19,46,30,0.07)',
                boxShadow: '0 2px 20px rgba(19,46,30,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(19,46,30,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 20px rgba(19,46,30,0.05)';
              }}
              >
                <div style={{
                  width: '46px', height: '46px', borderRadius: '13px',
                  background: r.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '16px',
                }}>
                  <Icon size={22} color={r.color} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#132E1E', marginBottom: '8px' }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(19,46,30,0.62)', lineHeight: 1.7, margin: 0 }}>
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── AGRICULTURE HIGHLIGHT STRIP ── */}
        <div style={{
          marginTop: '64px',
          borderRadius: '20px',
          padding: '32px 40px',
          background: 'rgba(212,160,23,0.07)',
          border: '1px solid rgba(212,160,23,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'rgba(212,160,23,0.15)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Tractor size={26} color="#D4A017" />
          </div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#D4A017', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
              🌾 Agricultural Impact
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#132E1E', margin: '0 0 6px' }}>
              Helping Bangladesh's farmers protect their crops
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(19,46,30,0.65)', margin: 0, lineHeight: 1.6 }}>
              Bangladesh loses an estimated <strong>15–30% of crops annually</strong> to undetected plant diseases.
              GreenCare brings AI-powered early detection to every farmer's phone — detecting rice blast, jute anthracnose,
              tomato blight, and more <strong>before</strong> it spreads across the field.
            </p>
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0,
          }}>
            {['Rice & Wheat Blast', 'Jute Anthracnose', 'Tomato Early Blight', 'Mustard Downy Mildew'].map(crop => (
              <div key={crop} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 14px', borderRadius: '999px',
                background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.2)',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4A017' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#132E1E' }}>{crop}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


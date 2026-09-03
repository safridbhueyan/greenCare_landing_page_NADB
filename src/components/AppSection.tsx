import React, { useState, useRef } from 'react';
import {
  Smartphone,
  ScanLine,
  Bot,
  Users,
  Leaf,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import splash from '../assets/Screenshot_1788427643.png';
import home from '../assets/Screenshot_1788427685.png';
import homeScroll from '../assets/Screenshot_1788427691.png';
import aiDoctor from '../assets/Screenshot_1788427704.png';
import carbonDash from '../assets/Screenshot_1788427709.png';
import community from '../assets/Screenshot_1788427740.png';
import settings from '../assets/Screenshot_1788427743.png';

interface AppSectionProps {
  onOpenSubscription: () => void;
  onOpenDownload?: () => void;
}

const screens = [
  {
    id: 'home',
    label: 'Home Dashboard',
    icon: Smartphone,
    screenshot: home,
    description: 'Scan any plant instantly, track your daily streak, and access all features from one clean home screen.',
    accent: '#2D6A4F',
  },
  {
    id: 'scroll',
    label: 'Tips & Library',
    icon: Leaf,
    screenshot: homeScroll,
    description: 'Featured care tips and quick access to Library and History — your complete plant knowledge hub.',
    accent: '#3A7D44',
  },
  {
    id: 'ai',
    label: 'AI Doctor',
    icon: Bot,
    screenshot: aiDoctor,
    description: 'Chat with your AI Botanical Doctor about plant health, disease treatments, and watering schedules.',
    accent: '#1B4332',
  },
  {
    id: 'community',
    label: 'Community Feed',
    icon: Users,
    screenshot: community,
    description: 'Share your plants, discover what others are growing, and get advice from fellow plant lovers.',
    accent: '#52796F',
  },
  {
    id: 'carbon',
    label: 'Carbon Dashboard',
    icon: ScanLine,
    screenshot: carbonDash,
    description: 'Track your environmental impact — see how much CO₂ your plants are capturing in real time.',
    accent: '#40916C',
  },
];

export const AppSection: React.FC<AppSectionProps> = ({ onOpenSubscription, onOpenDownload }) => {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    if (index === active || isAnimating) return;
    setSlideDir(index > active ? 'right' : 'left');
    setIsAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(index);
      setIsAnimating(false);
    }, 240);
  };

  const prev = () => goTo(active > 0 ? active - 1 : screens.length - 1);
  const next = () => goTo(active < screens.length - 1 ? active + 1 : 0);

  const current = screens[active];

  return (
    <section style={{
      padding: '100px 0 120px',
      background: 'linear-gradient(160deg, #0A1F13 0%, #132E1E 55%, #1A3D27 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{
        position: 'absolute', top: '-150px', right: '-150px',
        width: '650px', height: '650px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58,125,68,0.16) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-120px',
        width: '550px', height: '550px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(45,106,79,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: 'rgba(163,177,138,0.12)',
            border: '1px solid rgba(163,177,138,0.2)',
            marginBottom: '20px',
          }}>
            <Smartphone size={14} color="#A3B18A" />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#A3B18A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Mobile App
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800,
            color: '#FAF8F5', lineHeight: 1.15, margin: '0 0 16px',
          }}>
            Everything your plants need,{' '}
            <em style={{
              background: 'linear-gradient(135deg, #52B788, #A3B18A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontWeight: 400,
            }}>
              in your pocket.
            </em>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(250,248,245,0.6)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            Real screenshots from the GreenCare app — diagnose plants, chat with AI, and grow with a community.
          </p>
        </div>

        {/* ── MAIN 3-COLUMN LAYOUT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px 1fr',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '56px',
        }}>

          {/* LEFT: description + feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div
              key={current.id + '_desc'}
              style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating
                  ? `translateX(${slideDir === 'right' ? '-14px' : '14px'})`
                  : 'translateX(0)',
                transition: 'opacity 0.24s ease, transform 0.24s ease',
              }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '4px 12px', borderRadius: '8px',
                background: `${current.accent}33`,
                border: `1px solid ${current.accent}55`,
                marginBottom: '12px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#A3B18A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {current.label}
                </span>
              </div>
              <p style={{ fontSize: '0.975rem', color: 'rgba(250,248,245,0.72)', lineHeight: 1.75, margin: 0 }}>
                {current.description}
              </p>
            </div>

            {screens.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', borderRadius: '14px',
                    border: isActive ? `1px solid ${s.accent}77` : '1px solid rgba(255,255,255,0.06)',
                    background: isActive ? `${s.accent}1a` : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer', textAlign: 'left',
                    transform: isActive ? 'translateX(5px)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '9px',
                    background: isActive ? `${s.accent}44` : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={15} color={isActive ? '#A3B18A' : 'rgba(250,248,245,0.35)'} />
                  </div>
                  <span style={{
                    fontSize: '13px', fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#FAF8F5' : 'rgba(250,248,245,0.45)',
                  }}>
                    {s.label}
                  </span>
                  {isActive && (
                    <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#52B788' }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* CENTER: 3-phone mockup stack */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '12px', position: 'relative' }}>

            {/* Left flanking phone */}
            <div style={{
              width: '100px', borderRadius: '24px',
              border: '6px solid rgba(255,255,255,0.1)', background: '#0d1f12',
              overflow: 'hidden',
              transform: 'scale(0.85) translateY(24px) rotate(-7deg)',
              opacity: 0.45, flexShrink: 0,
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}>
              <img src={splash} alt="" style={{ width: '100%', display: 'block', aspectRatio: '9/19.5', objectFit: 'cover' }} />
            </div>

            {/* Main center phone */}
            <div style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}>
              {/* Ambient glow */}
              <div style={{
                position: 'absolute', inset: '-24px', borderRadius: '56px',
                background: `radial-gradient(ellipse, ${current.accent}55 0%, transparent 65%)`,
                pointerEvents: 'none', transition: 'background 0.4s ease',
              }} />
              {/* Shell */}
              <div style={{
                width: '220px', borderRadius: '38px',
                border: '8px solid rgba(255,255,255,0.18)', background: '#0d1f12',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06)',
                position: 'relative',
              }}>
                {/* Notch */}
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '72px', height: '15px',
                  background: 'rgba(255,255,255,0.1)',
                  borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px',
                  zIndex: 10,
                }} />
                {/* Screenshot */}
                <div style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating
                    ? `translateX(${slideDir === 'right' ? '18px' : '-18px'})`
                    : 'translateX(0)',
                  transition: 'opacity 0.24s ease, transform 0.24s ease',
                }}>
                  <img
                    src={current.screenshot}
                    alt={current.label}
                    style={{ width: '100%', display: 'block', aspectRatio: '9/19.5', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
              </div>
            </div>

            {/* Right flanking phone */}
            <div style={{
              width: '100px', borderRadius: '24px',
              border: '6px solid rgba(255,255,255,0.1)', background: '#0d1f12',
              overflow: 'hidden',
              transform: 'scale(0.85) translateY(24px) rotate(7deg)',
              opacity: 0.45, flexShrink: 0,
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}>
              <img src={settings} alt="" style={{ width: '100%', display: 'block', aspectRatio: '9/19.5', objectFit: 'cover' }} />
            </div>
          </div>

          {/* RIGHT: stats + arrows + dots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '50K+', label: 'Plants Scanned' },
              { value: '95%',  label: 'AI Accuracy' },
              { value: '4.8★', label: 'App Rating' },
            ].map((stat) => (
              <div key={stat.label} style={{
                padding: '18px 22px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#52B788', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(250,248,245,0.45)', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              {[
                { fn: prev, icon: <ChevronLeft size={18} />, green: false },
                { fn: next, icon: <ChevronRight size={18} />, green: true },
              ].map(({ fn, icon, green }, i) => (
                <button key={i} onClick={fn} style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  border: green ? '1px solid rgba(82,183,136,0.4)' : '1px solid rgba(255,255,255,0.14)',
                  background: green ? 'rgba(82,183,136,0.12)' : 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: green ? '#52B788' : '#FAF8F5',
                }}>
                  {icon}
                </button>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {screens.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  width: i === active ? '22px' : '7px', height: '7px',
                  borderRadius: '999px', border: 'none', padding: 0, cursor: 'pointer',
                  background: i === active ? '#52B788' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.25s ease',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── THUMBNAIL STRIP + CTA ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '11px', color: 'rgba(250,248,245,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '4px' }}>
            All Screens
          </span>

          {screens.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} style={{
              width: '48px', borderRadius: '12px', padding: 0, border: 'none',
              outline: i === active ? '2px solid #52B788' : '2px solid rgba(255,255,255,0.1)',
              outlineOffset: '2px',
              overflow: 'hidden', cursor: 'pointer', background: 'none',
              transform: i === active ? 'scale(1.12)' : 'scale(1)',
              transition: 'transform 0.2s ease, outline-color 0.2s ease',
              boxShadow: i === active ? '0 0 16px rgba(82,183,136,0.45)' : 'none',
            }}>
              <img src={s.screenshot} alt={s.label} style={{
                width: '100%', display: 'block', aspectRatio: '9/19.5', objectFit: 'cover', objectPosition: 'top',
              }} />
            </button>
          ))}

          <div style={{ width: '1px', height: '56px', background: 'rgba(255,255,255,0.08)', margin: '0 6px' }} />

          <button onClick={onOpenDownload || onOpenSubscription} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px 28px', borderRadius: '999px', border: 'none',
            background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
            color: '#FAF8F5', fontWeight: 700, fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(82,183,136,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(82,183,136,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(82,183,136,0.35)'; }}
          >
            <Download size={16} />
            Get GreenCare Free
          </button>
        </div>

      </div>
    </section>
  );
};

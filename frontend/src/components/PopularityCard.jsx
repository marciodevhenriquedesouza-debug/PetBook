import { useId } from 'react';
import './style/PopularityCard.css';

/**
 * PopularityCard
 *
 * Gauge semicircular (meia lua) com 3 níveis de popularidade.
 *
 * @param {number} popularity - Valor entre 0 e 100
 *
 * @example
 * <PopularityCard popularity={86} />
 */
export default function PopularityCard({ popularity = 30 }) {
  // Clamp e calcular rotação da agulha
  const v = Math.max(0, Math.min(100, Number(popularity)));
  const deg = v * 1.8 - 90;   // -90° (esq) → 0° (cima) → +90° (dir)
  const zone = v < 34 ? 0 : v < 67 ? 1 : 2;

  // IDs únicos por instância (evita conflito se o componente aparecer mais de uma vez)
  const uid = useId().replace(/:/g, '');
  const ID = {
    arcFill: `${uid}-arcFill`,
    glow1Clr: `${uid}-glow1Clr`,
    glow2Clr: `${uid}-glow2Clr`,
    glow3Clr: `${uid}-glow3Clr`,
    gf: `${uid}-gf`,
    ns: `${uid}-ns`,
    capG: `${uid}-capG`,
    textArc: `${uid}-textArc`,
  };

  // Estilos dinâmicos gerados a partir da zona ativa
  const glowStyle = (i) => ({
    opacity: i === zone ? 0.7 : 0,
    transition: 'opacity .5s ease',
  });

  const faceStyle = (i) => ({
    opacity: i === zone ? 1 : 0,
    fontSize: i === zone ? '24px' : '22px',
    transition: 'opacity .4s ease, font-size .4s ease',
  });

  const needleStyle = {
    transformOrigin: '130px 152px',
    transform: `rotate(${deg}deg)`,
    transition: 'transform .7s cubic-bezier(.34,1.56,.64,1)',
  };

  /*
   * Geometria do SVG  (viewBox="-5 0 270 172")
   *   Pivot / centro  : (130, 152)
   *   Raio do arco    : 88
   *   Espessura       : 52  →  borda externa r=114   borda interna r=62
   *   Raio texto      : 128 →  fora do arco, ~14 px de gap
   *
   *   Pontos-chave (ângulo CCW a partir de 3 h):
   *     180° (esq)  → (42,  152)
   *     120°        → (86,  75.8)   ← divisor Tímido / Bombando
   *      90° (topo) → (130, 64)
   *      60°        → (174, 75.8)   ← divisor Bombando / Arrasou!
   *       0° (dir)  → (218, 152)
   *
   *   Centro geométrico de cada segmento (para as carinhas):
   *     Tímido   150° → ( 54, 115)
   *     Bombando  90° → (130,  71)
   *     Arrasou!  30° → (206, 115)
   *
   *   Ticks radiais (outer → inner):
   *     120°: (73, 53.3) → (99,  98.3)
   *      60°: (187,53.3) → (161, 98.3)
   */

  return (
    <section className="popularity-card">
      <div className="popularity-head">
        <h3>Popularidade</h3>
        <div className="score">
          {v}<span>/100</span>
        </div>
      </div>

      <div className="gauge-wrap">
        <svg
          viewBox=" -20 10 270 185"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Popularidade: ${v} de 100`}
          role="img"
        >
          <defs>
            {/* Degradê contínuo lilás claro → lilás escuro */}
            <linearGradient
              id={ID.arcFill}
              gradientUnits="userSpaceOnUse"
              x1="42" y1="152" x2="218" y2="152"
            >
              <stop offset="0%" stopColor="#d4b8ff" />
              <stop offset="33%" stopColor="#b08ef5" />
              <stop offset="66%" stopColor="#8455d8" />
              <stop offset="100%" stopColor="#4f1f9a" />
            </linearGradient>

            {/* Cores de glow por segmento */}
            <linearGradient id={ID.glow1Clr}
              gradientUnits="userSpaceOnUse"
              x1="42" y1="152" x2="86" y2="75.8">
              <stop offset="0%" stopColor="#e0caff" />
              <stop offset="100%" stopColor="#c09eff" />
            </linearGradient>
            <linearGradient id={ID.glow2Clr}
              gradientUnits="userSpaceOnUse"
              x1="86" y1="75.8" x2="174" y2="75.8">
              <stop offset="0%" stopColor="#b890ff" />
              <stop offset="100%" stopColor="#9565ee" />
            </linearGradient>
            <linearGradient id={ID.glow3Clr}
              gradientUnits="userSpaceOnUse"
              x1="174" y1="75.8" x2="218" y2="152">
              <stop offset="0%" stopColor="#9460e0" />
              <stop offset="100%" stopColor="#6025b8" />
            </linearGradient>

            {/* Halo de brilho no segmento ativo */}
            <filter id={ID.gf} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Sombra da agulha */}
            <filter id={ID.ns} x="-80%" y="-80%" width="260%" height="260%">
              <feDropShadow dx="0" dy="3" stdDeviation="3.5"
                floodColor="rgba(0,0,0,0.35)" />
            </filter>

            {/* Brilho do pivot */}
            <radialGradient id={ID.capG} cx="35%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e8d8ff" />
              <stop offset="100%" stopColor="#c4a0f0" />
            </radialGradient>
          </defs>

          {/* 1 — Trilha de fundo */}
          <path
            d="M 42,152 A 88,88 0 0,1 218,152"
            fill="none"
            stroke="#ece5ff"
            strokeWidth="56"
            strokeLinecap="round"
          />

          {/* 2 — Halos de glow (visíveis apenas no segmento ativo) */}
          <path d="M 42,152 A 88,88 0 0,1 86,75.8"
            fill="none" stroke={`url(#${ID.glow1Clr})`} strokeWidth="66"
            strokeLinecap="butt" filter={`url(#${ID.gf})`} style={glowStyle(0)} />
          <path d="M 86,75.8 A 88,88 0 0,1 174,75.8"
            fill="none" stroke={`url(#${ID.glow2Clr})`} strokeWidth="66"
            strokeLinecap="butt" filter={`url(#${ID.gf})`} style={glowStyle(1)} />
          <path d="M 174,75.8 A 88,88 0 0,1 218,152"
            fill="none" stroke={`url(#${ID.glow3Clr})`} strokeWidth="66"
            strokeLinecap="butt" filter={`url(#${ID.gf})`} style={glowStyle(2)} />

          {/* 3 — Segmentos coloridos (sempre visíveis) */}
          {/* Tímido: 180° → 120° */}
          <path d="M 42,152 A 88,88 0 0,1 86,75.8"
            fill="none" stroke={`url(#${ID.arcFill})`} strokeWidth="52" strokeLinecap="butt" />
          {/* Bombando: 120° → 60° */}
          <path d="M 86,75.8 A 88,88 0 0,1 174,75.8"
            fill="none" stroke={`url(#${ID.arcFill})`} strokeWidth="52" strokeLinecap="butt" />
          {/* Arrasou!: 60° → 0° */}
          <path d="M 174,75.8 A 88,88 0 0,1 218,152"
            fill="none" stroke={`url(#${ID.arcFill})`} strokeWidth="52" strokeLinecap="butt" />

          {/* 4 — Ticks divisórios (linhas radiais brancas) */}
          <line x1="73" y1="53.3" x2="99" y2="98.3"
            stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="187" y1="53.3" x2="161" y2="98.3"
            stroke="white" strokeWidth="3.5" strokeLinecap="round" />

          {/* 5 — Texto curvo (fora do arco, r=128) */}
          <path id={ID.textArc} d="M 2,152 A 128,128 0 0,1 258,152" fill="none" />
          <text fontFamily="Inter, sans-serif" fontSize="10.5"
            fontWeight="800" fill="#7040b8" letterSpacing="0.6">
            <textPath href={`#${ID.textArc}`} startOffset="16.7%" textAnchor="middle">
              TÍMIDO
            </textPath>
          </text>
          <text fontFamily="Inter, sans-serif" fontSize="10.5"
            fontWeight="800" fill="#5d28a8" letterSpacing="0.6">
            <textPath href={`#${ID.textArc}`} startOffset="50%" textAnchor="middle">
              BOMBANDO
            </textPath>
          </text>
          <text fontFamily="Inter, sans-serif" fontSize="10.5"
            fontWeight="800" fill="#4a1890" letterSpacing="0.6">
            <textPath href={`#${ID.textArc}`} startOffset="83.3%" textAnchor="middle">
              ARRASOU!
            </textPath>
          </text>

          {/* 6 — Borda interna branca */}
          <path d="M 68,152 A 62,62 0 0,1 192,152"
            fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" />

          {/* 6b — Carinhas — apenas a zona ativa é visível */}
          {/* Tímido: 150° → (54, 115) */}
          <text x="54" y="115" fontSize="22" textAnchor="middle"
            dominantBaseline="middle" style={faceStyle(0)}>😶</text>
          {/* Bombando: 90° → (130, 71) */}
          <text x="130" y="71" fontSize="22" textAnchor="middle"
            dominantBaseline="middle" style={faceStyle(1)}>😊</text>
          {/* Arrasou!: 30° → (206, 115) */}
          <text x="206" y="115" fontSize="22" textAnchor="middle"
            dominantBaseline="middle" style={faceStyle(2)}>😍</text>

          {/* 7 — Agulha (bezier quadrático: larga na base, termina fina) */}
          <g filter={`url(#${ID.ns})`} style={needleStyle}>
            <path
              d="M 116,157 Q 128.5,115 130,82 Q 131.5,115 144,157 Z"
              fill="#0f0820"
            />
          </g>

          {/* 8 — Tampa do pivot (cobre a base da agulha) */}
          <circle cx="130" cy="152" r="26"
            fill={`url(#${ID.capG})`} stroke="white" strokeWidth="4" />
          <circle cx="130" cy="152" r="11" fill="#2a1050" />
          <circle cx="130" cy="152" r="4.5" fill="#9b72ef" />
        </svg>
      </div>
    </section>
  );
}
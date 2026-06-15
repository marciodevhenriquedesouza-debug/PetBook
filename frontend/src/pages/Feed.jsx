import { useState } from "react";
import "./Feed.css";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Icon({ name }) {
  const icons = {
    search: (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
    plus: (
      <svg {...iconProps}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    edit: (
      <svg {...iconProps}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </svg>
    ),
    home: (
      <svg {...iconProps}>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
    star: (
      <svg {...iconProps}>
        <path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.1-5.5-2.9L6.5 20l1.1-6.1-4.5-4.4 6.2-.9Z" />
      </svg>
    ),
    users: (
      <svg {...iconProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.1a4 4 0 0 1 0 7.8" />
      </svg>
    ),
    bell: (
      <svg {...iconProps}>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    ),
    mail: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    image: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="m21 15-4.5-4.5L5 19" />
      </svg>
    ),
    video: (
      <svg {...iconProps}>
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path d="m16 10 5-3v10l-5-3Z" />
      </svg>
    ),
    poll: (
      <svg {...iconProps}>
        <path d="M5 5v14" />
        <path d="M12 9v10" />
        <path d="M19 13v6" />
        <path d="M4 5h2" />
        <path d="M11 9h2" />
        <path d="M18 13h2" />
      </svg>
    ),
    pin: (
      <svg {...iconProps}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    dots: (
      <svg {...iconProps}>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    comment: (
      <svg {...iconProps}>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      </svg>
    ),
    share: (
      <svg {...iconProps}>
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
        <path d="m16 6-4-4-4 4" />
        <path d="M12 2v13" />
      </svg>
    ),
    bookmark: (
      <svg {...iconProps}>
        <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4Z" />
      </svg>
    ),
    heart: (
      <svg {...iconProps} fill="currentColor" strokeWidth="0">
        <path d="M12 21s-7-4.4-9.4-8.7C.8 9.1 2.7 5.5 6.2 5.2c2-.2 3.6.8 4.6 2.1 1-1.3 2.6-2.3 4.7-2.1 3.5.3 5.4 3.9 3.6 7.1C19 16.6 12 21 12 21Z" />
      </svg>
    ),
    play: (
      <svg {...iconProps} fill="currentColor" strokeWidth="0">
        <path d="M8 5v14l11-7Z" />
      </svg>
    ),
    paw: (
      <svg {...iconProps} fill="currentColor" strokeWidth="0">
        <circle cx="7.5" cy="8" r="2.2" />
        <circle cx="12" cy="5.8" r="2.2" />
        <circle cx="16.5" cy="8" r="2.2" />
        <circle cx="9" cy="13" r="2" />
        <circle cx="15" cy="13" r="2" />
        <path d="M12 12.4c3.6 0 6.4 2.2 6.4 5.1 0 1.9-1.2 3-3 2.5a10.5 10.5 0 0 0-6.8 0c-1.8.5-3-.6-3-2.5 0-2.9 2.8-5.1 6.4-5.1Z" />
      </svg>
    ),
  };

  return icons[name];
}

const stories = [
  {
    title: "Store Anterior",
    subtitle: "PetLovers",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=640&q=80",
    accent: "coral",
    cuteness: 76,
  },
  {
    title: "Store do Momento",
    subtitle: "Mia & Cia",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=640&q=80",
    accent: "teal",
    featured: true,
    cuteness: 94,
  },
  {
    title: "Próximo Store",
    subtitle: "VetCare",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=640&q=80",
    accent: "coral",
    cuteness: 68,
  },
  {
    title: "Aumigos da Rua",
    subtitle: "Adote Amor",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=640&q=80",
    accent: "teal",
    cuteness: 88,
  },
  {
    title: "Gatos em Alta",
    subtitle: "Clube Felino",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=640&q=80",
    accent: "coral",
    cuteness: 82,
  },
];

const suggestions = [
  [
    "Marina & Mel",
    "@mel.pug",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  ],
  [
    "Rafael PetCare",
    "@petcare",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  ],
  [
    "Ame Gatos",
    "@amegatos",
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=160&q=80",
  ],
  [
    "Pet da Ale",
    "@alepet",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
  ],
];

const posts = [
  {
    author: "Ana e Luna",
    avatar:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=160&q=80",
    time: "há 2h",
    text: "Passeio no parque e muita diversão! 🐾\nA vida é melhor com nossos melhores amigos!",
    media:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1200&q=85",
    type: "image",
    badge: "1/5",
    reactions: 128,
    comments: 23,
    shares: 12,
  },
  {
    author: "VetCare Oficial",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=160&q=80",
    time: "há 5h",
    text: "Dicas importantes para cuidar da saúde do seu pet! 🩺💙",
    media:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85",
    type: "video",
    reactions: 256,
    comments: 48,
    shares: 35,
  },
  {
    author: "PetLovers Brasil",
    avatar: null,
    time: "há 1d",
    text: "",
    type: "quote",
    reactions: 89,
    comments: 12,
    shares: 8,
  },
];

function Sidebar() {
  return (
    <aside className="feed-sidebar">
      <div className="feed-logo">
        <img src="/pets.png" alt="PetBook" />
      </div>

      <label className="feed-search">
        <Icon name="search" />
        <input type="search" placeholder="Buscar no PetBook..." />
      </label>

      <div className="quick-actions">
        <button type="button">
          <span>
            <Icon name="plus" />
          </span>
          Criar story
        </button>
        <button type="button">
          <span>
            <Icon name="edit" />
          </span>
          Criar publicação
        </button>
      </div>

      <nav className="feed-nav" aria-label="Navegação principal">
        <a className="active" href="#inicio">
          <Icon name="home" />
          Início
        </a>
        <a href="#favoritos">
          <Icon name="star" />
          Favoritos
        </a>
        <a href="#comunidades">
          <Icon name="users" />
          Comunidades
        </a>
      </nav>

      <section className="suggestions">
        <h2>Sugestões para você</h2>
        {suggestions.map(([name, handle, avatar]) => (
          <article className="suggestion" key={handle}>
            <img src={avatar} alt="" />
            <div>
              <strong>{name}</strong>
              <span>{handle}</span>
            </div>
            <button type="button">Seguir</button>
          </article>
        ))}
        <button className="see-all" type="button">
          Ver todas as sugestões
        </button>
      </section>
    </aside>
  );
}

function Stories() {
  const [activeStory, setActiveStory] = useState(1);
  const [cutenessVotes, setCutenessVotes] = useState(
    stories.map((story) => story.cuteness),
  );

  function goToStory(direction) {
    setActiveStory((current) => {
      const next = current + direction;

      if (next < 0) return stories.length - 1;
      if (next >= stories.length) return 0;

      return next;
    });
  }

  function getStoryAt(offset) {
    return (activeStory + offset + stories.length) % stories.length;
  }

  const visibleStories = [
    { position: "prev", index: getStoryAt(-1) },
    { position: "active", index: activeStory },
    { position: "next", index: getStoryAt(1) },
  ];

  const activeCuteness = cutenessVotes[activeStory];

  return (
    <section className="stories" aria-label="Stories">
      <button
        className="story-arrow story-arrow-left"
        type="button"
        aria-label="Story anterior"
        onClick={() => goToStory(-1)}
      >
        ‹
      </button>

      <div className="stories-track">
        {visibleStories.map(({ position, index }) => {
          const story = stories[index];

          return (
            <article
              className={`story-card ${position === "active" ? "featured" : ""} ${position}`}
              key={story.title}
            >
              <img src={story.image} alt="" />
              {/* <span className={`story-paw ${story.accent}`}>
                <Icon name="paw" />
              </span> */}
              <strong>{story.title}</strong>
              <p>{story.subtitle}</p>

              {position === "active" && (
                <div className="cuteness-panel">
                  <div className="cuteness-copy">
                    <span>Fofurômetro</span>
                    <strong>{activeCuteness}%</strong>
                  </div>
                  <label className="cuteness-slider">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={activeCuteness}
                      style={{ "--cuteness": `${activeCuteness}%` }}
                      aria-label={`Nota de fofura para ${story.title}`}
                      onChange={(event) => {
                        const nextVotes = [...cutenessVotes];
                        nextVotes[index] = Number(event.target.value);
                        setCutenessVotes(nextVotes);
                      }}
                    />
                  </label>
                  <div className="cuteness-scale">
                    <span>fofo</span>
                    <span>irresistível</span>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <button
        className="story-arrow story-arrow-right"
        type="button"
        aria-label="Próximo story"
        onClick={() => goToStory(1)}
      >
        ›
      </button>
    </section>
  );
}

function Composer({ usuario }) {
  return (
    <section className="composer">
      <div className="composer-top">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
          alt=""
        />
        <button type="button">
          No que você está pensando
          {usuario?.nome ? `, ${usuario.nome.split(" ")[0]}` : ""}?
        </button>
      </div>
      <div className="composer-actions">
        <button type="button">
          <Icon name="image" />
          Foto
        </button>
        <button type="button">
          <Icon name="video" />
          Vídeo
        </button>
        <button type="button">
          <Icon name="poll" />
          Enquete
        </button>
        <button type="button">
          <Icon name="pin" />
          Localização
        </button>
      </div>
    </section>
  );
}

function Post({ post }) {
  return (
    <article className="post-card">
      <header className="post-header">
        {post.avatar ? (
          <img className="post-avatar" src={post.avatar} alt="" />
        ) : (
          <span className="post-avatar brand-avatar">
            <Icon name="paw" />
          </span>
        )}
        <div>
          <h2>
            {post.author}
            {post.verified && <span className="verified">✓</span>}
          </h2>
          <p>{post.time} · 🌐</p>
        </div>
        <button className="icon-button" type="button" aria-label="Mais opções">
          <Icon name="dots" />
        </button>
      </header>

      {post.text && <p className="post-text">{post.text}</p>}

      {post.type === "quote" ? (
        <div className="quote-media">
          <span>
            “Um pet não é apenas
            <br />
            um animal, é família!”
          </span>
          <b>♥</b>
        </div>
      ) : (
        <div className={`post-media ${post.type}`}>
          <img src={post.media} alt="" />
          {post.badge && <span className="media-badge">{post.badge}</span>}
          {post.type === "video" && (
            <>
              <button
                className="play-button"
                type="button"
                aria-label="Reproduzir vídeo"
              >
                <Icon name="play" />
              </button>
              <div className="video-controls">
                <span>▶</span>
                <span>0:03 / 1:20</span>
                <i />
                <span>▰</span>
                <span>▣</span>
                <span>⛶</span>
              </div>
            </>
          )}
        </div>
      )}

      <footer className="post-footer">
        <div className="post-meta">
          <span className="reactions">
            <i>👍</i>
            <i>💙</i>
            <i>❤️</i>
            {post.reactions}
          </span>
          <span>{post.comments} comentários</span>
          <span>{post.shares} compartilhamentos</span>
        </div>
        <div className="post-actions">
          <button className="liked" type="button">
            <Icon name="heart" />
            Curtir
          </button>
          <button type="button">
            <Icon name="comment" />
            Comentar
          </button>
          <button type="button">
            <Icon name="share" />
            Compartilhar
          </button>
          <button type="button" aria-label="Salvar">
            <Icon name="bookmark" />
          </button>
        </div>
      </footer>
    </article>
  );
}

export default function Feed() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <main className="petbook-feed" id="inicio">
      <Sidebar />

      <section className="feed-content">
        <header className="topbar">
                    <img className="logoTopbar" src="/logo2.png" alt="" />

          <div />

          <button
            className="icon-button"
            type="button"
            aria-label="Notificações"
          >
            <Icon name="bell" />
          </button>
          <button className="icon-button" type="button" aria-label="Mensagens">
            <Icon name="mail" />
          </button>
          <button className="profile-button" type="button" aria-label="Perfil">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
              alt=""
            />
            <span>⌄</span>
          </button>
        </header>

        <Stories />
        <Composer usuario={usuario} />
        <section className="posts" aria-label="Publicações">
          {posts.map((post) => (
            <Post post={post} key={post.author} />
          ))}
        </section>
      </section>
    </main>
  );
}

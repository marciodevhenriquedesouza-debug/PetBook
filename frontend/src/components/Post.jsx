import { useState } from "react";
import "./style/Post.css";
import PopularityCard from "./PopularityCard";
import CreateMessageModal from "./messageUser";

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
        star: (
            <svg {...iconProps}>
                <path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.1-5.5-2.9L6.5 20l1.1-6.1-4.5-4.4 6.2-.9Z" />
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
        play: (
            <svg {...iconProps} fill="currentColor" strokeWidth="0">
                <path d="M8 5v14l11-7Z" />
            </svg>
        ),
    };

    return icons[name] ?? null;
}

export default function Post({ post }) {
    const [reactions, setReactions] = useState({
        amei: Math.max(18, Math.round(post.reactions * 0.38)),
        top: Math.max(12, Math.round(post.reactions * 0.25)),
        meh: Math.max(1, Math.round(post.reactions * 0.03)),
        ruim: 1,
    });
    const [activeReaction, setActiveReaction] = useState(null);
    const [modalAberto, setModalAberto] = useState(null);
    const [isSideActionActive, setIsSideActionActive] = useState(false);

    const totalReactions = Object.values(reactions).reduce(
        (total, value) => total + value,
        0,
    );

    const popularity = Math.min(
        99,
        Math.round(
            ((reactions.amei * 1.15 + reactions.top * 0.85 - reactions.ruim * 2) /
                Math.max(1, totalReactions)) *
            100,
        ),
    );

    const reactionOptions = [
        ["amei", { img: "/amei.gif" }],
        ["top", { img: "/top.gif" }],
        ["meh", { img: "/ruim.gif" }],
        ["ruim", { img: "/meh.gif" }],
    ];

    function addReaction(key) {
        const somCurtida = new Audio(
            "https://actions.google.com/sounds/v1/cartoon/pop.ogg",
        );
        somCurtida.volume = 0.5;
        somCurtida.play().catch(() => { });

        setActiveReaction((current) => (current === key ? null : key));
        setReactions((current) => ({
            ...current,
            [key]: current[key] + 1,
        }));
    }

    return (
        <article className="post-card">
            <section className="post-main">
                <header className="post-header">
                    {post.avatar ? (
                        <img
                            onClick={() => setModalAberto("message")}
                            className="post-avatar"
                            src={post.avatar}
                            alt=""
                        />
                    ) : (
                        <span className="post-avatar brand-avatar">
                            <Icon name="paw" />
                        </span>
                    )}
                    <div>
                        <h2>
                            {post.author}
                            {(post.verified || post.author === "Ana e Luna") && (
                                <span className="verified">✓</span>
                            )}
                        </h2>
                        <p>{post.time} · publico</p>
                    </div>
                    {post.text && <p className="post-text">{post.text}</p>}
                </header>

                {post.type === "quote" ? (
                    <div className="quote-media">
                        <span>
                            "ADOTE UM PET
                            <br />
                            um animal, é família!"
                        </span>
                    </div>
                ) : (
                    <figure className={`post-media ${post.type}`}>
                        <img src={post.media} alt="" />
                        {post.badge && <span className="media-badge">{post.badge}</span>}

                        <figcaption className="media-caption">
                            <button
                                className={`side-action ${isSideActionActive ? "primary" : ""}`}
                                type="button"
                                onClick={() => setIsSideActionActive((current) => !current)}
                            >
                                <Icon name="star" />
                            </button>
                        </figcaption>
                        {post.type === "video" && (
                            <>
                                <button
                                    className="play-button"
                                    type="button"
                                    aria-label="Reproduzir video"
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
                    </figure>
                )}
                <CreateMessageModal
                    isOpen={modalAberto === "message"}
                    onClose={() => setModalAberto(null)}
                    title="Envie uma Mensagem"
                />
            </section>

            <aside className="post-insights" aria-label="Reações e estatísticas do post">
                <p className="section-title">Reagir ao post</p>

                <div className="reaction-grid">
                    {reactionOptions.map(([key, emoji]) => (
                        <button
                            className={`reaction ${activeReaction === key ? "active-reaction" : ""}`}
                            type="button"
                            key={key}
                            onClick={() => addReaction(key)}
                        >
                            <b>
                                {typeof emoji === "object" ? (
                                    <img src={emoji.img} alt={key} style={{ width: 45, height: 45 }} />
                                ) : (
                                    emoji
                                )}
                                <strong>{reactions[key]}</strong>
                            </b>
                        </button>
                    ))}
                </div>

                <PopularityCard popularity={popularity} />

                <div className="side-actions">
                    <form className="comment-row">
                        <input type="text" placeholder="O que voçê achou deste post..." />
                        <button type="button">Enviar</button>
                    </form>
                </div>
            </aside>
        </article>
    );
}

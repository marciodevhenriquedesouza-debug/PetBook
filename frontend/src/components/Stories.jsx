import { useEffect, useRef, useState } from "react";
import "./style/Stories.css";

export default function Stories({ stories }) {
    const [activeStory, setActiveStory] = useState(1);
    const [direction, setDirection] = useState(null);
    const [cutenessVotes, setCutenessVotes] = useState(() => stories.map(() => 30));
    const autoRef = useRef(null);

    useEffect(() => {
        autoRef.current = setInterval(() => navigate(1), 10000);
        return () => clearInterval(autoRef.current);
    }, [activeStory]);

    function navigate(dir) {
        clearInterval(autoRef.current);
        setDirection(dir > 0 ? "right" : "left");
        setActiveStory((cur) => {
            const next = cur + dir;
            if (next < 0) return stories.length - 1;
            if (next >= stories.length) return 0;
            return next;
        });
    }

    function getAt(offset) {
        return (activeStory + offset + stories.length) % stories.length;
    }

    const visible = [
        { position: "prev", index: getAt(-1) },
        { position: "active", index: activeStory },
        { position: "next", index: getAt(1) },
    ];

    return (
        <section className="stories" aria-label="Stories">
            <button
                className="story-arrow story-arrow-left"
                type="button"
                aria-label="Story anterior"
                onClick={() => navigate(-1)}
            >
                ‹
            </button>

            <div className="stories-track">
                {visible.map(({ position, index }) => {
                    const story = stories[index];
                    const isActive = position === "active";
                    const cuteness = cutenessVotes[index];

                    return (
                        <article
                            className={`story-card ${isActive ? "featured" : ""} ${position}`}
                            key={`${story.title}-${position}`}
                            onClick={() => {
                                if (position === "prev") navigate(-1);
                                if (position === "next") navigate(1);
                            }}
                        >
                            <img src={story.image} alt={story.title} />

                            <strong>{story.title}</strong>
                            <p>{story.subtitle}</p>

                            {isActive && (
                                <div className="cuteness-panel">
                                    <div className="cuteness-copy">
                                        <span>🐾 Fofurômetro</span>
                                        <strong>{cuteness}%</strong>
                                    </div>
                                    <label className="cuteness-slider">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={cuteness}
                                            style={{ "--cuteness": `${cuteness}%` }}
                                            aria-label={`Nota de fofura para ${story.title}`}
                                            onChange={(e) => {
                                                const next = [...cutenessVotes];
                                                next[index] = Number(e.target.value);
                                                setCutenessVotes(next);
                                            }}
                                        />
                                    </label>
                                    <div className="cuteness-scale">
                                        <span>fofo</span>
                                        <span>irresistível ✨</span>
                                    </div>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "10px",
                    position: "relative",
                    zIndex: 5,
                }}
            >
                {stories.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Ir para story ${i + 1}`}
                        onClick={() => {
                            clearInterval(autoRef.current);
                            setActiveStory(i);
                        }}
                        style={{
                            width: i === activeStory ? "22px" : "8px",
                            height: "8px",
                            border: "none",
                            borderRadius: "999px",
                            background:
                                i === activeStory
                                    ? "linear-gradient(90deg, #8a5fe8, #2aa39d)"
                                    : "rgba(138, 95, 232, 0.22)",
                            cursor: "pointer",
                            padding: 0,
                            transition:
                                "width 0.35s cubic-bezier(0.34,1.36,0.64,1), background 0.35s",
                        }}
                    />
                ))}
            </div>

            <button
                className="story-arrow story-arrow-right"
                type="button"
                aria-label="Próximo story"
                onClick={() => navigate(1)}
            >
                ›
            </button>
        </section>
    );
}

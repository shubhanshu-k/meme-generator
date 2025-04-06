"use client";
import React, { useState, useEffect, useRef } from "react";
import MemeCard from "./components/MemeCard";
import { fetchMemes } from "./data/templates";
import styles from "./styles/Home.module.css";


export default function Home() {
  const [memes, setMemes] = useState<string[]>([]);
  const [visibleMemes, setVisibleMemes] = useState(50);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMemeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMemes = async () => {
      const images = await fetchMemes();
      setMemes(images);
    };
    loadMemes();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleMemes((prev) => prev + 5);
        }
      },
      { threshold: 1.0 }
    );
    if (lastMemeRef.current) observer.current.observe(lastMemeRef.current);
  }, [visibleMemes]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Indian Meme Generator</h1>
      <p className={styles.subheading}>Made with ❤️ by Csmy</p>
      <div className={styles.grid}>
        {memes.slice(0, visibleMemes).map((meme, index) => (
          <div key={index} ref={index === visibleMemes - 1 ? lastMemeRef : null}>
            <MemeCard imageUrl={meme} />
          </div>
        ))}
      </div>
    </div>
  );
}
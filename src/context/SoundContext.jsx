import { createContext, useContext, useEffect, useRef, useState } from "react";

import chillMusic from "../assets/sounds/chill-music.mp3";
import rainSound from "../assets/sounds/rain.wav";

const SoundContext = createContext(null);

const getStoredSettings = () =>
  JSON.parse(localStorage.getItem("pompom_settings") || "{}");

const TRACK_MAP = {
  rain: { src: rainSound, volKey: "rainVolume" },
};

export function SoundProvider({ children }) {
  const [musicOn, setMusicOn] = useState(false);
  const [activeAmbience, setActiveAmbience] = useState(null);

  const musicRef = useRef(null);
  const ambienceRef = useRef(null);

  const getVolume = (key, fallback) => {
    const stored = getStoredSettings();
    const raw = stored[key] ?? fallback;
    const vol = Number(raw) / 100;
    return Math.min(1, Math.max(0, vol));
  };

  const createAudio = (src, volume) => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;

    audio.addEventListener("loadedmetadata", () => {
      audio.volume = volume;
    });

    audio.play().then(() => {
      audio.volume = volume;
    }).catch(() => {});

    return audio;
  };

  const toggleMusic = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current = null;
      setMusicOn(false);
      return;
    }

    const volume = getVolume("pianoVolume", 40);
    musicRef.current = createAudio(chillMusic, volume);
    setMusicOn(true);
  };

  const toggleAmbience = (id) => {
    if (activeAmbience === id) {
      ambienceRef.current?.pause();
      ambienceRef.current = null;
      setActiveAmbience(null);
      return;
    }

    if (ambienceRef.current) {
      ambienceRef.current.pause();
      ambienceRef.current = null;
    }

    const track = TRACK_MAP[id];
    if (!track) return;

    const volume = getVolume(track.volKey, 40);
    ambienceRef.current = createAudio(track.src, volume);
    setActiveAmbience(id);
  };

  const refreshVolumes = () => {
    if (musicRef.current) {
      musicRef.current.volume = getVolume("pianoVolume", 40);
    }
    if (ambienceRef.current && activeAmbience) {
      const key = TRACK_MAP[activeAmbience].volKey;
      ambienceRef.current.volume = getVolume(key, 40);
    }
  };

  useEffect(() => {
    return () => {
      musicRef.current?.pause();
      ambienceRef.current?.pause();
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{ musicOn, activeAmbience, toggleMusic, toggleAmbience, refreshVolumes }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
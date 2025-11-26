import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

type PlayerTrack = {
  id: string;
  name: string;
  artist: string;
  image: string;
  preview: string;
};

type PlayerContextType = {
  currentTrack: PlayerTrack | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;

  queue: PlayerTrack[];
  setQueue: (tracks: PlayerTrack[]) => void;

  openPlayer: (track: PlayerTrack, queue?: PlayerTrack[]) => void;
  togglePlay: () => void;
  stop: () => void;

  nextTrack: () => void;
  prevTrack: () => void;

  shuffle: boolean;
  setShuffle: (v: boolean) => void;

  repeat: "off" | "one" | "all";
  setRepeat: (v: "off" | "one" | "all") => void;

  setProgress: (percent: number) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  // 🔥 Audio en baştan oluşturuluyor (null değil!)
  const audioRef = useRef(new Audio());

  const [currentTrack, setCurrentTrack] = useState<PlayerTrack | null>(null);
  const [queue, setQueue] = useState<PlayerTrack[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "one" | "all">("off");

  // ----------------------------
  // AUDIO EVENT LISTENERS
  // ----------------------------
  useEffect(() => {
    const audio = audioRef.current;

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgressState((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.onended = () => {
      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };
  }, [repeat]);

  // ----------------------------
  // TRACK AÇ
  // ----------------------------
  function openPlayer(track: PlayerTrack, list?: PlayerTrack[]) {
    if (list) setQueue(list);

    setCurrentTrack(track);

    const audio = audioRef.current;
    audio.src = track.preview;
    audio.play();

    setIsPlaying(true);
  }

  // ----------------------------
  // PLAY / PAUSE
  // ----------------------------
  function togglePlay() {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  // ----------------------------
  // STOP
  // ----------------------------
  function stop() {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }

  // ----------------------------
  // NEXT
  // ----------------------------
  function nextTrack() {
    if (!currentTrack || queue.length === 0) return;

    let index = queue.findIndex((t) => t.id === currentTrack.id);

    if (shuffle) {
      index = Math.floor(Math.random() * queue.length);
    } else {
      index++;
      if (index >= queue.length) {
        if (repeat === "all") index = 0;
        else return;
      }
    }

    openPlayer(queue[index], queue);
  }

  // ----------------------------
  // PREVIOUS
  // ----------------------------
  function prevTrack() {
    if (!currentTrack || queue.length === 0) return;

    let index = queue.findIndex((t) => t.id === currentTrack.id);

    index--;
    if (index < 0) index = 0;

    openPlayer(queue[index], queue);
  }

  // ----------------------------
  // SEEK BAR (SLIDER)
  // ----------------------------
  function setProgress(percent: number) {
    const audio = audioRef.current;

    if (!duration) return;
    const newTime = (percent / 100) * duration;

    audio.currentTime = newTime;
    setProgressState(percent);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        currentTime,

        queue,
        setQueue,

        openPlayer,
        togglePlay,
        stop,

        nextTrack,
        prevTrack,

        shuffle,
        setShuffle,

        repeat,
        setRepeat,

        setProgress,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("PlayerContext must be used inside PlayerProvider");
  return ctx;
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// Mock data for demonstration
const songs = [
  { title: "Song 1", artist: "Artist 1", src: "/path/to/song1.mp3" },
  { title: "Song 2", artist: "Artist 2", src: "/path/to/song2.mp3" },
  { title: "Song 3", artist: "Artist 3", src: "/path/to/song3.mp3" },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const skipToNext = () => {
    setCurrentSong((prevSong) => (prevSong + 1) % songs.length)
  }

  const skipToPrevious = () => {
    setCurrentSong((prevSong) => (prevSong - 1 + songs.length) % songs.length)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card text-card-foreground rounded-lg shadow-lg p-6">
      <audio
        ref={audioRef}
        src={songs[currentSong].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipToNext}
      />
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">{songs[currentSong].title}</h2>
        <p className="text-muted-foreground">{songs[currentSong].artist}</p>
      </div>
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <Button variant="outline" size="icon" onClick={skipToPrevious}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="default" size="icon" onClick={togglePlayPause}>
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button variant="outline" size="icon" onClick={skipToNext}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
# Generic_Music_Player
This music player component includes the following features:

1. Play/Pause toggle
2. Skip to next and previous tracks
3. Progress bar with current time and duration display
4. Song information display (title and artist)


Here's a breakdown of the component:

1. We use the `useState` hook to manage the player's state (playing status, current song, current time, and duration).
2. The `useRef` hook is used to reference the HTML5 audio element.
3. The `useEffect` hook is used to play or pause the audio when the `isPlaying` state or `currentSong` changes.
4. We have functions to toggle play/pause, skip to the next or previous song, and handle time updates.
5. The progress bar is implemented using the `Slider` component from shadcn/ui, allowing users to seek through the song.
6. We format the time display using a helper function `formatTime`.


To use this component, you would need to replace the mock `songs` array with your actual song data, including valid audio file paths.

Note that this is a client-side component, as indicated by the `"use client"` directive at the top. This is necessary because we're using browser APIs (audio playback) and React hooks that are not available in server components.

We can further enhance this music player by adding features like a playlist, volume control, or even integrating with a music streaming API for a more complete experience.

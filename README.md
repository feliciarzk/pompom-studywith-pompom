# PomPom
A cozy Pomodoro timer and study companion designed to help students stay focused, build productive study habits, and enjoy a relaxing study environment.
Built with React and Vite, PomPom combines a focus timer, study statistics, customizable settings, ambient background sound, and an animated companion character inside a warm aesthetic workspace.

---

## Live Demo
https://vercel.com/feliciarzks-projects/pompom-studywith-pompom

---

## Preview
PomPom provides:
- Focus & Break Timer
- Animated Study Companion
- Productivity Statistics
- Customizable Study Settings
- Ambient Focus Sound (Piano + Rain)
- Persistent Music Playback Across Pages
- Local Storage Persistence
- Responsive Layout (Desktop & Mobile)
- Cozy Study Room Interface

---

## Features
Pomodoro Timer
Stay productive using the Pomodoro technique.
- Focus mode
- Break mode
- Start / Pause / Reset / Skip controls
- Automatic session switching
- Motivational quote shown on the timer card

PomPom Companion
A cute animated companion that accompanies users during study sessions.
- Animated body movement
- Interactive visual presence
- Cozy study atmosphere

Statistics Dashboard
Track your study progress over time.
- Total focus hours
- Completed sessions
- Productivity score
- User level system
- Weekly progress overview
- Achievement badges that unlock based on real progress

Settings
Customize your study experience in real time — changes apply instantly, no save button needed.
- Focus duration
- Break duration
- Alarm volume
- Piano music volume
- Rain ambience volume

Sound System
Two independent audio layers that can be mixed together.
- Piano music (foreground)
- Rain ambience (background)
- Playback persists across page navigation (Home, Stats, Settings) via a shared audio context
- Volume adjusts live while dragging sliders in Settings

Data Persistence
User progress and settings are stored locally using browser Local Storage.

Responsive Design
- Sidebar navigation on desktop
- Bottom navigation bar on mobile
- Layout, font sizes, and spacing adapt to screen width

---

## Tech Stack
### Frontend
- React
- Vite
- React Router DOM
### Storage
- Local Storage API
### Audio
- HTML5 Audio API
- React Context (SoundContext) for persistent global playback
### Styling
- CSS
- Glassmorphism UI
- Responsive Layout

---

## 📁 Project Structure
```text
src/
│
├── assets/
│   ├── animation/
│   └── sounds/
│
├── components/
│   ├── Controls.jsx
│   ├── Pompom.jsx
│   ├── Sidebar.jsx
│   └── StatsCard.jsx
│
├── context/
│   └── SoundContext.jsx
│
├── hooks/
│   ├── usePomodoro.js
│   └── useIsMobile.js
│
├── pages/
│   ├── Home.jsx
│   ├── Background.jsx
│   ├── Stats.jsx
│   └── Settings.jsx
│
├── utils/
│   ├── formatTime.js
│   └── storage.js
│
├── App.jsx
└── main.jsx
```

---

## 📸 Screenshots
### Home
<img width="1507" height="760" alt="image" src="https://github.com/user-attachments/assets/8a0d40fb-6193-4bf3-8e4a-963c04bcb33c" />

### Statistics
<img width="1515" height="776" alt="image" src="https://github.com/user-attachments/assets/7a5b86ad-e24d-4ae4-8e44-2ae01ab9e694" />

### Settings
<img width="1527" height="762" alt="image" src="https://github.com/user-attachments/assets/40c2a38e-e6e9-4088-94e8-e5bf5384582d" />

---

## Future Improvements
Planned features for future versions:
- More ambient sound options (café, forest, white noise)
- Timer duration settings connected directly to the running timer
- Daily focus streaks
- More achievement badges
- Session history tracking
- Real weekly analytics based on actual session data
- Cloud synchronization
- Progressive Web App (PWA)

---

## What I Learned
Through this project I practiced:
- Building reusable React components
- Managing state with React Hooks
- Sharing state across routes using React Context
- Using React Router for navigation
- Persisting data with Local Storage
- Handling audio playback and real-time volume control
- Building responsive layouts for desktop and mobile
- Creating animated UI elements
- Designing productivity-focused applications
- Building and deploying modern web applications

---

## 👩‍💻 Author
Built by: Felicia Rizka Putri
📧 feliciarizkaputri@gmail.com

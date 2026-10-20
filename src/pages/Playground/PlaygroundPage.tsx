import { useState } from 'react'
import type { JSX } from 'react'
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Hash,
  Copy,
  Check,
  RefreshCw,
  Trophy,
  Sliders,
  CheckCircle2,
  Layers,
} from 'lucide-react'
import {
  Button,
  LetterCard,
  Input,
  Modal,
  TimeSetter,
  RadioButton,
  RadioGroup,
  LeaderboardPodium,
  LeaderboardList,
  Card,
} from '@/components/ui/index.ts'
import type { LeaderboardPlayer, RadioOption } from '@/components/ui/index.ts'

export function PlaygroundPage(): JSX.Element {
  // --- State for Interactive Controls ---

  // Alphabet state
  const [selectedGridLetter, setSelectedGridLetter] = useState<string>('S')
  const [usedLetters, setUsedLetters] = useState<string[]>(['B', 'D', 'N', 'V'])

  // Time setter state
  const [roundTime, setRoundTime] = useState<number>(50)
  const [roundCount, setRoundCount] = useState<number>(10)

  // Radio selection state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'name',
    'animal',
    'place',
    'things',
  ])
  const [standaloneChecked, setStandaloneChecked] = useState<boolean>(true)
  const [selectedTab, setSelectedTab] = useState<'this-round' | 'session'>('this-round')

  // Inputs state
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('favour_gamer')
  const [roundAnswer, setRoundAnswer] = useState<string>('Sade')
  const [roomCodeInput, setRoomCodeInput] = useState<string>('')
  const [isCopied, setIsCopied] = useState<boolean>(false)

  // Modals state
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false)
  const [isRoomCodeModalOpen, setIsRoomCodeModalOpen] = useState<boolean>(false)
  const [isReadyModalOpen, setIsReadyModalOpen] = useState<boolean>(false)
  const [isPickedModalOpen, setIsPickedModalOpen] = useState<boolean>(false)

  // Leaderboard mock players
  const leaderboardPlayers: LeaderboardPlayer[] = [
    { id: '1', name: 'Favour', score: 485, rank: 1, isCurrentPlayer: true },
    { id: '2', name: 'Esther', score: 370, rank: 2 },
    { id: '3', name: 'Ayomide', score: 475, rank: 3 },
    { id: '4', name: 'Olawale', score: 365, rank: 4 },
  ]

  const categoryRadioOptions: RadioOption[] = [
    { label: 'Name', value: 'name' },
    { label: 'Animal', value: 'animal' },
    { label: 'Place', value: 'place' },
    { label: 'Things', value: 'things' },
    { label: 'Food', value: 'food' },
    { label: 'Fruit', value: 'fruit' },
    { label: 'Subject', value: 'subject' },
    { label: 'Colors', value: 'colors' },
    { label: 'Scientific Element', value: 'scientific_element' },
  ]

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const handleCopyCode = (): void => {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const toggleUsedLetter = (letter: string): void => {
    setUsedLetters((prev) =>
      prev.includes(letter) ? prev.filter((l) => l !== letter) : [...prev, letter],
    )
  }

  return (
    <div className="min-h-screen bg-canvas text-game-text font-display selection:bg-game-primary selection:text-white pb-24">
      {/* Top Navbar matching Figma Header */}
      <header className="sticky top-0 z-30 bg-canvas/95 backdrop-blur-sm border-b-2 border-game-dark px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-game-brand">
            I Call On
          </h1>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold bg-banner text-game-brand border-2 border-game-dark px-2.5 py-0.5 rounded-full shadow-tactile-2">
            <Sparkles className="w-3 h-3 text-game-primary" /> UI Component Playground
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-game-brand">Favour</span>
          <div className="w-8 h-8 rounded-full border-2 border-game-dark bg-game-primary text-white flex items-center justify-center font-extrabold text-sm shadow-tactile-2">
            F
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* Intro Hero Banner */}
        <div className="bg-white border-3 border-game-dark rounded-3xl p-6 sm:p-8 shadow-tactile-6 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-game-primary mb-1">
              Design System & Reusable Components
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-game-text leading-tight">
              Interactive Component Showcase
            </h2>
            <p className="text-base text-game-muted mt-2 font-medium">
              Every component below was carefully crafted to faithfully recreate the tactile, playful aesthetic from the Figma mockups—using custom theme variables, smooth clay bevels, and crisp borders.
            </p>
          </div>

          {/* Decorative Letter Cards Floating in Corner */}
          <div className="hidden lg:flex items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2 opacity-95">
            <LetterCard letter="N" label="ame" variant="category" categoryColor="name" tilt="left-strong" size="md" />
            <LetterCard letter="P" label="lace" variant="category" categoryColor="place" tilt="right-subtle" size="md" />
            <LetterCard letter="A" label="nimal" variant="category" categoryColor="animal" tilt="left-subtle" size="md" />
            <LetterCard letter="T" label="hings" variant="category" categoryColor="things" tilt="right-strong" size="md" />
          </div>
        </div>

        {/* SECTION 1: LETTER CARDS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-game-dark/15 pb-2">
            <Layers className="w-5 h-5 text-game-primary" />
            <h3 className="text-2xl font-extrabold text-game-text">1. Letter Cards</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Landing Category Tiles */}
            <Card title="Category Tiles (Landing Page)" subtitle="Tactile 3D clay tiles with category labels and tilt">
              <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                <LetterCard letter="N" label="ame" variant="category" categoryColor="name" tilt="left-strong" size="md" />
                <LetterCard letter="P" label="lace" variant="category" categoryColor="place" tilt="right-subtle" size="md" />
                <LetterCard letter="A" label="nimal" variant="category" categoryColor="animal" tilt="left-subtle" size="md" />
                <LetterCard letter="T" label="hings" variant="category" categoryColor="things" tilt="right-strong" size="md" />
              </div>
              <p className="text-xs text-center text-game-muted mt-2">
                Click any tile to test active press animations!
              </p>
            </Card>

            {/* Display Badge Letter Cards */}
            <Card title="Display Badges" subtitle="Large square tiles for round letters & modal highlights">
              <div className="flex items-center justify-center gap-5 py-4">
                <div className="text-center">
                  <LetterCard letter="S" variant="display" size="lg" tilt="left-subtle" />
                  <p className="text-xs font-semibold text-game-muted mt-2">Active Letter (Large)</p>
                </div>
                <div className="text-center">
                  <LetterCard letter="M" variant="display" size="md" tilt="right-subtle" />
                  <p className="text-xs font-semibold text-game-muted mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <LetterCard letter="?" variant="display" size="sm" tilt="none" />
                  <p className="text-xs font-semibold text-game-muted mt-2">Waiting (?)</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Alphabet Grid Picker */}
          <Card
            title="Alphabet Grid (Game Letter Selector)"
            subtitle={`Selected: "${selectedGridLetter}" | Used: [${usedLetters.join(', ')}] — Click letters to select, or toggle "used" status`}
            headerAction={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUsedLetters(['B', 'D', 'N', 'V'])}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Reset Grid
              </Button>
            }
          >
            <div className="flex flex-wrap gap-2.5 justify-center py-4 max-w-3xl mx-auto">
              {alphabet.map((letter) => {
                const isSelected = selectedGridLetter === letter
                const isUsed = usedLetters.includes(letter)

                return (
                  <LetterCard
                    key={letter}
                    letter={letter}
                    variant="grid"
                    size="md"
                    state={isSelected ? 'selected' : isUsed ? 'used' : 'default'}
                    onSelectLetter={(char) => {
                      setSelectedGridLetter(char)
                    }}
                  />
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t-2 border-game-dark/10 text-xs font-semibold text-game-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border border-game-dark bg-white inline-block" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border border-game-dark bg-game-primary inline-block" /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border border-game-border-disabled bg-surface-disabled inline-block" /> Used
              </span>
              <button
                type="button"
                onClick={() => toggleUsedLetter(selectedGridLetter)}
                className="text-game-brand hover:underline cursor-pointer"
              >
                Toggle &ldquo;{selectedGridLetter}&rdquo; used state
              </button>
            </div>
          </Card>
        </section>

        {/* SECTION 2: BUTTONS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-game-dark/15 pb-2">
            <Sliders className="w-5 h-5 text-game-primary" />
            <h3 className="text-2xl font-extrabold text-game-text">2. Buttons</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary & Game CTAs */}
            <Card title="Primary & Game Buttons" subtitle="Features the glossy top gel shine effect from Figma">
              <div className="flex flex-col gap-3 py-2">
                <Button variant="primary" size="lg" fullWidth>
                  Start Game
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="primary" size="md">
                    Submit Answers
                  </Button>
                  <Button variant="primary" size="md">
                    Next Round
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="primary" size="sm">
                    Confirm
                  </Button>
                  <Button variant="primary" size="sm" isLoading>
                    Loading
                  </Button>
                  <Button variant="primary" size="sm" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            </Card>

            {/* Secondary, Segmented & Links */}
            <Card title="Secondary, Tabs & Links" subtitle="Clean outlined actions, segmented tabs & link styles">
              <div className="flex flex-col gap-3 py-2">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" size="md">
                    Google
                  </Button>
                  <Button variant="secondary" size="md">
                    Apple
                  </Button>
                </div>

                <Button variant="secondary" size="md" fullWidth>
                  Leave Room
                </Button>

                {/* Segmented Tab Switch (from Round 3 Result mockup) */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Button
                    variant="tab"
                    size="md"
                    isActive={selectedTab === 'this-round'}
                    onClick={() => setSelectedTab('this-round')}
                  >
                    This round
                  </Button>
                  <Button
                    variant="tab"
                    size="md"
                    isActive={selectedTab === 'session'}
                    onClick={() => setSelectedTab('session')}
                  >
                    Session
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 pt-1">
                  <span className="text-sm text-game-muted">New here?</span>
                  <Button variant="link" size="sm">
                    Create an account
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 3: INPUT FIELDS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-game-dark/15 pb-2">
            <Mail className="w-5 h-5 text-game-primary" />
            <h3 className="text-2xl font-extrabold text-game-text">3. Input Fields</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Auth & Form Inputs" subtitle="Inputs with icons, password peek toggle, and labels">
              <div className="space-y-4 py-2">
                <Input
                  label="Username"
                  placeholder="just_kyylaa.r"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="your password"
                  allowPasswordToggle
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
              </div>
            </Card>

            <Card title="Game Inputs & States" subtitle="Category round inputs, error validations, and disabled states">
              <div className="space-y-4 py-2">
                <Input
                  label="Name starts with S"
                  placeholder="e.g. Sade"
                  value={roundAnswer}
                  onChange={(e) => setRoundAnswer(e.target.value)}
                  helperText="Press Enter or tab to move to next category"
                />

                <Input
                  label="Room code"
                  placeholder="KQ7F2"
                  value={roomCodeInput}
                  onChange={(e) => setRoomCodeInput(e.target.value)}
                  leftIcon={<Hash className="w-4 h-4" />}
                />

                <Input
                  label="Invalid Entry Example"
                  defaultValue="xyz123"
                  error="Word not found in dictionary for letter S"
                />

                <Input
                  label="Disabled Input"
                  defaultValue="Locked during countdown"
                  disabled
                />
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 4: PLUS-MINUS TIME SETTER */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-game-dark/15 pb-2">
            <Sliders className="w-5 h-5 text-game-primary" />
            <h3 className="text-2xl font-extrabold text-game-text">4. Plus Minus Time Setter</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Time Per Round Stepper" subtitle="Minutes & seconds format (step: 5s, min: 10s, max: 180s)">
              <div className="py-4 space-y-4">
                <TimeSetter
                  label="Time per round"
                  value={roundTime}
                  onChange={setRoundTime}
                  min={10}
                  max={180}
                  step={5}
                  format="time"
                />
                <div className="bg-canvas border border-game-dark/15 rounded-xl p-3 text-xs text-game-muted flex justify-between">
                  <span>Current raw value: <strong className="text-game-text">{roundTime} seconds</strong></span>
                  <span>Use arrow keys to adjust</span>
                </div>
              </div>
            </Card>

            <Card title="Rounds Count Stepper" subtitle="Integer format (step: 1, min: 1, max: 20)">
              <div className="py-4 space-y-4">
                <TimeSetter
                  label="Number of rounds"
                  value={roundCount}
                  onChange={setRoundCount}
                  min={1}
                  max={20}
                  step={1}
                  format="number"
                />
                <div className="flex items-center gap-3 pt-1">
                  <Button
                    variant="tab"
                    size="sm"
                    isActive={roundCount === 10}
                    onClick={() => setRoundCount(10)}
                  >
                    Default (10)
                  </Button>
                  <Button
                    variant="tab"
                    size="sm"
                    isActive={roundCount === 5}
                    onClick={() => setRoundCount(5)}
                  >
                    Quick (5)
                  </Button>
                  <Button
                    variant="tab"
                    size="sm"
                    isActive={roundCount === 15}
                    onClick={() => setRoundCount(15)}
                  >
                    Long (15)
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 5: RADIO BUTTONS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-game-dark/15 pb-2">
            <CheckCircle2 className="w-5 h-5 text-game-primary" />
            <h3 className="text-2xl font-extrabold text-game-text">5. Radio Buttons</h3>
          </div>

          <Card
            title="Game Categories Selection"
            subtitle="Custom terracotta inner dot and dark circular boundary with multi-selection support"
          >
            <div className="py-2">
              <RadioGroup
                name="categories"
                label="Select Categories (Multi-select)"
                options={categoryRadioOptions}
                multiple
                value={selectedCategories}
                onChange={setSelectedCategories}
                columns={3}
              />
            </div>

            <div className="mt-6 pt-4 border-t-2 border-game-dark/10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-bold text-game-text">
                Active Categories ({selectedCategories.length}):{' '}
                <span className="text-game-primary uppercase">
                  {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'None'}
                </span>
              </p>

              <div className="flex items-center gap-4">
                <RadioButton
                  name="demo"
                  label="Interactive Toggle"
                  checked={standaloneChecked}
                  onChange={(e) => setStandaloneChecked(e.target.checked)}
                />
                <RadioButton
                  name="demo2"
                  label="Standalone Unchecked"
                  checked={false}
                  readOnly
                />
                <RadioButton
                  name="demo3"
                  label="Disabled"
                  disabled
                  checked={true}
                  readOnly
                />
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 6: MODALS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-game-dark/15 pb-2">
            <Layers className="w-5 h-5 text-game-primary" />
            <h3 className="text-2xl font-extrabold text-game-text">6. Modals</h3>
          </div>

          <Card
            title="Modal Dialog Triggers"
            subtitle="Click any button below to launch the authentic game dialogs from the mockups"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 py-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsLetterModalOpen(true)}
              >
                &ldquo;You Picked S&rdquo; Modal
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsRoomCodeModalOpen(true)}
              >
                &ldquo;Room Code&rdquo; Modal
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsReadyModalOpen(true)}
              >
                &ldquo;Get Ready&rdquo; Modal
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsPickedModalOpen(true)}
              >
                &ldquo;Favour Picked&rdquo; Modal
              </Button>
            </div>
          </Card>
        </section>

        {/* SECTION 7: BAR CHART LEADERBOARD & PODIUM */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-game-dark/15 pb-2">
            <Trophy className="w-5 h-5 text-game-primary" />
            <h3 className="text-2xl font-extrabold text-game-text">7. Bar Chart Leaderboard</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Bar Chart Podium */}
            <div className="lg:col-span-7 bg-white border-3 border-game-dark rounded-3xl p-6 sm:p-8 shadow-tactile-6 flex flex-col justify-between text-center">
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-game-text">
                  Game over!
                </h3>
                <p className="text-sm font-semibold text-game-muted mt-1">
                  Favour takes her crown after 10 rounds
                </p>
              </div>

              {/* Podium */}
              <div className="my-6">
                <LeaderboardPodium
                  topPlayers={[leaderboardPlayers[0], leaderboardPlayers[1], leaderboardPlayers[2]]}
                />
              </div>

              <div className="flex items-center justify-center gap-3 pt-4 border-t-2 border-game-dark/10">
                <Button variant="primary" size="md">
                  Play again
                </Button>
                <Button variant="secondary" size="md">
                  Leave room
                </Button>
              </div>
            </div>

            {/* Scoreboard List */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <LeaderboardList
                players={leaderboardPlayers}
                title="Round Standings"
              />
            </div>
          </div>
        </section>

        {/* SECTION 8: ASSEMBLED FIGMA SCREEN DEMO */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-game-dark/15 pb-2">
            <Sparkles className="w-5 h-5 text-game-primary" />
            <h3 className="text-2xl font-extrabold text-game-text">8. Assembled Game Lobby Example</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left side: Room Code & Players */}
            <div className="md:col-span-5 space-y-5">
              {/* Room Code Card matching mockup 2 */}
              <Card
                variant="primary"
                title="Room code"
                headerAction={
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="bg-white text-game-text border-2 border-game-dark rounded-xl px-3 py-1 font-bold text-xs flex items-center gap-1.5 shadow-tactile-2 hover:bg-canvas active:translate-y-0.5 cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                    {isCopied ? 'Copied' : 'Copy'}
                  </button>
                }
              >
                <span className="text-4xl sm:text-5xl font-extrabold tracking-widest text-white drop-shadow-sm">
                  KQ7F2
                </span>
              </Card>

              {/* Players Card */}
              <Card title="Players (4)">
                <ul className="space-y-3 font-semibold text-sm">
                  <li className="flex items-center justify-between">
                    <span className="font-bold text-base">Favour</span>
                    <span className="text-xs text-game-brand font-bold">Host</span>
                    <span className="text-xs text-success flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-success" /> connected
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-bold text-base">Esther</span>
                    <span className="text-xs text-success flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-success" /> connected
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-bold text-base">Ayomide</span>
                    <span className="text-xs text-success flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-success" /> connected
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-bold text-base">Olawale</span>
                    <span className="text-xs text-warning flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-warning animate-pulse" /> connecting
                    </span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Right side: Game Settings Form */}
            <div className="md:col-span-7">
              <Card title="Game setting">
                <div className="space-y-5">
                  <TimeSetter
                    label="Time per round"
                    value={roundTime}
                    onChange={setRoundTime}
                    min={15}
                    max={120}
                    step={5}
                    format="time"
                  />

                  <div className="space-y-1.5">
                    <span className="text-sm font-semibold text-game-text pl-1">
                      Number of rounds
                    </span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setRoundCount(10)}
                      >
                        Default
                      </Button>
                      <div className="flex-1">
                        <TimeSetter
                          value={roundCount}
                          onChange={setRoundCount}
                          min={1}
                          max={20}
                          step={1}
                          format="number"
                        />
                      </div>
                    </div>
                  </div>

                  <RadioGroup
                    name="lobby-categories"
                    label="Categories"
                    options={categoryRadioOptions}
                    multiple
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    columns={3}
                  />

                  <div className="pt-4 flex flex-col gap-2.5">
                    <Button variant="primary" size="lg" fullWidth>
                      Start game
                    </Button>
                    <Button variant="secondary" size="md" fullWidth>
                      Leave room
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* --- MODAL INSTANCES --- */}

      {/* 1. "You Picked S" Modal */}
      <Modal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        title="YOU PICKED S"
      >
        <div className="my-3">
          <LetterCard letter="S" variant="display" size="lg" tilt="none" />
        </div>
        <div className="w-full flex items-center justify-center gap-3 mt-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsLetterModalOpen(false)}
          >
            Confirm
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsLetterModalOpen(false)}
          >
            Pick again
          </Button>
        </div>
      </Modal>

      {/* 2. "Room Code" Modal */}
      <Modal
        isOpen={isRoomCodeModalOpen}
        onClose={() => setIsRoomCodeModalOpen(false)}
        title="ROOM CODE"
      >
        <div className="w-full my-4">
          <Input
            placeholder="Enter room code"
            value={roomCodeInput}
            onChange={(e) => setRoomCodeInput(e.target.value)}
            className="text-center font-bold tracking-widest text-lg"
          />
        </div>
        <div className="w-full mt-2">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => setIsRoomCodeModalOpen(false)}
          >
            JOIN ROOM
          </Button>
        </div>
      </Modal>

      {/* 3. "Get Ready" Notice Modal */}
      <Modal
        isOpen={isReadyModalOpen}
        onClose={() => setIsReadyModalOpen(false)}
        title="GET READY"
        description="favour is picking a letter"
      >
        <div className="my-2">
          <div className="w-16 h-16 rounded-2xl bg-banner border-2 border-game-dark flex items-center justify-center text-3xl font-extrabold text-game-primary shadow-tactile-3 animate-pulse">
            ?
          </div>
        </div>
      </Modal>

      {/* 4. "Favour Picked" Modal */}
      <Modal
        isOpen={isPickedModalOpen}
        onClose={() => setIsPickedModalOpen(false)}
        title="FAVOUR PICKED"
      >
        <div className="my-3">
          <LetterCard letter="S" variant="display" size="lg" tilt="left-subtle" />
        </div>
        <div className="w-full mt-3">
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => setIsPickedModalOpen(false)}
          >
            Let&rsquo;s play!
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default PlaygroundPage
export { PlaygroundPage as Playground }

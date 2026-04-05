'use client';

import { games, leaderboard, triviaQuestions, scrambleWords } from '@/lib/data';
import { useHiveoStore } from '@/lib/store';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Gamepad2,
  Trophy,
  Users,
  Zap,
  Play,
  Star,
  Crown,
  ChevronUp,
  ChevronDown,
  Minus,
  ArrowLeft,
  Timer,
  Target,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flame,
  Medal,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function GamesPage() {
  const { setCurrentPage, setSelectedGameId } = useHiveoStore();
  const [tab, setTab] = useState<'games' | 'leaderboard'>('games');

  return (
    <div className="max-w-4xl mx-auto page-transition">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 p-6 mb-6 hiveo-glow sparkle-container">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Gamepad2 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Hiveo Games</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Play games, earn XP, and climb the community leaderboard!
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Gamepad2 className="h-4 w-4 text-primary" />
              <span className="font-semibold">{games.length} Games</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">25K+ Players</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Play Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Quick Play</h3>
          <Sparkles className="h-3.5 w-3.5 text-primary/50" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {games.slice(0, 3).map((game) => (
            <Card
              key={game.id}
              className="border-primary/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group card-hover overflow-hidden"
              onClick={() => {
                setSelectedGameId(game.id);
                setCurrentPage('game-detail');
              }}
            >
              <CardContent className="p-0">
                <div
                  className="h-20 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${game.color}30, ${game.color}10)` }}
                >
                  <span className="text-4xl group-hover:scale-125 transition-transform duration-500">
                    {game.icon}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <Badge className="text-[9px] capitalize" style={{ backgroundColor: `${game.color}30`, color: game.color }}>
                      {game.difficulty}
                    </Badge>
                    <div className="flex items-center gap-0.5 text-[10px] text-primary font-bold">
                      <Play className="h-3 w-3 fill-primary" /> Play
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">{game.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{game.players.toLocaleString()} playing</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-muted/30 rounded-lg p-1">
        {(['games', 'leaderboard'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all capitalize',
              tab === t
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t === 'games' ? <Gamepad2 className="h-4 w-4" /> : <Trophy className="h-4 w-4" />}
            {t}
          </button>
        ))}
      </div>

      {tab === 'games' ? (
        <GamesGrid onSelectGame={(id) => {
          setSelectedGameId(id);
          setCurrentPage('game-detail');
        }} />
      ) : (
        <LeaderboardView />
      )}
    </div>
  );
}

function GamesGrid({ onSelectGame }: { onSelectGame: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {games.map((game) => (
        <Card
          key={game.id}
          className="border-border hover:border-primary/40 transition-all duration-300 cursor-pointer group overflow-hidden card-hover"
          onClick={() => onSelectGame(game.id)}
        >
          <CardContent className="p-0">
            {/* Game header with color */}
            <div
              className="h-24 flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${game.color}30, ${game.color}10)`,
              }}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {game.icon}
              </span>
              <div className="absolute top-2 right-2">
                <Badge
                  className="text-[10px] capitalize"
                  style={{
                    backgroundColor: `${game.color}30`,
                    color: game.color,
                  }}
                >
                  {game.difficulty}
                </Badge>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors mb-1">
                {game.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {game.description}
              </p>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {game.players.toLocaleString()} playing
                </span>
                <span className="flex items-center gap-1 text-primary font-semibold">
                  <Trophy className="h-3 w-3" /> {game.highScore.toLocaleString()}
                </span>
              </div>

              <Button className="w-full mt-3 h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 gap-1 group/btn">
                <Play className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" /> Play Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function LeaderboardView() {
  const myRank = leaderboard.find((p) => p.username === 'DevSarah');

  return (
    <div>
      {/* Player's own rank highlight */}
      {myRank && (
        <Card className="border-primary/40 bg-primary/5 mb-4 page-transition">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-semibold">Your Rank</span>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {myRank.username[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold">{myRank.username}</p>
                <p className="text-[10px] text-muted-foreground">Lv.{myRank.level} • {myRank.community}</p>
              </div>
              <div className="flex items-center gap-1">
                {myRank.change === 'up' && (
                  <ArrowUpCircle className="h-4 w-4 text-green-500" />
                )}
                {myRank.change === 'down' && (
                  <ArrowDownCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{myRank.score.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">XP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {leaderboard.slice(0, 3).map((player, index) => (
          <Card
            key={player.rank}
            className={cn(
              'border-primary/30 text-center card-hover rank-animate',
              index === 0 && 'bg-primary/5 border-primary/50 hiveo-glow',
              index === 1 && 'col-span-1 order-0 sm:order-first',
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className={cn('p-4', index === 0 && 'pt-6')}>
              <div className={cn(
                'w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold',
                index === 0
                  ? 'bg-yellow-400 text-yellow-900'
                  : index === 1
                  ? 'bg-gray-300 text-gray-700'
                  : 'bg-amber-600 text-amber-100'
              )}>
                {index === 0 ? <Crown className="h-6 w-6" /> : <Medal className="h-6 w-6" />}
              </div>
              <p className="text-sm font-bold">{player.username}</p>
              <p className="text-[10px] text-muted-foreground mb-1">Lv.{player.level} • {player.community}</p>
              <p className="text-lg font-bold text-primary">{player.score.toLocaleString()} XP</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full leaderboard table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {leaderboard.map((player, index) => (
              <div
                key={player.rank}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors",
                  player.username === 'DevSarah' && "bg-primary/5"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                  player.rank <= 3
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {player.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  {player.username[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{player.username}</p>
                  <p className="text-[10px] text-muted-foreground">Lv.{player.level} • {player.community}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {player.change === 'up' && <ChevronUp className="h-3 w-3 text-green-500" />}
                    {player.change === 'down' && <ChevronDown className="h-3 w-3 text-red-500" />}
                    {player.change === 'same' && <Minus className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <span className="text-sm font-bold text-primary min-w-[60px] text-right">
                    {player.score.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ========== PLAYABLE GAME DETAIL ==========

export function GameDetailPage() {
  const { selectedGameId, setCurrentPage } = useHiveoStore();
  const game = games.find((g) => g.id === selectedGameId) || games[0];

  if (game.id === 'g1') return <TriviaGame game={game} />;
  if (game.id === 'g2') return <WordScrambleGame game={game} />;
  if (game.id === 'g3') return <CodeQuizGame game={game} />;
  if (game.id === 'g4') return <MemoryGame game={game} />;
  if (game.id === 'g5') return <ReactionGame game={game} />;
  return <GenericGame game={game} />;
}

// Trivia Game
function TriviaGame({ game }: { game: typeof games[0] }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (gameState !== 'playing' || selected !== null) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setSelected(-1);
          setStreak(0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, selected]);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const q = triviaQuestions[currentQ];
    if (index === q.correct) {
      const bonus = Math.max(0, timeLeft * 10) + (streak * 50);
      setScore((s) => s + 100 + bonus);
      setStreak((s) => s + 1);
      setCorrectCount((c) => c + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= triviaQuestions.length) {
      setGameState('ended');
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setTimeLeft(15);
    }
  };

  if (gameState === 'menu') {
    return <GameMenu game={game} onStart={() => setGameState('playing')} />;
  }

  if (gameState === 'ended') {
    return (
      <GameResult
        game={game}
        score={score}
        correct={correctCount}
        total={triviaQuestions.length}
        onPlayAgain={() => {
          setGameState('playing');
          setCurrentQ(0);
          setScore(0);
          setSelected(null);
          setStreak(0);
          setCorrectCount(0);
          setTimeLeft(15);
        }}
      />
    );
  }

  const q = triviaQuestions[currentQ];

  return (
    <div className="max-w-2xl mx-auto page-transition">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentPage('games')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-sm">{game.name}</span>
        <Badge className="ml-auto bg-primary/20 text-primary text-xs">{currentQ + 1}/{triviaQuestions.length}</Badge>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-4 mb-4 bg-card border border-border rounded-xl p-3">
        <div className="flex items-center gap-1.5 text-sm">
          <Target className="h-4 w-4 text-primary" />
          <span className="font-bold">{score}</span>
        </div>
        {streak > 1 && (
          <div className="flex items-center gap-1 text-sm text-orange-500">
            <Flame className="h-4 w-4" />
            <span className="font-bold">{streak}x Streak!</span>
          </div>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          <Timer className={cn('h-4 w-4', timeLeft <= 5 ? 'text-red-500' : 'text-primary')} />
          <span className={cn('font-mono font-bold', timeLeft <= 5 ? 'text-red-500' : '')}>{timeLeft}s</span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-1000', timeLeft <= 5 ? 'bg-red-500' : 'bg-primary')}
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        />
      </div>

      {/* Question */}
      <Card className="mb-4 border-border">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-1">Question {currentQ + 1}</h3>
          <p className="text-base">{q.question}</p>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((option, index) => {
          const isCorrect = index === q.correct;
          const isSelected = index === selected;
          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selected !== null}
              className={cn(
                'p-4 rounded-xl border-2 text-left text-sm font-medium transition-all duration-300',
                selected === null && isCorrect === false && 'border-border hover:border-primary/50 hover:bg-primary/5',
                selected !== null && isCorrect && 'border-green-500 bg-green-500/10 text-green-500',
                selected !== null && isSelected && !isCorrect && 'border-red-500 bg-red-500/10 text-red-500',
                selected !== null && !isCorrect && !isSelected && 'border-border opacity-50'
              )}
            >
              <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
              {selected !== null && isCorrect && <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-500" />}
              {selected !== null && isSelected && !isCorrect && <XCircle className="inline ml-2 h-4 w-4 text-red-500" />}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-4 text-center">
          <Button onClick={nextQuestion} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {currentQ + 1 >= triviaQuestions.length ? 'See Results' : 'Next Question'}
          </Button>
        </div>
      )}
    </div>
  );
}

// Word Scramble Game
function WordScrambleGame({ game }: { game: typeof games[0] }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [currentWord, setCurrentWord] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (gameState !== 'playing' || correct !== null) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setCorrect(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, correct]);

  const handleGuess = () => {
    if (guess.toUpperCase() === scrambleWords[currentWord].display) {
      const bonus = Math.max(0, timeLeft * 5);
      setScore((s) => s + 200 + bonus);
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  const nextWord = () => {
    if (currentWord + 1 >= scrambleWords.length) {
      setGameState('ended');
    } else {
      setCurrentWord((w) => w + 1);
      setGuess('');
      setCorrect(null);
      setTimeLeft(30);
    }
  };

  if (gameState === 'menu') {
    return <GameMenu game={game} onStart={() => setGameState('playing')} />;
  }

  if (gameState === 'ended') {
    return (
      <GameResult
        game={game}
        score={score}
        correct={0}
        total={scrambleWords.length}
        onPlayAgain={() => {
          setGameState('playing');
          setCurrentWord(0);
          setScore(0);
          setGuess('');
          setCorrect(null);
          setTimeLeft(30);
        }}
      />
    );
  }

  const word = scrambleWords[currentWord];

  return (
    <div className="max-w-2xl mx-auto page-transition">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentPage('games')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-sm">{game.name}</span>
        <Badge className="ml-auto bg-primary/20 text-primary text-xs">{currentWord + 1}/{scrambleWords.length}</Badge>
      </div>

      <div className="flex items-center gap-4 mb-4 bg-card border border-border rounded-xl p-3">
        <div className="flex items-center gap-1.5 text-sm">
          <Target className="h-4 w-4 text-primary" />
          <span className="font-bold">{score}</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Timer className={cn('h-4 w-4', timeLeft <= 5 ? 'text-red-500' : 'text-primary')} />
          <span className={cn('font-mono font-bold', timeLeft <= 5 ? 'text-red-500' : '')}>{timeLeft}s</span>
        </div>
      </div>

      <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-1000', timeLeft <= 5 ? 'bg-red-500' : 'bg-primary')}
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
      </div>

      <Card className="mb-6 border-border">
        <CardContent className="p-8 text-center">
          <p className="text-xs text-muted-foreground mb-2">Unscramble this word:</p>
          <p className="text-3xl font-mono font-bold tracking-[0.3em] text-primary">{word.scrambled}</p>
        </CardContent>
      </Card>

      {correct === null && (
        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            placeholder="Type your answer..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
            className="text-center font-mono text-lg"
            autoFocus
          />
          <Button onClick={handleGuess} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Check
          </Button>
        </div>
      )}

      {correct !== null && (
        <div className="text-center space-y-4">
          <div className={cn('text-lg font-semibold', correct ? 'text-green-500' : 'text-red-500')}>
            {correct ? '✓ Correct!' : `✗ The answer was: ${word.display}`}
          </div>
          <Button onClick={nextWord} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {currentWord + 1 >= scrambleWords.length ? 'See Results' : 'Next Word'}
          </Button>
        </div>
      )}
    </div>
  );
}

// Code Quiz Game (simplified trivia variant)
function CodeQuizGame({ game }: { game: typeof games[0] }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const codeQuestions = [
    { question: 'What does this output?\nconsole.log(typeof null)', options: ['"null"', '"object"', '"undefined"', '"boolean"'], correct: 1 },
    { question: 'What is the result of:\n[1,2,3].map(x => x * 2)?', options: ['[1,2,3]', '[2,4,6]', '[1,4,9]', 'undefined'], correct: 1 },
    { question: 'Which method adds to the end of an array?', options: ['unshift()', 'push()', 'pop()', 'shift()'], correct: 1 },
    { question: 'What does "===" check?', options: ['Value only', 'Type only', 'Value and type', 'Reference'], correct: 2 },
    { question: 'What is the output of:\nconsole.log(0.1 + 0.2 === 0.3)?', options: ['true', 'false', 'undefined', 'Error'], correct: 1 },
  ];

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === codeQuestions[currentQ].correct) {
      setScore((s) => s + 250);
      setCorrectCount((c) => c + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= codeQuestions.length) {
      setGameState('ended');
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  if (gameState === 'menu') {
    return <GameMenu game={game} onStart={() => setGameState('playing')} />;
  }

  if (gameState === 'ended') {
    return (
      <GameResult
        game={game}
        score={score}
        correct={correctCount}
        total={codeQuestions.length}
        onPlayAgain={() => {
          setGameState('playing');
          setCurrentQ(0);
          setScore(0);
          setSelected(null);
          setCorrectCount(0);
        }}
      />
    );
  }

  const q = codeQuestions[currentQ];

  return (
    <div className="max-w-2xl mx-auto page-transition">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentPage('games')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-sm">{game.name}</span>
        <Badge className="ml-auto bg-primary/20 text-primary text-xs">{currentQ + 1}/{codeQuestions.length}</Badge>
      </div>

      <div className="mb-4 bg-card border border-border rounded-xl p-3">
        <div className="flex items-center gap-1.5 text-sm">
          <Target className="h-4 w-4 text-primary" />
          <span className="font-bold">{score}</span>
        </div>
      </div>

      <Card className="mb-4 border-border">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-3">Question {currentQ + 1}</h3>
          <pre className="bg-muted rounded-lg p-3 text-sm font-mono text-left overflow-x-auto">{q.question}</pre>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((option, index) => {
          const isCorrect = index === q.correct;
          const isSelected = index === selected;
          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selected !== null}
              className={cn(
                'p-4 rounded-xl border-2 text-left text-sm font-mono transition-all duration-300',
                selected === null && 'border-border hover:border-primary/50 hover:bg-primary/5',
                selected !== null && isCorrect && 'border-green-500 bg-green-500/10 text-green-500',
                selected !== null && isSelected && !isCorrect && 'border-red-500 bg-red-500/10 text-red-500',
                selected !== null && !isCorrect && !isSelected && 'border-border opacity-50'
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-4 text-center">
          <Button onClick={nextQuestion} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {currentQ + 1 >= codeQuestions.length ? 'See Results' : 'Next Question'}
          </Button>
        </div>
      )}
    </div>
  );
}

// Memory Match Game
function MemoryGame({ game }: { game: typeof games[0] }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const emojis = ['🚀', '🎮', '🎨', '🤖', '⚡', '🔥', '💎', '🌟'];
  const [cards, setCards] = useState<{ emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((emoji) => ({
      emoji,
      flipped: false,
      matched: false,
    }));
    setCards(shuffled);
    setFlipped([]);
    setMoves(0);
    setMatches(0);
  };

  const handleCardClick = (index: number) => {
    if (flipped.length >= 2 || cards[index].flipped || cards[index].matched) return;
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      if (newCards[newFlipped[0]].emoji === newCards[newFlipped[1]].emoji) {
        setTimeout(() => {
          const matchCards = [...newCards];
          matchCards[newFlipped[0]].matched = true;
          matchCards[newFlipped[1]].matched = true;
          setCards(matchCards);
          setFlipped([]);
          setMatches((m) => m + 1);
          if (matches + 1 === emojis.length) {
            setTimeout(() => setGameState('ended'), 500);
          }
        }, 300);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[newFlipped[0]].flipped = false;
          resetCards[newFlipped[1]].flipped = false;
          setCards(resetCards);
          setFlipped([]);
        }, 800);
      }
    }
  };

  if (gameState === 'menu') {
    return (
      <GameMenu
        game={game}
        onStart={() => {
          initGame();
          setGameState('playing');
        }}
      />
    );
  }

  if (gameState === 'ended') {
    return (
      <GameResult
        game={game}
        score={Math.max(0, (emojis.length * 200) - (moves * 20))}
        correct={matches}
        total={emojis.length}
        onPlayAgain={() => {
          initGame();
          setGameState('playing');
        }}
      />
    );
  }

  return (
    <div className="max-w-lg mx-auto page-transition">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentPage('games')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-sm">{game.name}</span>
        <Badge className="ml-auto bg-primary/20 text-primary text-xs">{moves} moves</Badge>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={cn(
              'aspect-square rounded-xl border-2 flex items-center justify-center text-2xl transition-all duration-300 transform',
              card.flipped || card.matched
                ? 'bg-primary/10 border-primary scale-100'
                : 'bg-muted border-border hover:border-primary/30 hover:scale-105 cursor-pointer',
              card.matched && 'bg-green-500/10 border-green-500'
            )}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  );
}

// Reaction Speed Game
function ReactionGame({ game }: { game: typeof games[0] }) {
  const [gameState, setGameState] = useState<'menu' | 'waiting' | 'ready' | 'clicked' | 'ended'>('menu');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [results, setResults] = useState<number[]>([]);
  const [waitTimeout, setWaitTimeout] = useState<NodeJS.Timeout | null>(null);

  const startRound = () => {
    setGameState('waiting');
    const delay = 2000 + Math.random() * 3000;
    const timeout = setTimeout(() => {
      setGameState('ready');
      setStartTime(Date.now());
    }, delay);
    setWaitTimeout(timeout);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      if (waitTimeout) clearTimeout(waitTimeout);
      setGameState('clicked');
      setReactionTime(null);
      setTimeout(() => {
        if (results.length < 5) startRound();
        else setGameState('ended');
      }, 1500);
      return;
    }
    if (gameState === 'ready') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setResults((r) => [...r, time]);
      setGameState('clicked');
      setTimeout(() => {
        if (results.length < 4) startRound();
        else setGameState('ended');
      }, 1500);
    }
  };

  if (gameState === 'menu') {
    return <GameMenu game={game} onStart={startRound} />;
  }

  if (gameState === 'ended') {
    const avg = results.reduce((a, b) => a + b, 0) / results.length;
    const best = Math.min(...results);
    const score = Math.max(0, Math.round(10000 - avg * 5));
    return (
      <GameResult
        game={game}
        score={score}
        correct={0}
        total={results.length}
        onPlayAgain={() => {
          setResults([]);
          setReactionTime(null);
          startRound();
        }}
        extraInfo={`Best: ${best}ms | Average: ${Math.round(avg)}ms`}
      />
    );
  }

  return (
    <div className="max-w-lg mx-auto page-transition">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentPage('games')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-sm">{game.name}</span>
        <Badge className="ml-auto bg-primary/20 text-primary text-xs">Round {results.length + 1}/5</Badge>
      </div>

      <button
        onClick={handleClick}
        className={cn(
          'w-full aspect-video rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300',
          gameState === 'waiting' && 'bg-red-500/10 border-2 border-red-500 cursor-pointer hover:bg-red-500/20',
          gameState === 'ready' && 'bg-green-500/10 border-2 border-green-500 cursor-pointer',
          gameState === 'clicked' && reactionTime !== null && 'bg-primary/10 border-2 border-primary',
          gameState === 'clicked' && reactionTime === null && 'bg-red-500/10 border-2 border-red-500'
        )}
      >
        {gameState === 'waiting' && (
          <>
            <Clock className="h-12 w-12 text-red-500 mb-3" />
            <p className="text-lg font-bold text-red-500">Wait for green...</p>
            <p className="text-xs text-muted-foreground mt-1">Don&apos;t click yet!</p>
          </>
        )}
        {gameState === 'ready' && (
          <>
            <Zap className="h-12 w-12 text-green-500 mb-3 countdown-pulse" />
            <p className="text-lg font-bold text-green-500">CLICK NOW!</p>
          </>
        )}
        {gameState === 'clicked' && reactionTime !== null && (
          <>
            <Target className="h-12 w-12 text-primary mb-3" />
            <p className="text-2xl font-bold text-primary">{reactionTime}ms</p>
            <p className="text-xs text-muted-foreground mt-1">
              {reactionTime < 200 ? '⚡ Lightning fast!' : reactionTime < 300 ? '🔥 Great!' : '👍 Good!'}
            </p>
          </>
        )}
        {gameState === 'clicked' && reactionTime === null && (
          <>
            <XCircle className="h-12 w-12 text-red-500 mb-3" />
            <p className="text-lg font-bold text-red-500">Too early!</p>
            <p className="text-xs text-muted-foreground mt-1">Wait for the green screen</p>
          </>
        )}
      </button>

      {/* Previous results */}
      {results.length > 0 && (
        <div className="mt-4 bg-card border border-border rounded-xl p-3">
          <p className="text-xs font-semibold mb-2">Previous rounds:</p>
          <div className="flex gap-2">
            {results.map((r, i) => (
              <div key={i} className="flex-1 text-center bg-muted/50 rounded-lg p-2">
                <p className="text-xs text-muted-foreground">R{i + 1}</p>
                <p className="text-sm font-bold">{r}ms</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Generic game fallback
function GenericGame({ game }: { game: typeof games[0] }) {
  return (
    <div className="max-w-lg mx-auto page-transition">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => useHiveoStore.getState().setCurrentPage('games')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-sm">{game.name}</span>
      </div>

      <Card className="border-border">
        <CardContent className="p-8 text-center">
          <span className="text-6xl mb-4 block">{game.icon}</span>
          <h3 className="text-xl font-bold mb-2">{game.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
          <Badge className="bg-primary/20 text-primary">{game.category} • {game.difficulty}</Badge>
          <p className="text-xs text-muted-foreground mt-4">Coming soon! More games are being added regularly.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Shared components
function GameMenu({ game, onStart }: { game: typeof games[0]; onStart: () => void }) {
  return (
    <div className="max-w-lg mx-auto text-center page-transition">
      <Card className="border-border overflow-hidden card-hover">
        <CardContent className="p-0">
          <div
            className="h-32 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${game.color}30, ${game.color}10)` }}
          >
            <span className="text-5xl">{game.icon}</span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{game.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
            <div className="flex justify-center gap-3 mb-4">
              <Badge variant="secondary">{game.category}</Badge>
              <Badge variant="secondary" className="capitalize">{game.difficulty}</Badge>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {game.players.toLocaleString()} players
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="h-3 w-3 text-primary" /> High: {game.highScore.toLocaleString()}
              </span>
            </div>
            <Button
              onClick={onStart}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-10 px-8"
            >
              <Play className="h-4 w-4" /> Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GameResult({
  game,
  score,
  correct,
  total,
  onPlayAgain,
  extraInfo,
}: {
  game: typeof games[0];
  score: number;
  correct: number;
  total: number;
  onPlayAgain: () => void;
  extraInfo?: string;
}) {
  const rank = score > 8000 ? 1 : score > 5000 ? 2 : score > 3000 ? 3 : 5;
  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        backgroundColor: ['#FACC15', '#F97316', '#EC4899', '#22C55E', '#6366F1', '#14B8A6'][i % 6],
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      })),
    []
  );
  const rankLabel = rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : '⭐';

  return (
    <div className="max-w-lg mx-auto text-center page-transition">
      <Card className="border-primary/30 hiveo-glow">
        <CardContent className="p-8">
          {/* Confetti-like visual */}
          <div className="relative mb-4">
            {rank <= 1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {confettiPieces.map((style, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full confetti-piece"
                    style={style}
                  />
                ))}
              </div>
            )}
            <span className="text-5xl block relative z-10">{rankLabel}</span>
          </div>
          <h3 className="text-xl font-bold mb-1">Game Over!</h3>
          <p className="text-sm text-muted-foreground mb-4">{game.name}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-primary/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-primary">{score.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Total Score</p>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <p className="text-2xl font-bold">#{rank}</p>
              <p className="text-[10px] text-muted-foreground">Your Rank</p>
            </div>
          </div>

          {correct > 0 && (
            <p className="text-sm text-muted-foreground mb-2">
              {correct}/{total} correct answers
            </p>
          )}
          {extraInfo && (
            <p className="text-xs text-muted-foreground mb-4">{extraInfo}</p>
          )}

          <div className="flex gap-2 justify-center">
            <Button
              onClick={onPlayAgain}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Play Again
            </Button>
            <Button
              variant="outline"
              onClick={() => useHiveoStore.getState().setCurrentPage('games')}
            >
              Back to Games
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

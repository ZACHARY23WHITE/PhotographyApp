'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { getLessonById, CATEGORIES } from '@/data/lessons';
import { completeLesson } from '@/lib/firestore-users';

type Phase = 'lesson' | 'result';

export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const lesson = getLessonById(lessonId);
  const { user, profile, refreshProfile } = useAuth();
  const router = useRouter();

  const [stepIdx, setStepIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('lesson');
  const [saving, setSaving] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--muted)' }}>Lesson not found.</p>
      </div>
    );
  }

  const step = lesson.steps[stepIdx];
  const isLast = stepIdx === lesson.steps.length - 1;
  const alreadyCompleted = profile?.completedLessons.includes(lesson.id) ?? false;
  const quizSteps = lesson.steps.filter(s => s.type === 'quiz').length;
  const categoryEmoji = CATEGORIES.find(c => c.id === lesson.category)?.emoji ?? '📷';

  function handleSelectOption(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === step.correct) setCorrectCount(c => c + 1);
  }

  async function handleNext() {
    if (!isLast) {
      setStepIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      // End of lesson
      if (user && lesson && !alreadyCompleted) {
        setSaving(true);
        await completeLesson(user.uid, lesson.id, lesson.xpReward);
        await refreshProfile();
        setSaving(false);
      }
      setPhase('result');
    }
  }

  if (phase === 'result') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
        style={{ background: 'var(--bg)' }}
      >
        <div className="text-6xl mb-4">{alreadyCompleted ? '⭐' : '🎉'}</div>
        <h1 className="text-2xl font-bold mb-1">
          {alreadyCompleted ? 'Already mastered!' : 'Lesson complete!'}
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {quizSteps > 0
            ? `${correctCount}/${quizSteps} quiz questions correct`
            : 'Great job working through this lesson.'}
        </p>

        {!alreadyCompleted && (
          <div
            className="rounded-2xl px-8 py-4 mb-8 text-center"
            style={{ background: 'var(--surface)' }}
          >
            <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
              +{lesson.xpReward} XP
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>earned</p>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => router.push('/learn')}
            className="w-full py-4 rounded-2xl font-bold"
            style={{ background: 'var(--primary)', color: '#0A0A0A' }}
          >
            Back to lessons
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-2xl font-semibold text-sm"
            style={{ background: 'var(--surface)', color: 'var(--foreground)' }}
          >
            Go home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: 'var(--surface)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            {categoryEmoji} {lesson.category}
          </p>
          <p className="text-sm font-bold truncate">{lesson.title}</p>
        </div>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          {stepIdx + 1} / {lesson.steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="px-5 mb-6">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((stepIdx + 1) / lesson.steps.length) * 100}%`,
              background: 'var(--primary)',
            }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 flex flex-col">
        {step.type === 'info' ? (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div
                className="rounded-2xl p-6 mb-4"
                style={{ background: 'var(--surface)' }}
              >
                <p className="text-base leading-relaxed">{step.content}</p>
              </div>
              {step.tip && (
                <div
                  className="rounded-2xl p-4 flex gap-3"
                  style={{ background: 'rgba(245, 166, 35, 0.1)', border: '1px solid rgba(245, 166, 35, 0.2)' }}
                >
                  <span className="text-lg">💡</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--primary)' }}>
                    {step.tip}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleNext}
              disabled={saving}
              className="w-full py-4 rounded-2xl font-bold mt-6 mb-8 disabled:opacity-50"
              style={{ background: 'var(--primary)', color: '#0A0A0A' }}
            >
              {saving ? 'Saving…' : isLast ? 'Finish lesson' : 'Got it →'}
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div
                className="rounded-2xl p-6 mb-6"
                style={{ background: 'var(--surface)' }}
              >
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--primary)' }}>
                  Question
                </p>
                <p className="text-base leading-relaxed">{step.content}</p>
              </div>

              <div className="space-y-3">
                {step.options?.map((option, idx) => {
                  const isCorrect = idx === step.correct;
                  const isSelected = idx === selected;
                  let bg = 'var(--surface)';
                  let color = 'var(--foreground)';
                  let border = '2px solid transparent';

                  if (answered) {
                    if (isCorrect) {
                      bg = 'rgba(74, 222, 128, 0.15)';
                      color = 'var(--success)';
                      border = '2px solid var(--success)';
                    } else if (isSelected) {
                      bg = 'rgba(248, 113, 113, 0.15)';
                      color = 'var(--danger)';
                      border = '2px solid var(--danger)';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={answered}
                      className="w-full text-left p-4 rounded-2xl text-sm font-medium transition-all active:scale-[0.98]"
                      style={{ background: bg, color, border }}
                    >
                      <span className="mr-2 font-bold" style={{ color: answered && isCorrect ? 'var(--success)' : answered && isSelected ? 'var(--danger)' : 'var(--muted)' }}>
                        {['A', 'B', 'C', 'D'][idx]}.
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className="mt-4 rounded-2xl p-4"
                  style={{
                    background: selected === step.correct ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                    border: `1px solid ${selected === step.correct ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`,
                  }}
                >
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: selected === step.correct ? 'var(--success)' : 'var(--danger)' }}
                  >
                    {selected === step.correct ? '✓ Correct!' : '✗ Not quite'}
                  </p>
                  {selected !== step.correct && (
                    <p className="text-sm" style={{ color: 'var(--muted-light)' }}>
                      The correct answer is: <strong style={{ color: 'var(--foreground)' }}>{step.options?.[step.correct ?? 0]}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>

            {answered && (
              <button
                onClick={handleNext}
                disabled={saving}
                className="w-full py-4 rounded-2xl font-bold mt-6 mb-8 disabled:opacity-50"
                style={{ background: 'var(--primary)', color: '#0A0A0A' }}
              >
                {saving ? 'Saving…' : isLast ? 'Finish lesson' : 'Continue →'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

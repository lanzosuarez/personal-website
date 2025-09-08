import React from 'react';
import { Code2 } from 'lucide-react';
import { codeSnippet } from '../data/constants';
import { WorkoutGenerator } from './WorkoutGenerator';
import { ProgressTracker } from './ProgressTracker';
import { useWorkoutGenerator } from '../hooks/useWorkoutGenerator';
import { useProgressTracking } from '../hooks/useProgressTracking';

interface CodeSectionProps {
  darkMode: boolean;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

export const CodeSection: React.FC<CodeSectionProps> = ({
  darkMode,
  sectionsRef
}) => {
  const {
    generatedWorkout,
    isGenerating,
    generateWorkout,
    resetWorkout
  } = useWorkoutGenerator();

  const {
    workoutDays,
    setWorkoutDays,
    codingDays,
    setCodingDays,
    workoutProgress,
    codingProgress
  } = useProgressTracking();

  return (
    <section
      ref={el => { sectionsRef.current[4] = el; }}
      className="min-h-screen px-8 py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <Code2 className="w-8 h-8 text-blue-500" />
          Code & Gains <span aria-hidden="true">💪</span>
        </h2>

        {/* Philosophy Introduction */}
        <div className={`text-center mb-12 p-6 rounded-xl ${
          darkMode ? 'bg-gray-900/30' : 'bg-gray-50'
        }`}>
          <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            The same principles that build muscle also build exceptional software:
            <strong> consistency, progressive overload, and intelligent adaptation.</strong>
          </p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Here's how I apply bodybuilding discipline to software development — systematic training for consistent growth.
          </p>
        </div>

        {/* Training & Domain Expertise Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span aria-hidden="true">💪</span> Training & Domain Expertise
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <strong>Domain expertise</strong> is what makes systems truly valuable.
            Here's a training plan generator that combines systematic logic with real bodybuilding knowledge.
          </p>

          <WorkoutGenerator
            darkMode={darkMode}
            generatedWorkout={generatedWorkout}
            isGenerating={isGenerating}
            generateWorkout={generateWorkout}
            resetWorkout={resetWorkout}
          />
        </div>

        {/* Growth Philosophy Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span aria-hidden="true">📈</span> Asymptotic Growth Mindset
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            In both bodybuilding and software development, <strong>the journey never ends</strong>.
            Every expert is still a beginner in disguise. These trackers show how small daily efforts compound over time.
          </p>

          {/* Interactive Progress Trackers */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ProgressTracker
              darkMode={darkMode}
              days={workoutDays}
              setDays={setWorkoutDays}
              progress={workoutProgress}
              type="workout"
              title="Bodybuilding Journey"
              emoji="💪"
              increment={30}
              gradientColors="bg-gradient-to-r from-red-500 to-orange-500"
            />

            <ProgressTracker
              darkMode={darkMode}
              days={codingDays}
              setDays={setCodingDays}
              progress={codingProgress}
              type="coding"
              title="Coding Journey"
              emoji="⚡"
              increment={365}
              gradientColors="bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>

          <div className={`mt-6 p-4 rounded-lg ${
            darkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              <strong>💡 The Key Insight:</strong> Progress slows as you advance, but it never stops.
              A 10-year veteran and a 1-year developer are both still growing — just at different rates on the same infinite curve.
            </p>
          </div>
        </div>

        {/* Code Philosophy Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span aria-hidden="true">💻</span> The Discipline Code
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            This isn't just philosophy — it's code. Here's how I model the growth mindset that drives both
            muscle development and software mastery.
          </p>

          {/* Code Sample */}
          <div className={`rounded-xl p-6 font-mono text-sm overflow-x-auto ${
            darkMode ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <pre className={darkMode ? 'text-gray-300' : 'text-gray-800'}>
              <code>{codeSnippet}</code>
            </pre>
          </div>
          <div className={`mt-6 p-4 rounded-lg text-center ${
            darkMode ? 'bg-gray-900/50' : 'bg-gray-100'
          }`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <strong>"Every day is day 1"</strong> — Whether you're adding weight to the bar or complexity to your codebase,
              the beginner's mind keeps you growing infinitely. 🚀💪
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

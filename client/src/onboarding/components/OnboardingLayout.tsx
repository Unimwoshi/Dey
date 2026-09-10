import {ProgressBar} from './ProgressBar'
import { Button } from '../../ui/UI';
import {LuCircleCheck} from 'react-icons/lu'

export type stepMeta = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type OnboardingLayoutProps = {
  steps: stepMeta[];
  currentIndex: number;
  completed: Set<number>;
  onStepClick: (index: number) => void;
  children: React.ReactNode;
};

export const OnboardingLayout = ({
    steps, currentIndex, completed,
    onStepClick, children
}: OnboardingLayoutProps) => {

    const progress = Math.round(((currentIndex + 1) / steps.length) * 100);
  return (
    <div className="min-h-screen flex flex-col md:flex-row text-white-90">
      <div className="md:hidden sticky top-0 z-10 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span>{steps[currentIndex].label}</span>
          <span>{progress}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <aside className="onboarding-left-sidebar">
        <nav className="flex flex-col gap-2">
          {steps.map((step, index) => {
            const isActive = index === currentIndex;
            const isDone = completed.has(index);
            const isClickable = index <= currentIndex;
            const Icon = step.icon;

            return (
              <Button
                key={step.id}
                variant={isActive ? "primary" : "secondary"}
                disabled={!isClickable}
                text={step.label}
                customClassName="justify-start"
                size="small"
                icon={isDone ? <LuCircleCheck className="text-success" /> : ""}
                iconPosition="leading"
              />
            );
          })}
        </nav>

        <div>
          <span className="text-xs">{progress}%</span>
          <ProgressBar progress={progress} />
        </div>
      </aside>

      <main className="flex-1 md:ml-68 flex items-start justify-center px-6 py-12">
        <div>{children}</div>
      </main>
    </div>
  );
};


import { Input, Button } from "../ui/UI"
import { OnboardingLayout } from "./components/OnboardingLayout"
import { Welcome, Business, Profile } from "./components/OnboardingMain";
import {useState} from 'react'
import {StepFooter} from '../onboarding/components/FormControls'

export const stepsMeta: StepMeta[] = [
  {
    id: "welcome",
    label: "Welcome",
    header: "Welcome to Dey",
    icon: "/logos/dey-logo.svg",
  },
  {
    id: "about-business",
    label: "Business",
    header: "Tell us about your Business",
    icon: "/logos/dey-logo.svg",
  },
  {
    id: "profile",
    label: "Profile",
    header: "Set up your business profile",
    icon: "/logos/dey-logo.svg",
  },
  {
    id: "modules",
    label: "Modules",
    header: "What do you want to manage with Dey",
    icon: "/logos/dey-logo.svg",
  },
  {
    id: "workspace-setup",
    label: "Workspace",
    header: "Set up your workspace",
    icon: "/logos/dey-logo.svg",
  },
  {
    id: "business-financial-setup",
    label: "Finances",
    header: "Set up your finances",
    icon: "/logos/dey-logo.svg",
  },
  {
    id: "invite-team",
    label: "Team",
    header: "Invite your team",
    icon: "/logos/dey-logo.svg",
  },
];

const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [completed, setCompleted] = useState<Set<number>>(new Set())

    const goTo = (index:number) => {
        if (index <= currentIndex || completed.has(index)){
            setCurrentIndex(index);
        }
    };
    
    const next = () => {
        setCompleted((prev) => new Set(prev).add(currentIndex));
        setCurrentIndex((i)=> Math.min(i+1, stepsMeta.length - 1));
    }

    const back = () => setCurrentIndex((i)=> Math.max(i-1, 0)) 

    const renderStep=()=>{
        const shared = {
          onNext: next,
          onBack: back,
          backDisabled: currentIndex === 0,
          stepsLabel: stepsMeta.slice(1).map((labels, index)=> (<p key={index}>{labels.label}</p>)),
        };
        switch (stepsMeta[currentIndex].id){
            case 'welcome':
                return <Welcome {...shared}/>
            case 'about-business':
                return <Business {...shared}/>
            case 'profile':
              return <Profile {...shared}/>

        }
    }

    return (
      <OnboardingLayout
        steps={stepsMeta}
        currentIndex={currentIndex}
        completed={completed}
        onStepClick={goTo}
      >
        {renderStep()}
        <StepFooter
          onNext={next}
          onBack={back}
          onBackDisabled={!(currentIndex === 0)}
        />
      </OnboardingLayout>
    );
}

export default Onboarding
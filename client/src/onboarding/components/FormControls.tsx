import { Button } from "../../ui/UI"

export const FormShell = (
    {title, subtitle, children, customClassName}:
    {title:string, subtitle:string, children:React.ReactNode, customClassName:string}

) => {
    return (
      <div className=" max-w-[669px] ">
        <h1 className="text-[32px] md:text-[48px] font-bold">{title}</h1>
        <p className="text-[14px] text-white-64 ">{subtitle}</p>
        <div className={`mt-[36px] ${customClassName}`}>{children}</div>
      </div>
    );

}

export function StepFooter({
    onBack, 
    onNext, 
    onBackDisabled, 
    nextLabel= 'Continue',
}:{ onBack: ()=> void
     onNext: ()=> void 
     onBackDisabled : boolean 
     nextLabel?:string}
) {
    return (
      <div className='flex absolute mt-[40px] gap-[20px] w-[60%] mb-2.5 pb-2.5'>
        {onBackDisabled && <Button text="Back" onClick={onBack} iconType="back" />}

        <Button text={nextLabel} onClick={onNext} iconType="side"/>
      </div>
    );
}
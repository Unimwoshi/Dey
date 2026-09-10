import { FormShell,StepFooter } from "./FormControls";
import {Button, Input, TextArea, Dropdown, DropdownInput, 
    DatePicker, FileUpload, OTPInput, GroupDropdown} from "../../ui/UI"
import {useState} from 'react'
import {countryCodes} from '../../data/country-codes.ts'
import type { DropdownInputOptions } from "../../ui/UI";

type StepProps={
    onNext:()=>void
    onBack: ()=> void
    backDisabled:boolean
    stepsLabel:string
}



const countriesCodes:DropdownInputOptions[]=countryCodes.map((country)=>({
  value: country.code,
  label: country.name,
  icon: country.dialCode,
}))

export const Welcome = ({onNext,onBack, backDisabled, stepsLabel}: StepProps) =>{
    
    return(
        <>
        <FormShell 
        title="Welcome to Dey"
        subtitle="We'll get your business ready in a few quick steps"
        >

          <div>
            <h2>Choose your</h2>
            <button className = 'bg-white-4 rounded border border-primary px-3 py-4'>
              Create your business workspace
            </button>
             <button className = 'bg-white-4 rounded border border-primary px-3 py-4'>
              Join an existing business
            </button>
          </div>

        <div className="md:hidden flex flex-col">
            {stepsLabel}
        </div>
        <StepFooter onNext={onNext} onBack={onBack} onBackDisabled={!backDisabled} />
        </FormShell> 
        </>

    )
}

const options = [
  {
    header: "Business Name",
    label: "Sole Proprietorship",
    value: "sole-proprietorship",
  },
  { header: "Business Name", label: "Partnership", value: "partnership" },
  {
    header: "Company",
    label: "Private Limited Company",
    value: "private-limited-company",
  },
  {
    header: "Company",
    label: "Public Limited Company",
    value: "public-limited-company",
  },
  {
    header: "Company",
    label: "Company Limited by Guarantee",
    value: "company-limited-by guarantee",
  },
  {
    header: "Company",
    label: "Unlimited Company",
    value: "unlimited-company",
  },
  {
    header: "Partnership",
    label: "Limited Liability Partnership",
    value: "limited-liability-partnership",
  },
  {
    header: "Partnership",
    label: "Limited Partnership",
    value: "limited-partnership",
  },
  {
    header: "Organization",
    label: "Incorporated Trustees",
    value: "incorporated-trustees",
  },
  {label: "Non-profit", value: "non-profit" },
  { header: "Other", label: "Other", value: "other" },
];

export const industryOptions= [
  { label: "Agriculture", value: "agriculture" },
  { label: "Construction", value: "construction" },
  { label: "Consulting", value: "consulting" },
  { label: "E-commerce & Retail", value: "ecommerce-retail" },
  { label: "Education", value: "education" },
  { label: "Entertainment & Media", value: "entertainment-media" },
  { label: "Fashion & Apparel", value: "fashion-apparel" },
  { label: "Finance & Banking", value: "finance-banking" },
  { label: "Food & Beverage", value: "food-beverage" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Hospitality & Tourism", value: "hospitality-tourism" },
  { label: "Information Technology", value: "information-technology" },
  { label: "Insurance", value: "insurance" },
  { label: "Legal Services", value: "legal-services" },
  { label: "Logistics & Transportation", value: "logistics-transportation" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Marketing & Advertising", value: "marketing-advertising" },
  { label: "Non-Profit", value: "non-profit" },
  { label: "Oil & Gas", value: "oil-gas" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Telecommunications", value: "telecommunications" },
  { label: "Other", value: "other" },
];

const CACPrefixes = [
  { label: "RC", value: "rc" },
  { label: "BN", value: "bn" },
  { label: "LLP", value: "llp" },
  { label: "LP", value: "lp" },
  { label: "IT", value: "it" },
];

const mockLocations = [
  { label: "Abuja", value: "abuja" },
  { label: "Lagos", value: "lagos" },
  { label: "Port Harcourt", value: "port-harcourt" },
  { label: "Calabar", value: "calabar" },
];

const businessRoles = [
  { label: "Founder", value: "founder" },
  { label: "Co-Founder", value: "co-founder" },
  { label: "Director", value: "director" },
  { label: "Manager", value: "manager" },
  { label: "Employee", value: "employee" },
  { label: "Other", value: "other" },
];

export const Business = ({onNext,onBack, backDisabled, stepsLabel}: StepProps) => {
   const [businessName, setBusinessName] = useState('')
   const [businessDescription, setBusinessDescription] = useState("");
   const [businessType, setBusinessType ] = useState ("")
   const [businessEmail, setBusinessEmail] = useState("")
   const [industryType, setIndustryType] = useState("");
   const [businessPhone, setBusinessPhone] = useState("")
   const [businessLocation, setBusinessLocation] = useState("");
   const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)


    return (
      <FormShell
        title="Tell us about your business"
        subtitle="Start with the basics. This information helps Dey set up your business correctly."
      >
        <div className="flex flex-col gap-[15px] w-full">
          <span className="text-[18px] md:text-[21px] font-semibold">
            Business Information
          </span>
          <div className="flex flex-col gap-[20px] md:flex-row">
            <div className="flex flex-col gap-[20px] min-w-1/2">
              <Input
                placeholder="Business name"
                variant="secondary"
                value={businessName}
                onChange={setBusinessName}
              />
              <Input
                placeholder="Business email"
                variant="secondary"
                value={businessEmail}
                onChange={setBusinessEmail}
              />

              <TextArea
                placeholder="Business description"
                variant="secondary"
                value={businessDescription}
                onChange={setBusinessDescription}
              />
            </div>

            <div className="flex flex-col gap-[20px] min-w-1/2">
              <GroupDropdown
                placeholder="Business type"
                groupOptions={options}
                value={businessType}
                onChange={setBusinessType}
              />

              <Dropdown
                options={industryOptions}
                placeholder="Industry type"
                value={industryType}
                onChange={setIndustryType}
                searchable
              />

              <DropdownInput
                options={countriesCodes}
                label="Business phone"
                dropdownSide="left"
                noLabel={true}
                inputValue={businessPhone}
                onChange={setBusinessPhone}
              />

              <Dropdown
                options={mockLocations}
                placeholder="Business location"
                value={businessLocation}
                onChange={setBusinessLocation}
                searchable
              />
            </div>
          </div>
          <FileUpload
            label="Upload your logo"
            customClassName="w-full md:w-[calc(100%+20px)]"
          />
        </div>

        <div className="gap-[15px] flex flex-col mt-[30px]">
          <span className="text-[18px] md:text-[21px] font-semibold">
            Business Registration
          </span>

          <div className="flex gap-[20px] flex-wrap">
            <Button
              text="Registered"
              variant="secondary"
              onClick={() => setRegistrationStatus("registered")}
              selected={registrationStatus === "registered"}
              customClassName="text-nowrap "
            />
            <Button
              text="In registration"
              variant="secondary"
              onClick={() => setRegistrationStatus("in-registration")}
              selected={registrationStatus === "in-registration"}
              customClassName="text-nowrap max-w-[150px]"
            />
            <Button
              text="Not registered"
              variant="secondary"
              onClick={() => setRegistrationStatus("not-registered")}
              selected={registrationStatus === "not-registered"}
              customClassName="text-nowrap max-w-[150px]"
            />
          </div>

          {registrationStatus === "registered" && (
            <div className="flex gap-[20px] flex-wrap">
              <DropdownInput
                options={CACPrefixes}
                label="Registration number"
                dropdownSide="left"
                noLabel={false}
              />

              <DatePicker label="Registration date" />
            </div>
          )}
        </div>
      </FormShell>
    );
}

export const Profile = ({ onNext, onBack, backDisabled, stepsLabel }: StepProps) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [personalEmail, setPersonalEmail] = useState("")
  const [personalPhone, setPersonalPhone] = useState("")
  const [timeWithBusiness, setTimeWithBusiness] = useState("");

  return (
    <FormShell
      title={`Set up your profile ${'\u00A0'.repeat(20)}`}
      subtitle="Tell us about yourself so we can personalize your Dey experience."
      
    >
      <div className="flex flex-col gap-[15px] w-full">
        <span className="text-[18px] md:text-[21px] font-semibold">
          Personal Information
        </span>
        <div className="flex flex-col gap-[20px] md:flex-row">
          <div className="flex flex-col gap-[20px] min-w-1/2">
            <Input
              placeholder="First name"
              variant="secondary"
              value={firstName}
              onChange={setFirstName}
            />

            <Input
              placeholder="Last name"
              variant="secondary"
              value={lastName}
              onChange={setLastName}
            />

            <FileUpload label="Upload a profile picture" 
            customClassName=""/>
          </div>

          <div className="flex flex-col gap-[20px] min-w-1/2">
            <Input
                placeholder="Personal email"
                variant="secondary"
                value={personalEmail}
                onChange={setPersonalEmail}
              />

              <Input
                placeholder="Personal phone"
                variant="secondary"
                value={personalPhone}
                onChange={setPersonalPhone}
              />

              <Dropdown
                options={businessRoles}
                placeholder="Job title"
                value={jobTitle}
                onChange={setJobTitle}
              />

              <Dropdown
                options={businessRoles}
                placeholder="Time with business"
                value={jobTitle}
                onChange={setJobTitle}
              />
            </div>
        </div>
      </div>
    </FormShell>
  );
};
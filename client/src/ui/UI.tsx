import { memo, useState, useEffect, useRef, ReactNode, useId, useCache, useMemo} from 'react'
import { Link } from "react-router-dom";


interface ArrowIconProps {
  className?: string
  variant?: 'half' | 'full'
}

// Memoized arrow icon component to prevent re-renders
// Rule: rendering-hoist-jsx - Extract static JSX outside components
export const ArrowIcon = memo(function ArrowIcon({ className = 'w-4 h-4', variant = 'half' }: ArrowIconProps) {
  if (variant === 'full') {
    return (
      <svg className={className} viewBox="0 0 13 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2806 5.78318L7.78063 10.2832C7.63973 10.4241 7.44863 10.5032 7.24938 10.5032C7.05012 10.5032 6.85902 10.4241 6.71813 10.2832C6.57723 10.1423 6.49807 9.95118 6.49807 9.75193C6.49807 9.55267 6.57723 9.36157 6.71813 9.22068L9.9375 6.00255H0.75C0.551088 6.00255 0.360322 5.92353 0.21967 5.78288C0.0790177 5.64223 0 5.45146 0 5.25255C0 5.05364 0.0790177 4.86287 0.21967 4.72222C0.360322 4.58157 0.551088 4.50255 0.75 4.50255H9.9375L6.71937 1.28255C6.57848 1.14165 6.49932 0.950558 6.49932 0.751301C6.49932 0.552043 6.57848 0.360947 6.71937 0.220051C6.86027 0.0791546 7.05137 2.96917e-09 7.25062 0C7.44988 -2.96917e-09 7.64098 0.0791546 7.78187 0.220051L12.2819 4.72005C12.3518 4.78982 12.4073 4.87272 12.4451 4.96399C12.4829 5.05525 12.5023 5.15309 12.5022 5.25187C12.502 5.35066 12.4824 5.44845 12.4444 5.53962C12.4064 5.6308 12.3507 5.71357 12.2806 5.78318Z"/>
      </svg>
    )
  }

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
})


type IconPosition = "leading" | "trailing";

interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  iconType?: "none" | "side" | "up" | "arrowRight" | "back" | "arrowLeft";
  icon?: ReactNode;
  iconPosition?: IconPosition;
  size?: "small" | "standard";
  fullWidthMobile?: boolean;
  customClassName?: string;
  selected?: boolean;
}

export function Button({
  text,
  link,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  iconType = "none",
  icon,
  iconPosition,
  size = "standard",
  fullWidthMobile = false,
  customClassName = "",
  selected = false,
}: ButtonProps) {
  const isExternal = iconType === "up";

  // Explicit iconPosition always wins. Otherwise the built-in "back"/"arrowLeft"
  // iconTypes still default to leading (unchanged behavior) — anything else,
  // including a custom `icon`, defaults trailing.
  const defaultPosition: IconPosition =
    iconType === "back" || iconType === "arrowLeft" ? "leading" : "trailing";
  const isLeading = (iconPosition ?? defaultPosition) === "leading";

  const baseStyles =
    "inline-flex items-center justify-center rounded-[4px] transition-colors";
  const sizeStyles = {
    small: "px-4 py-1 gap-2 text-[14px]",
    standard: "px-5 py-2 gap-2 text-[16px]",
  };
  const variantStyles = {
    primary:
      "bg-primary text-white transition-colors enabled:hover:bg-primary-variant disabled:text-white-64 disabled:opacity-80 disabled:cursor-not-allowed",
    secondary: `${
      selected ? "border border-accent bg-white-8" : "border border-primary"
    } bg-white-4 text-white-80 enabled:hover:bg-white-8 hover:border-accent disabled:text-white-64 disabled:border-white-4`,
  };
  const widthStyles = fullWidthMobile ? "w-full sm:w-auto" : "w-auto";
  const className = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${customClassName}`;

  const IconUp = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17L17 7M17 7H7M17 7v10"
      />
    </svg>
  );

  const renderIcon = () => {
    // A custom icon always takes priority over the built-in iconType set.
    if (icon) return icon;

    switch (iconType) {
      case "side":
        return <ArrowIcon variant="half" className="w-4 h-4" />;
      case "back":
        return <ArrowIcon variant="half" className="w-4 h-4 rotate-180" />;
      case "arrowRight":
        return <ArrowIcon variant="full" className="w-[13px] h-[11px]" />;
      case "arrowLeft":
        return (
          <ArrowIcon variant="full" className="w-[13px] h-[11px] rotate-180" />
        );
      case "up":
        return <IconUp />;
      default:
        return null;
    }
  };

  const renderedIcon = renderIcon();

  const content = (
    <>
      {isLeading && renderedIcon}
      {text}
      {!isLeading && renderedIcon}
    </>
  );

  if (link) {
    if (isExternal) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={link} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {content}
    </button>
  );
}

interface InputProps {
  placeholder?: string;
  type?:string
  variant?: "primary" | "secondary";
  iconType?: "none" | "hidePassword" | "showPassword" | "search";
  size?: "small" | "standard";
  fullWidthMobile?: boolean;
  customClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  placeholder,
  type,
  variant = "primary",
  iconType = "none",
  size = "standard",
  fullWidthMobile = false,
  customClassName = "",
  value,
  onChange,
  name,
  onFocus,
  onBlur,
}: InputProps) {
  const isPasswordField =
    iconType === "hidePassword" || iconType === "showPassword";
  const [isRevealed, setIsRevealed] = useState(iconType === "showPassword");
  const [isFocused, setIsFocused] = useState(false);

  const inputType = isPasswordField
    ? isRevealed
      ? "text"
      : "password"
    : "text";
  const handleToggleReveal = () => setIsRevealed((prev) => !prev);

  const isFloating = isFocused || !!value;

  return (
    <div
      className={[
        "relative inline-flex items-center justify-between rounded-[4px] transition-colors w-full",
        variant === "primary"
          ? "bg-bg-secondary text-white hover:bg-secondary"
          : "bg-white-4 text-white-80 focus-within:bg-white-8",
        size === "standard"
          ? "px-5 h-[40px] gap-2 text-[14px] md:text-[16px]"
          : "px-4 h-[36px] gap-2 text-[12px] md:text-[14px]",
        fullWidthMobile ? "w-full sm:w-auto" : "w-auto",
        customClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Structural only — its text is invisible, it just opens a gap in the border */}
      <fieldset
        className={`absolute inset-0 px-2 rounded-[4px] top-[-8px] pointer-events-none transition-colors duration-150 border ${
          isFocused ? "border-accent" : "border-primary"
        }`}
      >
        <legend
          className={`text-[12px]  overflow-hidden whitespace-nowrap transition-[max-width] duration-150 ${
            isFloating ? "max-w-full px-0.5" : "max-w-0"
          }`}
        >
          <span className="invisible">{placeholder}</span>
        </legend>
      </fieldset>

      <input
        type={inputType || type}
        placeholder=""
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        value={value}
        onChange={onChange}
        name={name}
        className="border-none focus:border-none outline-none w-full bg-transparent autofill:bg-primary autofill:text-white-80"
      />

      {/* The ONE visible label — animates in place instead of being swapped */}
      <label
        className={`absolute left-0 ml-[10px] pointer-events-none origin-left transition-all duration-150 ${
          isFloating
            ? "top-0 -translate-y-1/2 text-[12px]"
            : "top-1/2 -translate-y-1/2 text-[14px] md:text-[16px]"
        } ${isFocused ? "text-white-80" : "text-white-64"}`}
      >
        {placeholder}
      </label>

      {isPasswordField && (
        <button
          type="button"
          onClick={handleToggleReveal}
          aria-label={isRevealed ? "Hide password" : "Show password"}
          className="w-4 h-4 shrink-0"
        >
          {isRevealed ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}

      {iconType === "search" && (
        <span aria-hidden="true" className="w-4 h-4 shrink-0">
          <SearchIcon />
        </span>
      )}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffffcc"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="" // TODO: icon size/color classes, e.g. size-4 text-neutral-500
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffffcc"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="" // TODO: icon size/color classes, e.g. size-4 text-neutral-500
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function SearchIcon({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffffcc"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

interface TextAreaProps {
  placeholder?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "standard";
  fullWidthMobile?: boolean;
  customClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  onFocus?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({
  placeholder,
  variant = "primary",
  size = "standard",
  fullWidthMobile = false,
  customClassName = "",
  value,
  onChange,
  name,
  onFocus,
  onBlur,
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || !!value;

  return (
    <div
      className={[
        "relative inline-flex items-start justify-between rounded-[4px] transition-colors w-full",
        variant === "primary"
          ? "bg-bg-secondary text-white hover:bg-secondary"
          : "bg-white-4 text-white-80 focus-within:bg-white-8",
        size === "standard"
          ? "px-5 pb-[25px] pt-[10.5px] gap-2 text-[14px] md:text-[16px] md:pb-[43px] "
          : "px-4 pb-[25px] pt-[10.5px] gap-2 text-[12px] md:text-[14px] md:pb-[25px] ",
        fullWidthMobile ? "w-full sm:w-auto" : "w-auto",
        customClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <fieldset
        className={`absolute inset-0 px-2 top-[-8.5px] rounded-[4px] pointer-events-none transition-colors duration-150 border ${
          isFocused ? "border-accent" : "border-primary"
        }`}
      >
        <legend
          className={`text-[12px] overflow-hidden whitespace-nowrap transition-[max-width] duration-150 ${
            isFloating ? "max-w-full px-0.5" : "max-w-0"
          }`}
        >
          <span className="invisible">{placeholder}</span>
        </legend>
      </fieldset>

      <textarea
        placeholder=""
        value={value}
        onChange={onChange}
        name={name}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        className="border-none focus:border-none outline-none w-full bg-transparent resize-none"
      />

      <label
        className={`absolute left-0 ml-[10px] pointer-events-none origin-left transition-all duration-150 ${
          isFloating
            ? "top-0 -translate-y-1/2 text-[12px]"
            : "top-[10.5px] text-[14px] md:text-[16px]"
        } ${isFocused ? "text-white-80" : "text-white-64"}`}
      >
        {placeholder}
      </label>
    </div>
  );
}


interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  placeholder?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "standard";
  fullWidthMobile?: boolean;
  customClassName?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  searchable?: boolean;
}

export function Dropdown({
  placeholder,
  variant = "primary",
  size = "standard",
  fullWidthMobile = false,
  customClassName = "",
  options,
  value,
  onChange,
  name,
  searchable = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);
  const isFloating = isOpen || !!value;

  const filteredOptions =
    searchable && query
      ? options.filter((o) =>
          o.label.toLowerCase().includes(query.toLowerCase())
        )
      : options;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optValue: string) => {
    onChange?.(optValue);
    setIsOpen(false);
    setQuery("");
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (searchable) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.select());
    }
  };

  const wrapperClassName = [
    "relative inline-flex items-center justify-between rounded-[4px] transition-colors w-full text-left",
    variant === "primary"
      ? "bg-white-4 text-white hover:bg-white-8"
      : "bg-white-4 text-white-80 focus-within:bg-white-8",
    size === "standard"
      ? "px-5 h-[40px] gap-2 text-[14px] md:text-[16px]"
      : "px-4 h-[36px] gap-2 text-[12px] md:text-[14px]",
    fullWidthMobile ? "w-full sm:w-auto" : "w-auto",
    customClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const notch = (
    <fieldset
      className={`absolute inset-0 px-2 rounded-[4px] top-[-8px] pointer-events-none transition-colors duration-150 border ${
        isOpen ? "border-accent" : "border-primary"
      }`}
    >
      <legend
        className={`text-[12px] overflow-hidden whitespace-nowrap transition-[max-width] duration-150 ${
          isFloating ? "max-w-full px-0.5" : "max-w-0"
        }`}
      >
        <span className="invisible">{placeholder}</span>
      </legend>
    </fieldset>
  );

  const floatingLabel = (
    <label
      className={`absolute left-0 ml-[10px] pointer-events-none origin-left transition-all duration-150 ${
        isFloating
          ? "top-0 -translate-y-1/2 text-[12px]"
          : "top-1/2 -translate-y-1/2 text-[14px] md:text-[16px]"
      } ${isOpen ? "text-white-90" : "text-white-64"}`}
    >
      {placeholder}
    </label>
  );

  const arrow = (
    <ArrowIcon
      variant="half"
      className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
        isOpen ? "-rotate-90" : "rotate-90"
      }`}
    />
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {searchable ? (
        <div className={wrapperClassName}>
          {notch}
          <input
            ref={inputRef}
            type="text"
            name={name}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            autoComplete="off"
            value={isOpen ? query : selected?.label ?? ""}
            onFocus={handleOpen}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            className="border-none outline-none w-full bg-transparent"
          />
          {floatingLabel}
          {arrow}
        </div>
      ) : (
        <button
          type="button"
          name={name}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          className={wrapperClassName}
        >
          {notch}
          <span
            className={`truncate transition-opacity duration-150 ${
              isFloating ? "opacity-100" : "opacity-0"
            }`}
          >
            {selected?.label ?? "\u00A0"}
          </span>
          {floatingLabel}
          {arrow}
        </button>
      )}

      <ul
        role="listbox"
        className={`absolute z-10 mt-1 w-full rounded-[4px] bg-bg-secondary border border-accent overflow-hidden origin-top transition-all duration-150 max-h-60 overflow-y-auto custom-scrollbar ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-2" />
        {filteredOptions.length === 0 ? (
          <li className="px-5 py-2 text-[14px] text-white-64">No matches</li>
        ) : (
          filteredOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-5 py-2 text-[14px] md:text-[16px] transition-colors hover:bg-white-8 ${
                  option.value === value ? "text-white-80" : "text-white-64"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

interface GroupDropdownOption {
  header?: string;
  label: string;
  value: string;
}

interface GroupDropdownProps {
  placeholder?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "standard";
  fullWidthMobile?: boolean;
  customClassName?: string;
  groupOptions: GroupDropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

type MenuRow =
  | { type: "item"; item: GroupDropdownOption }
  | { type: "group"; header: string; items: GroupDropdownOption[] };

function buildMenu(groupOptions: GroupDropdownOption[] = []): MenuRow[] {
  const groups: Record<string, GroupDropdownOption[]> = {};
  for (const item of groupOptions) {
    if (item.header) {
      if (!groups[item.header]) groups[item.header] = [];
      groups[item.header].push(item);
    }
  }

  const rows: MenuRow[] = [];
  const seenGroups = new Set<string>();
  for (const item of groupOptions) {
    if (item.header) {
      if (!seenGroups.has(item.header)) {
        seenGroups.add(item.header);
        rows.push({ type: "group", header: item.header, items: groups[item.header] });
      }
    } else {
      rows.push({ type: "item", item });
    }
  }
  return rows;
}

export function GroupDropdown({
  placeholder,
  variant = "primary",
  size = "standard",
  fullWidthMobile = false,
  customClassName = "",
  groupOptions = [],
  value,
  onChange,
  name,
}: GroupDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => buildMenu(groupOptions), [groupOptions]);

  // Derived from the controlled `value` prop instead of separate local state (fix #6)
  const selectedOption = useMemo(
    () => groupOptions.find((o) => o.value === value) ?? null,
    [groupOptions, value]
  );

  const isFloating = isOpen || !!value;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleGroup(header: string) {
    setExpandedGroups((prev) => ({ ...prev, [header]: !prev[header] }));
  }

  function pick(item: GroupDropdownOption) {
    setIsOpen(false);
    onChange?.(item.value); // single callback now (fix #5)
  }

  const wrapperClassName = [
    "relative inline-flex items-center justify-between rounded-[4px] transition-colors w-full text-left",
    variant === "primary"
      ? "bg-white-4 text-white hover:bg-white-8"
      : "bg-white-4 text-white-80 focus-within:bg-white-8",
    size === "standard"
      ? "px-5 h-[40px] gap-2 text-[14px] md:text-[16px]"
      : "px-4 h-[36px] gap-2 text-[12px] md:text-[14px]",
    fullWidthMobile ? "w-full sm:w-auto" : "w-auto",
    customClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const notch = (
    <fieldset
      className={`absolute inset-0 px-2 rounded-[4px] top-[-8px] pointer-events-none transition-colors duration-150 border ${
        isOpen ? "border-accent" : "border-primary"
      }`}
    >
      <legend
        className={`text-[12px] overflow-hidden whitespace-nowrap transition-[max-width] duration-150 ${
          isFloating ? "max-w-full px-0.5" : "max-w-0"
        }`}
      >
        <span className="invisible">{placeholder}</span>
      </legend>
    </fieldset>
  );

  const floatingLabel = (
    <label
      className={`absolute left-0 ml-[10px] pointer-events-none origin-left transition-all duration-150 ${
        isFloating ? "top-0 -translate-y-1/2 text-[12px]" : "top-1/2 -translate-y-1/2 text-[14px] md:text-[16px]"
      } ${isOpen ? "text-white-90" : "text-white-64"}`}
    >
      {placeholder}
    </label>
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        name={name}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)} // fixed: was setOpen (fix #1)
        className={wrapperClassName}
      >
        {notch}
        <span
          className={`truncate transition-opacity duration-150 ${isFloating ? "opacity-100" : "opacity-0"}`}
        >
          {selectedOption?.label ?? "\u00A0"}
        </span>
        {floatingLabel}
        <ArrowIcon
          variant="half"
          className={`w-4 h-4 shrink-0 transition-transform duration-150 ${isOpen ? "-rotate-90" : "rotate-90"}`}
        />
      </button>

      {/* Always mounted now so the close transition can actually play (fix #9) */}
      <ul
        role="listbox"
        className={`absolute z-10 mt-1 w-full rounded-[4px] bg-bg-secondary border border-accent overflow-hidden origin-top transition-all duration-150 max-h-60 overflow-y-auto custom-scrollbar ${
          isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-5" />
        {rows.map((row, i) =>
          row.type === "item" ? (
            <li key={row.item.value ?? i}>
              <button
                type="button"
                role="option"
                aria-selected={row.item.value === value}
                onClick={() => pick(row.item)}
                className={`w-full text-left px-5 py-2 text-[14px] md:text-[16px] transition-colors hover:bg-white-8 ${
                  row.item.value === value ? "text-white-80" : "text-white-64"
                }`}
              >
                {row.item.label}
              </button>
            </li>
          ) : (
            <li key={row.header} role="group" aria-label={row.header}>
              <button
                type="button"
                aria-expanded={!!expandedGroups[row.header]}
                onClick={() => toggleGroup(row.header)}
                className="w-full flex items-center justify-between text-left px-5 py-2 text-[14px] md:text-[16px] transition-colors hover:bg-white-8 text-white-64"
              >
                {row.header}
                <ArrowIcon
                  variant="half"
                  className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                    expandedGroups[row.header] ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </button>

              {expandedGroups[row.header] && (
                <ul className="w-full text-left border-l border-accent ml-3">
                  {row.items.map((item) => (
                    <li key={item.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={item.value === value}
                        onClick={() => pick(item)}
                        className={`w-full text-left px-5 py-2 text-[14px] md:text-[16px] transition-colors hover:bg-white-8 ${
                          item.value === value ? "text-white-80" : "text-white-64"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

// ---------- DropdownInput Component ----------


export interface DropdownInputOptions {
  value: string;
  label: string;
  icon?: string;
  hint?: string;
}

export interface DropdownInputProps {
  label?: string;
  options: DropdownInputOptions[];
  selectedValue?: string;
  defaultSelectedValue?: string;
  onSelectedChange?: (value: string) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
  inputPlaceholder?: string;
  inputType?: "text" | "number";
  searchable?: boolean;
  disabled?: boolean;
  dropdownSide: "left" | "right";
  name?: string;
  selectName?: string;
  variant?: "primary" | "secondary";
  size?: "standard" | "small";
  fullWidthMobile?: boolean;
  className?: string;
  dropdownListWidth?: string;
  noLabel?:boolean;
}

export function DropdownInput({
  label,
  options,
  selectedValue,
  defaultSelectedValue,
  onSelectedChange,
  inputValue,
  defaultInputValue,
  onInputChange,
  inputPlaceholder,
  inputType = "text",
  searchable = false,
  disabled = false,
  dropdownSide,
  name,
  selectName,
  variant = "primary",
  size = "standard",
  fullWidthMobile = false,
  className,
  dropdownListWidth = "200px",
  noLabel = false,
}: DropdownInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [sideWidth, setSideWidth] = useState(60);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Uncontrolled fallback - same pattern as DatePicker/FileUpload/OTPInput
  // above: if the parent doesn't pass selectedValue/inputValue + their
  // onChange handlers, the component manages its own state instead of
  // throwing when it tries to call an undefined callback.
  const [internalSelectedValue, setInternalSelectedValue] = useState(
    defaultSelectedValue ?? ""
  );
  const effectiveSelectedValue =
    selectedValue !== undefined ? selectedValue : internalSelectedValue;

  const [internalInputValue, setInternalInputValue] = useState(
    defaultInputValue ?? ""
  );
  const effectiveInputValue =
    inputValue !== undefined ? inputValue : internalInputValue;

  const selected = options.find((o) => o.value === effectiveSelectedValue);
  const isActive = isOpen || inputFocused;
  const isFloating =
    isActive || !!effectiveInputValue || !!effectiveSelectedValue;

  const filteredOptions =
    searchable && query
      ? options.filter((o) =>
          o.label.toLowerCase().includes(query.toLowerCase())
        )
      : options;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (dropdownSide !== "left") return;
    const measure = () => {
      if (buttonRef.current) setSideWidth(buttonRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [dropdownSide, effectiveSelectedValue, size]);

  const handleSelect = (optValue: string) => {
    if (selectedValue === undefined) setInternalSelectedValue(optValue);
    onSelectedChange?.(optValue);
    setIsOpen(false);
    setQuery("");
  };

  const handleInputChange = (v: string) => {
    if (inputValue === undefined) setInternalInputValue(v);
    onInputChange?.(v);
  };

  const handleToggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    if (!isOpen && searchable) {
      setQuery("");
      requestAnimationFrame(() => searchInputRef.current?.select());
    }
  };

  const labelLeft = dropdownSide === "left" ? sideWidth + 10 : 10;

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`relative inline-flex items-stretch rounded transition-colors duration-150 text-left ${
          size === "standard"
            ? "h-10 text-sm md:text-base"
            : "h-9 text-xs md:text-sm"
        } ${fullWidthMobile ? "w-full sm:w-auto" : "w-full"} ${
          isActive ? "bg-white-8" : "bg-white-4 hover:bg-white-8"
        } ${variant === "primary" ? "text-white" : "text-white/80"} ${
          disabled ? "opacity-50 pointer-events-none" : ""
        } ${className ?? ""}`}
      >
        <fieldset
          className={`absolute inset-0 -top-2 rounded px-2 box-border border pointer-events-none transition-colors duration-150 ${
            isActive ? "border-accent" : "border-primary"
          }`}
        >
          <legend
            className={`text-[12px] overflow-hidden whitespace-nowrap transition-all duration-150 ${
              isFloating ? "ml-[92px] max-w-[200px] px-0.5" : "max-w-0 px-0"
            }`}
          >
            <span className="invisible">{label}</span>
          </legend>
        </fieldset>

        {dropdownSide === "left" ? (
          <>
            <button
              ref={buttonRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              onClick={handleToggleDropdown}
              disabled={disabled}
              className={`flex items-center w-[93px] max-w-[95px] shrink-0 bg-transparent border-0 text-inherit font-inherit pl-5 pr-3 ${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {selected?.icon && (
                <span className="text-base leading-none">{selected.icon}</span>
              )}
              {!noLabel && (
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-white/80">
                  {selected?.hint ?? selected?.label ?? ""}
                </span>
              )}
              <ArrowIcon
                variant="half"
                className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                  isOpen ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>
            <span aria-hidden className="w-px self-stretch my-2 bg-white-8" />
            <input
              type={inputType}
              name={name}
              value={effectiveInputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={isFloating ? inputPlaceholder : undefined}
              disabled={disabled}
              className="flex-1 min-w-0 border-0 outline-none bg-transparent px-5 text-inherit font-inherit placeholder:text-white-64"
            />
          </>
        ) : (
          <>
            <input
              type={inputType}
              name={name}
              value={effectiveInputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={isFloating ? inputPlaceholder : undefined}
              disabled={disabled}
              className="flex-1 min-w-0 border-0 outline-none bg-transparent px-5 text-inherit font-inherit placeholder:text-white-64"
            />
            <span aria-hidden className="w-px self-stretch my-2 bg-white-8" />
            <button
              ref={buttonRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              onClick={handleToggleDropdown}
              disabled={disabled}
              className={`flex items-center justify-between shrink-0 bg-transparent border-0 text-inherit font-inherit pl-3 pr-5 ${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {selected?.icon && (
                <span className="text-base leading-none">{selected.icon}</span>
              )}
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-white/80">
                {selected?.hint ?? selected?.label ?? ""}
              </span>
              <ArrowIcon
                variant="half"
                className={` w-4 h-4 shrink-0 transition-transform duration-150 ${
                  isOpen ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>
          </>
        )}

        {label && (
          <label
            className={`absolute pointer-events-none origin-left transition-all duration-150 -translate-y-1/2 ${
              isFloating
                ? "top-0 text-xs"
                : `top-1/2 ${
                    size === "standard"
                      ? "text-sm md:text-base"
                      : "text-xs md:text-sm"
                  }`
            } ${isActive ? "text-white-80" : "text-white-64"}`}
            style={{ left: labelLeft }}
          >
            {label}
          </label>
        )}
      </div>

      {selectName && (
        <input type="hidden" name={selectName} value={effectiveSelectedValue} />
      )}

      <ul
        role="listbox"
        className={`w-2/3 text-left absolute z-10 mt-1 rounded bg-bg-secondary border border-accent overflow-hidden max-h-60 overflow-y-auto origin-top transition-all duration-150 ${
          dropdownSide === "left" ? "left-0" : "right-0"
        } ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto custom-scrollbar"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`
      
      }
        style={{ minWidth: dropdownListWidth }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url('/images/noise.png')",
            backgroundRepeat: "repeat",
          }}
        />
        {searchable && (
          <li className="sticky top-0 z-10 list-none border-accent bg-bg-secondary p-2">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded bg-white/5 px-3 py-1.5 text-sm text-white outline-none border-0"
            />
          </li>
        )}
        {filteredOptions.length === 0 ? (
          <li className="list-none px-5 py-2 text-sm text-white/40">
            No matches
          </li>
        ) : (
          filteredOptions.map((option) => (
            <li key={option.value} className="list-none">
              <button
                type="button"
                role="option"
                aria-selected={option.value === effectiveSelectedValue}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-5 py-2 text-sm md:text-base transition-colors duration-150 bg-transparent border-0 flex items-center cursor-pointer hover:bg-white-8 flex gap-[30px] ${
                  option.value === effectiveSelectedValue
                    ? "text-white/80"
                    : "text-white/70"
                }`}
              >
                {option.icon && (
                  <span className="text-base leading-none">{option.icon}</span>
                )}
                <span className=" overflow-hidden text-ellipsis whitespace-nowrap">
                  {option.label}
                </span>
                {option.hint && (
                  <span className="text-xs text-white/40">{option.hint}</span>
                )}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
 


 
export interface DatePickerProps {
  label?: string;
  value?: string; // ISO format "YYYY-MM-DD"
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  variant?: "primary" | "secondary";
  size?: "standard" | "small";
  fullWidthMobile?: boolean;
  className?: string;
  placeholder?: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ordinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className ?? ""}`}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className ?? ""}`}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function DatePicker({
  label,
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  min,
  max,
  variant = "primary",
  size = "standard",
  fullWidthMobile = false,
  className,
  placeholder = '',
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const effectiveValue = value !== undefined ? value : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false)
  const [isYearOpen, setIsYearOpen] = useState(false)
  const [inputFocused, setInputFocused] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => {
    const d = effectiveValue
      ? new Date(effectiveValue + "T00:00:00")
      : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const isFloating = isOpen || inputFocused || !!effectiveValue;
  const isActive = isOpen || inputFocused;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    if (value === undefined) setInternalValue(iso);
    onChange?.(iso);
    setIsOpen(false);
  };

  // FIX: clicking the trigger while the calendar was already open did
  // nothing - only clicking outside could close it. Toggle instead.
  const handleToggle = () => {
    if (disabled) return;
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    if (effectiveValue) {
      const d = new Date(effectiveValue + "T00:00:00");
      setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
    }
    setIsOpen(true);
  };

  const handleMonthToggleDropdown = () => {
    if (disabled) return;
    setIsMonthOpen((prev) => !prev);
  };

  const handleYearToggleDropdown = () => {
    if (disabled) return;
    setIsYearOpen((prev) => !prev);
  };



  // "16th September, 2023" instead of "16/9/2023".
  const formatDisplay = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    const monthName = MONTH_NAMES[m - 1];
    return `${d}${ordinalSuffix(d)} ${monthName}, ${y}`;
  };

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay(); // 0 = Sunday
  const daysArray: (number | null)[] = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const isDateDisabled = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (min && date < new Date(min + "T00:00:00")) return true;
    if (max && date > new Date(max + "T00:00:00")) return true;
    return false;
  };

  const changeMonth = (delta: number) => {
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
    );
  };

  // Jump straight to a month or year via selects, instead of only being
  // able to step one month at a time with the arrows.
  const handleMonthSelect = (monthIndex: number) => {
    setViewDate((prev) => new Date(prev.getFullYear(), monthIndex, 1));
  };
  const handleYearSelect = (year: number) => {
    setViewDate((prev) => new Date(year, prev.getMonth(), 1));
  };

  const minYear = min
    ? new Date(min + "T00:00:00").getFullYear()
    : viewDate.getFullYear() - 150;
  const maxYear = max
    ? new Date(max + "T00:00:00").getFullYear()
    : viewDate.getFullYear() + 0;
  const yearOptions = Array.from(
    { length: Math.max(maxYear - minYear + 1, 1) },
    (_, i) => minYear + i
  );

  const sizeTextClass =
    size === "standard" ? "text-sm md:text-base" : "text-xs md:text-sm";
  const heightClass = size === "standard" ? "h-10" : "h-9";

  const wrapperClass = [
    "relative inline-flex items-center rounded transition-colors duration-150 text-left cursor-pointer",
    heightClass,
    sizeTextClass,
    fullWidthMobile ? "w-full sm:w-auto" : "w-full",
    isActive ? "bg-white-8" : "bg-white-4 hover:bg-white-8",
    variant === "primary" ? "text-white" : "text-white/80",
    disabled ? "opacity-50 pointer-events-none" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const notchClass = [
    "absolute -top-2 inset-0 rounded px-2 box-border border pointer-events-none transition-colors duration-150",
    isActive ? "border-accent" : "border-primary",
  ].join(" ");

  const legendClass = [
    "text-[12px] overflow-hidden whitespace-nowrap transition-all duration-150",
    isFloating ? "max-w-[200px] px-0.5" : "max-w-0 px-0",
  ].join(" ");

  const labelClass = [
    "absolute left-0 ml-2.5 pointer-events-none origin-left transition-all duration-150 -translate-y-1/2",
    isFloating ? "top-0 text-xs" : `top-1/2 ${sizeTextClass}`,
    isActive ? "text-white-80" : "text-white-64",
  ].join(" ");

  const navButtonClass =
    "p-1 rounded bg-transparent border-0 text-inherit hover:bg-white-8 " +
    (disabled ? "cursor-not-allowed" : "cursor-pointer");

  const selectClass =
    "bg-transparent border-0 outline-none text-white-80 text-sm md:text-base cursor-pointer px-1 py-0.5 rounded hover:bg-white-8";

  const dayCellClass = (isDisabled: boolean, isSelected: boolean) =>
    [
      "h-8 w-8 rounded-full text-sm flex items-center justify-center transition-colors duration-150 border-0",
      isSelected ? "bg-accent" : "bg-transparent hover:bg-white-8",
      isDisabled
        ? "text-white-4 cursor-not-allowed hover:bg-transparent"
        : isSelected
        ? "text-white cursor-pointer"
        : "text-white4 cursor-pointer",
    ].join(" ");

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={wrapperClass}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleToggle()}
        onFocus={() => setInputFocused(true)}
      >
        <fieldset className={notchClass}>
          <legend className={legendClass}>
            <span className="invisible">{label}</span>
          </legend>
        </fieldset>

        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-5 ">
          {effectiveValue ? formatDisplay(effectiveValue) : placeholder}
        </span>

        {name && <input type="hidden" name={name} value={effectiveValue} />}

        {label && <label className={labelClass}>{label}</label>}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 left-0 rounded bg-bg-secondary border border-accent overflow-hidden origin-top p-4 w-max min-w-full">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "url('/images/noise.png')",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="flex items-center justify-between gap-2 mb-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                changeMonth(-1);
              }}
              className={navButtonClass}
              disabled={disabled}
              aria-label="Previous month"
            >
              <ChevronLeftIcon />
            </button>

            <div className="flex items-center gap-1">
              <div>
                <button
                  value={viewDate.getMonth()}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleMonthSelect(parseInt(e.target.value, 10));
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMonthToggleDropdown();
                  }}
                  disabled={disabled}
                  className={`${selectClass} relative flex items-center gap-2`}
                >
                  {MONTH_NAMES[viewDate.getMonth()]}
                  <ArrowIcon
                    variant="half"
                    className={`w-3 h-3 shrink-0 transition-transform duration-150 ${
                      isMonthOpen ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </button>

                {isMonthOpen && (
                  <div className={`bg-bg-secondary border border-accent rounded flex flex-col absolute h-[200px] overflow-y-auto custom-scrollbar
                    ${isMonthOpen && isYearOpen ? "left-25": ""} `}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.02]"
                      style={{
                        backgroundImage: "url('/images/noise.png')",
                        backgroundRepeat: "repeat",
                      }}
                    />
                    {MONTH_NAMES.map((m, i) => (
                      <button
                        key={m}
                        value={i}
                        className="w-full text-left px-5 py-2 text-[14px] md:text-[16px] transition-colors hover:bg-white-8 "
                        onClick={(e) => {
                          handleMonthSelect(parseInt(e.target.value, 10));
                          setIsMonthOpen(false);
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/*Expected registration date should propagate,
                 and mascot or app should confirm if registration 
                 has occured */}

              <div>
                <button
                  value={viewDate.getFullYear()}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleYearSelect(parseInt(e.target.value, 10));
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleYearToggleDropdown();
                  }}
                  disabled={disabled}
                  className={`${selectClass} relative flex items-center gap-2`}
                >
                  {viewDate.getFullYear()}
                  <ArrowIcon
                    variant="half"
                    className={`w-3 h-3 shrink-0 transition-transform duration-150 ${
                      isYearOpen ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </button>

                {isYearOpen && (
                  <div className={`bg-bg-secondary border border-accent rounded flex flex-col absolute h-[200px] overflow-y-auto custom-scrollbar 
                  ${isMonthOpen && isYearOpen ? "right-25": ""}`}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.02]"
                      style={{
                        backgroundImage: "url('/images/noise.png')",
                        backgroundRepeat: "repeat",
                      }}
                    />
                    {[...yearOptions].reverse().map((y, i) => (
                      <button
                        key={y}
                        value={i}
                        className="w-full text-left px-5 py-2 text-[14px] md:text-[16px] transition-colors hover:bg-white-8 "
                        onClick={(e) => {
                          handleMonthSelect(parseInt(e.target.value, 10));
                          setIsMonthOpen(false);
                        }}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                changeMonth(1);
              }}
              className={navButtonClass}
              disabled={disabled}
              aria-label="Next month"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-white/40 text-xs mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysArray.map((day, index) => {
              if (day === null) return <span key={`empty-${index}`} />;
              const disabledDay = isDateDisabled(day);
              const iso = `${viewDate.getFullYear()}-${String(
                viewDate.getMonth() + 1
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const selectedDay = effectiveValue === iso;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!disabledDay) handleSelect(day);
                  }}
                  disabled={disabledDay}
                  className={dayCellClass(disabledDay, selectedDay)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
 


export interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "standard" | "small";
  fullWidthMobile?: boolean;
  customClassName?: string;
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  maxSizeMB?: number;
  name?: string;
}

export function FileUpload({
  label,
  accept,
  multiple = false,
  disabled = false,
  variant = "primary",
  size = "standard",
  fullWidthMobile = false,
  customClassName = "",
  value,
  defaultValue,
  onChange,
  maxSizeMB,
  name,
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = useState<File[]>(
    defaultValue ?? []
  );
  const effectiveFiles = value !== undefined ? value : internalFiles;
  const [isDragging, setIsDragging] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    let newFiles = Array.from(fileList);
    if (maxSizeMB) {
      newFiles = newFiles.filter((f) => f.size <= maxSizeMB * 1024 * 1024);
    }
    if (value === undefined) setInternalFiles(newFiles);
    onChange?.(newFiles);
  };

  const removeFile = (index: number) => {
    const updated = effectiveFiles.filter((_, i) => i !== index);
    if (value === undefined) setInternalFiles(updated);
    onChange?.(updated);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  };

  const heightClass =
    size === "standard"
      ? "text-[14px] md:text-[16px]"
      : "text-[12px] md:text-[14px]";

  const wrapperClassName = [
    "relative inline-flex items-center rounded-[4px] transition-colors w-full text-left",
    variant === "primary"
      ? "bg-white-4 text-white hover:bg-white-8"
      : "bg-white-4 text-white-80 focus-within:bg-white-8",
    fullWidthMobile ? "w-full sm:w-auto" : "w-auto",
    disabled ? "opacity-50 pointer-events-none" : "",
    heightClass,
    customClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const notch = (
    <fieldset
      className={`absolute inset-0 px-2 rounded-[4px] top-[-8px] pointer-events-none transition-colors duration-150 border ${
        isDragging || inputFocused ? "border-accent" : "border-primary"
      }`}
    >
      <legend
        className={`text-[12px] overflow-hidden whitespace-nowrap transition-[max-width] duration-150 max-w-full px-0.5`}
      >
        <span className="invisible">{label}</span>
      </legend>
    </fieldset>
  );

  const floatingLabel = (
    <label
      className={`absolute left-0 ml-[10px] pointer-events-none origin-left transition-all duration-150 top-0 -translate-y-1/2 text-[12px]
         ${isDragging || inputFocused ? "text-white-80" : "text-white-40"}`}
    >
      {label}
    </label>
  );

  return (
    <div
      ref={containerRef}
      className={wrapperClassName}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
    >
      {notch}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        className="sr-only"
        disabled={disabled}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      <div className="flex flex-col w-full gap-2 p-4">
        {effectiveFiles.length === 0 && (
          <div
            onClick={() => !disabled && fileInputRef.current?.click()}
            className={`flex items-center justify-center rounded-[4px] border-2 border-dashed transition-colors p-6 cursor-pointer ${
              isDragging
                ? "border-accent bg-white-4"
                : "border-white-40 hover:border-white-64"
            }`}
          >
            <span className="text-white-64">
              Drop files here or click to browse
            </span>
          </div>
        )}
        {effectiveFiles.length > 0 && (
          <ul className="space-y-1">
            {effectiveFiles.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between text-white-80 text-[12px] md:text-[14px]"
              >
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="ml-2 text-white-40 hover:text-white-80"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {floatingLabel}
    </div>
  );
}

export interface OTPInputProps {
  label?: string;
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  variant?: "primary" | "secondary";
  size?: "standard" | "small";
  fullWidthMobile?: boolean;
  customClassName?: string;
  name?: string;
}

export function OTPInput({
  label,
  length = 6,
  value,
  defaultValue,
  onChange,
  onComplete,
  disabled = false,
  autoFocus = false,
  variant = "primary",
  size = "standard",
  fullWidthMobile = false,
  customClassName = "",
  name,
}: OTPInputProps) {
  const [internalOtp, setInternalOtp] = useState(defaultValue ?? "");
  const effectiveOtp = value !== undefined ? value : internalOtp;
  const [focused, setFocused] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const isFloating = focused || effectiveOtp.length > 0;

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputsRef.current[index] = el;
  };

  const handleChange = (index: number, char: string) => {
    const cleaned = char.replace(/\D/g, "").slice(-1);
    const chars = effectiveOtp.split("");
    chars[index] = cleaned;
    const newValue = chars.join("");
    if (value === undefined) setInternalOtp(newValue);
    onChange?.(newValue);
    if (cleaned && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (newValue.length === length && !newValue.includes("")) {
      onComplete?.(newValue);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !effectiveOtp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    const chars = pasted.split("");
    const newChars = Array.from({ length }, (_, i) => chars[i] || effectiveOtp[i] || "");
    const newValue = newChars.join("");
    if (value === undefined) setInternalOtp(newValue);
    onChange?.(newValue);
    if (pasted.length === length) onComplete?.(pasted);
    const focusIndex = Math.min(chars.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const wrapperClassName = [
    "relative inline-flex items-center rounded-[4px] transition-colors w-full text-left px-3 py-3",
    variant === "primary"
      ? "bg-white-4 text-white hover:bg-white-8"
      : "bg-white-4 text-white-80 focus-within:bg-white-8",
    fullWidthMobile ? "w-full sm:w-auto" : "w-auto",
    disabled ? "opacity-50 pointer-events-none" : "",
    customClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const notch = (
    <fieldset
      className={`absolute inset-0 px-2 rounded-[4px] top-[-8px] pointer-events-none transition-colors duration-150 border ${
        focused ? "border-accent" : "border-primary"
      }`}
    >
      <legend
        className={`text-[12px] overflow-hidden whitespace-nowrap transition-[max-width] duration-150 ${
          isFloating ? "max-w-full px-0.5" : "max-w-0"
        }`}
      >
        <span className="invisible">{label}</span>
      </legend>
    </fieldset>
  );

  const floatingLabel = (
    <label
      className={`absolute left-0 ml-[10px] pointer-events-none origin-left transition-all duration-150 ${
        isFloating
          ? "top-0 -translate-y-1/2 text-[12px]"
          : "top-1/2 -translate-y-1/2 text-[14px] md:text-[16px]"
      } ${focused ? "text-white-80" : "text-white-40"}`}
    >
      {label}
    </label>
  );

  return (
    <div className={wrapperClassName}>
      {notch}
      <div className="flex items-center gap-2 w-full">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={setInputRef(index)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={effectiveOtp[index] || ""}
            disabled={disabled}
            name={`${name}-${index}`}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-10 h-10 text-center bg-transparent border border-white-20 rounded-[4px] text-[16px] md:text-[18px] font-medium text-white outline-none focus:border-accent transition-colors ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          />
        ))}
      </div>
      {floatingLabel}
    </div>
  );
}
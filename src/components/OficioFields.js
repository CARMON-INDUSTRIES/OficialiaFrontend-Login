export const fieldClass = "min-h-11 w-full rounded-md border border-[#b8b8b8] bg-white px-3 py-2.5 text-base text-[#262626] placeholder:text-[#716460] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#691B31]";
export const buttonClass = "min-h-11 rounded-md px-5 py-2.5 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#691B31]";

export const selectStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    backgroundColor: "var(--municipal-paper)",
    minHeight: 44,
    borderRadius: 6,
    borderColor: "#b8b8b8",
    boxShadow: "none",
    outline: isFocused ? "2px solid #691B31" : undefined,
    outlineOffset: 2,
  }),
  placeholder: (base) => ({ ...base, color: "var(--select-muted, #716460)" }),
  singleValue: (base) => ({ ...base, color: "var(--municipal-ink)" }),
  input: (base) => ({ ...base, color: "var(--municipal-ink)" }),
  menu: (base) => ({ ...base, backgroundColor: "var(--municipal-paper)", color: "var(--municipal-ink)" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#691b31" : state.isFocused ? "var(--select-hover, #f5f5f5)" : "var(--municipal-paper)",
    color: state.isSelected ? "#fff" : "var(--municipal-ink)",
  }),
  multiValue: (base) => ({ ...base, backgroundColor: "var(--select-hover, #f5f5f5)" }),
  multiValueLabel: (base) => ({ ...base, color: "var(--municipal-ink)" }),
};


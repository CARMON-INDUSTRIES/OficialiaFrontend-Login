export const fieldClass = "min-h-11 w-full rounded-md border border-[#b8b8b8] bg-white px-3 py-2.5 text-base text-[#262626] placeholder:text-[#716460] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#691B31]";
export const buttonClass = "min-h-11 rounded-md px-5 py-2.5 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#691B31]";

export const selectStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    minHeight: 44,
    borderRadius: 6,
    borderColor: "#b8b8b8",
    boxShadow: "none",
    outline: isFocused ? "2px solid #691B31" : undefined,
    outlineOffset: 2,
  }),
  placeholder: (base) => ({ ...base, color: "#716460" }),
};


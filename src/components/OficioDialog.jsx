import { useEffect, useRef } from "react";

export function OficioDialog({ title, children, onClose, actions }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-auto rounded-xl border border-[#dedede] bg-white text-[#262626] backdrop:bg-black/50"
    >
      <header className="border-b border-[#BC995B] bg-[#691B31] px-5 py-4 sm:px-8">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </header>
      <div className="px-5 sm:px-8">{children}</div>
      <footer className="sticky bottom-0 flex flex-wrap justify-end gap-2 border-t bg-white px-5 py-3 sm:px-8">
        {actions}
      </footer>
    </dialog>
  );
}

export function OficioSection({ title, children }) {
  return (
    <section className="border-b border-[#dedede] py-5 last:border-b-0">
      <h3 className="mb-4 font-semibold text-[#691B31]">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

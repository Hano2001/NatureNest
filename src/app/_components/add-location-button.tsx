type AddLocationButtonProps = {
  onClick: () => void;
};

export default function AddLocationButton({ onClick }: AddLocationButtonProps) {
  return (
    <button
      type="button"
      className="absolute bottom-0 z-[1500] flex w-full items-center justify-center gap-2 bg-emerald-600 px-4 py-3 text-base font-semibold text-white shadow-[0_-4px_12px_rgba(16,185,129,0.35)] transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 md:bottom-4 md:right-4 md:w-auto md:rounded-full md:px-5 md:py-3"
      onClick={onClick}
      aria-label="Add new campsite at current location"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-lg font-bold md:bg-white/20">
        +
      </span>
      <span className="text-sm md:text-base tracking-wide">Add location</span>
    </button>
  );
}

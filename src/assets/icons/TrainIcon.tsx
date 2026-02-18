const ModernTrainIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-8 h-8 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h9.75m-11.25-4.5V9.75c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v4.5m-16.5-4.5V6.375c0-.621.504-1.125 1.125-1.125h13.5c.621 0 1.125.504 1.125 1.125v1.875"
      />
    </svg>
  );
};

export default ModernTrainIcon;

'use client';

/** Opens the site chat (Concierge listens for this event). */
export default function ChatButton({ children, className = 'btn k' }: { children: React.ReactNode; className?: string }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('aperture:chat'))}>{children}</button>;
}

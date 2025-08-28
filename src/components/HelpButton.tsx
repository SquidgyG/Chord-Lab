import { NavLink } from 'react-router-dom'

export default function HelpButton() {
  return (
    <NavLink
      to="/help"
      className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-offset-2"
      aria-label="Open Help Resources"
      title="Help Resources"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 17h-2v-2h2Zm2.07-7.75-.9.92A3.5 3.5 0 0 0 13 15h-2v-.5a5.002 5.002 0 0 1 1.42-3.54l1.24-1.26a1.9 1.9 0 1 0-3.23-1.34H8.4a3.9 3.9 0 1 1 6.67 2.89Z" />
      </svg>
      <span>Help</span>
    </NavLink>
  )
}

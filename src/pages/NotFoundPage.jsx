import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite flex items-center justify-center text-center">
      <div className="max-w-md px-4">
        <div className="text-8xl mb-8">🍪</div>
        <h1 className="text-4xl font-syne font-bold mb-4">404 - Crumbs!</h1>
        <p className="text-white/60 text-lg mb-8">
          The page you are looking for has been eaten or doesn't exist.
        </p>
        <Link 
          to="/"
          className="bg-gold text-darkBg px-8 py-4 rounded-full font-bold text-lg hover:bg-goldLight transition-colors inline-block"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
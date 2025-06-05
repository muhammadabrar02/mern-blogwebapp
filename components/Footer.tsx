export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{' '}
          <span className="font-semibold text-gray-700">Abrar's Blog</span>. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Built with ❤️ using Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

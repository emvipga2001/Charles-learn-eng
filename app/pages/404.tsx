import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center p-8 rounded-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-blue-500 dark:text-blue-400">404</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-4 text-gray-800 dark:text-gray-200">
            Oops! Page Not Found
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The page you&#39;re looking for doesn&#39;t exist or has been moved.
          </p>

          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
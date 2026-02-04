import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { session, signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.user) {
      navigate('/profile');
    }
  }, [session, navigate]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="inline-flex items-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">CPier</span>
            </a>
          </motion.div>
          <motion.h2
            className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create your account
          </motion.h2>
          <motion.p
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Sign in instead
            </a>
          </motion.p>
        </div>

        <motion.div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {error && (
              <motion.div
                className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* Google Sign In Button */}
            <motion.div variants={itemVariants} className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-gray-700 dark:text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    <span>Signing up...</span>
                  </>
                ) : (
                  <>
                    <FcGoogle className="h-6 w-6" />
                    <span>Sign up with Google</span>
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
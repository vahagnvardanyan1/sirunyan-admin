import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

const ECommerce: React.FC = () => {

  const firstName = useSelector((state: RootState) => state.auth.user?.firstName);


  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="col-span-1 md:col-span-2 xl:col-span-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">`Welcome to your dashboard, dear {firstName}`</h1>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">Go ahead and add your new post or portfolio.</p>
          <div className="mt-4 flex gap-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
            >
              Go to Portfolio
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
            >
              Go to Blog
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
            >
              Go to About Us
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default ECommerce;

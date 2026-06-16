import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioByCategory, deletePortfolioItem } from '../../store/portfolioSlice';
import { TrashIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PortfolioList = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { items } = useSelector((state) => state.portfolio);
  const [selectedCategory, setSelectedCategory] = useState('sketching');

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPortfolioByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleDelete = (_id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // @ts-ignore
      dispatch(deletePortfolioItem({ category: selectedCategory, itemId: _id }))
        .unwrap()
        .then(() => {
          toast.success('Portfolio item deleted successfully!');
          // @ts-ignore
          dispatch(fetchPortfolioByCategory(selectedCategory));
        })
        .catch((error: { message: any; }) => {
          toast.error(`Error deleting portfolio item: ${error.message}`);
        });
    }
  };

  // @ts-ignore
  const VITE_API_BASE_URL_IMAGES = import.meta.env.VITE_API_BASE_URL_IMAGES as string;

  const isVideoFile = (filename: string) => {
    const videoExtensions = ['.mp4', '.mov', '.webm'];
    return videoExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">Portfolio List</h4>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="rounded border border-stroke bg-white px-4 py-2 text-black dark:border-strokedark dark:bg-boxdark dark:text-white"
        >
          <option value="sketching">Sketching</option>
          <option value="3d-modeling">3D Modeling</option>
          <option value="sculpting">Sculpting</option>
          <option value="rendering">Rendering</option>
          <option value="rendering-more-for-websites-and-smm">Rendering for Websites and SMM</option>
          <option value="animations">Animations</option>
        </select>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Media</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Category</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
          </div>
        </div>

        {items.map((entry: { _id: string; filename: string; category: string }) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${
              items.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={entry._id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {selectedCategory === 'animations' && isVideoFile(entry.filename) ? (
                  <video
                    src={`${VITE_API_BASE_URL_IMAGES}/${entry.filename}`}
                    className="w-16 h-16 object-cover rounded"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={`${VITE_API_BASE_URL_IMAGES}/${entry.filename}`}
                    alt="Portfolio"
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{entry.category}</p>
            </div>

            <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
              <button onClick={() => handleDelete(entry._id)} className="text-danger hover:text-red-600" title="Delete Portfolio Item">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;

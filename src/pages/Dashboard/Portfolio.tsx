import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { uploadPortfolioImage } from '../../store/portfolioSlice';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo.tsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Portfolio = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFormSubmit = () => {
    if (selectedCategory && selectedImage) {
      dispatch(uploadPortfolioImage({ category: selectedCategory, image: selectedImage }))
        .unwrap()
        .then(() => {
          toast.success('Portfolio image uploaded successfully!');
        })
        .catch((error) => {
          toast.error(`Error uploading image: ${error.message}`);
        });
    } else {
      toast.error('Please select a category and an image.');
    }
  };

  const handleShowListClick = () => {
    navigate('/portfolio-list');
  };

  return (
    <>
      <ToastContainer />
      <div className="mb-2 flex justify-end flex-wrap gap-5 xl:gap-20">
        <Link
          to="#"
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          onClick={handleFormSubmit}
        >
          Save
        </Link>
        <button
          onClick={handleShowListClick}
          className="inline-flex items-center justify-center rounded-full bg-secondary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Show List
        </button>
      </div>
      <div
        className="rounded-sm border mb-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Choose The Category
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <SelectGroupTwo onCategoryChange={handleCategoryChange} />
        </div>

      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Upload your Image
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Attach file
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

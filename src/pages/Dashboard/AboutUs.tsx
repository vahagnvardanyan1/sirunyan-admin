import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTeamMember } from '../../store/teamMemberSlice.ts';
import { addFooterSliderImage } from '../../store/footerSliderSlice.ts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AboutUs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [footerSliderImage, setFooterSliderImage] = useState<File | null>(null);

  const handleAddTeamMember = () => {
    if (text1 && text2 && text3 && image) {
      dispatch(addTeamMember({
        image: image,
        fullName: text1,
        role: text2,
        content: text3,
      }))
        .unwrap()
        .then(() => {
          toast.success('Team member added successfully!');
          setText1('');
          setText2('');
          setText3('');
          setImage(null);
        })
        .catch((error) => {
          toast.error(`Failed to add team member: ${error.message}`);
        });
    } else {
      toast.error('Please fill in all fields and select an image for the team member.');
    }
  };

  const handleAddFooterSliderImage = () => {
    if (footerSliderImage) {
      dispatch(addFooterSliderImage({
        image: footerSliderImage,
      }))
        .unwrap()
        .then(() => {
          toast.success('Footer slider image added successfully!');
          setFooterSliderImage(null);
        })
        .catch((error) => {
          toast.error(`Failed to add footer slider image: ${error.message}`);
        });
    } else {
      toast.error('Please select an image for the footer slider.');
    }
  };

  const openAboutUsList = () => {
    navigate('/about-us-list');
  };

  return (
    <>
      <ToastContainer />
      <div className="mb-2 flex justify-end flex-wrap gap-5 xl:gap-20">
        <button
          onClick={handleAddTeamMember}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Save Team Member
        </button>
        <button
          onClick={handleAddFooterSliderImage}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Save Footer Slider Image
        </button>
        <button
          onClick={openAboutUsList}
          className="inline-flex items-center justify-center rounded-full bg-secondary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          View About Us List
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Upload your Image</h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="flex flex-col">
            <label className="mb-3 block text-black dark:text-white font-semibold">Image</label>
            <input
              type="file"
              className="mb-5 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-9 mt-5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Text Fields</h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">Full Name</label>
              <input
                type="text"
                placeholder="Enter text for field 1"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">Role</label>
              <input
                type="text"
                placeholder="Enter text for field 2"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">Content</label>
              <input
                type="text"
                placeholder="Enter text for field 3"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={text3}
                onChange={(e) => setText3(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Footer Slider Image</h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="flex flex-col">
              <label className="mb-3 block text-black dark:text-white font-semibold">Image</label>
              <input
                type="file"
                className="mb-5 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                onChange={(e) => setFooterSliderImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

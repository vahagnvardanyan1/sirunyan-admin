import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import { createBlog, setBlogData } from '../../store/blogSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const blogState = useSelector((state) => state.blog) || {};
  const navigate = useNavigate();

  const handleSave = () => {
    const formData = new FormData();
    formData.append('type', "blog");
    formData.append('bannerText', blogState.bannerText);
    formData.append('text2', blogState.text2);
    formData.append('text3', blogState.text3);
    formData.append('text4', blogState.text4);
    formData.append('text5', blogState.text5);
    formData.append('textUnderImage2', blogState.textUnderImage2);
    formData.append('textUnderImage3', blogState.textUnderImage3);
    formData.append('textUnderImage4', blogState.textUnderImage4);
    formData.append('textUnderImage5', blogState.textUnderImage5);
    formData.append('bannerImage', blogState.bannerImage);
    formData.append('image2', blogState.image2);
    formData.append('image3', blogState.image3);
    formData.append('image4', blogState.image4);
    formData.append('image5', blogState.image5);

    // @ts-ignore
    dispatch(createBlog(formData))
      .unwrap()
      .then(() => {
        toast.success('Blog created successfully!');
      })
      .catch((error: { message: any; }) => {
        toast.error(`Error creating blog: ${error.message}`);
      });
  };

  const handleViewAll = () => {
    navigate('/blog-list');
  };

  return (
    <>
      <ToastContainer />

      <div className="mb-2 flex justify-end flex-wrap gap-5 xl:gap-20">
        <Link
          to="#"
          onClick={handleSave}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Save
        </Link>
        <button
          onClick={handleViewAll}
          className="inline-flex items-center justify-center rounded-full bg-secondary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          View All Blog Posts
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Upload your Images
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="flex flex-col">
            <label className="mb-3 block text-black dark:text-white font-semibold">
              Banner Image
            </label>
            <input
              type="file"
              className="mb-5 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              // @ts-ignore
              onChange={(e) => dispatch(setBlogData({ bannerImage: e.target.files[0] }))}
            />
          </div>

          <h4 className="mt-6 mb-4 text-lg font-semibold text-black dark:text-white">
            Blog Images
          </h4>

          {[...Array(4)].map((_, index) => (
            <div key={index + 1} className="flex flex-col">
              <input
                type="file"
                className="mb-3 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                // @ts-ignore
                onChange={(e) => dispatch(setBlogData({ [`image${index + 2}`]: e.target.files[0] }))}
              />
              <input
                type="text"
                placeholder={`Enter text for image ${index + 1}`}
                className="mb-5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={
                  index === 0
                    ? blogState.textUnderImage2
                    : index === 1
                      ? blogState.textUnderImage3
                      : index === 2
                        ? blogState.textUnderImage4
                        : blogState.textUnderImage5
                }
                onChange={(e) =>
                  index === 0
                    ? dispatch(setBlogData({ textUnderImage2: e.target.value }))
                    : index === 1
                      ? dispatch(setBlogData({ textUnderImage3: e.target.value }))
                      : index === 2
                        ? dispatch(setBlogData({ textUnderImage4: e.target.value }))
                        : dispatch(setBlogData({ textUnderImage5: e.target.value }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Rich Text Fields
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            {[blogState.bannerText, blogState.text2, blogState.text3, blogState.text4, blogState.text5].map((text, index) => (
              <div key={index}>
                <label className="mb-3 block text-black dark:text-white">
                  {index === 0 ? 'Banner Title' : `Content ${index}`}
                </label>
                <ReactQuill
                  theme="snow"
                  value={text}
                  onChange={(newValue) => {
                    const key = index === 0 ? 'bannerText' : `text${index + 1}`;
                    dispatch(setBlogData({ [key]: newValue }));
                  }}
                  className="dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, updateBlog, setBlogData } from '../../store/blogSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog);
  const blog = blogState.blogs.find((b) => b._id === id) || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blog._id) {
      dispatch(fetchBlogs());
    } else {
      setLoading(false);
      dispatch(setBlogData(blog));
    }
  }, [blog, dispatch]);

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
    if (blogState.bannerImage) formData.append('bannerImage', blogState.bannerImage);
    if (blogState.image2) formData.append('image2', blogState.image2);
    if (blogState.image3) formData.append('image3', blogState.image3);
    if (blogState.image4) formData.append('image4', blogState.image4);
    if (blogState.image5) formData.append('image5', blogState.image5);

    dispatch(updateBlog({ id, blogData: formData }))
      .unwrap()
      .then(() => {
        toast.success('Blog updated successfully!');
      })
      .catch((error) => {
        toast.error(`Error updating blog: ${error.message}`);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="mb-2 flex justify-end flex-wrap gap-5 xl:gap-20">
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Save Changes
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Edit Blog</h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="flex flex-col">
            <label className="mb-3 block text-black dark:text-white font-semibold">
              Banner Image
            </label>
            <input
              type="file"
              className="mb-5 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              onChange={(e) => dispatch(setBlogData({ bannerImage: e.target.files[0] }))}
            />
          </div>

          {[blogState.bannerText, blogState.text2, blogState.text3, blogState.text4, blogState.text5].map((text, index) => (
            <div key={index}>
              <label className="mb-3 block text-black dark:text-white">
                {index === 0 ? 'Banner Text' : `Text ${index + 1}`}
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
    </>
  );
};

export default BlogDetail;

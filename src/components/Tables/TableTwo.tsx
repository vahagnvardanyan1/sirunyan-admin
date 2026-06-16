import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, fetchBlogs } from '../../store/blogSlice';
import { TrashIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const stripHtmlTags = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const navigate = useNavigate();
  const VITE_API_BASE_URL_IMAGES = import.meta.env.VITE_API_BASE_URL_IMAGES;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id))
        .unwrap()
        .then(() => {
          toast.success('Blog deleted successfully!');
          dispatch(fetchBlogs());
        })
        .catch((error) => {
          toast.error(`Error deleting blog: ${error.message}`);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="p-6 bg-white dark:bg-boxdark shadow rounded-lg">
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-boxdark">
          <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-stroke dark:border-strokedark text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 border-b-2 border-stroke dark:border-strokedark text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 border-b-2 border-stroke dark:border-strokedark text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Banner Text
            </th>
            <th className="px-6 py-3 border-b-2 border-stroke dark:border-strokedark text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Date Created
            </th>
            <th className="px-6 py-3 border-b-2 border-stroke dark:border-strokedark text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {blogs?.map((entry) => (
            <tr key={entry._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                <img
                  src={`${VITE_API_BASE_URL_IMAGES}/${entry.bannerImage}`}
                  alt="Blog Banner"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 border-b border-stroke dark:border-strokedark cursor-pointer" onClick={() => handleEdit(entry._id)}>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {stripHtmlTags(entry.bannerText)}
                </p>
              </td>
              <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {stripHtmlTags(entry.text2)}
                </p>
              </td>
              <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </p>
              </td>
              <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                <button
                  onClick={() => handleDelete(entry._id)}
                  className="text-danger hover:text-red-600"
                  title="Delete Blog"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;

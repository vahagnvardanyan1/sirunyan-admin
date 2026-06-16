import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeamMember, fetchTeamMembers, updateTeamMember } from '../../store/teamMemberSlice.ts';
import { deleteSliderImage, fetchSliders } from '../../store/footerSliderSlice.ts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VITE_API_BASE_URL_IMAGES = import.meta.env.VITE_API_BASE_URL_IMAGES as string;

const AboutUsTable: React.FC = () => {
  const dispatch = useDispatch();
  const teamMembers = useSelector((state: any) => state.teamMember.teamMembers);
  const footerSliders = useSelector((state: any) => state.footerSlider.sliderData.data);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({
    fullName: '',
    role: '',
    content: '',
    image: null,
  });

  const [selectedOption, setSelectedOption] = useState<'teamMembers' | 'footerSliders'>('teamMembers');

  useEffect(() => {
    if (selectedOption === 'teamMembers') {
      dispatch(fetchTeamMembers());
    } else {
      dispatch(fetchSliders());
    }
  }, [selectedOption, dispatch]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as 'teamMembers' | 'footerSliders');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSliderImage(id))
      .then(() => {
        toast.success('Slider image deleted successfully');
        dispatch(fetchSliders());
      })
      .catch((error) => {
        toast.error(`Error deleting slider image: ${error.message}`);
      });
  };

  const handleDeleteTeamMember = (id: string) => {
    dispatch(deleteTeamMember(id))
      .then(() => {
        toast.success('Team member deleted successfully');
        dispatch(fetchTeamMembers());
      })
      .catch((error) => {
        toast.error(`Error deleting team member: ${error.message}`);
      });
  };

  const handleEdit = (member: any) => {
    setEditMode(member._id);
    setEditData({
      fullName: member.fullName,
      role: member.role,
      content: member.content,
      image: null,
    });
  };

  const handleSave = (_id: string) => {
    const data = {
      _id,
      fullName: editData.fullName,
      role: editData.role,
      content: editData.content,
      image: editData.image,
      type: "team"
    };
    dispatch(updateTeamMember(data))
      .then(() => {
        toast.success('Team member updated successfully');
        setEditMode(null);
        dispatch(fetchTeamMembers());
      })
      .catch((error) => {
        toast.error(`Error updating team member: ${error.message}`);
      });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">About Us</h4>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="rounded-md border border-stroke px-4 py-2 bg-white dark:bg-boxdark dark:text-white"
        >
          <option value="teamMembers">Team Members</option>
          <option value="footerSliders">Footer Slider</option>
        </select>
      </div>

      <div className="flex flex-col">
        <div className={`grid ${selectedOption === 'footerSliders' ? 'grid-cols-2' : 'grid-cols-4'} rounded-sm bg-gray-100 dark:bg-meta-4 sm:grid-cols-6`}>
          {selectedOption === 'teamMembers' && (
            <>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase text-gray-700 dark:text-gray-300">Image</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase text-gray-700 dark:text-gray-300">Full Name</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase text-gray-700 dark:text-gray-300">Role</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase text-gray-700 dark:text-gray-300">Content</h5>
              </div>
            </>
          )}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase text-gray-700 dark:text-gray-300">Actions</h5>
          </div>
        </div>

        {selectedOption === 'teamMembers' && teamMembers.map((member: any) => (
          <div key={member._id} className="grid grid-cols-4 border-b border-stroke dark:border-strokedark bg-white dark:bg-boxdark sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              {editMode === member._id ? (
                <input
                  type="file"
                  onChange={(e) => setEditData({ ...editData, image: e.target.files ? e.target.files[0] : null })}
                />
              ) : (
                <img src={`${VITE_API_BASE_URL_IMAGES}/${member.image}`} alt="User" className="h-10 w-10 object-cover rounded-full" />
              )}
            </div>
            <div className="p-2.5 text-center xl:p-5">
              {editMode === member._id ? (
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  className="w-full rounded-md border border-gray-300 p-2 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">{member.fullName}</p>
              )}
            </div>
            <div className="p-2.5 text-center xl:p-5">
              {editMode === member._id ? (
                <input
                  type="text"
                  value={editData.role}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  className="w-full rounded-md border border-gray-300 p-2 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">{member.role}</p>
              )}
            </div>
            <div className="p-2.5 text-center xl:p-5">
              {editMode === member._id ? (
                <input
                  type="text"
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  className="w-full rounded-md border border-gray-300 p-2 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">{member.content}</p>
              )}
            </div>
            <div className="p-2.5 text-center xl:p-5">
              {editMode === member._id ? (
                <>
                  <button className="text-sm text-primary" onClick={() => handleSave(member._id)}>Save</button>
                  <button className="ml-2 text-sm text-red-600" onClick={() => setEditMode(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="text-sm text-primary" onClick={() => handleEdit(member)}>Edit</button>
                  <button className="ml-2 text-sm text-red-600" onClick={() => handleDeleteTeamMember(member._id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}

        {selectedOption === 'footerSliders' && footerSliders?.map((slider: any) => (
          <div key={slider.id} className="grid grid-cols-2 border-b border-stroke dark:border-strokedark bg-white dark:bg-boxdark sm:grid-cols-2">
            <div className="p-2.5 xl:p-5">
              <img src={`${VITE_API_BASE_URL_IMAGES}/${slider.image}`} alt="Footer Slider" className="h-20 w-20 object-cover rounded-full" />
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <button className="text-sm text-red-600" onClick={() => handleDelete(slider._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsTable;

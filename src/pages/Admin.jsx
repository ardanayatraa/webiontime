import axios from 'axios';
import { useState, useEffect } from 'react';

function Admin() {
  const [playlist, setPlaylist] = useState(null);
  const [newPlay, setNewPlay] = useState({
    play_name: '',
    play_genre: '',
    play_url: '',
    play_description: '',
    play_thumbnail: ''
  });
  const [editPlay, setEditPlay] = useState(null);
  const [activeTab, setActiveTab] = useState('list');
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items per page

  useEffect(() => {
    axios.get('https://webfmsi.singapoly.com/api/playlist/20')
      .then(response => {
        setPlaylist(response.data.datas);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Handle Edit input change
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditPlay({ ...editPlay, [name]: value });
  };

  // Handle Add Playlist
  const handleAddPlay = (e) => {
    e.preventDefault();
    axios.post('https://webfmsi.singapoly.com/api/playlist', newPlay)
      .then(response => {
        setPlaylist(prev => ({ ...prev, datas: [...prev.datas, response.data] }));
        setNewPlay({
          play_name: '',
          play_genre: '',
          play_url: '',
          play_description: '',
          play_thumbnail: ''
        });
      })
      .catch(error => console.error('Error adding playlist:', error));
  };

  // Handle Update Playlist
  const handleUpdatePlay = (e) => {
    e.preventDefault();
    axios.put(`https://webfmsi.singapoly.com/api/playlist/${editPlay.id_play}`, editPlay)
      .then(response => {
        const updatedPlaylist = playlist.map(item =>
          item.id_play === response.data.id_play ? response.data : item
        );
        setPlaylist(updatedPlaylist);
        setEditPlay(null);
      })
      .catch(error => console.error('Error updating playlist:', error));
  };

  // Handle Delete Playlist
  const handleDeletePlay = (id) => {
    axios.delete(`https://webfmsi.singapoly.com/api/playlist/${id}`)
      .then(() => {
        setPlaylist(playlist.filter(item => item.id_play !== id));
        setConfirmDelete(null); // Close confirmation dialog after delete
      })
      .catch(error => console.error('Error deleting playlist:', error));
  };

  // Pagination logic
  const totalItems = playlist ? playlist.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = playlist ? playlist.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-6 container mx-auto">

        {/* Tab navigation */}
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-md text-lg font-medium ${activeTab === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Playlist List
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-md text-lg font-medium ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Create Playlist
          </button>
        </div>

        {/* Tab content */}
        {activeTab === 'list' && (
          <>
            <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">Playlist Data</h2>

            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {currentItems.map((item) => (
                  <div key={item.id_play} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                    <img
                      src={item.play_thumbnail}
                      alt={item.play_name}
                      className="w-full h-56 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800">{item.play_name}</h3>
                      <p className="text-sm text-gray-500">{item.play_genre}</p>
                      <p className="mt-2 text-sm text-gray-700">{item.play_description}</p>
                    </div>

                    {/* Edit and Delete Buttons */}
                    <div className="flex justify-between p-4">
                      <button
                        onClick={() => setEditPlay(item)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmDelete(item.id_play)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Create Playlist Tab */}
        {activeTab === 'create' && (
          <div className="bg-white p-6 mb-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add New Playlist</h3>
            <form onSubmit={handleAddPlay}>
              <input
                type="text"
                name="play_name"
                value={newPlay.play_name}
                onChange={(e) => setNewPlay({ ...newPlay, play_name: e.target.value })}
                placeholder="Playlist Name"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="play_url"
                value={newPlay.play_url}
                onChange={(e) => setNewPlay({ ...newPlay, play_url: e.target.value })}
                placeholder="Playlist URL"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="play_thumbnail"
                value={newPlay.play_thumbnail}
                onChange={(e) => setNewPlay({ ...newPlay, play_thumbnail: e.target.value })}
                placeholder="Thumbnail URL"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="play_genre"
                value={newPlay.play_genre}
                onChange={(e) => setNewPlay({ ...newPlay, play_genre: e.target.value })}
                placeholder="Playlist Genre"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                name="play_description"
                value={newPlay.play_description}
                onChange={(e) => setNewPlay({ ...newPlay, play_description: e.target.value })}
                placeholder="Playlist Description"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
                Add Playlist
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="mb-4 text-xl text-gray-800">Are you sure you want to delete this playlist?</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleDeletePlay(confirmDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Admin;

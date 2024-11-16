import axios from 'axios';
import { useState, useEffect } from 'react';

function Admin() {
  const [activeTab, setActiveTab] = useState('create');
  const [newPlay, setNewPlay] = useState({
    play_name: '',
    play_genre: '',
    play_url: '',
    play_description: '',
    play_thumbnail: ''
  });
  const [playlist, setPlaylist] = useState([]);
  const [editPlay, setEditPlay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    axios.get('https://webfmsi.singapoly.com/api/playlist/20')
      .then(response => {
        setPlaylist(response.data.datas);
      })
      .catch(error => console.error('Error fetching playlists:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlay({ ...newPlay, [name]: value });
  };

  const handleAddPlay = (e) => {
    e.preventDefault();
    axios.post('https://webfmsi.singapoly.com/api/playlist/20', newPlay)
      .then(response => {
        alert('Playlist added successfully!');
        setPlaylist(prev => [...prev, response.data]);
        setNewPlay({ play_name: '', play_genre: '', play_url: '', play_description: '', play_thumbnail: '' });
      })
      .catch(error => console.error('Error adding playlist:', error));
  };

  const handleEditPlay = (id) => {
    const playToEdit = playlist.find(item => item.id_play === id);
    setEditPlay(playToEdit);
    setShowModal(true);
  };

  const handleUpdatePlay = (e) => {
    e.preventDefault();
    if (editPlay && editPlay.id_play) {

      axios.delete(`https://webfmsi.singapoly.com/api/playlist/${editPlay.id_play}`)
        .then(() => {
          axios.post('https://webfmsi.singapoly.com/api/playlist/20', {
            id_play: editPlay.id_play,
            play_name: editPlay.play_name,
            play_genre: editPlay.play_genre,
            play_url: editPlay.play_url,
            play_description: editPlay.play_description,
            play_thumbnail: editPlay.play_thumbnail
          })
            .then(response => {
              setPlaylist(prevPlaylist => [
                ...prevPlaylist.filter(item => item.id_play !== editPlay.id_play),
                response.data
              ]);
              setShowModal(false);
              setEditPlay(null);
            })
            .catch(error => console.error('Error creating playlist:', error));
        })
        .catch(error => console.error('Error deleting playlist:', error));
    }
  };

  const handleDeletePlay = (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      axios.delete(`https://webfmsi.singapoly.com/api/playlist/${id}`)
      .then(() => {
        setPlaylist({ ...playlist, datas: playlist.datas.filter(item => item.id_play !== id) });
      })
      .catch(error => console.error('Error deleting playlist:', error));
    }
  };

  // Filter playlists based on search term
  const filteredPlaylist = playlist.filter(item => 
    item.play_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.play_genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.play_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 p-4 bg-gray-200">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-white text-black'} rounded`}
        >
          Create Playlist
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 ${activeTab === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-black'} rounded`}
        >
          List Playlist
        </button>
      </div>

      {/* Create Playlist Tab */}
      {activeTab === 'create' && (
        <div className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Add New Playlist</h3>
          <form onSubmit={handleAddPlay}>
            <input
              type="text"
              name="play_name"
              value={newPlay.play_name}
              onChange={handleInputChange}
              placeholder="Playlist Name"
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="play_url"
              value={newPlay.play_url}
              onChange={handleInputChange}
              placeholder="Playlist URL"
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="play_thumbnail"
              value={newPlay.play_thumbnail}
              onChange={handleInputChange}
              placeholder="Thumbnail URL"
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
            <select
              name="play_genre"
              value={newPlay.play_genre}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select Genre</option>
              <option value="music">Music</option>
              <option value="song">Song</option>
              <option value="movie">Movie</option>
              <option value="education">Education</option>
              <option value="others">Others</option>
            </select>
            <textarea
              name="play_description"
              value={newPlay.play_description}
              onChange={handleInputChange}
              placeholder="Playlist Description"
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
              Add Playlist
            </button>
          </form>
        </div>
      )}

      {/* List Playlist Tab */}
      {activeTab === 'list' && (
        <div className="overflow-auto bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Playlist List</h3>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search playlists..."
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlaylist.length > 0 ? (
              filteredPlaylist.map((item) => (
                <div key={item.id_play} className="bg-white p-4 rounded-lg shadow-lg">
                  <div className="mt-4">
                    <img src={item.play_thumbnail} alt={item.play_name} className="w-full h-auto rounded-lg shadow-sm" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.play_name}</h3>
                  <p className="text-sm text-gray-500">{item.play_genre}</p>
                  <p className="mt-2 text-sm text-gray-600">{item.play_description}</p>
                  <div className="mt-4">
                    <a href={item.play_url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                      Watch Video
                    </a>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    {/* Edit Icon (SVG) */}
                    <button
                      onClick={() => handleEditPlay(item.id_play)}
                      className="text-white px-4 py-2 rounded flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>

                    {/* Delete Icon (SVG) */}
                    <button
                      onClick={() => handleDeletePlay(item.id_play)}
                      className="text-white px-4 py-2 rounded flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-600">No playlists found.</p>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editPlay && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Playlist</h3>
            <form onSubmit={handleUpdatePlay}>
              <input
                type="text"
                name="play_name"
                value={editPlay.play_name}
                onChange={(e) => setEditPlay({ ...editPlay, play_name: e.target.value })}
                placeholder="Playlist Name"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="play_url"
                value={editPlay.play_url}
                onChange={(e) => setEditPlay({ ...editPlay, play_url: e.target.value })}
                placeholder="Playlist URL"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="play_thumbnail"
                value={editPlay.play_thumbnail}
                onChange={(e) => setEditPlay({ ...editPlay, play_thumbnail: e.target.value })}
                placeholder="Thumbnail URL"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <select
                name="play_genre"
                value={editPlay.play_genre}
                onChange={(e) => setEditPlay({ ...editPlay, play_genre: e.target.value })}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              >
                <option value="" disabled>Select Genre</option>
                <option value="music">Music</option>
                <option value="song">Song</option>
                <option value="movie">Movie</option>
                <option value="education">Education</option>
                <option value="others">Others</option>
              </select>
              <textarea
                name="play_description"
                value={editPlay.play_description}
                onChange={(e) => setEditPlay({ ...editPlay, play_description: e.target.value })}
                placeholder="Playlist Description"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
                  Update Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

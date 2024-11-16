import React from 'react';

function EditModal({ editPlay, handleInputChange, handleUpdatePlay, closeModal }) {
  if (!editPlay) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-36">
        <h3 className="text-xl font-semibold mb-4">Edit Playlist</h3>
        <form onSubmit={handleUpdatePlay}>
          <input
            type="text"
            name="play_name"
            value={editPlay.play_name}
            onChange={handleInputChange}
            placeholder="Playlist Name"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="play_url"
            value={editPlay.play_url}
            onChange={handleInputChange}
            placeholder="Playlist URL"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="play_thumbnail"
            value={editPlay.play_thumbnail}
            onChange={handleInputChange}
            placeholder="Thumbnail URL"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="play_genre"
            value={editPlay.play_genre}
            onChange={handleInputChange}
            placeholder="Playlist Genre"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="play_description"
            value={editPlay.play_description}
            onChange={handleInputChange}
            placeholder="Playlist Description"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
              Save Changes
            </button>
            <button onClick={closeModal} type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;

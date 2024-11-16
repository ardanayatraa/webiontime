import { useEffect, useState } from 'react';
import axios from 'axios';

function Explore() {
  const [playlistData, setPlaylistData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('VIDEO'); // Track active tab
  const [selectedBook, setSelectedBook] = useState(null); // State for selected book modal

  const itemsPerPage = 9;

  // Sample data for BOOK tab (Google Drive links)
  const books = [
    { title: 'Natural Teak Wood', link: 'https://drive.google.com/file/d/1Jo-JYyVxVqQWKfltbDj5lsmHVa6iP5zo/preview' }, // Updated link
    { title: 'Decorative', link: 'https://drive.google.com/file/d/1ukFybHR2yQ31jBj561B3tPzgjXrp--X8/preview' },
    { title: 'Bamboo Wind Chime', link: 'https://drive.google.com/file/d/1jtKVL_6NQ3c_dD7reUkeLQAlOqoy7qzn/preview' },
    // Add more books here
  ];

  useEffect(() => {
    axios.get('https://webfmsi.singapoly.com/api/playlist/20')
      .then(response => {
        setPlaylistData(response.data.datas);
        setFilteredData(response.data.datas);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = playlistData.filter(item =>
        item.play_name.toLowerCase().includes(query.toLowerCase()) ||
        item.play_genre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page on search
    } else {
      setFilteredData(playlistData);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book); // Open the modal with the selected book's link
  };

  const closeModal = () => {
    setSelectedBook(null); // Close modal
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">EXPLORE</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab('VIDEO')}
            className={`px-6 py-2 rounded-l-lg ${activeTab === 'VIDEO' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            VIDEO
          </button>
          <button
            onClick={() => setActiveTab('BOOK')}
            className={`px-6 py-2 rounded-r-lg ${activeTab === 'BOOK' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            BOOK
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by product name or genre..."
            className="w-1/2 p-3 rounded-lg border border-gray-300"
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'VIDEO' ? (
          <div>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : error ? (
              <p className="text-center text-xl text-red-600">{error}</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <div key={item.id_play} className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                        <img
                          src={item.play_thumbnail}
                          alt={item.play_name}
                          className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-gray-800">{item.play_name}</h3>
                          <p className="text-sm text-gray-500">{item.play_genre}</p>
                          <p className="mt-2 text-gray-700 text-base">{item.play_description}</p>

                          <a
                            href={item.play_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-4 text-blue-500 font-semibold"
                          >
                            Watch Video
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-xl text-gray-500">No results found</p>
                  )}
                </div>

                {/* Pagination Controls */}
                {filteredData.length > itemsPerPage && (
                  <div className="flex justify-center mt-10">
                    <nav>
                      <ul className="inline-flex items-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handlePageChange(index + 1)}
                              className={`px-3 py-2 border rounded-md mx-1 ${
                                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                              }`}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          // BOOK Tab Content
          <div>
            <h2 className="text-2xl text-center mb-6">Available Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition"
                  onClick={() => handleBookClick(book)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-500">Click to preview</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Book Preview */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3">
              <h3 className="text-xl font-semibold mb-4">Book Preview</h3>
              <iframe
                src={selectedBook.link}
                width="100%"
                height="600"
                title={selectedBook.title}
                frameBorder="0"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;

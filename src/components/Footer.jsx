function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
        
        {/* Newsletter Section */}
        <div className="lg:w-1/3">
          <h3 className="text-2xl font-semibold mb-2">Sign up for our newsletter!</h3>
          <p className="text-gray-400 mb-4">Stay updated with the latest news and offers.</p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Your email..."
              className="flex-grow p-2 rounded-l-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-r-lg font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>



        {/* Contact Information */}
        <div className="lg:w-1/3">
          <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
          <p className="text-gray-400">Ratna Road No 68, Tegal Tugu, Gianyar, Bali 80515, Indonesia</p>
          <p className="text-gray-400">Phone: +62 361 953239</p>
          <p className="text-gray-400">
            Email:{" "}
            <a href="mailto:info@cvwidhiasihbaliexport.co.id" className="text-yellow-500">
              info@cvwidhiasihbaliexport.co.id
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className="border-gray-700 my-4" />
      <div className="text-center">
        <p className="text-gray-500">© 2024 Webion Team. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

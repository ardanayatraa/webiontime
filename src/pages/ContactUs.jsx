import { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    subject: '',
    question: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form Data:', formData);
    // Reset the form after submit
    setFormData({
      name: '',
      phone: '',
      email: '',
      company: '',
      subject: '',
      question: '',
    });
  };

  return (
    <div className="container mx-auto py-10 px-6">
      
      <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
      <p className="text-center mb-10 text-gray-600">
        Contact us about anything related to our company or services. We'll do our best to get back to you as soon as possible.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Contact Form */}

        <div className='p-8 rounded bg-white'>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold mb-2">Your Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="question" className="block text-sm font-semibold mb-2">Your Question</label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 text-white bg-yellow-500 rounded-full font-semibold uppercase hover:bg-yellow-400 transition duration-300 ease-in-out"
            >
              Send
            </button>
          </div>
        </form>
        </div>

        {/* Right Side: Address Information */}
        <div className="space-y-8">
          <h3 className="text-lg font-semibold">Our Address</h3>
          <div className="space-y-4">
            <p className="text-sm">CV. WIDHI ASIH BALI EXPORT</p>
            <p className="text-sm">Ratna Road No 68</p>
            <p className="text-sm">Tegal Tugu, Gianyar BA 80515</p>
            <p className="text-sm">Indonesia</p>
            <p className="text-sm">Phone: +62 361 953239</p>
            <p className="text-sm">Email: <a href="mailto:info@cvwidhiasihbaliexport.co.id" className="text-blue-600">info@cvwidhiasihbaliexport.co.id</a></p>

            {/* Embedded Google Map */}
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.8982152035854!2d115.27257731534483!3d-8.515197493896074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2180ba3a3f10f%3A0x123456789abcdef!2sCV.%20WIDHI%20ASIH%20BALI%20EXPORT!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

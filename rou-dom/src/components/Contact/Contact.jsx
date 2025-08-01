import React from 'react';

export default function Contact() {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-yellow-50 dark:from-gray-800 dark:via-gray-900 dark:to-black py-10 px-4 sm:px-6 lg:px-8 transition-all duration-300">
            <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-12">
                <img
                    className="w-full max-h-[300px] object-contain rounded-xl mb-10 animate-fade-in"
                    src="https://taxocredit.com/assets/images/contact-img.png"
                    alt="Contact Us Banner"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                            Get in touch
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Fill in the form to start a conversation with our team.
                        </p>

                        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1011.314-11.314l-4.243 4.243z" />
                            </svg>
                            <span>Acme Inc, Street, State, Postal Code</span>
                        </div>

                        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.516 2.06a2 2 0 01-.516 1.94l-1.06 1.06a16.001 16.001 0 006.586 6.586l1.06-1.06a2 2 0 011.94-.516l2.06.516A2 2 0 0121 17.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" />
                            </svg>
                            <span>+44 1234567890</span>
                        </div>

                        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0 0H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span>info@acme.org</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="space-y-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md animate-fade-in-up">
                        {[
                            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your Name' },
                            { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                            { id: 'tel', label: 'Phone Number', type: 'tel', placeholder: '+44 1234567890' }
                        ].map(field => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.id}
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    className="mt-1 block w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

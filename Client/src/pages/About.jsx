import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      data-aos="fade-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      className='py-16 px-8 max-w-5xl mt-10 mx-auto bg-orange-100 hover: rounded-lg shadow-2xl'
    >
      <h1 className='text-4xl font-bold mb-6 text-indigo-600' data-aos="fade-right">Welcome to Ivy Estate</h1>
      <p className='mb-4 text-gray-900' data-aos="fade-right ">
        Ivy Estate takes pride in being your trusted partner for all your real estate needs. Specializing in buying, selling, and renting properties across premier neighborhoods, our dedicated team of seasoned agents is committed to delivering top-notch service.
      </p>
      <p className='mb-4 text-gray-900' data-aos="fade-right">
        Our mission at Ivy Estate is to empower clients in achieving their real estate aspirations. We provide expert advice, personalized service, and an in-depth understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to accompany you on your journey.
      </p>
      <p className='mb-4 text-gray-900' data-aos="fade-right">
        With a team of experienced agents well-versed in the intricacies of the real estate industry, we strive to offer the highest level of service. We believe that the process of buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that vision a reality for each of our valued clients.
      </p>
    </div>
  );
}

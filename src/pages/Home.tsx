import React from 'react';
import { ArrowRight, Mountain, Users, Building2, Heart } from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';

// Mock Data
const reviews = [
  { name: 'Yash Mhatre', review: 'An unforgettable trek! The team was fantastic and the views were breathtaking.' },
  { name: 'Jay Patil', review: 'Amazing experience! The guides were so knowledgeable and friendly.' },
  { name: 'Monika karbe', review: 'Highly recommend! Great adventure and top-notch safety measures.' },
];

const corporateReviews = [
  {
    company: 'TechCorp',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjVcpn2SGquVPnYB0X4vY37sTrx1QBSjvW3ZYNRQlGQybzQuken5YCmQAtI1GDK1VZvls&usqp=CAU',
    ceoReview: 'Mountain Mirage provided an outstanding team-building retreat for our employees. - John CEO',
  },
  {
    company: 'HealthPlus',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQgjAiAPxOH88KjSqMKFU_y1r7buePQUC3YQ&s',
    ceoReview: 'An inspiring and rejuvenating experience for our team. - Jane CEO',
  },
];

export default function Home() {
  return (
    <div>
      <HeroSlider />

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Achievements</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-blue-600">50+</h3>
              <p className="text-lg text-gray-600">Treks Completed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-600">1000+</h3>
              <p className="text-lg text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">About Mountain Mirage Backpackers</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Mountain trekking"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-6">
                At Mountain Mirage Backpackers, we believe in creating unforgettable adventures that challenge, inspire, and transform. With over a decade of experience in mountain trekking and adventure tourism, we provide safe, sustainable, and immersive experiences for adventure enthusiasts of all levels.
              </p>
              <p className="text-lg text-gray-600">
                Our team of certified guides and local experts ensures that every journey is not just about reaching the summit, but about creating lasting memories and connections along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<Mountain />}
              title="Mountain Treks"
              description="Expert-guided mountain treks for all skill levels"
            />
            <ServiceCard
              icon={<Users />}
              title="Family Tours"
              description="Custom family adventures and religious pilgrimages"
            />
            <ServiceCard
              icon={<Building2 />}
              title="Corporate Events"
              description="Team building and corporate retreat packages"
            />
            <ServiceCard
              icon={<Heart />}
              title="CSR Activities"
              description="Social responsibility programs for organizations"
            />
          </div>
        </div>
      </section>

      {/* Latest Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <p className="text-gray-700">{review.review}</p>
                <h3 className="mt-4 text-lg font-bold text-blue-600">{review.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Logos and Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Corporate Partners</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {corporateReviews.map((corp, index) => (
              <div key={index} className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md">
                <img
                  src={corp.logo}
                  alt={`${corp.company} logo`}
                  className="w-24 h-12 object-contain"
                />
                <div>
                  <p className="text-gray-700">{corp.ceoReview}</p>
                  <h3 className="mt-4 text-lg font-bold text-blue-600">{corp.company}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

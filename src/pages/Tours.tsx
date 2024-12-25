import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TourCard } from '../components/tours/TourCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Banner } from '../components/ui/Banner';
import { useCollection } from '../hooks/useFirebase';
import { Tour } from '../types';
import { TOUR_CATEGORIES, TourCategory, CATEGORY_BACKGROUNDS } from '../types/categories';

export default function Tours() {
  const [searchParams] = useSearchParams();
  const { data: tours, loading, error } = useCollection<Tour>('tours');
  const [selectedCategory, setSelectedCategory] = useState<TourCategory | 'all'>('all');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && TOUR_CATEGORIES.includes(category as TourCategory)) {
      setSelectedCategory(category as TourCategory);
    }
  }, [searchParams]);

  if (loading) return <div className="p-8 text-center">Loading tours...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading tours: {error.message}</div>;

  const filteredTours = selectedCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === selectedCategory);

  const bannerImage = selectedCategory === 'all' 
    ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
    : CATEGORY_BACKGROUNDS[selectedCategory];

  return (
    <div>
      <Banner
        title={selectedCategory === 'all' ? 'Explore Our Tours' : selectedCategory}
        subtitle={`${filteredTours.length} Amazing Adventures Await`}
        backgroundImage={bannerImage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter
          categories={TOUR_CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useFirebase';
import { uploadImage } from '../../lib/storage';
import { Event } from '../../types';
import { EVENT_CATEGORIES } from '../../types/categories';
import { toast } from 'react-hot-toast';

interface AddPastEventFormProps {
  initialData?: Event;
  onSuccess?: () => void;
}

export function AddPastEventForm({ initialData, onSuccess }: AddPastEventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
    images: [] as string[],
    price: '',
    capacity: '',
    registeredCount: 0,
    category: EVENT_CATEGORIES[0],
    highlights: [''],
    participants: ['']
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addItem, updateItem } = useCollection<Event>('past-events');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        date: initialData.date,
        location: initialData.location,
        imageUrl: initialData.imageUrl,
        images: initialData.images,
        price: initialData.price.toString(),
        capacity: initialData.capacity.toString(),
        registeredCount: initialData.registeredCount,
        category: initialData.category,
        highlights: initialData.highlights || [''],
        participants: initialData.participants || ['']
      });
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'past-event-images');
      }

      const eventData = {
        ...formData,
        imageUrl,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        highlights: formData.highlights.filter(h => h.trim() !== ''),
        participants: formData.participants.filter(p => p.trim() !== '')
      };

      if (initialData?.id) {
        await updateItem(initialData.id, eventData);
        toast.success('Past event updated successfully');
      } else {
        await addItem(eventData);
        toast.success('Past event added successfully');
      }

      onSuccess?.();
    } catch (error) {
      toast.error(initialData ? 'Failed to update past event' : 'Failed to add past event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as Event['category'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          {EVENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Date</label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Image</label>
        {formData.imageUrl && (
          <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover mb-2 rounded" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full"
          required={!formData.imageUrl}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Highlights</label>
        {formData.highlights.map((highlight, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={highlight}
              onChange={(e) => {
                const newHighlights = [...formData.highlights];
                newHighlights[index] = e.target.value;
                setFormData({ ...formData, highlights: newHighlights });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Add event highlight"
            />
            <button
              type="button"
              onClick={() => {
                const newHighlights = formData.highlights.filter((_, i) => i !== index);
                setFormData({ ...formData, highlights: newHighlights.length ? newHighlights : [''] });
              }}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ ...formData, highlights: [...formData.highlights, ''] })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Highlight
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Participants</label>
        {formData.participants.map((participant, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={participant}
              onChange={(e) => {
                const newParticipants = [...formData.participants];
                newParticipants[index] = e.target.value;
                setFormData({ ...formData, participants: newParticipants });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Add participant name"
            />
            <button
              type="button"
              onClick={() => {
                const newParticipants = formData.participants.filter((_, i) => i !== index);
                setFormData({ ...formData, participants: newParticipants.length ? newParticipants : [''] });
              }}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ ...formData, participants: [...formData.participants, ''] })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Participant
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update Past Event' : 'Add Past Event')}
      </button>
    </form>
  );
}
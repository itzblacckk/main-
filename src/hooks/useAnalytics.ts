import { useState, useEffect } from 'react';
import { Analytics } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics>({
    pageViews: 0,
    uniqueVisitors: 0,
    averageTimeOnSite: 0,
    topPages: [],
    visitorsByDay: []
  });

  useEffect(() => {
    const trackPageView = async () => {
      const today = new Date().toISOString().split('T')[0];
      const path = window.location.pathname;
      const analyticsRef = doc(db, 'analytics', 'stats');

      try {
        // Update page views
        await setDoc(analyticsRef, {
          pageViews: increment(1),
          [`pageViews_${path}`]: increment(1),
          [`visitors_${today}`]: increment(1)
        }, { merge: true });

        // Get updated analytics
        const docSnap = await getDoc(analyticsRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAnalytics({
            pageViews: data.pageViews || 0,
            uniqueVisitors: data.uniqueVisitors || 0,
            averageTimeOnSite: data.averageTimeOnSite || 0,
            topPages: Object.entries(data)
              .filter(([key]) => key.startsWith('pageViews_'))
              .map(([key, value]) => ({
                path: key.replace('pageViews_', ''),
                views: value as number
              }))
              .sort((a, b) => b.views - a.views),
            visitorsByDay: Object.entries(data)
              .filter(([key]) => key.startsWith('visitors_'))
              .map(([key, value]) => ({
                date: key.replace('visitors_', ''),
                count: value as number
              }))
              .sort((a, b) => a.date.localeCompare(b.date))
          });
        }
      } catch (error) {
        console.error('Error tracking analytics:', error);
      }
    };

    trackPageView();
  }, []);

  return analytics;
}
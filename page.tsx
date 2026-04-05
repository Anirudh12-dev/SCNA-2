'use client';

import { useHiveoStore } from '@/lib/store';
import { LeftSidebar } from '@/components/left-sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { Navbar } from '@/components/navbar';
import { HomeFeed } from '@/components/home-feed';
import { CommunitiesPage } from '@/components/communities-page';
import { CommunityDetailPage } from '@/components/community-detail';
import { EventsPage } from '@/components/events-page';
import { GamesPage, GameDetailPage } from '@/components/games-page';
import { ProfilePage } from '@/components/profile-page';
import { MobileNav } from '@/components/mobile-nav';
import { useEffect, useState } from 'react';

export default function Home() {
  const { currentPage, darkMode } = useHiveoStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Apply dark mode class to html element
  useEffect(() => {
    if (!isMounted) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, isMounted]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeFeed />;
      case 'communities':
        return <CommunitiesPage />;
      case 'community-detail':
        return <CommunityDetailPage />;
      case 'events':
        return <EventsPage />;
      case 'games':
        return <GamesPage />;
      case 'game-detail':
        return <GameDetailPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomeFeed />;
    }
  };

  return (
    <div className="min-h-screen flex honeycomb-bg">
      <LeftSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto pb-20 lg:pb-6">
          {renderPage()}
        </main>
      </div>
      <RightSidebar />
      <MobileNav />
    </div>
  );
}

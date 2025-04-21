'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import useSWR from 'swr';
import { RecentActivity } from "../components/RecentActivity";
import { StatusCard } from "../components/StatusCard";

const fetcher = (url: string) => fetch(url).then(res => res.json());
const logFetcher = async () => {
  const res = await fetch("/api/recent-activity");
  if (!res.ok) return [];
  return await res.json();
};

export default function Home() {
  const [apiStatus, setApiStatus] = useState('Offline');
  const { data, error } = useSWR("/api/status", fetcher, { refreshInterval: 5000 });
  const { data: logLines } = useSWR("/api/recent-activity", logFetcher, { refreshInterval: 10000 });

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('http://localhost:8001/status');
        if (response.ok) {
          setApiStatus('Online');
        } else {
          setApiStatus('Offline');
        }
      } catch (error) {
        setApiStatus('Offline');
      }
    };

    checkApiStatus();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarTrigger className="mt-2 ml-2" />
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Conversations</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Agents</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Settings</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>API Status</SidebarGroupLabel>
              <p className="text-sm px-4">{apiStatus}</p>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Actions</SidebarGroupLabel>
              <Button variant="outline" className="w-full">
                Create Agent
              </Button>
              <Button variant="outline" className="w-full">
                Start Conversation
              </Button>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p className="text-xs text-center">
              {new Date().getFullYear()} Architectum IDE
            </p>
          </SidebarFooter>
        </Sidebar>

        <main className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-white dark:bg-black">
          <div className="w-full max-w-xl space-y-6">
            {data && (
              <StatusCard endpoint={data.endpoint} status={data.status} ts={data.ts} />
            )}
            <RecentActivity lines={logLines || []} />
            {/* TODO: Conversation explorer widget */}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

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
import useSWR from "swr";
import { StatusCard } from "../components/StatusCard";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DashboardPage() {
  const { data, error } = useSWR("/api/status", fetcher, { refreshInterval: 5000 });

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
              <p className="text-sm px-4">{data ? data.status : 'Loading...'}</p>
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
            {/* TODO: Add additional widgets here */}
            <div>{/* TODO: Activity log widget */}</div>
            <div>{/* TODO: Conversation explorer widget */}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

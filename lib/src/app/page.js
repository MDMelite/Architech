'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
export default function Home() {
    const [apiStatus, setApiStatus] = useState('Offline');
    useEffect(() => {
        const checkApiStatus = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:8001/status');
                if (response.ok) {
                    setApiStatus('Online');
                }
                else {
                    setApiStatus('Offline');
                }
            }
            catch (error) {
                setApiStatus('Offline');
            }
        });
        checkApiStatus();
    }, []);
    return (<SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarTrigger className="mt-2 ml-2"/>
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

        <main className="flex-1 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Architectum IDE</CardTitle>
              <CardDescription>
                Multi-agent architecture for automated code generation, documentation, and
                repository management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a prototype demonstrating the viability of a document-based workflow for AI
                agent orchestration, with particular emphasis on seamless integration between
                external AI systems and GitHub Copilot.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>);
}

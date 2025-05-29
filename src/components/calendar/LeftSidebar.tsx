'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface LeftSidebarProps {
  selectedFilter: string;
  onFilterChange: (f: string) => void;
}

export function LeftSidebar({ selectedFilter, onFilterChange }: LeftSidebarProps) {
  return (
    <div className="w-full md:w-60 border-r bg-background">
      <ScrollArea className="h-full p-4">
        <h3 className="text-sm font-medium mb-4">My Calendar (beta)</h3>
        <div className="space-y-2">
          {[
            {key:'all', label:'All Events', icon:'📅'},
            {key:'patient_chat', label:'Patient Meetings', icon:'👤'},
            {key:'team_meeting', label:'Team Meetings', icon:'👥'},
            {key:'other', label:'Other Events', icon:'📋'},
          ].map(item=>(
            <Button
              key={item.key}
              variant={selectedFilter===item.key?'default':'ghost'}
              className="w-full justify-start"
              onClick={()=>onFilterChange(item.key)}
            >{item.icon} {item.label}</Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
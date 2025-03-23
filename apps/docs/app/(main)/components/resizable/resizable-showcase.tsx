'use client'

import StyleguideRender from '@/ui/styleguide-render'
import StyleguideSection from '@/ui/styleguide-section'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@3a.solutions/ui/resizable'
import { Button, ButtonGroup } from '@3a.solutions/ui/button'
import { Input } from '@3a.solutions/ui/forms'
import { Badge } from '@3a.solutions/ui/badge'
import {
  Search,
  FolderIcon,
  FileIcon,
  ChevronRight,
  Eye,
  Download,
  Share2,
  Plus,
  Settings,
  User,
  MessageSquare,
} from 'lucide-react'

export function ResizableShowcase() {
  return (
    <StyleguideSection title="Resizable Panels" subline="Different examples of resizable panels with a handle">
      <StyleguideRender>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-full rounded-2xl border-10 border-default bg-default"
        >
          <ResizablePanel defaultSize={50} className="@container bg-background rounded-lg">
            <div className="flex h-full flex-col p-5 @md:p-10">
              <h2 className="font-semibold mb-5">Messages</h2>
              <div className="mb-5">
                <Input icon={<Search className="size-4" />} placeholder="Search messages..." clearable />
              </div>
              <div className="space-y-2 @xs:space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted">
                    <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1 @xs:flex @xs:items-center @xs:justify-between">
                      <p className="truncate font-medium">User {i}</p>
                      <Badge variant="outline">2m ago</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle className="bg-default w-3" withHandle />
          <ResizablePanel defaultSize={50} className="@container bg-background rounded-lg">
            <div className="flex h-full flex-col p-5 @md:p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="size-4 text-muted-foreground" />
                  </div>
                  <h2 className="font-semibold">John Doe</h2>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="size-4" />
                </Button>
              </div>
              <div className="flex-1 @xs:text-sm">
                <p className="text-muted-foreground">Latest message content here...</p>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </StyleguideRender>

      <StyleguideRender>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[600px] max-w-full rounded-xl border border-border bg-default"
        >
          {/* File Explorer Panel */}
          <ResizablePanel defaultSize={25} className="@container bg-background rounded-l-lg">
            <div className="flex h-full flex-col">
              {/* Search Header */}
              <div className="h-20 px-5 flex items-center border-b border-border">
                <Input icon={<Search className="size-4" />} placeholder="Search files..." clearable />
              </div>

              {/* File Tree */}
              <div className="flex-1 p-2 space-y-1">
                {['Documents', 'Images', 'Projects'].map((folder) => (
                  <div key={folder} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg cursor-pointer">
                    <FolderIcon className="size-4 text-muted-foreground" />
                    <span className="text-sm">{folder}</span>
                    <ChevronRight className="size-3 ml-auto text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="w-px" />

          {/* Content Preview Panel */}
          <ResizablePanel defaultSize={75} className="@container bg-background rounded-r-lg">
            <div className="flex h-full flex-col">
              {/* Action Header */}
              <div className="h-20 px-5 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-3">
                  <FileIcon className="size-4 text-muted-foreground" />
                  <span className="font-medium">document.pdf</span>
                  <Badge variant="outline">2.4 MB</Badge>
                </div>
                <ButtonGroup variant="outline">
                  <Button size="icon">
                    <Eye className="size-4" />
                  </Button>
                  <Button size="icon">
                    <Download className="size-4" />
                  </Button>
                  <Button size="icon">
                    <Share2 className="size-4" />
                  </Button>
                </ButtonGroup>
              </div>

              {/* Preview Area */}
              <div className="flex-1 p-10">
                <div className="h-full rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-5">Preview area for selected file</p>
                    <Button variant="primary">
                      <Plus className="size-4 mr-2" />
                      Upload New File
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </StyleguideRender>
    </StyleguideSection>
  )
}

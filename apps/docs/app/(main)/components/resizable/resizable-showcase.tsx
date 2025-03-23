'use client'

import StyleguideRender from '@/ui/styleguide-render'
import StyleguideSection from '@/ui/styleguide-section'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@3a.solutions/ui/resizable'

export function ResizableShowcase() {
  return (
    <StyleguideSection title="Resizable Panels" subline="Resizable panels with a handle">
      <StyleguideRender>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-full rounded-xl border-10 border-default bg-default"
        >
          <ResizablePanel defaultSize={50} className="bg-background rounded-lg ">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-medium">Left Panel</span>
            </div>
          </ResizablePanel>
          <ResizableHandle className="bg-default w-3" withHandle />
          <ResizablePanel defaultSize={50} className="bg-background rounded-lg ">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-medium">Right Panel</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </StyleguideRender>

      <StyleguideRender>
        <ResizablePanelGroup direction="vertical" className="min-h-[600px] max-w-full rounded-xl border-4 bg-border">
          <ResizablePanel defaultSize={300} className="bg-background rounded-t-lg">
            <div className="flex  items-center justify-center p-6">
              <span className="font-medium">Top Panel</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} className="bg-background ">
            <div className="flex  items-center justify-center p-6">
              <span className="font-medium">Middle Panel</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} className="bg-background rounded-b-lg">
            <div className="flex  items-center justify-center p-6">
              <span className="font-medium">Bottom Panel</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </StyleguideRender>

      <StyleguideRender>
        <ResizablePanelGroup direction="horizontal" className="min-h-[300px] max-w-full rounded-xl border-4 bg-border">
          <ResizablePanel defaultSize={30} className="bg-background rounded-lg">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-medium">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle className="w-3" withHandle />
          <ResizablePanel defaultSize={70} className="bg-background rounded-lg">
            <ResizablePanelGroup direction="vertical" className="bg-border">
              <ResizablePanel defaultSize={60} className="bg-background rounded-lg">
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-medium">Main Content</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle className="data-[panel-group-direction=vertical]:h-3" />
              <ResizablePanel defaultSize={40} className="bg-background rounded-lg">
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-medium">Preview Panel</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </StyleguideRender>
    </StyleguideSection>
  )
}

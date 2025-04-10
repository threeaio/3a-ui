import { ProfilerOnRenderCallback } from "react";

export const onRender: ProfilerOnRenderCallback = (
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
    console.log('--------------------------------')
    console.log(`Profiling ${id} during ${phase} phase:`);
    console.log(`Actual duration: ${actualDuration}ms`);
    console.log(`Base duration: ${baseDuration}ms`);
    console.log(`Start time: ${startTime}ms`);
    console.log(`Commit time: ${commitTime}ms`);
    console.log('--------------------------------')
  }; 
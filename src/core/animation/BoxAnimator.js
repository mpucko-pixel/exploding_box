// -------------------------------------------------------------
// File: src/core/animation/BoxAnimator.js
// Centralizes lid + wall animation sequencing with delays
// -------------------------------------------------------------
import { useRef, useCallback } from "react";
import { useSpring } from "@react-spring/three";
import { wait } from '../utils/wait.js';

export function useBoxAnimator(ANIM) {
  const isAnimating = useRef(false);

  // Helper delay ----------------------------------------------
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  // Springs -----------------------------------------------------
  const [lidSpring, lidApi] = useSpring(() => ({
    open: 0,
    config: {
      tension: 110,
      friction: 18,
    }
  }));

  const [wallsSpring, wallsApi] = useSpring(() => ({
    open: 0,
    config: {
      tension: 110,
      friction: 16,
    }
  }));

  // OPEN SEQUENCE -----------------------------------------------
  const open = useCallback(async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // 1) Lid first
    await lidApi.start({ open: 1 });

    // 2) Force visual delay
    await wait(ANIM.lid * 600);

    // 3) Walls unfold
    await wallsApi.start({ open: 1 });

    isAnimating.current = false;
  }, [lidApi, wallsApi, ANIM]);

  // CLOSE SEQUENCE ----------------------------------------------
  const close = useCallback(async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // 1) Walls fold first
    await wallsApi.start({ open: 0 });

    // 2) Delay before lid closes
    await wait(ANIM.walls * 500);

    // 3) Lid closes
    await lidApi.start({ open: 0 });

    isAnimating.current = false;
  }, [lidApi, wallsApi, ANIM]);

  // RESET --------------------------------------------------------
  const reset = useCallback(() => {
    lidApi.set({ open: 0 });
    wallsApi.set({ open: 0 });
    isAnimating.current = false;
  }, [lidApi, wallsApi]);

  return {
    lidSpring,
    wallsSpring,
    open,
    close,
    reset,
  };
}
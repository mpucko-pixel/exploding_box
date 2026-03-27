import React, { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * FigurineDragRotation
 * --------------------
 * - OnPointerDown: začasno izklopi OrbitControls (controls.enabled = false)
 * - OnPointerMove: rotira skupino po Y (samo med dragingom)
 * - OnPointerUp/Out: spet vklopi OrbitControls (controls.enabled = true)
 * - stopPropagation na vseh pointer eventih, da se dogodki ne "prelijejo" do scene
 * - doda "cursor: grab/grabbing" preko userData + CSS
 *
 * Zahteva: <OrbitControls makeDefault /> v Scene.jsx (to že imaš).
 */
export default function FigurineDragRotation({ children }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);
  const lastX = useRef(0);

  // Drei <OrbitControls makeDefault /> registrira kontrole v glavni three state
  const { controls, gl } = useThree((state) => ({
    controls: state.controls,
    gl: state.gl,
  }));

  // Varnost: ob reset eventu figurino zavrti na 0 in onemogoči drag
  useEffect(() => {
    const onReset = () => {
      if (ref.current) ref.current.rotation.y = 0;
      setDrag(false);
      if (controls) controls.enabled = true;
      gl.domElement.style.cursor = 'auto';
    };
    document.addEventListener('reset-figurine-rotation', onReset);
    return () => document.removeEventListener('reset-figurine-rotation', onReset);
  }, [controls, gl]);

  const onDown = (e) => {
    e.stopPropagation();
    setDrag(true);
    lastX.current = e.clientX ?? (e.touches?.[0]?.clientX || 0);
    if (controls) controls.enabled = false; // 🔒 izklopi orbit med dragom
    gl.domElement.style.cursor = 'grabbing';
  };

  const onMove = (e) => {
    if (!drag) return;
    e.stopPropagation();
    const clientX = e.clientX ?? (e.touches?.[0]?.clientX || lastX.current);
    const dx = (clientX - lastX.current) * 0.01;
    lastX.current = clientX;
    if (ref.current) ref.current.rotation.y += dx;
  };

  const endDrag = (e) => {
    e?.stopPropagation?.();
    setDrag(false);
    if (controls) controls.enabled = true; // 🔓 spet vklopi orbit
    gl.domElement.style.cursor = 'grab';
  };

  return (
    <group
      ref={ref}
      // pointer capture samo nad figurino
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerOut={endDrag}
      onPointerCancel={endDrag}
      // nastavitev kurzorja, ko gre miš nad figurino
      onPointerOver={(e) => { e.stopPropagation(); gl.domElement.style.cursor = 'grab'; }}
      onPointerLeave={(e) => { e.stopPropagation(); if (!drag) gl.domElement.style.cursor = 'auto'; }}
    >
      {children}
    </group>
  );
}
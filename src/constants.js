// MERE (v metrih)
export const BOX_SIZE = 0.1;            // 100 mm
export const WALL_THICKNESS = 0.0005;   // 0.5 mm

// POKROV
export const LID_SIZE = [0.104, 0.03, 0.104]; // 104 × 30 × 104 mm
export const LID_OVERLAP = 0.029;             // 29 mm prekrivanja na stene

// FIGURINA
export const FIGURE_MAX_HEIGHT = 0.07;  // 70 mm

// ANIMACIJE (sekunde)
export const ANIM = { lid: 0.5, walls: 1.0 };

// Majhen odmik za anti z-fighting
export const EPS = 0.00025;

// 2 mm odmik od roba dekor papirja
export const PAPER_INSET = 0.002;

// 20 mm: 1 "tile" = 2 cm v svetu
export const PAPER_TILE_BASE = 0.02;   

// čisto bela osnova
export const CARDBOARD_COLOR = '#fafafa';
//export const CARDBOARD_COLOR = '#fcfcfc';
//export const CARDBOARD_COLOR = '#eeeeee';
//export const CARDBOARD_COLOR = '#faf9f5';  // Snow White – looks white in 3D
//export const CARDBOARD_COLOR = '#f7f3e9';
//export const CARDBOARD_COLOR = '#ffffff';
//export const CARDBOARD_COLOR = '#ff0000'
// toplo belino, lahko to spremeniš npr. v #fffaf0.


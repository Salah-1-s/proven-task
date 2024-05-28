# Proven Task

## Getting Started

```

npm install # install deps

npm run dev # logic and pages development

npm run build # app production build

```

## Description

This React app does a simple task. It consists of one page, and its main function is to draw an image inside a canvas from its base64 data. Then, by positioning a number of boxes on the canvas, you can understand and analyze what this image or document is about.
On the top left, there is a sidebar where you can track all the box statuses.

## Architecture

The current architecture uses the following technologies:

- TypeScript
- Vite with ESBuild and Rollup behind the scenes
- Styling: CSS

## Directory Structure

```
.
└── src/
   ├── assets - icons, images, etc
   ├── components - react components and their and styling
   ├── constants - self explanatory
   ├── interfaces - custom types and interfaces
   └── utils - self explanatory
```

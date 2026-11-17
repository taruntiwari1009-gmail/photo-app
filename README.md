# Photo Gallery

A responsive React photo gallery with a keyboard-accessible details modal and thumbnail navigation.

## Features

- Responsive photo grid with lazy-loaded thumbnails
- Open individual photos in a details dialog
- View image description, date and file type metadata
- Switch between photos using the thumbnail strip
- Keep keyboard focus inside the dialog and return focus to the selected photo when it closes
- Close the dialog using the close button, backdrop or Escape key
- Preserve the original image assets in the public directory

## Tech stack

- React 18
- Create React App
- CSS Grid and Flexbox

## Getting started

### Requirements

- Node.js (LTS recommended)
- npm

### Install dependencies

```bash
npm ci
```

### Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Run tests

```bash
npm test
```

### Create a production build

```bash
npm run build
```

## Add or update photos

Photo metadata is maintained in `src/content/data.js`. Place image assets in `public/images/` and reference them using paths beginning with `/images/`. Use meaningful names, accurate descriptions and correct file types.

## Privacy and image rights

The repository includes image assets. Confirm that you own or have permission to publish each photograph before deploying the gallery publicly. No license has been specified; contact the repository owner before reusing or redistributing this project or its photographs.

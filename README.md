# Photo Gallery

A responsive React photo gallery with a detail view, metadata and a thumbnail picker.

## Features

- Responsive grid of gallery images
- Open a photo in a detail dialog
- View image descriptions and metadata
- Switch between photos from the thumbnail strip
- Close the dialog with the close control, backdrop or Escape key
- Lazy-load gallery and thumbnail images

## Tech stack

- React 18
- Create React App
- CSS and inline component styles

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
npm test -- --watchAll=false
```

### Create a production build

```bash
npm run build
```

## Adding or editing photos

Update the array in `src/content/data.js`. Each item supports:

- `name`: photo title
- `url`: path to the image in the public directory
- `description`: short description
- `date`: date metadata
- `type`: media type label

Place image files under `public/images/` and use paths beginning with `/images/`.

## Privacy and rights

The repository currently includes image assets. Confirm that you have the rights and permission to publish each image before deploying this gallery publicly.

## License

No license has been specified. Contact the repository owner before reusing or redistributing this project.

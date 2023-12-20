# WebM to MP4 Converter

## Overview

This is a simple offline application written in vanilla TypeScript that allows you to convert WebM videos to the MP4 format. The application leverages the power of [FFmpeg](https://ffmpeg.org/) for video conversion. Additionally, it is designed as a Progressive Web App (PWA), enabling users to use it even when offline.

## Features

- Convert WebM videos to MP4 format.
- Offline functionality as a Progressive Web App (PWA).
- User-friendly interface.
- Fast and efficient video conversion using FFmpeg.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/irahuldogra/browservc.git
   ```

2. Install dependencies:

   ```bash
   cd browservc
   bun install
   ```

## Usage

1. Start the development server:

   ```bash
   bun run dev
   ```

   This will launch the application in your default web browser. You can access it at `http://localhost:4321`.

2. Use the application to upload your WebM files and initiate the conversion process by dragging in the video file.

## Dependencies

- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
- [FFmpeg](https://ffmpeg.org/): A powerful multimedia processing tool used for video conversion.
- [Vite](https://vitejs.dev/): A fast and opinionated frontend build tool.
- [Bun](https://bun.sh/): A fast javascript runtime and package manager.

## Configuration

The application's configuration can be found in the `vite.config.ts` file. Adjust the configuration as needed for your specific use case.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The application utilizes the incredible power of [FFmpeg](https://ffmpeg.org/).
- The UI is built with the help of [Tailwind CSS](https://tailwindcss.com/).
- Thanks to the [Vite](https://vitejs.dev/) team for providing a fast and efficient build tool.
- [Bun](https://bun.sh/) for serving the production build.

## Author

Rahul Dogra
- GitHub: [Rahul Dogra](https://github.com/irahuldogra)
- Website: [Link](https://rahuldogra.dev)

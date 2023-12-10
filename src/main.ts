import './css/main.css'
import {FFmpeg} from "@ffmpeg/ffmpeg";
import {fetchFile} from "@ffmpeg/util";
import {showConfetti} from "./confetti.ts";

type State = 'loading' | 'loaded' | 'convert.start' | 'convert.error' | 'convert.done';

let state: State = 'loading'
let error = ''
let progress = 0
let ffmpeg: FFmpeg;
let isDevelopement = import.meta.env.MODE === 'development';

const appContainer = document.querySelector('#app') as HTMLDivElement;

appContainer.innerHTML = `
<div class="max-w-[900px] w-full mx-auto px-4 flex flex-col gap-4">
    <h1 class="app-gradient bg-clip-text text-3xl font-extrabold uppercase tracking-tighter text-transparent sm:text-4xl lg:text-6xl">WebM to MP4 Convertor</h1>
    <div id="dropContainerWrapper" class="h-[450px] border-2 border-stone-900 app-gradient rounded-lg p-1" >
        <div id="dropContainer" class="h-full flex flex-col gap-4 items-center justify-center bg-gray-900 rounded-[inherit] py-2 px-3">
            <div id="dropContainerInner"  class="app-gradient bg-clip-text text-transparent pointer-events-none select-none text-2xl sm:text-3xl lg:text-5xl">
                Loading...
            </div>
        </div>
    </div>
</div>
`

const dropContainer = appContainer.querySelector('#dropContainer') as HTMLDivElement;
const dropContainerInner = appContainer.querySelector('#dropContainerInner') as HTMLDivElement;

const updateDropContainerInner = (newState: State, newProgress?: number) => {
    state = newState;
    progress = newProgress || 0;
    dropContainerInner.innerHTML = '';

    switch (state) {
        case 'loading':
            dropContainerInner.innerText = 'Loading...';
            break;
        case 'loaded':
            dropContainerInner.innerText = 'Drop here to start the conversion';
            break;
        case 'convert.start':
            // Display progress bar or message
            dropContainerInner.innerHTML = `<div>Converting... Progress: ${progress.toFixed(0)}%</div>`;
            break;
        case 'convert.error':
            dropContainerInner.innerText = `Error: ${error}`;
            break;
        case 'convert.done':
            dropContainerInner.innerText = '🎉 Conversion done!';
            showConfetti();
            break;

    }
};

const showError = (error: string) => {
    let errorContainer = appContainer.querySelector('#dropError');

    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'dropError'
        errorContainer.innerHTML = error;
        errorContainer.className = 'bg-red-500 bg-clip-text text-transparent pointer-events-none select-none text-xl sm:text-2xl lg:text-4xl'
        if (error.length !== 0) dropContainer.appendChild(errorContainer)
        return;
    }

    if (error.length === 0) {
        dropContainer.removeChild(errorContainer)
    }

    errorContainer.innerHTML = error;
    return;
}

dropContainer.addEventListener('dragover', (event) => {
    // Prevent default behavior to allow drop
    event.preventDefault();
});


const convertVideo = async (video: File) => {
    updateDropContainerInner('convert.start', 0)
    await ffmpeg.writeFile('input.webm', await fetchFile(video))

    await ffmpeg.exec(['-i', 'input.webm', 'output.mp4'])

    const data = await ffmpeg.readFile('output.mp4')
    updateDropContainerInner('convert.done')

    return data as Uint8Array
}

dropContainer.addEventListener('drop', async (event) => {
    // Prevent default behavior to allow drop
    event.preventDefault();

    if (!event.dataTransfer) {
        showError('Data Transfer error')
        return;
    }

    if (event.dataTransfer.files.length > 1) {
        showError('Upload utmost 1 file')
    }

    if (event.dataTransfer.files[0].type === 'video/webm') {
        showError('')
        const [file] = event.dataTransfer.files;

        const data = await convertVideo(file)

        const a = document.createElement('a')
        a.href = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}))
        a.download = 'video.mp4'

        setTimeout(() => {
            a.click()
        }, 1000)

    } else {
        showError("Only WebM is supported")
        return
    }
});

const loadFFmpeg = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm"
    ffmpeg = new FFmpeg()

    ffmpeg.on('progress', event => {
        const currentProgress = event.progress * 100;
        updateDropContainerInner("convert.start", currentProgress)
    })

    if(isDevelopement){
        await ffmpeg.load({
            coreURL: `${baseURL}/ffmpeg-core.js`, wasmURL: `${baseURL}/ffmpeg-core.wasm`,
        });
    } else {
        await ffmpeg.load({
            coreURL: `/ffmpeg/ffmpeg-core.js`, wasmURL: `/ffmpeg/ffmpeg-core.wasm`,
        });
    }

    updateDropContainerInner('loaded');
}

document.addEventListener('DOMContentLoaded', loadFFmpeg)



import { createReadStream, createWriteStream } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
// import through from "through2";

const WORKING_DIR = cwd();
const STREAMS_DIR = join(WORKING_DIR, "src", "streams");

const INPUT_FILE_PATH = join(STREAMS_DIR, "on-joy-and-sorrow-emoji.txt");
const OUTPUT_FILE_PATH = join(STREAMS_DIR, "result.txt");

// Create a read stream here
const readPoemStream = createReadStream(INPUT_FILE_PATH);

// Create a write stream here
const writePoemStream = createWriteStream(OUTPUT_FILE_PATH);

let finalData: string = "";
let lastChunkEndedWithColon: boolean = false;

function cleanChunk(chunk: string): string {
  return chunk.replaceAll(":)", "joy").replaceAll(":(", "sorrow");
}

function handleBuffer(buffer: Buffer): string {
  let data = buffer.toString();

  if (lastChunkEndedWithColon) {
    data = ":" + data;
  }

  const currentChunkEndsWithColon = data.lastIndexOf(":") === data.length - 1;
  if (currentChunkEndsWithColon) {
    data = data.slice(0, -1);
  }

  lastChunkEndedWithColon = currentChunkEndsWithColon;

  return cleanChunk(data);
}

readPoemStream.on("data", (buffer: Buffer) => {
  finalData += handleBuffer(buffer);
});

readPoemStream.on("close", () => {
  writePoemStream.write(finalData);
});

// EXTENSION: Create a transform stream (modify the read stream before piping to write stream)
// const transformStream = through((buffer, encoding, next) => {
//   let data = handleBuffer(buffer);
//   this.push(data);

//   next();
// });

// readPoemStream
//   .pipe(transformStream)
//   .pipe(writePoemStream)
//   .on("finish", () => {
//     console.log("Piped functions using through2 has been completed");
//   });

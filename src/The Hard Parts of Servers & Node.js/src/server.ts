import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync, rmSync } from "node:fs";
import { IncomingMessage, ServerResponse, createServer } from "node:http";
import { cwd } from "node:process";
import { join } from "node:path";

const WORKING_DIR = cwd();

const BASE_PATH = join(WORKING_DIR, "src");

const HI_LOG_PATH = join(BASE_PATH, "hi_log.txt");
const ERROR_LOG_PATH = join(BASE_PATH, "error_log.txt");
const INDEX_HTML_PATH = join(BASE_PATH, "index.html");
const STYLE_CSS_PATH = join(BASE_PATH, "style.css");

function handleNotFound(response: ServerResponse) {
  response.writeHead(404);
  response.end("Error: Not Found");
}

function handleGET(request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case "/":
      const file = readFileSync(INDEX_HTML_PATH, "utf8");
      response.end(file);
      break;
    case "/style.css":
      const style = readFileSync(STYLE_CSS_PATH, "utf8");
      response.end(style);
      break;
    default:
      break;
  }
}

function handlePOST(request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case "/sayHi":
      appendFileSync(HI_LOG_PATH, "Somebody said hi.\n", {
        encoding: "utf8",
      });

      response.end("hi back to you!");
      break;

    case "/greeting":
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
      });

      request.on("end", () => {
        if (!body.endsWith("\n")) {
          body += "\n";
        }

        appendFileSync(HI_LOG_PATH, body, { encoding: "utf8" });

        if (body === "hello") {
          return response.end("hello there!");
        }

        if (body === "what's up") {
          return response.end("the sky");
        }

        response.end("good morning");
      });
      break;
    default:
      handleNotFound(response);
      break;
  }
}

function handlePUT(request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case "/put-request":
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
      });

      request.on("end", () => {
        if (!body.endsWith("\n")) {
          body += "\n";
        }

        appendFileSync(HI_LOG_PATH, body, "utf8");
      });
      break;
    default:
      handleNotFound(response);
      break;
  }
}

function handleDELETE(request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case "/delete-request":
      if (!existsSync(HI_LOG_PATH)) return;

      rmSync(HI_LOG_PATH);
      break;
    default:
      handleNotFound(response);
      break;
  }
}

function handleRequest(request: IncomingMessage, response: ServerResponse) {
  switch (request.method) {
    case "GET":
      handleGET(request, response);
      break;
    case "POST":
      handlePOST(request, response);
      break;
    case "PUT":
      handlePUT(request, response);
      break;
    case "DELETE":
      handleDELETE(request, response);
      break;
    default:
      response.writeHead(405);
      response.end("Unsupported request method");
      break;
  }
}

function handleClientError(error: Error, response: ServerResponse) {
  console.error("Something went wrong:");
  console.error(error.message);

  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${error.message}`;

  appendFileSync(ERROR_LOG_PATH, logMessage, { encoding: "utf8" });

  response.write(400);
  response.end();
}

const server = createServer();

server.on("request", handleRequest);
server.on("clientError", handleClientError);

server.listen(3000);

# Click to Chat (Web)

[![Click to Chat CI-CD Pipeline](https://github.com/TrianguloY/OpenInWhatsapp_Web/actions/workflows/pipeline.yml/badge.svg)](https://github.com/TrianguloY/OpenInWhatsapp_Web/actions)

A beautiful, responsive, and privacy-first web utility designed for sending WhatsApp messages to one-time contacts (such as delivery drivers, marketplace sellers, or quick business contacts) **without saving their numbers to your phonebook** or **sharing your contact list sync permissions** with WhatsApp.

This is the web companion to the popular Android app [Click to Chat](https://play.google.com/store/apps/details?id=com.trianguloy.openInWhatsapp).

---

## 🚀 Key Features

*   **Instant WhatsApp Redirection**: Type or paste a number to open a chat immediately on WhatsApp (via `wa.me` API redirect).
*   **Searchable Smart Prefix Selector**: Dynamic country code dropdown listing 200+ countries with their flags and dial codes. Supports real-time filtering by country name, ISO code, or dial code.
*   **Timezone & Locale Region Auto-Detection**: Guesses and pre-selects the user's home country code automatically on page load using browser locale (`navigator.language`) and local timezone (`Intl.DateTimeFormat`).
*   **Smart Paste Sanitization**: Automatically strips spaces, parentheses, dashes, and letters. If a full number starting with a plus (e.g. `+44 (7911) 123-456`) is pasted, the script automatically parses the prefix, selects the country, and places the remaining digits into the phone field.
*   **Local Session History (Max 5 Dials)**: Stores the last 5 dialed numbers in browser `localStorage`. Dials can be loaded with one click or deleted individually. History can also be cleared entirely. No data ever leaves your browser.
*   **Link Generator**: Dynamically generates the shareable `wa.me/number` link as you type, with a one-click Copy button and custom Material 3 toast feedback.
*   **Material 3 Responsive Layout**:
    *   *Desktop viewports (>= 600px)*: Rendered as a centered, elegant Standard Dialog card with micro-shadows.
    *   *Mobile viewports (< 600px)*: Extends to a full-width Bottom Sheet layout anchored to the bottom of the screen with a fluid slide-up animation and visual drag handle.
    *   *Color scheme*: Green-based tonal palettes matching WhatsApp theme (light/dark mode fully supported).

---

## 🛠️ Technical Stack

*   **Frontend Structure**: Semantic HTML5 and modular Javascript (Vanilla ES6).
*   **Styling**: Modern Vanilla CSS utilizing Material 3 design tokens, CSS variables, CSS nesting, and `@starting-style` transitions for native top-layer elements.
*   **Containerization**: served on Nginx using `Dockerfile` on exposed port 80.
*   **Testing**: Integration test suite in Node.js using `JSDOM` to mock DOM interactions, events, and local storage state, generating a markdown test summary.
*   **CI/CD Pipeline**: GitHub Actions workflows running on `ubuntu-latest` sequentially:
    1.  **Test Job**: Builds the Docker container, runs tests inside it, and publishes the test report.
    2.  **Deploy Job**: Deploys static files directly to GitHub Pages upon successful test outcomes (triggered on push/merge to `master`).

---

## 💻 Local Setup & Development

### 1. Run Locally (Development)
You can run a local development server using Python's static file server or any node HTTP server:
```bash
# Serves the site on http://localhost:8000
python3 -m http.server 8000
```
Then navigate your browser to `http://localhost:8000`.

### 2. Running Integration Tests
Install the dev dependencies and run the JSDOM test runner:
```bash
# Install jsdom
npm install

# Run tests (looks for target running on http://localhost:8000 or http://localhost:8080)
TEST_TARGET_URL=http://localhost:8000 npm test
```
The test runner will execute checks for input sanitization, autocomplete, history, copy actions, and generate a test report in `tests/test-report.md`.

---

## 🐳 Docker Deployment

To build and run the application inside a container locally:

```bash
# 1. Build the Docker image
docker build -t click-to-chat-web .

# 2. Spin up the container on port 8080
docker run -d -p 8080:80 --name click-to-chat click-to-chat-web

# 3. Access the site
# Navigate to http://localhost:8080
```

To stop and remove the container:
```bash
docker stop click-to-chat && docker rm click-to-chat
```

---

## ⚙️ GitHub Actions CI/CD Pipeline

The workflows are located in the `.github/workflows/` directory:

1.  **`pipeline.yml`**: The main pipeline entry point. Triggered on pushes/pull requests to `master` and `develop` branches.
2.  **`ci-test.yml`** (Reusable CI): Builds the Docker image, starts the container in the GitHub runner on port 8080, runs the integration test suite, and uploads the final test summary report as an action summary.
3.  **`cd-deploy.yml`** (Reusable CD): Deploys the static files to GitHub Pages natively. It will only run sequentially after the `ci-test` job has completed successfully, and only for pushes/merges into the `master` branch.

---

## 📄 License & Attribution

This project is licensed under the Creative Commons License. This application is completely free, does not store cookies, contains no trackers, and is not affiliated with WhatsApp Inc.

Made by [TrianguloY](https://github.com/TrianguloY).

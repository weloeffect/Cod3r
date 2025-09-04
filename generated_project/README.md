# SimpleCalculator

[![Status](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/yourusername/SimpleCalculator)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Description
SimpleCalculator is a lightweight web-based calculator that provides a clean, responsive user interface and full keyboard support. It performs basic arithmetic operations, handles user input gracefully, and offers a seamless experience across devices.

## Tech Stack
- **HTML** – Structure of the calculator UI.
- **CSS** – Styling and responsive layout.
- **JavaScript** – Core functionality, event handling, and calculations.

## Features
- Intuitive graphical user interface with buttons for digits and operations.
- Supports basic arithmetic: addition, subtraction, multiplication, and division.
- Clear (C) and backspace (⌫) functionalities.
- Real‑time display of the current expression and result.
- Fully responsive design that works on desktop and mobile browsers.
- Keyboard input: use numbers, `+`, `-`, `*`, `/`, `Enter` (or `=`) for calculation, `Backspace` for delete, and `Esc` to clear.
- Graceful error handling for invalid expressions (e.g., division by zero) with user‑friendly messages.

## Installation / Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SimpleCalculator.git
   ```
2. Navigate to the project folder:
   ```bash
   cd SimpleCalculator
   ```
3. Open `index.html` in any modern web browser. No build tools or package managers are required.

## Usage
- **Button Interaction:** Click the on‑screen buttons to input numbers and operators. The display updates instantly.
- **Keyboard Shortcuts:**
  - Digits `0‑9` and `.` – enter numbers.
  - `+`, `-`, `*`, `/` – arithmetic operators.
  - `Enter` or `=` – evaluate the expression.
  - `Backspace` – delete the last character.
  - `Esc` – clear the entire input.
- **Error Cases:** If an invalid expression is entered (e.g., division by zero), the calculator shows `Error` and the user can clear or continue typing.

## Development
To work on the project locally with live reload:
1. Install a simple static server (if you don't have one):
   ```bash
   npm install -g serve
   ```
2. Run the server in the project directory:
   ```bash
   serve .
   ```
3. Open the provided URL (usually `http://localhost:5000`) in your browser. The page will automatically refresh when you edit `index.html`, `styles.css`, or `script.js`.

### Editing Files
- **HTML:** `index.html` – modify the layout or add new UI elements.
- **CSS:** `styles.css` – adjust styling, colors, or responsiveness.
- **JavaScript:** `script.js` – implement or extend calculator logic.

## Contributing
Contributions are welcome! Please follow these guidelines:
- Fork the repository and create a new branch for your feature or bug fix.
- Follow the existing coding style: use **spaces** (2‑space indentation), descriptive class and variable names, and add comments where appropriate.
- Ensure the UI remains responsive and accessible.
- Submit a pull request with a clear description of your changes.

## License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

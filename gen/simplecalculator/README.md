# SimpleCalculator

A lightweight web-based calculator that performs basic arithmetic operations. It provides a clean user interface, supports both mouse clicks and keyboard input, and includes error handling for invalid operations.

## Features
- Basic arithmetic: addition, subtraction, multiplication, division
- Clear entry (CE) and all clear (AC) functions
- Decimal point support
- Keyboard shortcuts for numbers, operations, and control keys
- Real-time display of current input and result
- Graceful handling of division by zero and other invalid inputs

## Tech Stack
- **HTML** – Structure of the calculator interface
- **CSS** – Styling and layout for a responsive, user‑friendly design
- **JavaScript** – Core logic for calculations, event handling, and UI updates

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Open the application**
   - Locate the `index.html` file in the project root.
   - Open `index.html` directly in any modern web browser (Chrome, Firefox, Edge, Safari). No additional build steps or server setup are required.

## Usage Guide
### Button Layout
- **Digits (0‑9)**: Click or press the corresponding number keys.
- **Operations**: `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division).
- **Decimal**: `.` adds a decimal point to the current number.
- **Equals**: `=` or `Enter` computes the result.
- **Clear Entry (CE)**: `Backspace` removes the last character.
- **All Clear (AC)**: `Escape` resets the entire calculation.

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| 0‑9 | Input digit |
| .   | Add decimal point |
| +, -, *, / | Set operation |
| Enter or = | Calculate result |
| Backspace | Delete last entry (CE) |
| Escape | Reset calculator (AC) |

### Error Handling
- **Division by zero**: Displays `Error` and disables further input until cleared.
- **Invalid sequences** (e.g., multiple operators in a row): The calculator prevents the input and maintains the last valid state.
- **Overflow**: Results exceeding display capacity are shown in scientific notation.

## Development
To modify or extend the calculator:
- **HTML (`index.html`)** – Adjust the markup to add new buttons or restructure the layout.
- **CSS (`style.css`)** – Update styles for visual changes, such as colors, fonts, or responsive behavior.
- **JavaScript (`script.js`)** – Implement additional logic, new operations, or enhanced input handling. The script is organized with clear functions for parsing input, performing calculations, and updating the display.

After making changes, simply refresh `index.html` in the browser to see the updates.

---

*This README is self‑contained and provides all necessary information to run, use, and develop the SimpleCalculator project.*
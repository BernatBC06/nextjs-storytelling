# Next.js + Flask Starter

<p align="center">
  <a href="https://nextjs-flask-starter.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">Next.js Flask Starter</h3>
  </a>
</p>

<p align="center">A boilerplate for hybrid applications using <a href="https://nextjs.org/">Next.js</a> as the frontend and <a href="https://flask.palletsprojects.com/">Flask</a> as the API backend.</p>

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

This starter template provides a streamlined integration of Next.js for the frontend and Flask for the backend. It is suitable for building modern web applications with a clear separation of concerns between API and client-side rendering.

## Features

- **Next.js** for server-side rendering and static site generation.
- **Flask** for a lightweight and extensible backend.
- **Tailwind CSS** for modern and flexible styling.
- **TypeScript** support in the frontend for type safety.
- Preconfigured **API integrations** with Flask.
- Example data handling and visualization.

## Project Structure

```plaintext
nextjs-flask_Storytelling/
├── api/                  # Flask backend API
│   ├── data_chart_1.py
│   ├── data_utils.py
│   └── index.py
├── app/                  # Next.js application
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers/
├── data/                 # Example datasets
│   └── GamingStudy_data.csv
├── public/               # Static files for the Next.js app
│   ├── next.svg
│   └── vercel.svg
├── .vscode/              # VS Code configuration
├── .venv/                # Virtual environment for Flask
├── next.config.js        # Next.js configuration
├── package.json          # Node.js dependencies
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- `npm`, `yarn`, or `pnpm` (preferred)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/nextjs-flask-starter.git
   cd nextjs-flask-starter
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Set up Python environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Run the development servers**:
   - Start the Flask API:
     ```bash
     python api/index.py
     ```
   - Start the Next.js app:
     ```bash
     npm run dev
     ```

## Usage

- Navigate to `http://localhost:3000` to view the Next.js app.
- Flask API will run on `http://localhost:5000` by default.
- Example API endpoints are available under `/api`.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure your code follows the existing style and passes tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


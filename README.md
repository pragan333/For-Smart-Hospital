# For Smart Hospital

A Smart Hospital management API built with [FastAPI](https://fastapi.tiangolo.com/).

## Running Locally

### Prerequisites

- Python 3.8+

### Setup

1. **Create and activate a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Start the API server:**

   ```bash
   uvicorn api.index:app --host 0.0.0.0 --port 8000 --reload
   ```

4. **Open in your browser or call with curl:**

   - `GET /` — root endpoint → `{"status": "ok"}`
   - `GET /health` — health check → `{"status": "ok"}`

   Interactive API docs are available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.


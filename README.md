## Smart Hospital

A Smart Hospital management API built with FastAPI, deployed on Vercel.

### Prerequisites

- Python 3.12+

### Local Development

```bash
pip install -r requirements.txt
uvicorn api.main:app --reload
```

The API will be available at `http://localhost:8000`.

### API Endpoints

- `GET /` — Root endpoint
- `GET /health` — Health check

### Deployment

This project deploys automatically to Vercel. The FastAPI entrypoint is `api/main.py`.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.

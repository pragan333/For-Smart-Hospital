# CLAUDE.md — For-Smart-Hospital

## Project Overview

**For-Smart-Hospital** is a Smart Hospital management project. It is currently in the **initial scaffolding phase** — the repository contains only boilerplate files (license, contributing guidelines, code of conduct) and no source code has been implemented yet.

- **License:** Apache-2.0
- **Copyright:** Amazon.com, Inc. or its affiliates
- **Code of Conduct:** [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct)

## Repository Structure

```
For-Smart-Hospital/
├── CLAUDE.md              # This file — AI assistant guidance
├── CODE_OF_CONDUCT.md     # Amazon Open Source Code of Conduct
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # Apache-2.0 License
├── NOTICE                  # Copyright notice
└── README.md              # Project README (placeholder — needs content)
```

**Current state:** No source code, no configuration files, no build system, no tests, no CI/CD pipeline. The project needs to be built from scratch.

## Development Status

This repository is at the **very beginning** of development. The following have NOT yet been set up:

- [ ] Tech stack selection and project initialization
- [ ] Source code (frontend and/or backend)
- [ ] Package manager configuration (package.json, requirements.txt, etc.)
- [ ] Build and dev scripts
- [ ] Database schema and models
- [ ] API definitions
- [ ] Testing framework and tests
- [ ] CI/CD pipeline
- [ ] Docker / containerization
- [ ] Environment configuration (.env, .gitignore)
- [ ] Proper README with project description

## Contribution Workflow

Per `CONTRIBUTING.md`:

1. Work against the latest source on the **main** branch
2. Check existing open/recently merged PRs before starting work
3. Open an issue to discuss significant work before implementing
4. Fork the repository, make focused changes, ensure local tests pass
5. Submit a pull request with clear commit messages
6. Watch for automated CI failures and respond to review feedback

## Security

- Report security issues via [AWS vulnerability reporting](http://aws.amazon.com/security/vulnerability-reporting/)
- Do **not** create public GitHub issues for security vulnerabilities

## Conventions for AI Assistants

### General Guidelines

- This is an Apache-2.0 licensed project — respect license headers and attribution
- Keep the `NOTICE` file updated if adding new dependencies with attribution requirements
- Follow the contribution guidelines in `CONTRIBUTING.md`
- Update this `CLAUDE.md` file when adding new tech stack, commands, or conventions

### When Adding Source Code

- Choose an appropriate directory structure for the selected tech stack
- Add a `.gitignore` appropriate for the chosen language/framework
- Set up a package manager and lock file
- Include build, test, and dev scripts
- Add environment variable examples (`.env.example`) — never commit actual secrets
- Update `README.md` with setup instructions, prerequisites, and usage

### When Adding Tests

- Place tests alongside source code or in a dedicated `tests/` directory
- Document the test command in this file once established
- Aim for meaningful test coverage on critical paths

### When Adding CI/CD

- Use GitHub Actions (`.github/workflows/`) as the CI/CD platform
- Include linting, testing, and build steps
- Document pipeline behavior in this file once established

## Commands

_No build, test, or dev commands exist yet. Update this section when the tech stack is initialized._

<!--
Example format for when commands are added:

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

### Lint
```bash
npm run lint
```
-->

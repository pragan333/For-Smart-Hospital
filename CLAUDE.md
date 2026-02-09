# CLAUDE.md - AI Assistant Guide for For-Smart-Hospital

## Project Overview

**For-Smart-Hospital** is an AWS-originated open-source project intended for building a smart hospital system. The repository is currently in its **initial template state** — no application source code, build tooling, or infrastructure has been implemented yet. It was bootstrapped from an AWS open-source project template.

- **License:** Apache-2.0
- **Copyright:** Amazon.com, Inc. or its affiliates
- **Code of Conduct:** [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct)

## Repository Structure

```
For-Smart-Hospital/
├── CLAUDE.md              # This file — AI assistant guide
├── CODE_OF_CONDUCT.md     # Amazon Open Source Code of Conduct
├── CONTRIBUTING.md         # Contribution guidelines (PR workflow, issue reporting)
├── LICENSE                 # Apache License 2.0
├── NOTICE                  # Copyright attribution (Amazon)
└── README.md              # Project README (placeholder — needs content)
```

**Current state:** Template-only. No `src/`, `app/`, `tests/`, or other application directories exist yet. No `package.json`, `requirements.txt`, or other dependency manifests are present.

## Development Status

This repository has a single initial commit and no application code. When beginning development, the following will need to be established:

1. **Tech stack selection** — Choose languages, frameworks, and libraries
2. **Project scaffolding** — Create source directories, entry points, and configuration files
3. **Dependency management** — Add `package.json`, `requirements.txt`, or equivalent
4. **Build system** — Configure build tools, scripts, and dev server
5. **Testing framework** — Set up test runner, test directories, and conventions
6. **CI/CD pipeline** — Add `.github/workflows/` or equivalent
7. **Deployment config** — Dockerfile, infrastructure-as-code, etc.

## Contribution Workflow

Per `CONTRIBUTING.md`:

1. Work against the latest source on the `main` branch
2. Check existing open/recently merged PRs before starting work
3. Open an issue to discuss significant work before implementation
4. Fork the repository and make focused changes
5. Ensure local tests pass before submitting
6. Use clear commit messages
7. Respond to CI failures and review feedback

### Security Issues

Do **not** report security vulnerabilities via public GitHub issues. Use the [AWS vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/) instead.

## Conventions for AI Assistants

### General Rules

- **Read before modifying.** Always read a file before proposing changes.
- **Minimal changes.** Only make changes that are directly requested or clearly necessary. Do not refactor surrounding code or add unrequested features.
- **No secrets in commits.** Never commit `.env` files, credentials, API keys, or other sensitive data.
- **Apache-2.0 compliance.** All contributions must be compatible with the Apache-2.0 license. Include proper attribution in the NOTICE file when adding third-party dependencies.

### When Adding New Code

Since this is a greenfield project, when establishing new code:

- Follow the tech stack and patterns chosen by the project maintainers
- Keep directory structure flat and simple until complexity demands otherwise
- Add tests alongside new features
- Update this CLAUDE.md file when new patterns, tools, or conventions are established
- Update README.md with setup instructions, architecture overview, and usage documentation

### Commit Messages

- Use clear, descriptive commit messages
- Focus on the "why" rather than the "what"
- Keep the subject line under 72 characters
- Use imperative mood (e.g., "Add patient registration endpoint" not "Added patient registration endpoint")

## Key Files Reference

| File | Purpose |
|---|---|
| `README.md` | Project description and setup instructions (currently placeholder) |
| `CONTRIBUTING.md` | How to contribute — PR process, issue reporting, security |
| `CODE_OF_CONDUCT.md` | Community behavior standards (Amazon OSS CoC) |
| `LICENSE` | Apache License 2.0 full text |
| `NOTICE` | Copyright attribution |
| `CLAUDE.md` | This file — AI assistant context and guidelines |

## Notes

- The README.md contains a TODO placeholder and needs to be filled with actual project information once development begins.
- No build commands, test commands, or lint commands exist yet. This section should be updated as tooling is added.

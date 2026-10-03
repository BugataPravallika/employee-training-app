### Employee Training App

Employee Training management application

### Project structure

The app follows Frappe's standard layout. The main Employee Training DocType files are grouped together here:

```text
employee_training_app/
└── employee_training/
    └── doctype/
        └── employee_training/
            ├── employee_training.json       # DocType fields, permissions, and settings
            ├── employee_training.py         # Server-side controller
            ├── employee_training.js         # Form behavior
            ├── employee_training_list.js    # List view behavior
            └── test_employee_training.py    # Automated tests
```

Other important app files:

- `employee_training_app/hooks.py` — Frappe app hooks and configuration.
- `employee_training_app/modules.txt` — registers the app's modules.
- `pyproject.toml` — Python project and tooling configuration.
- `.github/workflows/` — GitHub Actions checks.

The outer `employee_training_app/` directory is the Python package. Keep DocType files in the standard `module/doctype/doctype_name/` location so Frappe can discover and install them.

### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch n
bench install-app employee_training_app
```

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/employee_training_app
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:

- ruff
- eslint
- prettier
- pyupgrade

### License

mit

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 150],
    "scope-case": [2, "never", ["kebab-case"]],
    "subject-case": [2, "never", ["pascal-case", "upper-case"]],
    "type-case": [2, "always", "lower-case"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "ci",
        "chore",
        "docs",
        "feat",
        "fix",
        "wip",
        "merge",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "hotfix",
      ],
    ],
  },
};

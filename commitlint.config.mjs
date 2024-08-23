/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [2, "always"],
    "type-enum": [2, "always"],
    "type-case": [2, "always"],
    "subject-case": [2, "always"],
    "subject-empty": [2, "always"],
    "subject-full-stop": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "type-empty": ({ type }) => {
          return [type && type.trim() !== "", "Commit type must be specified."]
        },
        "type-enum": ({ type }) => {
          return [commitType.includes(type), "Commit type is invalid."]
        },
        "type-case": ({ type }) => {
          return [/^[a-z]+$/.test(type), "Commit type should be lowercase."]
        },
        "subject-case": ({ subject }) => {
          return [
            /^[A-Z]/.test(subject),
            "Commit message must be in sentence case.",
          ]
        },
        "subject-empty": ({ subject }) => {
          return [
            subject && subject.trim() !== "",
            "Commit message must be specified.",
          ]
        },
        "subject-full-stop": ({ subject }) => {
          return [/\.$/.test(subject), "Commit message must end with a period."]
        },
      },
    },
  ],
}

const commitType = [
  "build",
  "chore",
  "ci",
  "docs",
  "feat",
  "fix",
  "perf",
  "refactor",
  "revert",
  "style",
  "test",
  "setup",
  "add",
  "remove",
  "update",
]

export default config

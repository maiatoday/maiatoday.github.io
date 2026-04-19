# Android CLI Usage Rules

Use the `android` command-line tool for the following tasks related to Android development and device interaction.

## 1. Project Management
- **`android create`**: Use to scaffold a new Android project from a template. 
  - *Example*: `android create --name="My App" --minSdk=24`
- **`android describe`**: Use to analyze an existing project's structure and locate build artifacts (like APKs).

## 2. Emulator & Device Interaction
- **`android emulator`**: Use to manage Android Virtual Devices (AVDs).
  - `list`: View available emulators.
  - `create`: Create a new virtual device.
  - `start`/`stop`: Manage emulator lifecycle.
- **`android run`**: Use to deploy APKs to a connected device or emulator and optionally start a specific activity.
- **`android screen capture`**: Use to take a screenshot of the current device screen.
- **`android screen resolve`**: Use for visual targeting of UI elements.

## 3. UI & Layout Analysis
- **`android layout`**: Use to dump the current UI hierarchy.
  - Useful for debugging layout issues or identifying element IDs/bounds.
  - Use `--diff` to see what changed since the last dump.

## 4. SDK & Environment
- **`android sdk`**: Use to manage Android SDK packages (install, update, list, remove).
  - *Example*: `android sdk list` or `android sdk install "platforms;android-34"`
- **`android info`**: Use to check the current environment configuration, such as SDK location.
- **`android init`**: Run this to set up the Android CLI environment and initialize skills.

## 5. Documentation & Help
- **`android docs search`**: Use to search official Android documentation from the CLI.
- **`android help [command]`**: Use to get detailed flag information for any sub-command.

## 6. Maintenance & Extensions
- **`android update`**: Use to update the `android` CLI tool itself.
- **`android skills`**: Use to manage additional "skills" (plugins) that extend the CLI's functionality.

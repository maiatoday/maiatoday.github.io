# Hugo CLI Usage Rules

Use the `hugo` command-line tool for site generation, development, and content management.

## 1. Local Development
- **`hugo server`**: Start a local development server with live reloading (default: http://localhost:1313/).
- **`hugo server -D`**: Include content marked as `draft: true`.
- **`hugo server -F`**: Include content with publish dates in the future.
- **`hugo server --buildExpired`**: Include content that has expired.

## 2. Content Creation
- **`hugo new [path]`**: Create new content using a defined archetype.
  - *Example*: `hugo new post/my-new-post.md`
- **`hugo list [all|drafts|future|expired]`**: List content files by status.

## 3. Site Generation
- **`hugo` / `hugo build`**: Build the entire static site into the `public/` directory (or specified destination).
- **`--minify`**: Minify output formats (HTML, XML, etc.) for production.
- **`--gc`**: Enable garbage collection to remove unused cache files after the build.

## 4. Module & Theme Management
- **`hugo mod init`**: Initialize a new Hugo module.
- **`hugo mod get [module]`**: Add or update modules (like themes).
- **`hugo mod tidy`**: Remove unused modules.

## 5. Configuration & Environment
- **`hugo config`**: Display the current project configuration.
- **`hugo env`**: Display version and environment information.
- **`hugo version`**: Display the current version of Hugo.

## 6. Maintenance & Utilities
- **`hugo convert`**: Convert front matter between formats (e.g., TOML to YAML).
- **`hugo gen`**: Generate documentation or syntax highlighting styles.

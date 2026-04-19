This is a repository for a hugo based website.
It uses the [Stack](https://github.com/CaiJimmy/hugo-theme-stack) theme by Jimmy Cai 
To test the site, run the hugo command line server in the background and open a web page at the localhost url reported by the server.

## Hugo Usage Rules

Use the `hugo` CLI tool for the following tasks related to site generation and development:

- **Build the Site**: Run `hugo` or `hugo build` to generate the static files in the `public/` directory.
- **Local Development**: Use `hugo server` to start a local development server with live reloading.
    - Use `-D` to include content marked as `draft: true`.
    - Use `-F` to include content with a future publish date.
- **Create New Content**: Use `hugo new <path>` to scaffold new posts or pages using archetypes.
    - *Example*: `hugo new post/my-new-post.md`
- **Manage Modules**: Use `hugo mod` commands (like `hugo mod get`, `hugo mod tidy`) to manage Hugo modules and themes.
- **Check Configuration**: Use `hugo config` to display the current project configuration.
- **Environment Info**: Use `hugo env` to see the current Hugo version and environment details.

# Release Notes

## Version 0.3.0

### Bugs
* Fixed About.md URL.
* Fixed incorrect license being displayed.
* Removed duplicated header.
* Fixed not every page having its own page title.

### Changes
* Updated project version number.
* Wrapping license in `<pre>`.
* Using flex layout to stick footer to the bottom.
* Made the footer more responsive (read; small screen friendly).
* Muted all footer text.
* Disabled browser suggestion to translate pages.

### Technical
* Restructured components.

## Version 0.2.0
* Modified how codeblocks from fetched `Readme.md` markdown are highlighted:
   * Now as per **Microsoft Visual Studio** syntax highlighter.
   * Added a `React.Component` for the **Readme** and increased spacing inside the rendered HTML.
* Improved responsive layout (for small screen browsers).
* Added footer to the project website, containing:
   * Copyright notice of EQX Media B.V.
   * Link to the **GitHub** repository of the project website.
* Restructured a lot under the hood:
   * Making more use of seperation of logic.
   * Use `React.Component` at more occassions.

## Version 0.1.0
* Minimal valuable version of project website:
   * Added **Home** page.
   * Added **Install** page.
* Displaying `EQXMedia.TxFileSystem` package info, using:
   * **Web API** being a middleware API for several **NuGet API** calls.
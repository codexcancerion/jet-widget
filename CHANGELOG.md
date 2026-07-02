# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-07-02

### Added
- Introduced a cyclic attraction popup bubble beside the launcher button to attract user attention.
- Added optional `attraction-message` attribute to customize the text of the attraction popup.
- Added optional `show-attraction` attribute to enable/disable the attraction popup behavior entirely.

### Fixed
- Fixed layout alignment of multi-line attraction messages by using a flexbox layout and text-align left.
- Resolved issue where string `"false"` for `show-attraction` was still evaluated as true by Lit's default Boolean converter.

## [0.1.0] - 2026-07-02

### Added
- Created embeddable `OnyxChatWidget` custom element using Lit.
- Integrated Lucide icons for rich UI aesthetics.
- Added support for KCP AI Assistant configuration.
- Introduced configuration parsing and markdown rendering support.
- Designed an interactive empty state for initial user interaction.
- Supported session persistence to survive page reloads.

### Changed
- Improved chat widget styles and message bubble designs.
- Optimised overall widget performance and load time.

### Refactored
- Cleaned up widget structure and split code into subdirectories (`services`, `utils`, `styles`, `types`, `config`) for improved maintainability.
- Removed deprecated implementations from `widget.ts`.

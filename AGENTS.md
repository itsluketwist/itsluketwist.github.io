# Agent Instructions

Personal academic homepage for Lukas Twist (https://www.lukastwist.com/), built with Jekyll
on the [Minimal Light](https://github.com/yaoyao-liu/minimal-light) theme and hosted on
GitHub Pages. The site is data-driven: almost all content updates happen in `_data/*.yml`
and `assets/`, not in the HTML/Liquid templates.

## Repo layout

- `_data/publications.yml` — all papers, in three sections:
  - `main`: accepted, peer-reviewed, first-author papers (newest first).
  - `preprint`: first-author arXiv preprints (newest first).
  - `side`: short papers and side projects (mark `not_first_author: true` where relevant;
    add `highlight: true` to show the venue in the homepage badge line).
- `_data/news.yml` — news items, newest first.
- `_data/experience.yml` — positions and education.
- `assets/bibtex/*.txt` — one BibTeX file per paper (plain text so they render in-browser).
- `assets/posters/*.pdf` — posters, named `<venue>-<paper-slug>.pdf`.
- `index.md` — homepage content, including the auto-generated
  "First-author publications at:" badge line.
- `_includes/`, `_layouts/`, `_sass/` — templates and styling; rarely need changes.
- `_site/` — build output, gitignored, never edit.

## Common tasks

### New arXiv preprint

1. Add an entry at the top of the `preprint` section of `_data/publications.yml`, with
   `main: arXiv preprint, <Month> <Year>` as the venue line.
2. Create `assets/bibtex/arxiv-<paper-slug>.txt` (see BibTeX conventions below).
3. Add a news item at the top of `_data/news.yml`:
   `"New preprint on arXiv: <i>Full Paper Title</i>."` with the arXiv abs URL.

### Paper accepted at a venue

1. Move the entry from `preprint` to the top of the `main` section.
2. Change its venue line to the full proceedings name with the short name in parentheses,
   e.g. `main: Proceedings of the 2026 Conference on Empirical Methods in Natural Language
   Processing (EMNLP '26)`. The `(VENUE 'YY)` parenthetical is required — the homepage
   badge line extracts the short venue name from it.
3. Replace `assets/bibtex/arxiv-<slug>.txt` with `<venue>-<slug>.txt` (delete the old
   file), converting the entry from `@article` to `@inproceedings`.
4. Update the `bibtex:` path in `_data/publications.yml`.
5. Add a news item: `"Paper accepted to <b>VENUE YYYY</b>: <i>Full Paper Title</i>."`,
   linking to the arXiv page (or proceedings page once it exists).
6. Verify the venue's location and dates (web search) rather than guessing them for the
   BibTeX `location` and `month` fields.

### Proceedings published (camera-ready follow-up)

1. In `_data/publications.yml`: add `url:` (ACL Anthology / ACM DL / publisher page) and
   point `pdf:` at the official proceedings PDF instead of arXiv.
2. In the BibTeX file: update `url` to the proceedings page and add `doi`, `pages`, and
   `isbn` when available.

### Presented a poster

1. Add the PDF to `assets/posters/` as `<venue>-<paper-slug>.pdf`.
2. Add/update the `poster:` field on the paper's entry.
3. Add a news item: `"Presented a poster at <b>VENUE YYYY</b>: <i>Full Paper Title</i>."`.

### Other news (invitations, affiliations, attendance)

Add to the top of `_data/news.yml`; venue/organisation names in `<b>`, paper titles in
`<i>`, `url:` optional.

## Conventions

### publications.yml entries

- Authors: HTML string with the site owner bolded and non-breaking spaces within names,
  e.g. `<b>Lukas&nbsp;Twist</b>, Mark&nbsp;Harman &&nbsp;Jie&nbsp;M.&nbsp;Zhang`.
- Link fields (all optional, rendered as buttons in this order):
  `url`, `arxiv`, `pdf`, `code`, `data`, `library`, `bibtex`, `poster`.
- The paper title links to `url` if present, otherwise `arxiv`.

### BibTeX files

Follow the style of `assets/bibtex/acl-llm-code-bias.txt`:

- Filename: `<venue>-<paper-slug>.txt` for published papers, `arxiv-<paper-slug>.txt`
  for preprints.
- Citation key: `twist<PaperSlug><Year>` (camel case).
- Title double-braced: `title = {{...}}`; authors as `Last, First and Last, First ...`
  in the paper's author order.
- Preprints are `@article` with `journal = {{arXiv preprint arXiv:XXXX.XXXXX}}`,
  `publisher = {arXiv}`, and the arXiv DOI.
- Published papers are `@inproceedings` with `booktitle`, `location`, `year`, `month`
  (the month the conference takes place), `publisher`, then `doi`/`url`/`pages`/`isbn`
  once the proceedings exist.
- Trailing comma on every field line.

### Homepage badge line

The "First-author publications at:" line in `index.md` is generated automatically from
every `main` publication plus any `side` publication with `highlight: true` — do not
hard-code venues there.

## Checking changes

Build with `bundle exec jekyll build` and inspect `_site/index.html` (there is no test
suite). YAML can be sanity-checked with
`ruby -ryaml -e 'YAML.load_file("_data/publications.yml")'`.

## Commits

Short imperative subject lines ending with a period, matching the existing history,
e.g. `Add news.`, `Update paper information.`. Only commit when asked.

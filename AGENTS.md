# Agent Instructions

Personal academic homepage for Lukas Twist (https://www.lukastwist.com/), built with Jekyll
on the [Minimal Light](https://github.com/yaoyao-liu/minimal-light) theme and hosted on
GitHub Pages. The site is data-driven: almost all content updates happen in `_data/*.yml`
and `assets/`, not in the HTML/Liquid templates.

## Repo layout

- `_data/publications.yml` — all papers, in four sections, rendered in this order:
  - `main`: accepted, peer-reviewed, first-author long papers (newest first).
  - `short`: accepted, peer-reviewed, first-author short papers (newest first), same
    fields as `main`, including the `(VENUE 'YY)` parenthetical.
  - `preprint`: first-author arXiv preprints (newest first), shown in a collapsed list.
  - `side`: side projects and collaborations (newest first), shown in a collapsed list
    with a short `where:` venue (mark `not_first_author: true` where relevant).
- `_data/news.yml` — news items, newest first.
- `_data/attending.yml` — events to attend (newest first), shown as a banner while on.
- `_data/experience.yml` — positions and education. Reviewer roles list their `venues:`
  as `name:` plus an optional `full:` name, which is shown as a hover tooltip.
- `assets/bibtex/*.txt` — one BibTeX file per paper (plain text so they render in-browser).
- `assets/posters/*.pdf` — posters, named `<venue>-<paper-slug>.pdf`.
- `assets/graphics/*.png` — acceptance graphics linked from news items, named
  `<venue>-<paper-slug>.png`.
- `_posts/YYYY-MM-DD-<slug>.md` — blog posts, rendered with `_layouts/post.html` (single
  column, bio at the bottom instead of the sidebar) at `/blog/<slug>/`, and listed on the
  homepage under "Blog" (`_includes/blog.md`, hidden while there are no posts).
- `index.md` — homepage main content (about, news, publications, experience).
- `_layouts/homepage.html` — page layout, including the left-hand sidebar (photo, name,
  social links) and the auto-generated "First-author publications:" badge line.
- `_includes/`, `_layouts/`, `_sass/` — templates and styling; rarely need changes.
- `_site/` — build output, gitignored, never edit.

## Common tasks

### New arXiv preprint

1. Add an entry at the top of the `preprint` section of `_data/publications.yml`, with
   `main: arXiv preprint, <Month> <Year>` as the venue line.
2. Create `assets/bibtex/arxiv-<paper-slug>.txt` (see BibTeX conventions below).
3. Add a news item at the top of `_data/news.yml`:
   `"New preprint on arXiv: <i>Full Paper Title</i>."` with the arXiv abs URL.
4. Update the paper's local code repository (see "Project repositories" below).

### Paper accepted at a venue

1. Move the entry from `preprint` to the top of the `main` section.
2. Change its venue line to the full proceedings name with the short name in parentheses,
   e.g. `main: Proceedings of the 2026 Conference on Empirical Methods in Natural Language
   Processing (EMNLP '26)`. The `(VENUE 'YY)` parenthetical is required — the sidebar
   badge line extracts the short venue name from it.
3. Replace `assets/bibtex/arxiv-<slug>.txt` with `<venue>-<slug>.txt` (delete the old
   file), converting the entry from `@article` to `@inproceedings`.
4. Update the `bibtex:` path in `_data/publications.yml`.
5. Add a news item: `"Paper accepted to <b>VENUE YYYY</b>: <i>Full Paper Title</i>."`,
   with `graphic: ./assets/graphics/<venue>-<paper-slug>.png` instead of a `url:` (the
   news item then links to the acceptance graphic). Name the graphic to match the BibTeX
   slug; if there is no graphic yet, link to the arXiv page with `url:` instead.
6. Verify the venue's location and dates (web search) rather than guessing them for the
   BibTeX `location` and `month` fields.
7. Update the paper's local code repository (see "Project repositories" below).

### Proceedings published (camera-ready follow-up)

1. In `_data/publications.yml`: add `url:` (ACL Anthology / ACM DL / publisher page) and
   point `pdf:` at the official proceedings PDF instead of arXiv.
2. In the BibTeX file: update `url` to the proceedings page and add `doi`, `pages`, and
   `isbn` when available. Add `publisher` too if it was left out at acceptance.
3. Check the sidebar badge line: each venue links to the paper's `url`, falling back to
   `arxiv`, so adding `url:` in step 1 switches it to the proceedings page. After
   building, confirm the venue link in `_site/index.html` points at the proceedings
   rather than arXiv.
4. Update the paper's local code repository (see "Project repositories" below).

### Presented a poster

1. Add the PDF to `assets/posters/` as `<venue>-<paper-slug>.pdf`. If it replaces an
   older poster for the same paper, delete the old PDF.
2. Set the PDF's title metadata to the paper title, exactly as in `publications.yml`.
   Affinity exports use the document's file name (e.g. `poster-showcase`), and the posters
   ask viewers to show the title in the browser tab. Use `pypdf`
   (`PdfWriter(clone_from=...)`) and update both the info dictionary's `/Title` and the
   XMP `dc:title`. Write to a temporary copy first and check that it renders the same as
   the original before replacing it. Redo this every time the poster is re-exported.
3. Add/update the `poster:` field on the paper's entry.
4. Add a news item: `"Presented at <b>VENUE YYYY</b>: <i>Full Paper Title</i>."`, with the
   paper's `url:` (proceedings page) when it has one.

### New blog post

1. Save the post as `_posts/YYYY-MM-DD-<slug>.md` with front matter `title:` (and an
   optional one-line `description:` for search engines, otherwise the first paragraph is
   used). The layout, URL and homepage listing are set automatically.
   Don't add a `# Title` heading in the body, the layout shows the title. An optional
   `code:` (URL) adds a Code button under the date.
2. Every post needs a BibTeX file at `assets/bibtex/blog/<slug>.txt` (kept apart from
   the paper BibTeX files), which adds the BibTeX and Reference buttons. The layout finds
   it from the post's file name; local builds show a red "Missing ..." note if it isn't
   there. It is a `@misc` with citation key `twist<PostSlug><Year>`,
   `howpublished = {Blog post}` and the post's full URL; set its `month` to the publish
   month.
3. Put the post's images in `assets/blog/<slug>/` and link them with absolute paths
   (`/assets/blog/<slug>/figure.png`), since posts are served from `/blog/<slug>/`.

To check a post on the live site before announcing it, add `unlisted: true` to its front
matter: it is published at its URL but left off the homepage list and out of search
engines (`noindex`). Remove the line to publish it properly.

Work-in-progress posts go in `_drafts/<slug>.md` (no date, never published); preview
them locally with `bundle exec jekyll serve --drafts`.

### Other news (invitations, affiliations, attendance)

Add to the top of `_data/news.yml`; venue/organisation names in `<b>`, paper titles in
`<i>`, `url:` optional. News items are past tense, e.g. `"Served as a student volunteer
at <b>ICSE 2026</b> (City, Country)."` (use "served as" for roles, "attended" only for
plain attendance).

As soon as a trip is planned, add it to the top of `_data/attending.yml`
(`text:` kept simple, just the event and place, e.g.
`"Attending <b>EMNLP 2026</b> (Budapest, Hungary)."`, plus quoted `start:` and `end:`
dates, `"YYYY-MM-DD"`, verified rather than guessed). The browser shows the first
matching event as a banner under the about section from 2 days before `start:` until
the day after `end:`, so past events can be left in place.

### Project repositories

Whenever a paper's publication details change (new preprint, acceptance, proceedings),
updating its code repository is part of the task when a local clone exists:

1. Find the clone by its git remote, not its folder name (they can differ, e.g.
   `~/code/thinkguard` holds `itsluketwist/thinkpack`): run
   `for d in ~/code/*/; do echo "$d $(git -C "$d" remote get-url origin)"; done` and match
   the paper's `code:` link. If there is no clone, say so instead of quietly skipping it.
2. In the README, update the intro sentence's paper link and wording (e.g. "accepted to"
   becomes "published in", linking to the proceedings page), and add a proceedings badge
   next to the arXiv badge (shields.io needs `--` for a literal hyphen and `%2F` for a
   slash, e.g. `ACL_Anthology-2026.emnlp--main.78-ED1C24` or
   `ACM_DL-10.1145%2F3793302.3793562-0085CA` with `&logo=acm`).
3. Make the BibTeX block match `assets/bibtex/<file>.txt` exactly, and use the
   publisher's own reference text where it gives one (e.g. the Anthology's "Cite (ACL)"
   line).
4. Grep the repo for the arXiv ID and citation key to find other copies, such as Hugging
   Face or PyPI READMEs. These only go live on the project's next release, so tell the
   user rather than releasing.
5. Don't commit or push in that repository unless asked.

## Conventions

### publications.yml entries

- Authors: HTML string with the site owner bolded and non-breaking spaces within names,
  e.g. `<b>Lukas&nbsp;Twist</b>, Mark&nbsp;Harman &&nbsp;Jie&nbsp;M.&nbsp;Zhang`.
- Link fields (all optional, rendered as buttons in this order):
  `url`, `arxiv`, `pdf`, `code`, `data`, `library`, `bibtex`, `poster`.
- The paper title links to `url` if present, otherwise `arxiv`.
- `core_rank`: the venue's ICORE rank (e.g. `"A*"`), shown as a hover tooltip on the
  venue name in the publication list and on the venue link in the sidebar badge line.
  Set it when a paper is accepted, verifying the rank at
  https://portal.core.edu.au/conf-ranks/ rather than guessing; omit for preprints and
  unranked venues. The ranking year ("ICORE 2026") is hard-coded in
  `_includes/pub-row.html`, `_includes/publications.md` and `_layouts/homepage.html` —
  update it there when new rankings are released.

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
  once the proceedings exist. If the publisher isn't certain yet, leave `publisher` out
  until the proceedings are published rather than guessing.
- Trailing comma on every field line.

### Sidebar badge line

The "First-author publications:" line sits in the left-hand sidebar, underneath the
photo, name and social links (`_layouts/homepage.html`, styled by `.pub-venues` in
`_sass/`). It is generated automatically from every `main` publication followed by
every `short` publication, shown at most two venues per line (dot-separated
within a line), and each venue link shows its `core_rank` as a hover tooltip — do not
hard-code venues or ranks there.

## Checking changes

Build with `bundle exec jekyll build` and inspect `_site/index.html` (there is no test
suite). YAML can be sanity-checked with
`ruby -ryaml -e 'YAML.load_file("_data/publications.yml")'`.

## Commits

Short imperative subject lines ending with a period, matching the existing history,
e.g. `Add news.`, `Update paper information.`. Only commit when asked.

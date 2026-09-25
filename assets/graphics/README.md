<!-- describes the conference acceptance graphics and their news links. -->
# Conference acceptance graphics

Store graphics as `<venue>-<paper-slug>.png`, matching the paper slug used in
`assets/bibtex/`.

- [NeurIPS — Reasoning-Trace Collapse](neurips-reasoning-collapse.png)
- [EMNLP — Library Hallucinations in LLM-Generated Code](emnlp-realistic-library-hallucinations.png)
- [ACL — A Study of LLMs' Preferences for Libraries and Programming Languages](acl-llm-code-bias.png)
- [MSR — A Study of Library Usage in Agent-Authored Pull Requests](msr-agent-library-usage.png)

To link a graphic from an acceptance announcement, add
`graphic: ./assets/graphics/<venue>-<paper-slug>.png` to its entry in
`_data/news.yml`. The news item shows an image icon linking to the graphic in place
of its usual arXiv or website icon.

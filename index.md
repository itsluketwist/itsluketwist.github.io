---
layout: homepage
---

## About Me <img src="assets/favicon.png" alt="Icon" style="display: inline; width: 20px; height: 20px;">

Hey 👋 I'm Luke, a PhD student at [King's College London](https://www.kcl.ac.uk/), 
studying in the CDT for [Safe & Trusted AI](https://safeandtrustedai.org/), 
under the supervision of [Dr Jie M. Zhang](https://sites.google.com/view/jie-zhang/home) and [Dr Helen Yannakoudakis](https://www.kcl.ac.uk/people/helen-yannakoudakis).

With over **8** years of industry experience in software engineering and technical leadership roles,
I’m passionate about harnessing artificial intelligence to transform software engineering - 
bridging real‑world expertise with cutting‑edge research to build systems that are safe, 
robust, innovative, and genuinely useful.

If you’re a researcher or practitioner working in these areas and are interested in collaborating, I’d love to connect — reach out via <span class="copy-email">email 📨</span>.

<!-- one-line list of venues with first-author publications, built from the publications data -->
<!-- includes all main publications, plus any side publications marked with highlight: true -->
<div>
  <b>First-author publications at:</b>&nbsp;
  {%- assign side_highlights = site.data.publications.side | where: "highlight", true -%}
  {%- for link in site.data.publications.main -%}
  {%- assign venue_short = link.main | split: "(" | last | remove: ")" -%}
  {%- assign paper_url = link.url | default: link.arxiv -%}
  <a href="{{ paper_url }}" target="_blank"><b>{{ venue_short }}</b></a>
  {%- unless forloop.last and side_highlights == empty %}&nbsp;·&nbsp;{% endunless -%}
  {%- endfor -%}
  {%- for link in side_highlights -%}
  {%- assign paper_url = link.url | default: link.arxiv -%}
  <a href="{{ paper_url }}" target="_blank"><b>{{ link.where }}</b></a>
  {%- unless forloop.last %}&nbsp;·&nbsp;{% endunless -%}
  {%- endfor -%}
</div>

<br>

## Research Interests

<div style="padding-left: 15px;">
  <div style="margin-bottom: 8px;"><i class="fas fa-angle-right" style="margin-right: 8px;color:#e65100;"></i><b>LLM Code Generation (LLM4Code)</b></div>
  <div style="margin-bottom: 8px;"><i class="fas fa-angle-right" style="margin-right: 8px;color:#e65100;"></i><b>LLM Code Hallucinations</b></div>
  <div><i class="fas fa-angle-right" style="margin-right: 8px;color:#e65100;"></i><b>LLM Reasoning & Coding Intelligence</b></div>
</div>

<br>

{% include_relative _includes/news.md %}

{% include_relative _includes/publications.md %}

{% include_relative _includes/experience.md %}

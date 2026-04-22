<h2 id="publications" style="margin: 2px 0px -15px;">Publications</h2>

<div class="publications">

{% for link in site.data.publications.main %}

<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      {% assign title_url = link.url | default: link.arxiv %}
      {% if title_url %}
      <div class="title"><a href="{{ title_url }}" target="_blank">{{ link.title }}</a></div>
      {% else %}
      <div class="title">{{ link.title }}</div>
      {% endif %}
      <div class="author">{{ link.authors }}</div>
      {% if link.workshop %} 
      <div class="periodical"><em>{{ link.workshop }}, at the {{link.main }}.</em></div>
      {% else %}
      <div class="periodical"><em>{{ link.main }}.</em></div>
      {% endif %}
      
    <div class="links">
      {% if link.url %} 
      <a href="{{ link.url }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Online</a>
      {% endif %}
      {% if link.arxiv %} 
      <a href="{{ link.arxiv }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">arXiv</a>
      {% endif %}
      {% if link.pdf %} 
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.code %} 
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.data %} 
      <a href="{{ link.data }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Dataset</a>
      {% endif %}
      {% if link.bibtex %} 
      <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTeX</a>
      {% endif %}
      {% if link.poster %} 
      <a href="{{ link.poster }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Poster</a>
      {% endif %}
      {% if link.notes %} 
      <strong><i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %} 
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
<br>

{% endfor %}

<b><i>Short papers and side projects</i></b> <a id="side-toggle" href="javascript:void(0);" title="Show" onclick="
  var extra = document.getElementById('side-pubs');
  var toggle = document.getElementById('side-toggle');
  var ellipsis = document.getElementById('side-ellipsis');
  if (extra.style.display === 'none') {
    extra.style.display = 'block';
    if (ellipsis) ellipsis.style.display = 'none';
    toggle.innerHTML = '<i class=\'fas fa-circle-minus\'></i>';
    toggle.title = 'Hide';
  } else {
    extra.style.display = 'none';
    if (ellipsis) ellipsis.style.display = 'block';
    toggle.innerHTML = '<i class=\'fas fa-circle-plus\'></i>';
    toggle.title = 'Show';
  }
" style="font-size:1rem;font-weight:normal;text-decoration:none;vertical-align:middle;margin-left:4px;"><i class="fas fa-circle-plus"></i></a>

<div id="side-ellipsis" style="padding-left:20px;color:#999;">...</div>

<div id="side-pubs" style="display:none;">

{% for link in site.data.publications.side %}

<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      {% assign title_url = link.url | default: link.arxiv %}
      {% if title_url %}
      <div class="sidetitle"><a href="{{ title_url }}" target="_blank">{{ link.title }}</a>{% if link.not_first_author %}<span style="color:#ffb81c;">*</span>{% endif %} - <i>{{ link.where }}</i></div>
      {% else %}
      <div class="sidetitle">{{ link.title }}{% if link.not_first_author %}<span style="color:#ffb81c;">*</span>{% endif %} - <i>{{ link.where }}</i></div>
      {% endif %}
      
    <div class="links">
      {% if link.url %} 
      <a href="{{ link.url }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Online</a>
      {% endif %}
      {% if link.arxiv %} 
      <a href="{{ link.arxiv }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">arXiv</a>
      {% endif %}
      {% if link.pdf %} 
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.code %} 
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.data %} 
      <a href="{{ link.data }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Dataset</a>
      {% endif %}
      {% if link.bibtex %} 
      <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTex</a>
      {% endif %}
      {% if link.poster %} 
      <a href="{{ link.poster }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Poster</a>
      {% endif %}
      {% if link.notes %} 
      <strong> <i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %} 
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>

{% endfor %}

<div style="padding-left:20px;"><small><span style="color:#ffb81c;">*</span> not first author</small></div>

</div>

<br>
<br>

<!-- <b><i>Blog posts:</i></b>

<br>

{% for link in site.data.publications.blog %}

<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="sidetitle"><a href="{{ link.url }}"  target="_blank">{{ link.title }}</a></div>
      <i>{{ link.where }}, {{ link.date }}</i>
  </div>
</div>

{% endfor %}

<br> -->

</div>

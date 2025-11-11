<h2 id="publications" style="margin: 2px 0px -15px;">Publications</h2>

<div class="publications">

{% for link in site.data.publications.main %}

<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ link.pdf }}"  target="_blank">{{ link.title }}</a></div>
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
      {% if link.pdf %} 
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.code %} 
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
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
<br>

{% endfor %}

</div>

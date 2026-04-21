<h2 id="news" style="margin: 2px 0px -15px;">News{% if site.data.news.main.size > 4 %} <a id="news-toggle" href="javascript:void(0);" title="Show more" onclick="
  var extra = document.getElementById('news-extra');
  var toggle = document.getElementById('news-toggle');
  var ellipsis = document.getElementById('news-ellipsis');
  if (extra.style.display === 'none') {
    extra.style.display = 'block';
    if (ellipsis) ellipsis.style.display = 'none';
    toggle.innerHTML = '<i class=\'fas fa-circle-minus\'></i>';
    toggle.title = 'Show less';
  } else {
    extra.style.display = 'none';
    if (ellipsis) ellipsis.style.display = 'block';
    toggle.innerHTML = '<i class=\'fas fa-circle-plus\'></i>';
    toggle.title = 'Show more';
  }
" style="font-size:1rem;font-weight:normal;text-decoration:none;vertical-align:middle;margin-left:4px;"><i class="fas fa-circle-plus"></i></a>{% endif %}</h2>

<div class="publications">

{% assign news_items = site.data.news.main %}
{% assign news_limit = 4 %}

{% for item in news_items limit: news_limit %}
<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
    <div class="role">
      <em style="color:#ffb81c;">{{ item.date }}</em> &mdash; {{ item.text }}
      {% if item.url contains "arxiv.org" %}
        <a href="{{ item.url }}" target="_blank" style="text-decoration:none;"><i class="ai ai-arxiv" style="font-size:1rem;"></i></a>
      {% elsif item.url %}
        <a href="{{ item.url }}" target="_blank" style="text-decoration:none;"><i class="fas fa-globe" style="font-size:0.85rem;"></i></a>
      {% endif %}
    </div>
  </div>
</div>
{% endfor %}

{% if news_items.size > news_limit %}
<div id="news-ellipsis" style="padding-left:20px;color:#999;">...</div>

<div id="news-extra" style="display:none;">
{% for item in news_items offset: news_limit %}
<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
    <div class="role">
      <em style="color:#ffb81c;">{{ item.date }}</em> &mdash; {{ item.text }}
      {% if item.url contains "arxiv.org" %}
        <a href="{{ item.url }}" target="_blank" style="text-decoration:none;"><i class="ai ai-arxiv" style="font-size:1rem;"></i></a>
      {% elsif item.url %}
        <a href="{{ item.url }}" target="_blank" style="text-decoration:none;"><i class="fas fa-globe" style="font-size:0.85rem;"></i></a>
      {% endif %}
    </div>
  </div>
</div>
{% endfor %}
</div>
{% endif %}

<br>

</div>

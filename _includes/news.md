{% comment %} renders recent news and an expandable list of older announcements {% endcomment %}
{% comment %} how many news items show before the rest are hidden behind the toggle {% endcomment %}
{% assign news_limit = 5 %}
<h2 id="news" style="margin: 2px 0px -15px;">News{% if site.data.news.main.size > news_limit %} <a id="news-toggle" href="javascript:void(0);" title="Show more" onclick="
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

{% comment %} small banner for an event happening now, set by attending in _data/news.yml {% endcomment %}
{% if site.data.news.attending %}
<div class="attending-banner" data-end="{{ site.data.news.attending.end }}">
  <i class="fas fa-location-dot"></i> {{ site.data.news.attending.text }}
</div>
<script>
  // hide the banner once the end date has passed, so it never goes stale if left in the data
  var banner = document.querySelector('.attending-banner');
  if (new Date() > new Date(banner.dataset.end + 'T23:59:59')) banner.remove();
</script>
{% endif %}

{% assign news_items = site.data.news.main %}

{% for item in news_items limit: news_limit %}
<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 15px;">
    <div class="role">
      <em style="color:#e65100;">{{ item.date }}</em> &mdash; {{ item.text }}
      {% include news-link.html item=item %}
    </div>
  </div>
</div>
{% endfor %}

{% if news_items.size > news_limit %}
<div id="news-ellipsis" style="padding-left:15px;color:#999;">...</div>

<div id="news-extra" style="display:none;">
{% for item in news_items offset: news_limit %}
<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 15px;">
    <div class="role">
      <em style="color:#e65100;">{{ item.date }}</em> &mdash; {{ item.text }}
      {% include news-link.html item=item %}
    </div>
  </div>
</div>
{% endfor %}
</div>
{% endif %}

<br>

</div>

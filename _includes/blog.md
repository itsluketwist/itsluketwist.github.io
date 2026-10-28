{% comment %} list of blog posts from _posts/, newest first, only shown once there is at least one listed post {% endcomment %}
{% comment %} posts with "unlisted: true" are live at their url but left out of this list {% endcomment %}
{% assign listed_posts = site.posts | where_exp: "post", "post.unlisted != true" %}
{% if listed_posts.size > 0 %}
## Blog

<div style="padding-left: 15px;">
{% for post in listed_posts %}
  <div style="margin-bottom: 8px;"><em style="color:#e65100;">{{ post.date | date: "%b %Y" }}</em> &mdash; <a href="{{ post.url | relative_url }}">{{ post.title }}</a></div>
{% endfor %}
</div>

<br>
{% endif %}

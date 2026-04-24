<h2 id="publications" style="margin: 2px 0px -15px;">Research Experience</h2>

<div class="publications">

{% for role in site.data.experience.main %}

<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 15px;">
      <div class="role">
        {% if role.organisation %}
          <b>{{ role.title }}</b>, <a href="{{ role.website }}">{{ role.organisation }}</a>
        {% else %}
          <b>{{ role.title }}</b>
        {% endif %}
      </div>
      {% if role.extra %} 
      <div class="extra">
        {{ role.extra }}
      </div>
      {% endif %}
      {% if role.start %} 
        <div class="dates">
          <em>{{ role.start }} - {{ role.end }}</em>
        </div>
      {% endif %}
  </div>
</div>

{% endfor %}

<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 15px;">
    <b><i>Prior Education</i></b> <a id="edu-toggle" href="javascript:void(0);" title="Show" onclick="
  var extra = document.getElementById('edu-list');
  var toggle = document.getElementById('edu-toggle');
  var ellipsis = document.getElementById('edu-ellipsis');
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
  </div>
</div>

<div id="edu-ellipsis" style="padding-left:15px;color:#999;">...</div>

<div id="edu-list" style="display:none;padding-left:15px;">

{% for edu in site.data.experience.education %}

<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 15px;">
    <div class="role">
      <b>{{ edu.title }}</b>, <a href="{{ edu.website }}">{{ edu.organisation }}</a>
    </div>
  </div>
</div>

{% endfor %}

</div>

<br>
<br>

</div>

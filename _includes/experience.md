<h2 id="publications" style="margin: 2px 0px -15px;">Research Experience</h2>

<div class="publications">

{% for role in site.data.experience.main %}

<div class="pub-row">
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="role">
        <b>{{ role.title }}</b>, <a href="{{ role.website }}">{{ role.organisation }}</a>
      </div>
      <div class="dates">
        <em>{{ role.start }} - {{ role.end }}</em>
      </div>
  </div>
</div>

<br>

{% endfor %}

</div>

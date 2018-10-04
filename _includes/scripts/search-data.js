window.TEXT_SEARCH_DATA=[
  {% assign idIndex = 0 %}
  {%- for _collection in site.collections -%}
    {%- unless forloop.first -%},{%- endunless -%}
    {%- for _article in _collection.docs -%}
      {%- unless forloop.first -%},{%- endunless -%}
      {
        'id':'{{ idIndex }}',
        'title':'{{ _article.title | url_encode }}',
        'category':'{{ _article.category | url_encode }}',
        'content':'{{ _article.excerpt | url_encode }}',
        {%- include snippets/prepend-baseurl.html path=_article.url -%}
        {%- assign _url = __return -%}
        'url':'{{ _url | url_encode }}'
      }
      {% assign idIndex = idIndex | plus: 1 %}
    {%- endfor -%}
  {%- endfor -%}
];

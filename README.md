```
<http://ex.org/Pluto> <http://ex.org/type> <http://ex.org/Dog>
<http://ex.org/Mickey> <http://ex.org/name> "Lorem ipsum"@nl
);
```

```
  SELECT * WHERE { 
    ?s ?p ?o .

    OPTIONAL {
      ?s <http://ex.org/name> ?name .
      FILTER(lang(?name) = 'nl')
    }
  }
```

When running the above query on a N3 store with Comunica it gives back only the first triple.
When changing the language in the filter to 'en' it gives back zero results.
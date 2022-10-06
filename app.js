import { Store, DataFactory } from 'https://esm.sh/n3'
const { namedNode, literal, defaultGraph, quad } = DataFactory;
const { QueryEngine } = Comunica

const myEngine = new QueryEngine()

const store = new Store();
store.addQuad(
  namedNode('http://ex.org/Pluto'),
  namedNode('http://ex.org/type'),
  namedNode('http://ex.org/Dog')
);
store.addQuad(
  namedNode('http://ex.org/Mickey'),
  namedNode('http://ex.org/name'),
  literal('Lorem ipsum', 'nl')
);

const bindingsStream = await myEngine.queryBindings(`
  SELECT * WHERE { 
    ?s ?p ?o .

    OPTIONAL {
      ?s <http://ex.org/name> ?name .
      FILTER(lang(?name) = 'nl')
    }
  }
`, {
  sources: [store],
});

const bindings = await bindingsStream.toArray()

console.log(bindings.length)
for (const binding of bindings) {
  console.log(binding.get('s'), binding.get('p'), binding.get('o'))
  // I expected the two bindings.
}


const bindingsStream2 = await myEngine.queryBindings(`
  SELECT * WHERE { 
    ?s ?p ?o .

    OPTIONAL {
      ?s <http://ex.org/name> ?name .
      FILTER(lang(?name) = 'en')
    }
  }
`, {
  sources: [store],
});

const bindings2 = await bindingsStream2.toArray()

console.log(bindings2.length)
for (const binding of bindings2) {
  console.log(binding.get('s'), binding.get('p'), binding.get('o'))
  // I expected the two bindings again.
}
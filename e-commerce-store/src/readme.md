1-8-2021

Container Pattern: 'Component that gets wrapped with all the Higher Order Component it needs, in order to properly run the contained components'
The process of determining whether the collections are loading or not should be handled within the collection components themselves, not within the parent: Shop component. Components should be as dumb as possible, the Shop doesn't need to find out what the collection components need. Because we have multiple components we are going to use "Container Pattern"

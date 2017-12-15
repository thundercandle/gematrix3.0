# Design Notes and Ideas

Different data types need to be modelled in relationship to desired information structure and relationship.  These are notes for that process, as well as possible information models.

## Major questions

How do we organize collections of correspondences?  
Do we use sets only for organizing correspondences into catgegories?

Do we use notebooks for high levels of organization, such as "all numerals", "sephiroth", "paths of wisdom", "planets", etc?

We want to be able to filter easily based on whole collections.  But if we have notebooks, what belong to those notebooks? Do we make each sephiroth, numeral, letter and word capable of being added to a notebook?  This would get very busy if we just listed the contents of a single notebooks.  Though we could organize it all based on object type.

Notebook organization does allow for extendability.  We can use notebooks for all sorts of organizing of the data.  A notebook could be made for a special type of work, such as a pathworking, the exploration of alchemical texts, etc.

## JSON objects

### Letters

```json
{
  "character": "",
  "transliteration": "A",
  "language": "hebrew",
  "pronunciation": "Aleph",
  "meaning": "ox",
  "spelling": "",
  "spellingTransliteration": "ALP",
  "letters": [],
  "value":"1",
  "numeral": "ObjectId1234567890",
  "notebooks": [],
  "correspondences": [],
  "notes": []
}
```

### Notebooks

```json
{
  "notebooks": [
    {
      "title": "sepher sephiroth",

    }
  ]
}
```


## Possible queries

```GraphQL
{
  notebooks {

  }
}
```

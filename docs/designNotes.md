# Design Notes and Ideas

Different data types need to be modelled in relationship to desired information structure and relationship.  These are notes for that process, as well as possible information models.

## Notes

##Primitives

The system has certain root primitive types.  These are owned by a user, but are not associated with notebooks.  These include letters, sephiroth, numerals, sets and correspondences.

### Notebook organization

Notebooks are confined to specific information. Words can be added to a specific notebook, and notes are also stored in specific notebooks.  This way, we can keep track of all the notes a person makes on all the various primitive types without associating those types with a notebook.

One question at this point is whether to have all primitives associated with the notebook through notes, even words.

This would make the data structure look like this:

```javascript
{
  notebook: "Alchemy",
  user: {},
  notes: {
    words: [...],
    sephiroth: [...],
    letters: [...],
    correspondences: [...],
    sets: [...]
  }
}
```

## Major questions

How do we organize collections of correspondences?  
Do we use sets only for organizing correspondences into categories?

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

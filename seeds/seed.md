# Seeding

The core system requires the seeding of the main correspondences, numerals, sephiroth, sets, etc.  This ensures the proper hyperlinking between all elements of the system.

## NOTES
- Names in csv are given in english transliteration system I use.  When parsing to seed, be sure to parse these into hebrew characters for display and storage.  
- Some correspondences may have three forms - english translation, hebrew, transliteration. Figure out if these attributes should also be stored in the correspondence object or as a separate set of correspondences. I lean towards the former because it would be easy to have a global setting, and even a local switch, to determine whether to view hebrew or transliterated english.

- The letters resolver can easily break down a word into its letters and find those letters and return them as an array.  No need to directly populate the database with the letter field.


## TODO

* write letter parser from CSV -> json
* seed Letters
* add letters to numerals
* write script to add unicode string to Words
* add letters to Letters
* add Words for each Letter
* parse all words to add letters in to their ref array
* add a "ref" in all main models for storing references
* create sephiroth table
* seed sephiroth
* add letters to sephiroth spelling
* add ords to Sephiroth
* correspondence table
* turn correspondences into sets and correspondence models

## Divisons needed somehow
divisons needed:
  - Sephiroth
  - 32 Paths of wisdom
  - 22 Hebrew Letters
  - 7 Planets
  - 3/5 Elements
  - 12 Zodiac Signs

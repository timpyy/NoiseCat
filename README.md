# NoiseCat
==================

## Overview:
As an aspiring music producer, it is important that you constantly spend time each day sitting down and recording ideas to be used in a track that you plan to release. However, since you are constantly coming up with new ideas, a common problem that all music producers face is a an extremely cluttered desktop littered with hundreds or even thousands of sound files from all the ideas that you previously recorded. This is where NoiseCat comes in....

NoiseCat is a web application that allows you to catalogue and organize your sound ideas so that you can easily find and retrieve your files at a later date. Users can register and log in, and once they're logged in, they can insert, find, or delete entries containing information about their sound files.

## Data Model:
This application will store Users and Lists.

Sample User:
```javascript
{
  username: "MattyBRaps",
  hash: //password hash,
  lists: //references to list documents
}
```
Sample List with Embedded Items:
```javascript
{
  user: //User Object,
  file_name: "poppin808sWithSnares",
  file_location: "/Desktop/lateNightBeats27/absoluteFireSelections/poppin808sWithSnares.wav",
  tags: ["808s", "Snares", "Skrrrrt", "1stAlbum", "trap"],
  description: "Low-passed Metro-Boomin style 808s with popping snares."
  createdAt: //timestamp
}
```

## Wireframes
Home Page and /add - Home page and page where you can add entries
![home](Documentation/Home_Add.png)

/find - Page where you can find entries by name or tags
![find](Documentation/Find.png)

/list - Page where you can view all your entries as a list. Displayed as a table that you can scroll up and down.
![list](Documentation/List.png)

/list/entry_name - Page that displays information on a particular entry
![entry](Documentation/Entry.png)

## Sitemap
![Map](Documentation/Map.png)

## Use Cases
1. If you are an unregistered user, you can register a new account on the site.
2. As a user, you can log into the site.
3. As a user, you can add new entries describing new sounds that you made.
4. As a user, you can search for entries by specifying the file name or tag.
5. As a user, you can delete entries for sounds that you got rid of.

## Research Topics
MongoDB
Passport.js

## [Link to Initial Main Project File](app.js)

## Annotations
1. [passport.js authentication docs](http://passportjs.org/docs)

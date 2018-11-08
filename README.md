# timpyy-final-project
final-project created for timpyy

#NoiseCat
==================

##Overview:
As an aspiring music producer, it is important that you constantly spend time each day sitting down and recording ideas to be used in a track that you plan to release. However, since you are constantly coming up with new ideas, a common problem that all music producers face is a an extremely cluttered desktop littered with hundreds or even thousands of sound files from all the ideas that you previously recorded. This is where NoiseCat comes in....

NoiseCat is a web application that allows you to catalogue and organize your sound ideas so that you can easily find and retrieve your files at a later date. Users can register and log in, and once they're logged in, they can insert, find, or delete entries containing information about their sound files.

##Data Model:
This application will store Users and Lists.

Sample User:
```javascript
{
  username: "MattyBRaps",
  hash: //password hash,
  lists: //
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

##Wireframes
Home Page and /add - Home page and page where you can add entries
![home](Home_Add.pdf)

/find - Page where you can find entries by name or tags
![find](Find.pdf)

/list - Page where you can view all your entries as a list. Displayed as a table that you can scroll up and down.
![list](List.pdf)

/list/entry_name - Page that displays information on a particular entry
![entry](Entry.pdf)

##Sitemap
![Map](Map.pdf)

##Use Cases
1. If you are an unregistered user, you can register a new account on the site.
2. As a user, you can log into the site.
3. As a user, you can add new entries describing new sounds that you made.
4. As a user, you can search for entries by specifying the file name or tag.
5. As a user, you can delete entries for sounds that you got rid of.

##Research Topics

*(5 points) User Authentication
  *I will be using Passport.js for user authentication.
  *Passport.js is relatively challenging so I assigned it 5 points.
  
*(3 points) React.js as the frontend framework
  *React.js is also a pretty challenging framework so I assigned it 3 points.
  
8 points total out of 8 required points.

## [Link to Initial Main Project File](app.js)

##Annotations
1. [passport.js authentication docs](http://passportjs.org/docs)
2. [react.js docs](https://reactjs.org/docs/getting-started.html)
  

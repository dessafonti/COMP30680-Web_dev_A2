# COMP30680 Web Application Development: Assignment 2: JavaScript & JSON

## Senators Webpage: Overview

This project comprises a **webpage that provides information on members of the US Senate**. This data pertaining to the US Senate and its constituents was retrieved from (www.govtrack.us/); please note that this data is not dynamically updated and thus might not accurately represent the current state of the US Senate.

### Project

As this project was created for an assigment, there were several restrictions and requirements that the project had to accomodate.

### Restrictions & Requirements

The project had to be coded such that:

- The project was composed entirely of **HTML5, CSS3 & Vanilla JavaScript (ES6)**, no other languages were permitted
- The use of frameworks, incl. JavaScript frameworks e.g., JQuery, were not permitted
- The webpage consisted of a single index file named **senators.html**

Upon loading and fully rendering, the webpage had to do and display the following:

- **Requirement 1**
  - Display the total number of senators in each party affiliation
  - Display a list of all the senate members in a leadership capacity: this list needed to group the data by party affiliation
- **Requirement 2**
  - Display all of the senators, with the following information provided for each:
    - Party affiliation
    - Representative state
    - Gender
    - Rank
- **Requirement 3**
  - Implement filters for the information displayed as per **requirement 2**; the filters should allow for the selection of information by:
    - Party affiliation
    - Representative state
    - Rank
- **Requirement 4**
  - Implement a feature that allows the user to select any senator and view further information on said senator; the further information should incl.:
    - Office
    - Date of Birth
    - Start Date
    - Twitter Handle & Youtube Channel (where applicable)
    - External Website Link (redirects to new tab)

### Key Features

There are various means of extracting data from a JSON file; this project implements the **Fetch API** as follows:

```JavaScript
document.addEventListener("DOMContentLoaded", () => {
  fetch("./senators.json")
    .then((response) => response.json())
    .then((data) => {
        //Code to process the JSON and fulfill project specifications goes here.
    }
```

This renders the most important component of the project, _"the use of JavaScript to read, manipulate and present data"_ feasible.

To fulfill **requirements 1, 2 & 3**, the **forEach() iterative method** was used to comb through the senators.json data and process each data point according to the specifications outlined above.

```JavaScript
senators.forEach((senator) => {
        const firstname = senator.person.firstname;
        const lastname = senator.person.lastname;
        const party = senator.party;
        const gender = senator.person.gender_label;
        const rank = senator.senator_rank_label;
        const state = senator.state;
        const startDate = senator.startdate;
        const twitter = senator.twitterid;
        const youtubeid = senator.youtubeid;

        //Use a series of if conditional statements to assess each data point and where (if at all) it should be displayed
         if (partyCounts.hasOwnProperty(party)) {
          partyCounts[party]++;
        }}
```

### How To Use

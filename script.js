//Define function backToTop
//Function that corresponds with button .back-to-top-btn: On click, scroll back to top of webpage
//Title: "Back to Top Button with HTML, CSS and JavaScript", Author: Coding Journey, Date: 13 Jan 2019, Code Version: 5.0, 3.0, ES6, Availability: https://www.youtube.com/watch?v=gphMli74Chk&t=699s
//Title: "Element: scrollTo() method", Author: Mozilla, Date: N/A, Code Version: ES6, Availability:  https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
function backToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

//Define function scrollToBottom
//Function that corresponds with senator selection: On click, scroll to bottom of webpage
//Title:"Scroll Page to Bottom with JavaScript [HowToCodeSchool.com]", Author:  HowToCodeSchool, Date: 2 Jul 2022, Code Version: 5.0, 3.0, ES6, Availability: https://youtu.be/Vh2g1Ug8_Hs?si=407inzGldkfPWeYt
//Title: "Element: scrollTo() method", Author: Mozilla, Date: N/A, Code Version: ES6, Availability:  https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

//Use Fetch API to read JSON file
//Title: "Read JSON File into HTML with JavaScript Fetch API", Author: ByteGrad, Date: 13 Jul 2022, Code Version: ES6, Availability: https://youtu.be/Oage6H4GX2o?si=7kFETDdxkr2Tbhmm
document.addEventListener("DOMContentLoaded", () => {
  fetch("./senators.json")
    .then((response) => response.json())
    .then((data) => {
      //Processing the JSON data
      //Set constant "senators" to data.objects to abstract unnecessary meta data in senators.json file
      const senators = data.objects;

      //Define objects "partyAffiliationData", "leadershipRolesData", "senatorGeneralData" with appropriate properties & initialise their values to either 0, null or empty
      //These objects will be appended and updated with relevant data once senators.json is processed by the successive forEach() method(s)
      let partyAffiliationData = {
        Republican: 0,
        Democrat: 0,
        Independent: 0,
      };

      let leadershipRolesData = {
        Republican: [],
        Democrat: [],
        Independent: [],
      };

      let senatorGeneralData = {
        Republican: [],
        Democrat: [],
        Independent: [],
      };

      //Use the forEach() iterative method to loop through senators and process the data, appending the above objects when appropriate
      //Title: "Array.prototype.forEach()", Author: Mozilla, Date: N/A, Code Version: ES6, Availability:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
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
        const leadershipStatus = senator.leadership_title;

        //Define objects "senatorData", "senatorLeadershipData" with appropriate properties & set their properties with the corresponding variables above
        //Title: "Creating an Object in Javascript", Author: Daragh Ó Tuama (Code Institute), Date: N/A, Code Version: ES6, Availability: https://codeinstitute.net/ie/blog/creating-an-object-in-javascript/
        let senatorData = new Object();
        senatorData.firstname = firstname;
        senatorData.lastname = lastname;
        senatorData.party = party;
        senatorData.gender = gender;
        senatorData.rank = rank;
        senatorData.state = state;
        senatorData.startDate = startDate;
        senatorData.twitter = twitter;
        senatorData.youtubeid = youtubeid;

        let senatorLeadershipData = new Object();
        senatorLeadershipData.leadershipStatus = leadershipStatus;
        senatorLeadershipData.firstname = firstname;
        senatorLeadershipData.lastname = lastname;
        senatorLeadershipData.party = party;

        //Use if conditional statement to assess the party affiliation of senator data point and increment the corresponding property in partyAffiliationData accordingly
        //Title: "Increment (++)", Author: Mozilla, Date: N/A, Code Version: ES6, Availability: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment
        //Title: "Object.prototype.hasOwnProperty()", Author: Mozilla, Date: N/A, Code Version: ES6, Availability: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        if (partyAffiliationData.hasOwnProperty(party)) {
          partyAffiliationData[party]++;
        }

        //Use if conditional statement to assess if leadershipStatus is false or true (if true, control flow allows for creation of the string "senatorLeadershipData" with the respective informartion)
        if (leadershipStatus) {
          leadershipRolesData[party].push(senatorLeadershipData);
        }

        // Use if conditional statement to assess the party affiliation of senator data point
        if (senatorGeneralData.hasOwnProperty(party)) {
          senatorGeneralData[party].push(senatorData);
        }
      });

      //Acquire the DOM elements where we want to display the partyAffiliationsData and assign each DOM element to a variable
      const democratsCounterElement = document.getElementById(
        "party-affiliations-democrats"
      );
      const republicansCounterElement = document.getElementById(
        "party-affiliations-republicans"
      );
      const independentsCounterElement = document.getElementById(
        "party-affiliations-independents"
      );

      //Acquire the DOM elements where we want to display the leadershipRolesData and assign each DOM element to a variable
      const democratsLeadersElement = document.getElementById(
        "senators-leadership-roles-democrats"
      );
      const republicansLeadersElement = document.getElementById(
        "senators-leadership-roles-republicans"
      );
      const independentsLeadersElement = document.getElementById(
        "senators-leadership-roles-independents"
      );

      //Update the innerHTML of senators.html with the senators party counts from partyAffiliationsData
      democratsCounterElement.innerHTML = `Democrats: ${partyAffiliationData.Democrat}`;
      republicansCounterElement.innerHTML = `Republicans: ${partyAffiliationData.Republican}`;
      independentsCounterElement.innerHTML = `Independents: ${partyAffiliationData.Independent}`;

      //Update the innerHTML of senators.html with the senators leadership info from leadershipRolesData
      //Title: "Read JSON File into HTML with JavaScript Fetch API", Author: ByteGrad, Date: 13 Jul 2022, Code Version: ES6, Availability: https://youtu.be/Oage6H4GX2o?si=7kFETDdxkr2Tbhmm
      leadershipRolesData.Democrat.forEach((senator) => {
        democratsLeadersElement.insertAdjacentHTML(
          "beforeend",
          `<li>${senator.leadershipStatus}: ${senator.firstname} ${senator.lastname} (${senator.party})</li>`
        );
      });

      //Add spacing between democratsLeadershipElement and republicansLeadershipElement to improve UI
      democratsLeadersElement.appendChild(document.createElement("br"));

      //Update the innerHTML of senators.html with the senators leadership info from leadershipRolesData
      leadershipRolesData.Republican.forEach((senator) => {
        republicansLeadersElement.insertAdjacentHTML(
          "beforeend",
          `<li>${senator.leadershipStatus}: ${senator.firstname} ${senator.lastname} (${senator.party})</li>`
        );
      });

      //Add spacing between democratsLeadershipElement and republicansLeadershipElement to improve UI
      republicansLeadersElement.appendChild(document.createElement("br"));

      //Update the innerHTML of senators.html with the senators leadership info from leadershipRolesData
      //Title: "Read JSON File into HTML with JavaScript Fetch API", Author: ByteGrad, Date: 13 Jul 2022, Code Version: ES6, Availability: https://youtu.be/Oage6H4GX2o?si=7kFETDdxkr2Tbhmm
      leadershipRolesData.Independent.forEach((senator) => {
        independentsLeadersElement.insertAdjacentHTML(
          "beforeend",
          `<li>${senator.leadershipStatus} ${senator.firstname} ${senator.lastname} (${senator.party})</li>`
        );
      });

      //Acquire the DOM elements for filtering and assign each DOM element to a variable
      const partyFilter = document.getElementById("party-affiliation-filter");
      const stateFilter = document.getElementById("state-filter");
      const rankFilter = document.getElementById("rank-filter");

      const filteredSenatorsContainer =
        document.getElementById("filtered-senators");
      const senatorDetailsContainer =
        document.getElementById("senator-details");

      //Define function showSenatorDetails
      //Configure showSenatorDetails so that upon the webpage loading(when no senator has been selected) the corresponding DOM element is empty
      function showSenatorDetails(senator) {
        senatorDetailsContainer.innerHTML = "";

        //Create anchorlink element to include in senatorDetailsContainer
        const websiteLink = document.createElement("a");
        websiteLink.href = senator.website;
        websiteLink.target = "_blank";
        websiteLink.textContent = "Visit Website";
        websiteLink.id = "website-link";

        //Interpolate HTML containing information pertaining to the selected senator in to senators.html
        senatorDetailsContainer.innerHTML = `
        <h2>${senator.person.firstname} ${senator.person.lastname}</h2>
        <ul>
        <li>Office: ${senator.description}</li>
        <li>Date of Birth: ${senator.person.birthday}</li>
        <li>Start Date: ${senator.startdate}</li>
        <li>YouTube: ${senator.person.youtubeid || "N/A"}</li>
        <li>Twitter: ${senator.person.twitterid || "N/A"}</li>
        </ul>
        `;

        //Interpolate websiteLink pertaining to the selected senator in to senators.html
        senatorDetailsContainer.appendChild(websiteLink);
        scrollToBottom();
      }

      //Define function filterSenators to filter and display senators based on party, state, and rank
      function filterSenators() {
        const selectedParty = partyFilter.value;
        const selectedState = stateFilter.value;
        const selectedRank = rankFilter.value;

        //Initialise (or re-initialse) filteredSenatorsContainer and senatoeDetailsContainer to an empty element
        // cleaning the filtered senators and details containers
        filteredSenatorsContainer.innerHTML = "";
        senatorDetailsContainer.innerHTML = "";

        //Define list "filteredList" with appropriate properties: party, state, and rank
        //Title: "filter Array Method | JavaScript Tutorial", Author: Florin Pop, Date: 3 Apr 2020, Code Version: ES6, Availability: https://www.youtube.com/watch?v=mJGv12UHqXc
        const filteredList = senators.filter((senator) => {
          return (
            (selectedParty === "show-all" || senator.party === selectedParty) &&
            (selectedState === "show-all" || senator.state === selectedState) &&
            (selectedRank === "show-all" ||
              senator.senator_rank_label === selectedRank)
          );
        });

        //Use the forEach() iterative method to loop through senators and process the data, rendering filteredList
        //Title: "Array.prototype.forEach()", Author: Mozilla, Date: N/A, Code Version: ES6, Availability:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
        filteredList.forEach((senator) => {
          const senatorInfo = `${senator.person.firstname} ${senator.person.lastname} (${senator.person.gender}), Rank: ${senator.senator_rank_label}, State: ${senator.state} (${senator.party})`;
          const senatorElement = document.createElement("li");
          senatorElement.textContent = senatorInfo;
          filteredSenatorsContainer.appendChild(senatorElement);

          //Add "click" event listener to each senator li element to render their details in senatorDetailsContainer
          senatorElement.addEventListener("click", () => {
            showSenatorDetails(senator);
          });
        });
      }

      //Configure filterSenators so that upon the webpage loading the default is show all senators
      filterSenators();

      //Add "change" event listener to each filter dropdown to render the list according to selected filter options
      partyFilter.addEventListener("change", filterSenators);
      stateFilter.addEventListener("change", filterSenators);
      rankFilter.addEventListener("change", filterSenators);
    });
});

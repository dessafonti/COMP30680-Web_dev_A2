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

      //Use the forEach() iterative method to loop through senators.json and process the data, appending the above objects when appropriate
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
        if (partyAffiliationData.hasOwnProperty(party)) {
          partyAffiliationData[party]++;
        }

        //Use if conditional statement to assess if leadershipStatus is false or true (if true, control flow allows for creation of the string "senatorLeadershipData" with the respective informartion)
        if (leadershipStatus) {
          //const senatorLeadershipData = `${leadershipStatus}: ${senatorData.firstname} ${senatorData.lastname} (${senatorData.party})`;
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

        senatorDetailsContainer.appendChild(websiteLink);
      }

      //Define function filterSenators to filter and display senators based on party, state, and rank
      function filterSenators() {
        const selectedParty = partyFilter.value;
        const selectedState = stateFilter.value;
        const selectedRank = rankFilter.value;

        // cleaning the filtered senators and details containers
        filteredSenatorsContainer.innerHTML = "";
        senatorDetailsContainer.innerHTML = "";

        // creating a filtered list based on party, state, and rank
        // code reference: "filter Array Method | JavaScript Tutorial" in https://www.youtube.com/watch?v=mJGv12UHqXc
        const filteredList = senators.filter((senator) => {
          return (
            (selectedParty === "show-all" || senator.party === selectedParty) &&
            (selectedState === "show-all" || senator.state === selectedState) &&
            (selectedRank === "show-all" ||
              senator.senator_rank_label === selectedRank)
          );
        });

        // displaying the filtered list
        filteredList.forEach((senator) => {
          const senatorInfo = `${senator.person.firstname} ${senator.person.lastname} (${senator.person.gender}), Rank: ${senator.senator_rank_label}, State: ${senator.state} (${senator.party})`;
          const senatorElement = document.createElement("li");
          senatorElement.textContent = senatorInfo;
          filteredSenatorsContainer.appendChild(senatorElement);

          // adding a click event to each senator list item to display their details
          senatorElement.addEventListener("click", () => {
            showSenatorDetails(senator);
          });
        });
      }

      // setting the initial filtered list to show all senators as default
      filterSenators();

      // setting event listeners for the filters to change the list accordingly to the user options
      partyFilter.addEventListener("change", filterSenators);
      stateFilter.addEventListener("change", filterSenators);
      rankFilter.addEventListener("change", filterSenators);
    });
});

//Function that corresponds with back-to-top-btn: On click, scroll back to top of webpage
// code resouce: "Back to Top Button with HTML, CSS and JavaScript" in https://www.youtube.com/watch?v=gphMli74Chk&t=699s
function backToTop() {
  window.scrollTo(0, 0);
}

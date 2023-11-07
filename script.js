document.addEventListener("DOMContentLoaded", () => {
  fetch("./senators.json")
    .then((response) => response.json())
    .then((data) => {
      // processing the JSON data
      // Set constant "senators" to data.objects to abstract unnecessary meta data in senators.json file
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

      // Use the forEach() iterative method to loop through senators.json and process the data, appending the above objects when appropriate
      senators.forEach((senator) => {
        const party = senator.party;
        const leadershipStatus = senator.leadership_title;

        // check the party affiliation and increment the count accordingly
        if (partyAffiliationData.hasOwnProperty(party)) {
          partyAffiliationData[party]++;
        }

        //check if leadershipStatus is false or true (if true, it creates the string "senatorLeadershipData" with the respective informartion)
        if (leadershipStatus) {
          const senatorLeadershipData = `${leadershipStatus}: ${senator.person.firstname} ${senator.person.lastname} (${senator.party})`;
          leadershipRolesData[party].push(senatorLeadershipData);
        }
      });

      // looping through the array "senator", creates a new object named "senatorData" (with its properties) and then adds it to an array (called "senatorGeneralData") associated with the party
      senators.forEach((senator) => {
        const firstname = senator.person.firstname;
        const lastname = senator.person.lastname;
        const party = senator.party;
        const gender = senator.person.gender_label;
        const rank = senator.senator_rank_label;
        const state = senator.state;
        const startDate = senator.startdate; // included by Andressa (comment to be deleted later)
        const twitter = senator.twitterid; // included by Andressa (comment to be deleted later)
        const youtubeid = senator.youtubeid; // included by Andressa (comment to be deleted later)

        let senatorData = new Object();
        senatorData.firstname = firstname;
        senatorData.lastname = lastname;
        senatorData.party = party;
        senatorData.gender = gender;
        senatorData.rank = rank;
        senatorData.state = state;
        senatorData.startDate = startDate; // included by Andressa (comment to be deleted later)
        senatorData.twitter = twitter; // included by Andressa (comment to be deleted later)
        senatorData.youtubeid = youtubeid; // included by Andressa (comment to be deleted later)

        if (senatorGeneralData.hasOwnProperty(party)) {
          senatorGeneralData[party].push(senatorData);
        }
      });

      //getting the DOM elements where we want to display the affiliations counter
      const democratsCounterElement = document.getElementById(
        "party-affiliations-democrats"
      );
      const republicansCounterElement = document.getElementById(
        "party-affiliations-republicans"
      );
      const independentsCounterElement = document.getElementById(
        "party-affiliations-independents"
      );

      //getting the DOM elements where we want to display the leadership data
      const democratsLeadersElement = document.getElementById(
        "senators-leadership-roles-democrats"
      );
      const republicansLeadersElement = document.getElementById(
        "senators-leadership-roles-republicans"
      );
      const independentsLeadersElement = document.getElementById(
        "senators-leadership-roles-independents"
      );

      // updating the innerHTML of senators.html with the senators party counts
      democratsCounterElement.innerHTML = `Democrats: ${partyAffiliationData.Democrat}`;
      republicansCounterElement.innerHTML = `Republicans: ${partyAffiliationData.Republican}`;
      independentsCounterElement.innerHTML = `Independents: ${partyAffiliationData.Independent}`;

      // updating the innerHTML of senators.html with the senators leadership info
      leadershipRolesData.Democrat.forEach((senator) => {
        democratsLeadersElement.insertAdjacentHTML(
          "beforeend",
          `<li>${senator}</li>`
        );
      });

      // populating the webpage with a list of senators and their leadership roles
      democratsLeadersElement.appendChild(document.createElement("br"));

      leadershipRolesData.Republican.forEach((senator) => {
        republicansLeadersElement.insertAdjacentHTML(
          "beforeend",
          `<li>${senator}</li>`
        );
      });

      republicansLeadersElement.appendChild(document.createElement("br"));

      leadershipRolesData.Independent.forEach((senator) => {
        independentsLeadersElement.insertAdjacentHTML(
          "beforeend",
          `<li>${senator}</li>`
        );
      });

      //Andressa's code starts here(comment to be deleted later):

      // accessing HTML elements
      const partyFilter = document.getElementById("party-select");
      const stateFilter = document.getElementById("state");
      const rankFilter = document.getElementById("rating");
      const filteredSenatorsContainer =
        document.getElementById("filtered-senators");
      const senatorDetailsContainer =
        document.getElementById("senator-details");

      // function to display detailed information about a selected senator
      function showSenatorDetails(senator) {
        senatorDetailsContainer.innerHTML = "";

        // creating a new container for senator details
        const senatorDetailElement = document.createElement("div");
        senatorDetailElement.className = "senator-details";

        // creating a clickable website link
        const websiteLink = document.createElement("a");
        websiteLink.href = senator.website;
        websiteLink.target = "_blank";
        websiteLink.textContent = "Visit Website";
        websiteLink.id = "website-link";

        // building the details HTML
        senatorDetailElement.innerHTML = `
        <h2>${senator.person.firstname} ${senator.person.lastname}</h2>
        <p>Office: ${senator.description}</p>
        <p>Date of Birth: ${senator.person.birthday}</p>
        <p>Start Date: ${senator.startdate}</p>
        <p>YouTube: ${senator.person.youtubeid || "N/A"}</p>
        <p>Twitter: ${senator.person.twitterid || "N/A"}</p>
        `;

        senatorDetailElement.appendChild(websiteLink);

        // adding the senator details to the container
        senatorDetailsContainer.appendChild(senatorDetailElement);
      }

      // function to filter and display senators based on party, state, and rank
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

// code resouce: "Back to Top Button with HTML, CSS and JavaScript" in https://www.youtube.com/watch?v=gphMli74Chk&t=699s
function backToTop() {
  window.scrollTo(0, 0);
}
//Andressa's code ends here(comment to be deleted later)

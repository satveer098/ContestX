let arrcontest = [
  "AtCoder",
  "CodeForces",
  "CodeChef",
  "LeetCode",
  "HackerRank",
  "HackerEarth",
];
let array2 = [
  "at_coder",
  "codeforces",
  "code_chef",
  "leet_code",
  "hacker_rank",
  "hacker_earth",
];
let options = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Asia/Kolkata",
};

const main1 = (whichcontest) => {
  let response = fetch(`https://kontests.net/api/v1/${whichcontest}`);

  let ihtml = "";
  response
    .then((v) => {
      return v.json();
    })
    .then((contests) => {
      let d = document.getElementById("carddiv");
      for (items in contests) {
        let temp;
        if (whichcontest === "all") temp = contests[items].site;
        else {
          let idx = array2.indexOf(whichcontest);
          temp = arrcontest[idx];
        }

        let consite = "Random";
        if (arrcontest.includes(temp)) {
          consite = temp;
        }
        let seconds = contests[items].duration;

        let numyears = Math.floor(seconds / 31536000);
        let nummonths = Math.floor((seconds % 31536000) / 2628000);
        let numdays = Math.floor(((seconds % 31536000) % 2628000) / 86400);
        let numhours = Math.floor(
          (((seconds % 31536000) % 2628000) % 86400) / 3600
        );
        let numminutes = Math.floor(
          (((seconds % 31536000) % 86400) % 3600) / 60
        );
        let duration = `${numyears > 0 ? numyears + " Years " : ""} ${
          nummonths > 0 ? nummonths + " months " : ""
        }
       ${numdays > 0 ? numdays + " Days " : ""} ${
          numhours > 0 ? numhours + " hours " : ""
        } 
       ${numminutes > 0 ? numminutes + " minutes " : ""}`;

        let start_time = contests[items].start_time;
        start_time = new Date(start_time).toLocaleString(undefined, options);
        let end_time = contests[items].end_time;
        end_time = new Date(end_time).toLocaleString(undefined, options);

        ihtml += ` <div class="card mx-2" style="width: 25rem; ">
       <img src="images/${consite}.jpg" class="card-img-top" alt="..." height ="250" width "200">
       <div class="card-body">
         <h5 class="card-title">${contests[items].name}</h5>
         <p class="card-text">Start Time : ${start_time}</p>
         <p class="card-text">End Time : ${end_time}</p>
         <p class="card-text">in_24_hours : ${contests[items].in_24_hours}</p>
         <p class="card-text">Status : ${contests[items].status}</p>
         <p class="card-text">Duration : ${duration}</p>
         <a href="${contests[items].url}" class="btn btn-primary">Visit Contest</a>
       </div>
     </div>`;
      }
      d.innerHTML = ihtml;
    });
};

let whichcontest = "all";
main1(whichcontest);

let buttons = document.getElementsByClassName("button");
buttons = Array.from(buttons);

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    whichcontest = button.id;

    main1(whichcontest);
  });
});

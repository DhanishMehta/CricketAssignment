var timeUp = false;
var countDownStarted = false;

function CountDown(callback) {
  countDownStarted = true;
  var start = 60;
  document.getElementById("start-btn").classList.add("disabled");
  var x = setInterval(function () {
    document.getElementById("countdown").innerText = "" + --start;
    if (start <= 0) {
      clearInterval(x);
      callback(true);
    }
  }, 1000);
}

function startCountDown() {
  CountDown(function (x) {
    timeUp = x;
    console.log("Countdown finishes!");
  });
}

var T1playersTotalRuns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var T1TotalRuns = 0;
var t1playerIdx = 1;
var t1BallIdx = 1;
var isOut = false;
var teamOneBattingDone = false;

function Team1Hit() {
  if (!countDownStarted) {
    alert("Start the game first!");
    return;
  }
  if (timeUp) {
    alert("Time's Up!!");
    teamOneBattingDone = true;
    teamTwoBattingDone = true;
    return;
  }

  if (teamOneBattingDone == true) {
    alert("Team 1 Batting is over!");
    return;
  }
  if (t1playerIdx > 10) {
    teamOneBattingDone = true;
  }
  if (isOut || t1BallIdx > 6) {
    t1playerIdx++;
    t1BallIdx = 1;
    isOut = false;
  }

  var curr = "t1p" + t1playerIdx + "b" + t1BallIdx;
  run = Math.floor((Math.random() * 10) % 6);
  if (run == 0) {
    isOut = true;
    document.getElementById(curr).innerHTML = "W";
  } else {
    document.getElementById(curr).innerHTML = "" + run;
  }

  // calculate total for player
  var currTotal = "t1p" + t1playerIdx + "-total";
  currTotalElement = document.getElementById(currTotal);
  Team1TotalScoreElement = document.getElementById("team-1-score");

  T1playersTotalRuns[t1playerIdx - 1] += run;
  T1TotalRuns += run;

  currTotalElement.innerHTML = "" + T1playersTotalRuns[t1playerIdx - 1];
  Team1TotalScoreElement.innerHTML = "" + T1TotalRuns;

  t1BallIdx++;
}

var T2playersTotalRuns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var T2TotalRuns = 0;
var t2playerIdx = 1;
var t2BallIdx = 1;
var T2isOut = false;
var teamTwoBattingDone = false;

function Team2Hit() {
  if (!countDownStarted) {
    alert("Start the game first!");
    return;
  }
  if (timeUp) {
    alert("Time's Up!!");
    teamOneBattingDone = true;
    teamTwoBattingDone = true;
    return;
  }

  if (teamTwoBattingDone == true) {
    alert("Team 2 Batting is over!");
    return;
  }

  if (t2playerIdx > 10) {
    teamTwoBattingDone = true;
  }

  //check if player out or ball over
  if (T2isOut || t2BallIdx > 6) {
    t2playerIdx++;
    t2BallIdx = 1;
    T2isOut = false;
  }

  var curr = "t2p" + t2playerIdx + "b" + t2BallIdx;
  run = Math.floor((Math.random() * 10) % 6);
  if (run == 0) {
    T2isOut = true;
    document.getElementById(curr).innerHTML = "W";
  } else {
    document.getElementById(curr).innerHTML = "" + run;
  }

  // calculate total for player
  var currTotal = "t2p" + t2playerIdx + "-total";
  currTotalElement = document.getElementById(currTotal);
  Team1TotalScoreElement = document.getElementById("team-2-score");

  T2playersTotalRuns[t2playerIdx - 1] += run;
  T2TotalRuns += run;

  currTotalElement.innerHTML = "" + T2playersTotalRuns[t2playerIdx - 1];
  Team1TotalScoreElement.innerHTML = "" + T2TotalRuns;

  t2BallIdx++;
}

function generateResult() {
  var isDraw = false;
  var winner;
  var winnerMessage = "";
  var momMessage = "";
  var idx;
  var team;

  if (!teamOneBattingDone) {
    alert("Team One Batting is left!");
    return;
  }
  if (!teamTwoBattingDone) {
    alert("Team Two Batting is left!");
    return;
  }
  if (T1TotalRuns > T2TotalRuns) {
    winner = 1;
  } else if (T1TotalRuns < T2TotalRuns) {
    winner = 2;
  } else if (T1TotalRuns == T2TotalRuns) {
    isDraw = true;
  }
  var t1max = Math.max(...T1playersTotalRuns);
  var t2max = Math.max(...T2playersTotalRuns);
  if (t1max > t2max) {
    team = 1;
    idx = T1playersTotalRuns.indexOf(t1max) + 1;
  } else if (t1max < t2max) {
    team = 2;
    idx = T2playersTotalRuns.indexOf(t2max) + 1;
  } else {
    team = winner;
    if (winner == 1) {
      idx = T1playersTotalRuns.indexOf(t1max) + 1;
    } else {
      idx = T2playersTotalRuns.indexOf(t2max) + 1;
    }
  }

  momMessage = `Player ${idx}\n
    Team ${team}\n
    Runs ${Math.max(t1max, t2max)}`;

  if (isDraw) {
    winnerMessage = `The match is Draw!!`;
  } else {
    winnerMessage = `Team ${winner}`;
  }

  document.getElementById("match-winner-box").classList.remove("d-none");
  document.getElementById("match-winner").innerHTML = winnerMessage;
  document.getElementById("mom-box").classList.remove("d-none");
  document.getElementById("mom").innerHTML = momMessage;
}
//$(document).ready(function () {
// Initialize Firebase

  var config = {
        apiKey: "AIzaSyC4Rbu1cx9GKu1LygTsJjq-HNrCJYiopP4",
        authDomain: "train-58465.firebaseapp.com",
        databaseURL: "https://train-58465.firebaseio.com",
        projectId: "train-58465",
        storageBucket: "",
        messagingSenderId: "438533982342"   
          };

    firebase.initializeApp(config);

        var database = firebase.database();

    $("#add-train").on("click", function(event) {
        event.preventDefault();

        var name = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var frequency = parseInt($("#frequency-input").val().trim());
        var start = moment($("#start-input").val().trim(), "HH:mm").format();

        var newtrain = {
            name: name,
            destination: destination,
            frequency: frequency,
            start: start
        };

        database.ref().push(newtrain);

        console.log(newtrain.name);
        console.log(newtrain.destination);
        console.log(newtrain.frequency);
        console.log(newtrain.start);

        alert("Train is now boarding!");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
        $("#start-input").val("");

    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var start = childSnapshot.val().start;
        
var timeConverted = moment(start, "HH:mm").subtract(1, "years");

   var currentTime = moment();
    console.log("THE TIME IS: " + moment(currentTime).format("HH:mm"));

    var Difference = moment().diff(moment(timeConverted), "minutes");
    console.log("----------------------");
    console.log("DIFFERENCE IN TIME: " + Difference);

    var timeApart = Difference % frequency;
    console.log("----------------------");
    console.log("MINUTES TO SUBTRACT FROM FREQUENCY: " + timeApart);

    var howFar = frequency - timeApart;
    console.log("----------------------");
    console.log("HOW FAR IS THE TRAIN " + howFar);

    var nextTrain = moment().add(howFar, "minutes");
    console.log("----------------------");
    console.log("NEXT BOARDING TIME AT: " + moment(nextTrain).format("HH:mm"));

    var nextTrain = moment(nextTrain).format("HH:mm A");

  $("#train-schedule > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + howFar + "</td></tr>");

    });




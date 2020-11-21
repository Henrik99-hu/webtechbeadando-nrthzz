//Calling needed methods
$(document).ready(function(){
    getAllCars();

    getManufacturerList();

    $("#addCar").click(function(){
        addCar();
    });

    $("#modifyCar").click(function(){
        updateCar();
    });

    $("#deleteCar").click(function(){
        deleteCar();
    });
});

//Method to get cars from database
function getAllCars(){
    $.getJSON( url="https://webtechcars.herokuapp.com/api/cars", data = function(data) {
        var table = $("#carsTable");
        $.each(data, callback = function (key, value) {
            var row = $('<tr></tr>');
            var idCell = $('<td>' + value._id + '</td>');
            var nameCell = $('<td>' + value.name + '</td>');
            var consumptionCell = $('<td>' + value.consumption + '</td>');
            var colorCell = $('<td>' + value.color + '</td>');
            var manufacturerCell = $('<td>' + value.manufacturer + '</td>');
            var availableCell = $('<td>' + value.avaiable + '</td>');
            var yearCell = $('<td>' + value.year + '</td>');
            var horsePowerCell = $('<td>' + value.horsepower + '</td>');

            $(row).append(idCell);
            $(row).append(nameCell);
            $(row).append(consumptionCell);
            $(row).append(colorCell);
            $(row).append(manufacturerCell);
            $(row).append(availableCell);
            $(row).append(yearCell);
            $(row).append(horsePowerCell);

            $(table).append(row);
        });
    });
};

//Method to get the list of manufacturers into a select input field
function getManufacturerList(){
    var $select = $("#manufacturer");

    $.getJSON(url="https://webtechcars.herokuapp.com/api/manufacturers", data = function(data){
        $.each(data, callback = function(key, value){
            $select.append('<option value="' + value.name + '">' + value.name + '</option>');
        });
    });
};

//Method to add a car
function addCar(){
        event.preventDefault();
        const carData = JSON.stringify({
            "name": document.getElementById("name").value,
            "consumption": document.getElementById("consumption").value,
            "color": document.getElementById("color").value,
            "manufacturer": document.getElementById("manufacturer").value,
            "avaiable": document.getElementById("available").value,
            "year": document.getElementById("year").value,
            "horsepower": document.getElementById("horsepower").value,
        });
        console.log(carData);
        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/cars",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:carData,
            contentType:"application/json",
            success: function(data){
                alert("Car succesfully added! You will be returned to the front page.");
                location.reload();
            },
            error: function(){
                alert("Error updating database");
        }
    });
}

//Method to delete a car
function deleteCar(){
    event.preventDefault();
    var id = document.getElementById("id2").value;
    console.log(id);
    $.ajax({
        type:"DELETE",
        url: "https://webtechcars.herokuapp.com/api/cars/" + id,
        contentType: "application/json",
        success: function(data){
            alert("Car succesfully deleted! You will be returned to the front page.");
            location.reload();
        },
        error: function(){
            alert("Error deleting from database");
        }
    })
}

//Method to update a car
function updateCar(){
    event.preventDefault();
    var id = document.getElementById("id").value;
    console.log(id);
    $.ajax({
        type:"DELETE",
        url: "https://webtechcars.herokuapp.com/api/cars/" + id,
        contentType: "application/json",
        success: function(data){},
        error: function(){
            alert("Error in the modification process: Initial record deletition failed");
        }
    })

    const carData = JSON.stringify({
        "name": document.getElementById("name").value,
        "consumption": document.getElementById("consumption").value,
        "color": document.getElementById("color").value,
        "manufacturer": document.getElementById("manufacturer").value,
        "avaiable": document.getElementById("available").value,
        "year": document.getElementById("year").value,
        "horsepower": document.getElementById("horsepower").value,
    });
    console.log(carData);
    $.ajax({
        type:"POST",
        url: "https://webtechcars.herokuapp.com/api/cars",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        data:carData,
        contentType:"application/json",
        success: function(data){
            alert("Car succesfully modified! You will be returned to the front page.");
            location.reload();
        },
        error: function(){
            alert("Error updating record");
    }
    });
}
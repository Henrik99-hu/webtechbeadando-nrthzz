//Calling the needed methods
$(document).ready(function(){
    getAllManufacturers();

    $("#addManufacturer").click(function(){
        addManufacturer();
    });

    $("#modifyManufacturer").click(function(){
        updateManufacturer();
    });
    $("#deleteManufacturer").click(function(){
        deleteManufacturer();
    });

});

//Method to get manufacturers
function getAllManufacturers(){
    $.getJSON( url="https://webtechcars.herokuapp.com/api/manufacturers", data = function(data) {
        var table = $("#manufacturersTable");
        $.each(data, callback = function (key, value) {
            var row = $('<tr></tr>');
            var idCell = $('<td>' + value._id + '</td>');
            var nameCell = $('<td>' + value.name + '</td>');
            var countryCell = $('<td>' + value.country + '</td>');
            var foundedCell = $('<td>' + value.founded + '</td>');

            $(row).append(idCell);
            $(row).append(nameCell);
            $(row).append(countryCell);
            $(row).append(foundedCell);

            $(table).append(row);
        });
    });
};

//Method to add a manufacturer
function addManufacturer(){
    event.preventDefault();
        const manufacturerData = JSON.stringify({
            "name": document.getElementById("name").value,
            "country": document.getElementById("country").value,
            "founded": document.getElementById("founded").value
        });
        console.log(manufacturerData);
        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/manufacturers",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data: manufacturerData,
            contentType: "application/json",
            success: function(data){
                alert("Manufacturer succesfully added! You will be returned to the front page.");
                location.reload();
            },
            error: function(){
                alert("Error updating database");
            }
        })
}

//Method to delete manufacturer
function deleteManufacturer(){
    event.preventDefault();
        var id = document.getElementById("id2").value;
        console.log(id);
        $.ajax({
            type:"DELETE",
            url: "https://webtechcars.herokuapp.com/api/manufacturers/" + id,
            //data: manufacturerData,
            contentType: "application/json",
            success: function(data){
                alert("Manufacturer succesfully deleted! You will be returned to the front page.");
                location.reload();
            },
            error: function(){
                alert("Error deleting from database");
            }
        })
}

//Method to update manufacturer
function updateManufacturer(){
    event.preventDefault();
    //Deleting the initial record
    var id = document.getElementById("id").value;
    console.log(id);
    $.ajax({
        type:"DELETE",
        url: "https://webtechcars.herokuapp.com/api/manufacturers/" + id,
        contentType: "application/json",
        success: function(data){},
        error: function(){
            alert("Error in the modification process: Initial record deletition failed")
        }
    })
    //Inserting the modified record
    const manufacturerData = JSON.stringify({
        "name": document.getElementById("name").value,
        "country": document.getElementById("country").value,
        "founded": document.getElementById("founded").value
    });
    console.log(manufacturerData);
    $.ajax({
        type:"POST",
        url: "https://webtechcars.herokuapp.com/api/manufacturers",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        data: manufacturerData,
        contentType: "application/json",
        success: function(data){
            alert("Manufacturer succesfully modified! You will be returned to the front page.");
            location.reload();
        },
        error: function(){
            alert("Error updating record");
        }
    })
}


$(document).ready(function () {
    // podaci od znacaja 
    var host = window.location.host;
    var token = null;
    var headers = {};
    var userObject = {};
    var userObjectRoleChange = {};
    var user = "";
    var userId = 0;
    var stringUserId = 0;
    var administrator = " ";
    var stringMovieName = '';
    var formType = "";
    var tableFor = "";

    var seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5'];
    var numberAvailableTickets = 0;
    var totalSeatsNumber = 15;
    var selectedSeat = [];
    var stringMovieId = 0;
    var stringHallId = 0;
    var projectionId = 0;
    var finallySelectedProjectionId = 0;
    var buyFromProjection = "";
    var ticketProjectionId = 0;
    var seatId = 0;
    var ticketPrice = 0;
    var hallId = '';

    homePage();
    load();


    $("#buttonRegistration").click(pageRegistration);
    $("#buttonLogin").click(pageLogin);
    $("#buttonMovies").click(pageMovies);
    $("#buttonUsers").click(pageUsers);
    $("#buttonAddProjection").click(displayAddProjectionForm);
    $("#buttonAddMovie").click(addMovie);
    $("#buttonDeleteMovie").click(deleteMovie);
    $("#buttonEditMovie").click(updateMovie);
    $("#buttonDeleteProjection").click(deleteProjection);
    $("#buttonUserRoleChange").click(changeUserRole);
    $("#buttonPasswordChange").click(changeUserPassword);

    $("body").on("click", "#buttonMovieId", pageMovie);
    $("body").on("click", "#buttonUserName", pageUser);
    $("body").on("click", "#nalog", pageUser);
    $("body").on("click", "#buttonprojectionId", pageProjection);
    $("body").on("click", "#buttonBack", nazad);
    $("body").on("click", "#backInvoice", backFromTickets);
    $("#logout").click(logout);

    //=============================================================LOADING HOME PAGE =========
    function load() {
        url1 = 'https://' + host + '/api/projection';
        url2 = 'https://' + host + '/api/user';
        $.getJSON(url2, userRegistrationInBase)
        $.getJSON(url1, fillProjectionTable);
    };
    //================                               REGISTER USERS from database table (dbo.User) in the  authorized user table(dbo.AspNetUser) ======================
    function userRegistrationInBase(data, status) {


        if (status == 'success' ) {
            for (var i = 0; i < data.length; i++) {
               
                $("#username").val(data[i].UserName);
                $("#mailREG").val(data[i].UserName.toString() + "@mail");
                $("#loz1REG").val(data[i].Password);
                $("#loz2REG").val(data[i].Password);
                var username = $("#username").val();
                var email = $("#mailREG").val();
                var loz1 = $("#loz1REG").val();
                var loz2 = $("#loz2REG").val();
                var sendData = {
                    "UserName": username,
                    "Email": email,
                    "Password": loz1,
                    "ConfirmPassword": loz2
                };
               
                $.ajax({
                    type: "POST",
                    url: 'https://' + host + "/api/Account/Register",
                    data: sendData
                }).done(function (data) {
                    refreshRegistracion();
                }).fail(function (data) {
                    refreshRegistracion();
                    return;
                });
            }
        }
    }
    //============================================================Home Page  ==============
    function homePage() {
        $("#loginRegisterDiv").show();
        $("#tableProjectionWithSearch").show()
        $("#loginRegisterDiv").show();
        $("#movieDiv").show();

        $("#buttonBack").hide();
        $("#pageMovieDiv").hide();
        $("#infoDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#adminButton").hide();
        $("#pageAllMovieDiv").hide();
        $("#addProjectionDiv").hide();
        $("#pageUsersDiv").hide();
        $("#pageUserDiv").hide();
        $("#pageProjectionDiv").hide();
        $("#adminKorisnikProjekcije").hide();
        $("#adminbuttonMovie").hide();
        $("#formChangeUserRole").hide();
        $("#changePasswordDiv").hide();
        $("#page2BuyTicket").hide();
        $("#page3BuyTicket").hide();

        $("#image").html('');

    }
    //==================================================PAGE  AFTER LOGIN ==============
    function pageAfterLogin() {
        // It depends on who signed up  , for  user : button_account (clik);button  log out(clik)  for admin : plus button_Users an button_add projection 
        $("#tableProjectionWithSearch").show();
        $("#infoDiv").show();
        $("#movieDiv").show();

        $("#registerDiv").hide();
        $("#loginDiv").hide();
        $("#loginRegisterDiv").hide();

        if (user == "admin") {

            $("#adminButton").show();

        }

    }
    //=================================================BUTTON LOG OUT ======= ===========
    function logout() {
        homePage();
        $("#infoDiv").hide();
        $("#userinfo").html("NOT SIGNED");
        $("#account").html(" YOUR ACCOUNT");
        user = " ";
        userId = 0;
        token = null;
        load(); 

    };
    //================================================= BUTTON BACK ==============
    function nazad() {
        $("#infoDiv").show();
        if (user == 'user' || user == 'admin') {
            pageAfterLogin();
            $("#pageUsersDiv").hide();
            $("#pageProjectionDiv").hide();
            $("#addProjectionDiv").hide();
            $("#pageUserDiv").hide();
            $("#pageMovieDiv").hide();
            $("#pageAllMovieDiv").hide();
            $("#buttonMovies").show();
            $("#movieDiv").show();
            tableFor = " ";
        } else {
            homePage();
        }
        load();
    }
    //=================================  BUTTON REGISTRATION =============
    function pageRegistration() {
        $("#registerDiv").show();
        $("#tableProjectionWithSearch").hide();
        $("#loginRegisterDiv").hide();
        $("#buttonMovies").hide();
        $("#movieDiv").hide();
    }
    // ===================================  BUTTON LOGIN ==================
    function pageLogin() {
        $("#registerDiv").hide();
        $("#tableProjectionWithSearch").hide();
        $("#loginDiv").show();
        $("#loginRegisterDiv").hide();
        $("#movieDiv").hide();
    }
    //=====================================  ONLY ONE  MOVIE     ========================================================
    function pageMovie() {

        $("#infoDiv").show();
        $("#pageMovieDiv").show();
        $("#buttonPageMovie").show();

        $("#loginRegisterDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#tableProjectionWithSearch").hide();
        $("#buttonBuyTicket").hide();
        $("#buttonEditMovie").hide();
        $("#buttonDeleteMovie").hide();
        $("#pageUserDiv").hide();
        $("#movieDiv").hide();
        stringMovieName = this.name;
        url = 'https://' + host + '/api/movie/?name=' + stringMovieName;
        $.getJSON(url, loadMovie);
    }
    //=================================================================LOAD MOVIE ==================
    function loadMovie(data, status) {
        var container = $("#movieData");
        container.empty();
        if (status == "success") {
            var div = $("<div></div>")
            var h1 = $(" <h3> Movie </h3>");
            div.append(h1);
            var podaciFilma = $("<label> Movie name  &nbsp;&nbsp;&nbsp     :" + data.Name + " </label><br/>" +
                "<label> Director   &nbsp;&nbsp;&nbsp         :" + data.Director + " </label><br/>" +
                "<label> Actor   &nbsp;&nbsp;&nbsp           :" + data.Actor + " </label><br/>" +
                "<label>Genre     &nbsp;&nbsp;&nbsp            :" + data.Genre + " </label><br/>" +
                "<label>Projection time  &nbsp;&nbsp;&nbsp           :" + data.Time + " </label><br/>" +
                "<label>Distributor    &nbsp;&nbsp;&nbsp      :" + data.Distributor + " </label><br/>" +
                "<label> Country     &nbsp;&nbsp;&nbsp         :" + data.Country + " </label><br/>" +
                "<label> Release date &nbsp;&nbsp;&nbsp :" + data.DateRelase + " </label><br/>" +
                "<label> Story    &nbsp;&nbsp;&nbsp            :" + data.Story + " </label><br/>");
            container.append(podaciFilma);
            if (token != null && user == "admin") {
                $("#buttonEditMovie").show();
                $("#buttonDeleteMovie").show();
            }
            if (token != null && user == "user") {
                $("#buttonBuyTicket").show();
            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   error  page movie</h1>");
            div.append(h1);
            container.append(div);
        }
    }
    //=================================================================MOVIES  PAGE ===================
    function pageMovies() {
        $("#infoDiv").show();
        $("#pageAllMovieDiv").show();

        $("#loginRegisterDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#tableProjectionWithSearch").hide();
        $("#pageMovieDiv").hide();
        $("#buttonkupikartu").hide();
        $("#buttonEditMovie").hide();
        $("#buttonDeleteMovie").hide();
        $("#movieDiv").hide();
        $("#addMovieDiv").hide();
        if (user == 'admin') {
            $("#adminbuttonMovie").show();
        }
        url4 = 'https://' + host + '/api/movie';
        $.getJSON(url4, loadTableMovie)

    };
    //===============================================================ADD MOVIE ==============
    function addMovie() {

        $("#addMovieDiv").show();
        var list = ["comedy", "horor", "Action", "SF"];
        dropGenre(list);
        
    }
    //=============================================================  SUBMIT MOVIE ==============
    $("#formAddMovie").submit(function (e) {
        e.preventDefault();
        var name = $("#nameAddMovie").val();
        var director = $("#directorMovie").val();
        var actor = $("#actorMovie").val();
        var genre = $("#genreMovie").val();
        var time = $("#timeMovie").val();
        var distributor = $("#distributorMovie").val();
        var country = $("#countryMovie").val();
        var relasetime = $("#relaseTimeMovie").val();
        var story = $("#storyMovie").val();

        if (formType == "update") {

            var httpAction = "PUT";
            var url = "https://" + host + '/api/movie/' + stringMovieId.toString();
            var sendData = {
                "Id": stringMovieId.toString(),
                "Name": name,
                "Director": director,
                "Actor": actor,
                "Genre": genre,
                "Time": time,
                "Distributor": distributor,
                "Country": country,
                "DateRelase": relasetime,
                "Story": story
            };
        } else {
            var httpAction = "POST";
            var url = "https://" + host + '/api/movie/';
            var sendData = {

                "Name": name,
                "Director": director,
                "Actor": actor,
                "Genre": genre,
                "Time": time,
                "Distributor": distributor,
                "Country": country,
                "DateRelase": relasetime,
                "Story": story
            };
        }
        $.ajax({
            type: httpAction,
            url: url,
            data: sendData
        }).done(function (data) {
            refresMovieForm();
            formType == "";
            $("#addMovieDiv").hide();
        }).fail(function (data) {
            refresMovieForm();
            alert(" Create Movie error");
        });

    });
    //===============================================================DELETE MOVIE ==================
    function deleteMovie() {
        var httpAction1 = "GET";
        var url1 = 'https://' + host + '/api/movie/?name=' + stringMovieName;  //first I search a movie based on the name ,I nead   movie ID 
        $.ajax({
            type: httpAction1,
            url: url1
        }).done(function (data) {
            console.log(data);
            stringMovieId = data.Id;
            //================================
            var httpAction2 = "DELETE";
            var url2 = 'https://' + host + '/api/movie/' + stringMovieId.toString();
            $.ajax({
                type: httpAction2,
                url: url2
            }).done(function (data) {
                pageAfterLogin();
                load();
            }).fail(function (data) {
                refresMovieForm();
                alert(" error when DELETE movie ", data);
            });
            //=============================

        }).fail(function (data) {

            alert(" not find movie name ", data);
        });
    }
    //========================================================= UPDATE MOVIE ===============
    function updateMovie() {

        $("#pageAllMovieDiv").show();

        $("#tableMovies").hide();
        $("#adminbuttonMovie").hide();
        $("#backDiv").show();
        formType = "update";
        $("#addMovie").html("UPDATE MOVIE");
        
        var httpAction1 = "GET";
        var url1 = 'https://' + host + '/api/movie/?name=' + stringMovieName;
        $.ajax({
            type: httpAction1,
            url: url1
        }).done(function (data) {
            console.log(data);
            stringMovieId = data.Id;
            $("#nameAddMovie").val(data.Name);
            $("#directorMovie").val(data.Director);
            $("#actorMovie").val(data.Actor);
            $("#genreMovie").val(data.Genre);
            $("#timeMovie").val(data.Time);
            $("#distributorMovie").val(data.Distributor);
            $("#countryMovie").val(data.Country);
            $("#relaseTimeMovie").val(data.DateRelase);
            $("#storyMovie").val(data.Story);
            addMovie();
        }).fail(function (data) {

            alert("   Movie update error ");
        });

    }
    //=========refresh  movie form  ===============
    function refresMovieForm() {
        $("#nameAddMovie").val('');
        $("#directorMovie").val('');
        $("#actorMovie").val('');
        $("#genreMovie").val('');
        $("#timeMovie").val('');
        $("#distributorMovie").val('');
        $("#countryMovie").val('');
        $("#relaseTimeMovie").val('');
        $("#storyMovie").val('');
    };
    //==========  movie genre ==============

    function dropGenre(list) {
      
        $("#genreMovie").empty();
        
        for (i = 0; i < list.length; i++) {
            $('#genreMovie').append($('<option></option>').val(list[i]).html(list[i]));
        }
    };
    //==================================================== LOAD MOVIE ================
    function loadTableMovie(data, status) {
        var container = $("#tableMovies");
        container.empty();

        if (status == "success") {
            var div = $("<div></div>")
            var h1 = $(" <h3> MOVIES </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");
            var header = $("<thead  style='background-color:aquamarine '><tr > <td>Movie name </td> <td> Genre </td>  <td>Time</td>  <td>Distributor</td> <td>Country</td><td>Relase date</td><tr></thead>");
            table.append(header);

            for (var i = 0; i < data.length; i++) {
                var row = "<tbody><tr class='success'>";
                var displayData = "<td>" + data[i].Name + "</td><td>" + data[i].Genre + "</td><td>" + data[i].Time + "</td><td>" + data[i].Distributor + "</td><td>" + data[i].Country + "</td><td>" + data[i].DateRelase + "</td>";
                row += displayData + "</tr></tbody>";
                table.append(row);
            }
            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>  error  load movie table</h1>");
            div.append(h1);
            container.append(div);
        }
    }


    //===========================================   PROJECTION TABLE   =================
    function fillProjectionTable(data, status) {

        var container = $("#projectionTable");
        container.empty();

        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3> PROJECTION  </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");

            var header = $("<thead  style='background-color:aquamarine '><tr > <td>MOVIE</td> <td>DATE AND TIME  </td> <td>PROJECTION TYPE</td>  <td>HALL</td> <td>PRICE</td><tr></thead>");

            table.append(header);
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var row = "<tbody><tr class='success'>";
                var stringprojectionId = data[i].Id.toString();
                var stringMovieName = data[i].Movie.Name.toString();
                var date = data[i].ProjectionTime;

                var displayData = "<td><button id=buttonMovieId class=btn-default name=" + stringMovieName + ">" + data[i].Movie.Name + "</button></td><td><button id=buttonprojectionId class= btn-default name=" + stringprojectionId + ">" + date + "</button></td><td>" + data[i].Type.Name + "</td><td>" + data[i].Hall.Name + "</td><td>" + data[i].TicketPrice + "</td>";
                var displayOdaberi = "<td><button id=buttonKupiKartu class=btn-default name=" + stringprojectionId + ">[KUPI KARTU]</button></td>";

                if (tableFor == "BuyTicket") {
                    row += displayData + displayOdaberi + "</tr></tbody>";
                }
                else {
                    row += displayData + "</tr></tbody>";
                }

                table.append(row);
            }
            div.append(table);
            container.append(div);

        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }
    };

    // ======================================================LOGIN  ==============
    $("#formLogin").submit(function (e) {
        e.preventDefault();
        var username = $("#usernamePr").val();
        var loz = $("#lozPr").val();
        var sendData = {
            "grant_type": "password",
            "username": username,
            "password": loz
        };
        //    I must know  id , and other information from user 
                $.ajax({
                    "type": "GET",
                    "url": 'https://' + host + '/api/user/?name=' + username,
                }).done(function (data) {
                    userObject = data;
                    user = data.Role.toString();
                    userId = data.Id;

                }).fail(function (data) {
                    alert(" user se NE nalazi u bazi podataka ");
                });
        $.ajax({
            "type": "POST",
            "url": 'https://' + host + "/Token",
            "data": sendData
        }).done(function (data) {

            console.log(' podaci koji su dobavljeni',data);
            $("#account").html(data.userName);
            $("#userinfo").html(user);

            token = data.access_token;
            administrator = data.userName.toString();

            osveziPrijavu();
            pageAfterLogin();
            load();
        }).fail(function (data) {
            osveziPrijavu();
            alert(" doslo je do greske prilikom prijavljivanja", data);
        });
    });
    //===============================REGISTRATION  + (add user to table dbo.User )================
    $("#formRegister").submit(function (e) {
        e.preventDefault();
        var username = $("#username").val();
        var email = $("#mailREG").val();
        var loz1 = $("#loz1REG").val();
        var loz2 = $("#loz2REG").val();
        var d = Date();
        var sendData = {
            "UserName": username,
            "Email": email,
            "Password": loz1,
            "ConfirmPassword": loz2

        };
      
        $.ajax({
            type: "POST",
            url: 'https://' + host + "/api/Account/Register",
            data: sendData
        }).done(function (data) {

                //============================ADD USER IN BASE TABLE  =====
                httpaction = "POST";
                url = 'https://' + host + "/api/user/";
                senddata = {
                    "UserName": username,
                    "Password": loz1,
                    "RegDate": new Date().toJSON(),
                    "Role": "user"
                };
                $.ajax({
                    url: url,
                    type: httpaction,
                    data: senddata
                }).fail(function (data, status) {

                    alert("error  User BASE registration  !");
                })
                //===============================================
            refreshRegistracion();
            $("#registerDiv").hide();
            $("#loginDiv").show();
            $("#tableProjectionWithSearch").show();
        }).fail(function (data) {
            refreshRegistracion();
            
            alert("registracion error ");
        });
    });

    //=========================     REFRESH REGISTRATION FORM  ===========
    function refreshRegistracion() {
        $("#mailREG").val("");
        $("#loz1REG").val("");
        $("#loz2REG").val("");
        $("#username").val("");
    }
    //================================REFRESH  LOGIN  FORM  ===========
    function osveziPrijavu() {
        $("#usernamePr").val("");
        $("#lozPr").val("");
    }

    //================REFRESH  ADD PROJECTION FORM =====
    function refrechAddProjectionForm() {
        $("#dateProjection").val("");
        $("#ticketPrice").val("");

        $("#movieId").val("");
        $("#projectionHall").val("");
        $("#projectionType").val("");
    }
    //==========================FILTER  PROJECTION===================
    $("#formSearch").submit(function (e) {
        e.preventDefault();
        var movieName = $("#movieName").val();
        var hall = $("#hall").val();
        var date1 = $("#date1").val();
        var date2 = $("#date2").val();
        var projectionType = $("#projectionType").val();
        var priceFrom = $("#priceFrom").val();
        var priceTo = $("#priceTo").val();
        httpaction = "POST";
        url = 'https://' + host + "/api/projection/Searching";
        senddata = {
            "MovieName": movieName,
            "Hall": hall,
            "DateFrom": date1,
            "DateTo": date2,
            "HallType": projectionType,
            "PriceFrom": priceFrom,
            "PriceTo": priceTo
        };
        
        $.ajax({
            url: url,
            type: httpaction,
            data: senddata
        }).done(function (data, status) {
            fillProjectionTable(data, status);
        }).fail(function (data, status) {

            alert("ERROR ,filter for projection !");
        })
    })

    //==============  ADD PROJECTION  (  admin  ) =================================================================PROJEKCIJA  DODAJ  FORMA============
    function displayAddProjectionForm() {
        $("#addProjectionDiv").show();
        //=============  loading movies ====================
        urlM = "https://" + host + '/api/movie';
        $.getJSON(urlM, dropdownMovies)
        //============== loading  halls  ===================
        urlH= "https://" + host + '/api/hall';
        $.getJSON(urlH, dropdownHalls)
    }
    //  =============== drop down  Movies=============
    function dropdownMovies(data, status) {
        var container2 = $("#moviesDrop");
        $("#movieId").empty();
        if (status == "success") {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                $('#movieId').append($('<option></option>').val(data[i].Id).html(data[i].Name));

            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1>Movies loading  error </h1>");
            div.append(h1);
            container2.append(div);
        }
    }
    //=================drop down  Halls=============
    function dropdownHalls(data, status) {

        var container2 = $("#hallsDrop");
        $("#projectionHall").empty();
        if (status == "success") {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                $('#projectionHall').append($('<option></option>').val(data[i].Id).html(data[i].Name));
            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1> Halls  loading error </h1>");
            div.append(h1);
            container2.append(div);
        }
        //===========================================   loading    projection type for hall    ==============
        hallId = $("#projectionHall").val();
        var urltyphall= "https://" + host + '/api/hall/?hallId=' + hallId;
        $.getJSON(urltyphall, dropdownTypeForHall);

    }
    //================================================  RELOADING     projection type for hall ==============
    $("#projectionHall").change(function () {
        hallId = $("#projectionHall").val();
        var urltyphall = "https://" + host + '/api/hall/?hallId=' + hallId;
        $.getJSON(urltyphall, dropdownTypeForHall);


    });
    //==================================================drop down   projection type for hall ==============
    function dropdownTypeForHall(data, status) {
        
        var container3 = $("#typsDrop");
        $("#projectionTypeAdd").empty();
        if (status == "success") {
            for (i = 0; i < data.length; i++) {
                $('#projectionTypeAdd').append($('<option></option>').val(data[i].Id).html(data[i].Name));
            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1>Projection type for Hall  loading error </h1>");
            div.append(h1);
            container3.append(div);
        }
    }
    //====================================================== ADD PROJECTION  =================================================================PROJEKCIJA DODAVANJE =================
    $("#formAddProjection").submit(function (e) {

        e.preventDefault();
        var date = $("#dateProjection").val();
        var price = $("#ticketPrice").val();
        var admin = administrator;
        var movieId = $("#movieId").val();
        var projectionType = $("#projectionTypeAdd").val();
        var hallIdforadd = $("#projectionHall").val();

        var httpAction = "POST";
        var url = "https://" + host + '/api/projection/';
        var sendData = {
            "ProjectionTime": date,
            "TicketPrice": price,
            "Administrator": admin,
            "MovieId": movieId,
            "TypeId": projectionType,
            "HallId": hallIdforadd
        };
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            data: sendData
        }).done(function (data, status) {
            load();

            refrechAddProjectionForm();
            $("#addProjectionDiv").hide();

        }).fail(function (data, status) {
            alert("Add   projection  error !");
        })

    });
    //==============================================PAGE USERS===================================
    function pageUsers() {


        $("#infoDiv").show();
        $("#pageUsersDiv").show();

        $("#loginRegisterDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#tableProjectionWithSearch").hide();
        $("#pageMovieDiv").hide();
        $("#buttonMovies").hide();
        $("#buttonkupikartu").hide();
        $("#buttonEditMovie").hide();
        $("#buttonDeleteMovie").hide();
        $("#pageAllMovieDiv").hide();
        $("#addProjectionDiv").hide();

       
        url = 'https://' + host + '/api/user';
        httpAction = "GET";
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,

        }).done(function (data, status) {
            tableUsers(data, status);


        }).fail(function (data, status) {
            alert("Users loading error !");
        })

    };
    //======================================================TABLE USER=============

    function tableUsers(data, status) {
        
        var container = $("#tableUsers");

        container.empty();

        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3> Users </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");

            var header = $("<thead  style='background-color:aquamarine '><tr> <td> Ussername  </td>  <td>Date of registration</td>  <td>Role </td><tr> </thead>");

            table.append(header);

            for (var i = 0; i < data.length; i++) {
                var stringIdForUser = data[i].Id.toString();
                var row = "<tbody><tr class='success'>";
                var displayData = "<td><button id='buttonUserName' class=btn-default name=" + stringIdForUser + ">" + data[i].UserName + "</button></td><td>" + data[i].RegDate + "</td><td>" + data[i].Role + "</td></td>";
                row += displayData + "</tr></tbody>";
                table.append(row);
            }

            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>  Users loading error</h1>");
            div.append(h1);
            container.append(div);
        }

    }

    //===============================================PAGE  USER  ===============
    function pageUser() {

        $("#infoDiv").show();
        $("#pageUserDiv").show();
        $("#buttonPasswordChange").hide();

        $("#loginRegisterDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#tableProjectionWithSearch").hide();
        $("#pageMovieDiv").hide();
        $("#pageAllMovieDiv").hide();
        $("#buttonBuyTicket").hide();
        $("#buttonMovies").hide();
        $("#buttonEditMovie").hide();
        $("#buttonDeleteMovie").hide();
        $("#buttonUserRoleChange").hide();
        $("#buttonDeleteUser").hide();
        $("#pageUsersDiv").hide();

        
        if (this.name == '') {                 // if cklik  button  account 
            stringUserId = userId;
        } else {
            stringUserId = this.name;        // if cklik    button in Users  table 
        }
        url = 'https://' + host + '/api/user/' + stringUserId.toString();
        httpAction = "GET";
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
        }).done(function (data, status) {
            showUser(data, status);

        }).fail(function (data, status) {
            alert("Error , loading User data  !");
        })
    }
    //=================================================DISPLAY  USER ===============
    function showUser(data, status) {
        var container = $("#userData");
        container.empty();

        userObjectRoleChange = data;
        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3> User</h3>");
            div.append(h1);
            var podaciKorisnika = $("<p> Username  &nbsp; &nbsp; &nbsp; &nbsp; :" + data.UserName + " </p><br/>" +
                "<p> Registering date   &nbsp; &nbsp; &nbsp; &nbsp;            :" + data.RegDate + " </p><br/>" +
                "<p> Role     &nbsp; &nbsp; &nbsp; &nbsp;                      :" + data.Role + " </p><br/>");


            container.append(podaciKorisnika);
            if (token != null && user == "admin") {
                $("#buttonPasswordChange").show();
                $("#buttonUserRoleChange").show();
                $("#buttonDeleteUser").show();
                loadUserBuyedTicket();
            }
            if (token != null && stringUserId == userId) {

                $("#buttonPasswordChange").show();
                $("#buttonUserRoleChange").hide();
                $("#buttonDeleteUser").hide();


            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $(" <h1> error , write  user data </h1>");
            div.append(h1);
            container.append(div);
        }

    }

    //==================================================   CHANGE USER ROLE==========
    function changeUserRole() {
        $("#formChangeUserRole").show();

    }

    $("#formRole").submit(function (e) {
        e.preventDefault();
        //=========================================first  logined user data  =======
        var Id = userObjectRoleChange.Id;
        var role = $("#selectedRole").val();
        var httpAction = "PUT";
        var url = "https://" + host + '/api/user/' + Id.toString();
        var sendData = {
            "Id": Id,
            "Password": userObjectRoleChange.Password,
            "UserName": userObjectRoleChange.UserName,
            "RegDate": userObjectRoleChange.RegDate,
            "Role": role
        };
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            data: sendData
        }).done(function (data, status) {
            pageUsers();
            $("#pageUserDiv").hide();
            $("#formChangeUserRole").hide();

        }).fail(function (data, status) {
            alert("error , user role change !");
        })

    });
    //=========================ONLY A LOGGED-IN USER CAN CHANGE THE  HIS OWN PASSWORD (TOKEN )============
    
    function changeUserPassword() {

        $("#changePasswordDiv").show();

    }


    $("#changePasswordform").submit(function (e) {
        e.preventDefault();
        
        //change password in  database dbo.User  and     in   dbo.AspNetUser 

        var oldPassword = $("#oldPassword").val();
        var newPassword1 = $("#newPassword1").val();
        var newPassword2 = $("#newPassword2").val();


        var sendData = {

            "OldPassword": oldPassword,
            "NewPassword": newPassword1,
            "ConfirmPassword": newPassword2
        };
        
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            "type": "POST",
            "url": 'https://' + host + "/api/Account/ChangePassword",
            headers: headers,
            "data": sendData
        }).done(function (data) {
            console.log("PASSWORD IS CHANGED");

        }).fail(function (data) {
           
            alert(" error   , password change  ", data);
        });
        //==============================================CHANGE PASSWORD IN DATABASE  dbo.User =====

        var httpAction = "PUT";
        var url = "https://" + host + '/api/user/' + userObject.Id.toString();
          sendData = {
            "Id": userObject.Id,
            "Password": newPassword1,
            "UserName": userObject.UserName,
            "RegDate": userObject.RegDate,
            "Role": userObject.Role

        };
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            data: sendData
        }).done(function (data, status) {
            pageUsers();
            $("#pageUserDiv").hide();
            $("#formChangeUserRole").hide();

        }).fail(function (data, status) {
            alert("error , dbo.User password change!");
        })

    });
    // =============================================DELETE USER ======
    // =============delete only in dbo.User     NOT DELETE  in   dbo.AspNetUser ======
    // ========================ONCE USED  USERNAME AND DELETED ,NOT POSSIBLE AGAIN USE =========
    $("#buttonDeleteUser").click(deleteUser);
    function deleteUser() {
        var httpAction = "DELETE";
        var url = "https://" + host + '/api/user/' + userObjectRoleChange.Id.toString();

        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,

        }).done(function (data, status) {
           pageUsers();
            $("#pageUserDiv").hide();
            $("#formChangeUserRole").hide();
        }).fail(function (data, status) {
            alert("Desila se greska  prilikom brisanja korisnika !");
        })

    }
    //===============================================TABLE USER TICKETS ============
    function loadUserBuyedTicket() {
     
        // showing   all ticket  buyed from user 
        //  api / ticket /? userId =
        var id = userObjectRoleChange.Id;
        url = "https://" + host + '/api/ticket/?userId=' + id.toString();
        $.getJSON(url, tableUserBuyedTicket);

    }

    function tableUserBuyedTicket(data, status) {


       
        var container = $("#tableUserTickets");

        container.empty();

        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3>User tickets </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");

            var header = $("<thead  style='background-color:aquamarine '><tr> <td> USER  </td>  <td>Projection Time</td>  <td>Projection Hall </td>  <td>Seat  </td><tr> </thead>");

            table.append(header);

            for (var i = 0; i < data.length; i++) {

                var row = "<tbody><tr class='success'>";
                var displayData = "<td>" + data[i].User.UserName + "</td><td>" + data[i].Projection.ProjectionTime + "</td><td>" + data[i].Projection.Hall.Name + "</td><td>" + data[i].Seat.SeatNumber + "</td>";
                row += displayData + "</tr></tbody>";
                table.append(row);
            }

            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>  error table  users ticket </h1>");
            div.append(h1);
            container.append(div);
        }

    }

    //============          ==========================PAGE PROJECTION ============
    function pageProjection() {
        $("#infoDiv").show();
        $("#pageProjectionDiv").show();

        $("#KupiKartuProjekcija").hide();
        $("#adminKorisnikProjekcije").hide();
        $("#loginRegisterDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#tableProjectionWithSearch").hide();
        $("#pageMovieDiv").hide();
        $("#buttonkupikartu").hide();
        $("#buttonEditMovie").hide();
        $("#buttonDeleteMovie").hide();
        $("#pageUsersDiv").hide();
        $("#pageUserDiv").hide();
        $("#movieDiv").hide();

        projectionId = this.name;

       
        url = 'https://' + host + '/api/projection/' + projectionId.toString();
        httpAction = "GET";
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers

        }).done(function (data, status) {

            projectionId = data.Id;
            stringHallId = data.Hall.Id;

            soldTickets(projectionId);
            buyFromProjection = "YES";

            displayProjectionData(data, status);

            if (user == "user") {

                $("#KupiKartuProjekcija").show();
            }
            if (user == "admin") {
                $("#KupiKartuProjekcija").show();
                $("#adminKorisnikProjekcije").show();

            }

        }).fail(function (data, status) {
            alert("Desila se greska!");
        });

    }
    //==================================DELETE PROJECTION========

    function deleteProjection() {

        url = 'https://' + host + '/api/projection/' + projectionId.toString();
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: "DELETE",
            headers: headers,

        }).done(function (data, status) {

            $("#pageProjectionDiv").hide();
            load();
            pageAfterLogin();

        }).fail(function (data, status) {
            alert("error delete projection!");
        })

    }
    // ========================================== sold ticket for projection  ============
    function soldTickets(projectionId) {

        
        
        url = 'https://' + host + '/api/ticket/?projectionId=' + projectionId.toString();
        $.ajax({
            url: url,
            type: "GET",

        }).done(function (data, status) {
            displaySoldTicketTable(data, status);
            numberAvailableTickets = totalSeatsNumber - data.length;
            $("#numberAvailableTickets").html("NUMBER OF AVALIABLE TICKETS    : " + numberAvailableTickets.toString());

        }).fail(function (data, status) {
            alert("desila se greska  prilikom  ucitavanja prodatih karatas !");
        })

    }
    //==========================================DISPLAY PROJECTION  =============
    function displayProjectionData(data, status) {
        var container = $("#projectionData");
        container.empty();
      
        projectionId = data.Id;
        if (status == "success") {
            var div = $("<div></div>")
            var h1 = $(" <h3> PROJECTION </h3>");
            div.append(h1);
            var userData = $("<p> Movie     :" + data.Movie.Name + " </p><br/>" +
                "<p> Projection time               :" + data.ProjectionTime + " </p><br/>" +
                "<p> Hall                         :" + data.Hall.Name + " </p><br/>" +
                "<p> Projection type              :" + data.Type.Name + " </p><br/>" +
                "<p> Ticket price                 :" + data.TicketPrice + " </p><br/>");
            container.append(userData);
        }
        else {
            var div = $("<div></div>");
            var h1 = $(" <h1>error  , display projection data </h1>");
            div.append(h1);
            container.append(div);
        }

    }
    //=======================================TABLE FOR SOLDED  TICKET  ==========
    function displaySoldTicketTable(data, status) {
        var container = $("#tableSoldTicket");

        container.empty();
        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3>   SOLD Ticket  </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");

            var header = $("<thead  style='background-color:aquamarine '><tr> <td> TICKET ID  </td>  <td>DATE </td> <td> Korisnik </td><td>TIME   </td><td>MOVIE</td><td>PRICE</td><td>Sala </td> <td>SEAT NUMBER </td><tr> </thead>");

            table.append(header);


            for (var i = 0; i < data.length; i++) {
              
                var row = "<tbody><tr class='success'>";
                var displayData = "<td>" + data[i].Id + "</td><td>" + data[i].BuyingDate + "</td><td>" + data[i].User.UserName + "</td><td> " + data[i].Projection.ProjectionTime + "</td><td> " + data[i].Projection.Movie.Name + "</td><td> " + data[i].Projection.TicketPrice + "</td ><td> " + data[i].Projection.Hall.Name + "</td><td> " + data[i].Seat.SeatNumber + "</td > ";
                row += displayData + "</tr></tbody>";
                table.append(row);
            }

            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>eror  ,display sold ticket</h1>");
            div.append(h1);
            container.append(div);
        }




    }
    //============================================= BUY TICKET ============================
    //=================================  COMING FROM MOVIE PAGE  ==============
    $("#buttonBuyTicket").click(pageTicketBuyFaze1);

    function pageTicketBuyFaze1() {
        console.log(stringMovieName);
        $("#tableProjectionWithSearch").show();
        $("#projectionTable").show();
        $("#buttonBack").show();

        $("#search").hide();
        $("#adminButton").hide();
        $("#infoDiv").show();
        $("#pageProjectionDiv").hide();
        $("#loginRegisterDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#pageMovieDiv").hide();
        $("#buttonkupikartu").hide();
        $("#buttonEditMovie").hide();
        $("#buttonDeleteMovie").hide();
        $("#pageUsersDiv").hide();
        $("#pageUserDiv").hide();
        $("#movieDiv").hide();


        var httpaction = "POST";
        var url = 'https://' + host + "/api/projection/searching";
        var senddata = {
            "MovieName": stringMovieName.toString(),
            "Hall": null,
            "DateFrom": null,
            "DateTo": null,
            "HallType": null,
            "PriceFrom": null,
            "PriceTo": null

        };
        $.ajax({
            url: url,
            type: httpaction,
            data: senddata
        }).done(function (data, status) {

            tableFor = "BuyTicket";
            console.log(data);
            fillProjectionTable(data, status);

        }).fail(function (data, status) {
            alert("ERROR , pageTicketBuyFaze1!");
        })
        tableFor = "";
    }
    $("body").on("click", "#buttonKupiKartu", pageTicketBuyFaze2);
    $("body").on("click", "#buttonKupiKartuProjekcija", pageTicketBuyFaze2);


    //==================================COMING FROM PROJECTION PAGE  ====
    function pageTicketBuyFaze2() {
        $("#tableProjectionWithSearch").show();
        $("#projectionTable").show();
        $("#infoDiv").show();
        $("#page2BuyTicket").show();

        $("#search").hide();
        $("#adminButton").hide();
        $("#pageProjectionDiv").hide();
        $("#loginRegisterDiv").hide();
        $("#loginDiv").hide();
        $("#registerDiv").hide();
        $("#pageMovieDiv").hide();
        $("#buttonkupikartu").hide();
        $("#buttonEditMovie").hide();
        $("#buttonDeleteMovie").hide();
        $("#pageUsersDiv").hide();
        $("#pageUserDiv").hide();
        $("#movieDiv").hide();

        ticketProjectionId = this.name;

        if (buyFromProjection == "YES") {

            url = 'https://' + host + '/api/projection/' + projectionId.toString();
            buyFromProjection = " ";
        } else {

            url = 'https://' + host + '/api/projection/' + ticketProjectionId.toString();
        }


        console.log("projectionId   iz stranice unos karte", projectionId);
        console.log("KupiKartuProjekcija   iz stranice unos karte", ticketProjectionId);
        console.log("Sta pise u kupovini KARTE", buyFromProjection);

        httpAction = "GET";
        $.ajax({
            url: url,
            type: httpAction,
           
        }).done(function (data, status) {
            console.log("podaci o projekciji iz kupi kartu", data, status)
            stringHallId = data.Hall.Id;
            ticketPrice = data.TicketPrice;
            displayTicketDataFaze2(data, status);
            displaySeatForProjection(data, status);


        }).fail(function (data, status) {
            alert("Error  , display buy ticket projection ");
        });

       


    }
    //================================DISPLAY   SELECTED PROJECTION ============================= 
    function displayTicketDataFaze2(data, status) {
        $("#pageProjectionDiv").hide();
        $("#tableProjectionWithSearch").hide();

        var container = $("#dataProjectionFaze2");
        container.empty();
        finallySelectedProjectionId = data.Id;
        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3> TICKET   FOR   PROJECTION </h3>");
                        
            div.append(h1);
            var projectionData = $("<p> MOVIE    :" + data.Movie.Name + " </p><br/>" +
                "<p>PROJECTION TIME                :" + data.ProjectionTime + " </p><br/>" +
                "<p> HALL                         :" + data.Hall.Name + " </p><br/>" +
                "<p> PROJECTION TYPE             :" + data.Type.Name + " </p><br/>" +
                "<p> TICKET PRICE                  :" + data.TicketPrice + " </p><br/>");
            div.append(projectionData);
            container.append(div);
        }

        else {
            var div = $("<div></div>");
            var h1 = $(" <h1> Error ,  projection data for buyed ticket </h1>");
            div.append(h1);
            container.append(div);
        }

    }
    //=============================================== BUYED  TICKET FOR PROJECTION  =========
    function displaySeatForProjection(data, status) {
        stringHallId = data.HallId;                            //    Id  of hall   wher is the projection   
        var stringprojectionId = data.Id.toString();          //     Id     projection  
       
        url = 'https://' + host + '/api/ticket/?projectionId=' + stringprojectionId;
        $.ajax({
            url: url,
            type: "GET",
        }).done(function (data, status) {
            console.log('data avaliable seats', data)
            displaySeatTable(data, status);

        }).fail(function (data, status) {

            alert("desila se greska  prilikom  ucitavanja prodatih karata!");
        })

    }
    //=====================DISPLAY SEAT FOR PROJECTION  ================
    function displaySeatTable(data, status) {
      //  (db.Tickets.Include(x => x.User).Include(x => x.Projection.Movie).Include(x => x.Projection.Hall).Include(x => x.Seat).Where(x => x.Projection.Id == projectionId);)
        var container = $("#chooseSeat");
      
        container.empty();

        var div = $("<div></div>")
        var h1 = $(" <h3> CHOOSE SEAT </h3>");
        var h2 = $(" <h3 style='text-align: left;'> =====================screen================== </h3>");
        div.append(h1);
        div.append(h2);
        console.log(seats);
        for (var i = 0; i < seats.length; i++) {
            var row = "";
            var displayData = "<button  id='buttonSeat' class='btn' seat=" + seats[i] + " >seat" + seats[i] + "</button>";
            if ((i + 1) % 5 == 0) {

                displayData += "<br>";
            }
            row += displayData;
            div.append(row);
        }
        container.append(div);
        //=============== ====================== DISABLED  SOLD SEATS in table   ========  

        for (var j = 0; j < data.length; j++) {
            var sold = data[j].Seat.SeatNumber.toString();   // data FROM ('/api/ticket/?projectionId='),  for projection Id i have seat number ,this number is disable,
                $('.btn').each(function () {
                    if ($(this).attr("seat") == sold) {
                       $(this).attr("disabled", true);
                    }
                });
            }
    }

    $("body").on("click", "#buttonSeat", function () {
        $(this).toggleClass("active");                      //change class 'btn' too class  'active'
    });

    $("#continue").click(calculation);
    //===================kalkulisanje rezultata ================
    function calculation() {

        $('#page3BuyTicket').show();
        $('#chooseSeat').hide();
        $('#daljeKarta').hide();
        $('#projectionTable').hide();
        $('#buyDiv').hide();
        if (token != null) {
            $('#buyDiv').show();
        }

        $('.btn').each(function () {            // svaka    'btn' classa (trenutno je aktivna samo tabela sedista  sa 'button' elementima )   
            if ($(this).hasClass("active")) {     //
                var seat = $(this).attr("seat");
                selectedSeat.push(seat);
            }
        });
        console.log(selectedSeat);
        var container = $("#page3BuyTicket");
        $("#selectedSeatForTicket").append("<p> Selected Seats for this Projection  </p>");
        container.append(selectedSeat.forEach(function (i) {                   // prolazim kroz listu obelezenih sedista
            $("#selectedSeatForTicket").append('<li>' + i + '</li>');
        }));

        $("#totalPrice").append('TOTAL PRICE  :' + (selectedSeat.length * ticketPrice));

    };
    $("#finallyBuy").click(madeTicket);
    //==========================================================MADE TICKET  ===================
    function madeTicket() {     //  for ticket i need (BuyinDate =new Date().toJSON(); UserId,ProjectionId,SeatId )

        for (var i = 0; i < selectedSeat.length; i++) {
            console.log("strinsalaId iz stvori kartu ", stringHallId);
            console.log("izabrano seat ", selectedSeat[i]);
            findSeatId(stringHallId, selectedSeat[i].toString());  // exmp. HallId(1)   and  SeatNumber("A1")   => find  SeatID

        }

    }
    //===========================================  FIND    SEAT ID NUMBER ======
    function findSeatId(hallId, ordinal) {
         //Get api/seat/?hallId={}&&seatNumber={}
        var url = "https://" + host + '/api/seat/?hallId=' + hallId.toString() + '&&seatNumber=' + ordinal.toString();
        $.ajax({
            url: url,
            type: "GET",
        }).done(function (data, status) {
            seatId = data.Id;
            buyTicketFor(seatId);
           

        }).fail(function (data, status) {

            alert("error find seat id !");
        })

    }
    //====================================================FINISH  TICKET BUYING  for seat =====================================
    function buyTicketFor(seatId) {
        // Ticket :    today  date ,userId,projectionId,SedisteId
      
        var httpAction = "POST";
        var url = "https://" + host + '/api/ticket/';
        var sendData = {
            "BuyingDate": new Date().toJSON(),
            "UserId": userId,                         //   signed    user  ID
            "ProjectionId": finallySelectedProjectionId,
            "SeatId": seatId,
        };
        console.log("poslati podaci za kreiranje karte", sendData);
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            data: sendData
        }).done(function (data, status) {
            $('#page2BuyTicket').hide();
         
            $('#chooseSeat').hide();
            $('#daljeKarta').hide();
            $('#projectionTable').hide();
            $('#buyDiv').hide();
            var id = userId;
            url = "https://" + host + '/api/ticket/?userId=' + id.toString();
            $.getJSON(url, totalTicket);

        }).fail(function (data, status) {
            alert("error  when make ticket ");
        })

    }
    // ==================================================DISPLAY  ONLY ACTIVE TICKET FOR USER  ========
    function totalTicket(data, status) {
        var container = $("#yourTickets");
        container.empty();
        if (status == "success") {
            var div = $("<div></div>")
            var h1 = $(" <h3> Tickets  </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");
            var header = $("<thead  style='background-color:aquamarine '><tr> <td> TICKET  ID  </td>  <td>BUYING DATE</td> <td> USER </td><td>PROJECTION TIME</td><td>MOVIE</td><td>TICKET PRICE</td><td>HALL </td> <td>SEAT </td><tr> </thead>");
            table.append(header);

            for (var i = 0; i < data.length; i++) {
                if (data[i].BuyingDate >= new Date().toJSON()) {  // ONLY   ACTIVE TICKET DISPLAYING
                    var row = "<tbody><tr class='success'>";
                    var displayData = "<td>" + data[i].Id + "</td><td>" + data[i].BuyingDate + "</td><td>" + data[i].User.UserName + "</td><td> " + data[i].Projection.ProjectionTime + "</td><td> " + data[i].Projection.Movie.Name + "</td><td> " + data[i].Projection.TicketPrice + "</td ><td> " + data[i].Projection.Hall.Name + "</td><td> " + data[i].Seat.SeatNumber + "</td > ";
                    row += displayData + "</tr></tbody>";
                    table.append(row);
                }
            }
            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   ERROR ,   active ticket displaying </h1>");
            div.append(h1);
            container.append(div);
        }

    }
    //======================================BACK FROM  TICKETS ========== 
    function backFromTickets() {
        pageAfterLogin();
        $("#tableProjectionWithSearch").show();
        $("#projectionTable").show();
        $("#infoDiv").show();
        tabela = " ";
        $('#page3BuyTicket').hide();
        $('#page2BuyTicket').hide();
      
    }
   
}); //END 


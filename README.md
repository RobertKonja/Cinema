# Cinema/ online ticket booking.
ASP.NET Rest Api single-page application ,database SQL,Entity Framework\
-Front-End : Javascript => JQuery    with     Ajax request .\
-Back-End : - Visual Studio 2019.\
                 -c# ;  Asp.Net ; Individual authorization ; local database SQL ; Entity Framework \
                 - Dependency Injection (for unit test -Not finish);\
 The application simulates online booking  of cinema tickets.\
 -This application is used by 3 groups of users: \
            -  not logged  user (only explore)\
           - logged  user (only logged user is possible booking ticket)\
           - (admin)  administrator (with different possibilities of access to certain operations). \
  During installation it is necessary to:\
 enable => NuGet Package Manager => restore (automatically appears only to confirm restore).\
 -The project uses a local SQL database.\
 -Open: Tools => Nuget Package manager => Package Manager Console
=> type:\
          1.add-migration (name as desired)\
          2.update-database\
Entity Framework creates a database (Cinema) with tables, filled with the initial data needed to manipulate the app. -Users: \
(admin) (Username)=Boss     ( Password)= Password.1234\
(user)     (Username)=Jon       ( Password)= Password.123\




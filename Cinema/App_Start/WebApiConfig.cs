﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Cinema.Interface;
using Cinema.Repository;
using Cinema.Resolver;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;

namespace Cinema
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var container = new UnityContainer();
            container.RegisterType<IMovieRepository, MovieRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ITicketRepository, TicketRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IUserRepository, UserRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IProjectionRepository, ProjectionRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IHallRepository, HallRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ISeatRepository, SeatRepository>(new HierarchicalLifetimeManager());



            config.DependencyResolver = new UnityResolver(container);










        }
    }
}

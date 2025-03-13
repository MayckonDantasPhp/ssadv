/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});



const estadosAtuacao = ["SP", "SE", "PA", "MG", "CE", "RN", "AL", "RS", "RJ", "MT"];
const paisesAtuacao = { "Portugal": [-9.14, 38.73], "Uruguai": [-56.16, -34.90], "Michigan": [-85.58, 44.31] };

function desenharMapaBrasil() {
    fetch("https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson")
        .then(res => res.json())
        .then(data => {
            const width = 600, height = 600;
            const projection = d3.geoMercator().fitSize([width, height], data);
            const path = d3.geoPath().projection(projection);

            const svg = d3.select("#mapa-brasil")
                .attr("width", width)
                .attr("height", height);

            svg.selectAll("path")
                .data(data.features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", d => estadosAtuacao.includes(d.properties.sigla) ? "#ff5733" : "#ccc")
                .attr("stroke", "#000");
        });
}

function desenharMapaMundo() {
    fetch("https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json")
        .then(res => res.json())
        .then(data => {
            const width = 800, height = 400;
            const projection = d3.geoMercator().scale(130).translate([width / 2, height / 1.5]);
            const path = d3.geoPath().projection(projection);

            const svg = d3.select("#mapa-mundo")
                .attr("width", width)
                .attr("height", height);

            svg.selectAll("path")
                .data(topojson.feature(data, data.objects.countries).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", d => Object.keys(paisesAtuacao).includes(d.properties.name) ? "#ff5733" : "#ccc")
                .attr("stroke", "#000");
        });
}

desenharMapaBrasil();
desenharMapaMundo();


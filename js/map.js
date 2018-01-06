mapboxgl.accessToken =
  "pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v9",
  //  style: 'mapbox://styles/mapbox/satellite-v9',
  hash: true,
  center: [-94, 38],
  zoom: 4,
  pitchWithRotate: false
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-left");

urlHash = window.location.hash;

map.on("load", function() {
  var sliderVal = $("#date").val();
  // var yr = parseInt($('#date').val());
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));

  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

  $("#linkButton").on("click", function() {
    document.location.href = "raster-version.html" + urlHash;
  });

  //Add neatural earth

  map.addLayer({
    id: "naturalearth",
    source: {
      type: "raster",
      tiles: [
        "https://a.tiles.mapbox.com/v3/mapbox.natural-earth-2/{z}/{x}/{y}@2x.png"
      ]
    },
    type: "raster"
  });

  /////////////////////////////////////////////////////////////
  //Add buildings layers
  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  //Ames, IA
  //Buildings
  /////////////////////////////////////////////////////////////
  map.addLayer({
    id: "buildings",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://nittyjee.058256b7"
    },
    "source-layer": "buildings",
    paint: {
      "fill-outline-color": "rgba(0,0,0,0)",
      "fill-color": {
        property: "YearStart",
        type: "interval",
        stops: [
          [0, "#2e3436"],
          [1600, "#888a85"],
          [1700, "#5c3566"],
          [1800, "#75507b"],
          [1850, "#a40000"],
          [1900, "#cc0000"],
          [1950, "#f57900"],
          [2000, "#edd400"]
        ]
      }
    },
    filter: ["all", ["<=", "YearStart", yr], [">=", "YearEnd", yr]]
  });

  /////////////////////////////////////////////////////////////
  //Netherlands
  //Buildings
  /////////////////////////////////////////////////////////////

  map.addLayer({
    id: "netherlands_buildings-6wkgma",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://nittyjee.d4hvz40x"
    },
    "source-layer": "Netherlands_Buildingsgeojson",
    paint: {
      "fill-outline-color": "rgba(0,0,0,0)",
      "fill-color": {
        property: "YearStart",
        type: "interval",
        stops: [
          [0, "#2e3436"],
          [1600, "#888a85"],
          [1700, "#5c3566"],
          [1800, "#75507b"],
          [1850, "#a40000"],
          [1900, "#cc0000"],
          [1950, "#f57900"],
          [2000, "#edd400"]
        ]
      }
    },
    filter: ["all", ["<=", "YearStart", yr], [">=", "YearEnd", yr]]
  });

  /////////////////////////////////////////////////////////////
  //Add boundaries layers
  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  //Add Minor Boundaries Layer
  //USA
  /////////////////////////////////////////////////////////////

  map.addLayer({
    id: "US_Minor_Boundaries-1lyzcs",
    source: {
      type: "vector",
      url: "mapbox://nittyjee.az4itfz9"
    },
    "source-layer": "US_Minor_Boundariesgeojson",
    type: "fill",
    maxzoom: 6,
    paint: {
      //		'line-color': '#000000'
      "fill-outline-color": "rgba(0, 0, 0, 0.15)",
      "fill-color": "rgba(0, 0, 0, 0)"
    },
    filter: ["all", ["<=", "YearStart", yr], [">=", "YearEnd", yr]]
  });

  /////////////////////////////////////////////////////////////
  //Add Major Boundaries Layer
  //USA
  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  //Lines
  /////////////////////////////////////////////////////////////

  map.addLayer({
    //    'id': 'US_Major_Boundaries_Lines-aceyhz',
    id: "US_Major_Boundaries_Lines-2706lh",
    source: {
      type: "vector",
      url: "mapbox://nittyjee.ajotvzcc"
    },
    "source-layer": "US_Major_Boundaries_Linesgeojson",
    type: "line",
    maxzoom: 6,
    paint: {
      "line-offset": 1,
      "line-width": 1.5,
      "line-color": {
        property: "TERR_TYPE",
        type: "categorical",
        stops: [
          //Bright Blue
          ["Colony", "#0000ee"],
          //Orange
          ["Unorganized Territory", "#ff9900"],
          //Dark Red
          ["Territory", "#cc3300"],
          //Bright Red
          ["State", "#cd0000"],
          //Bright Green
          ["Other", "#009933"],
          //Black
          ["District of Columbia", "#000000"]
        ]
      }
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
  });

  /////////////////////////////////////////////////////////////
  //Add Labels Layer
  //Major Boundaries
  //USA
  /////////////////////////////////////////////////////////////

  map.addSource("us_major_boundary_labels_src", {
    type: "vector",
    url: "mapbox://nittyjee.7x096jcj"
  });

  /* labels for US Major Boundaries */
  map.addLayer({
    id: "us_major_boundary_labels",
    source: "us_major_boundary_labels_src",
    "source-layer": "shapefile_update_2-28a1ki",
    type: "symbol",
    maxzoom: 6,
    layout: {
      "text-field": "{name}"
    },
    /*
  'paint': {
    'text-color': 'red'
  },
  */
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
  });

  /////////////////////////////////////////////////////////////
  //Add Major Boundaries Layer
  //Indian Subcontinent
  /////////////////////////////////////////////////////////////

  map.addLayer({
    id: "Indian_Subcontinent_Major_Bou-dpiee3",
    source: {
      type: "vector",
      url: "mapbox://nittyjee.3qczytus"
    },
    "source-layer": "Indian_Subcontinent_Major_Boundariesgeojson",
    type: "fill",
    maxzoom: 6,
    //		'fill-color': 'rgba(255,0,0,0)',

    // /*

    //------------------------------------------------
    paint: {
      //        'fill-outline-color': 'rgba(0,0,0,1)',
      "fill-color": {
        property: "TYPE",
        type: "categorical",
        stops: [
          ["Afghans", "rgba(184,199,101,1)"],
          //
          //Agency should be dashed:
          ["Agency", "rgba(0,0,0,0)"],
          //
          ["Agency (Princely)", "rgba(255,127,127,1)"],
          ["Agency, British Portion", "rgba(255,190,190,1)"],
          ["ANEX_COMPLETE", "rgba(255,190,190,1)"],
          ["ANNEX_COMPLET", "rgba(255,190,190,1)"],
          ["ANNEX_COMPLETE", "rgba(255,190,190,1)"],
          ["ANNEXED_COMPLETE", "rgba(255,190,190,1)"],
          ["ANNEXED_PROTECTED", "rgba(255,190,190,1)"],
          ["ANNEXED_TWICE", "rgba(255,190,190,1)"],
          ["Autonomous Area", "rgba(255,127,127,1)"],
          ["Bangash", "rgba(164,114,173,1)"],
          ["BANGLADESH", "rgba(255,190,232,1)"],
          ["Benares", "rgba(223,115,255,1)"],
          ["Bengal", "rgba(76,115,0,1)"],
          ["British", "rgba(255,190,190,1)"],
          ["British (administration)", "rgba(255,190,190,1)"],
          ["British (direct relations)", "rgba(255,190,190,1)"],
          ["British (feudatory)", "rgba(255,127,127,1)"],
          ["British (leased)", "rgba(255,190,190,1)"],
          ["British (Partial)", "rgba(255,190,190,1)"],
          ["British (protectorate)", "rgba(255,190,190,1)"],
          ["British (Province)", "rgba(255,190,190,1)"],
          ["British (Special)", "rgba(255,127,127,1)"],
          ["British (subordinate ally)", "rgba(255,190,190,1)"],
          ["British (Temporary)", "rgba(255,190,190,1)"],
          ["British special treaty", "rgba(255,190,190,1)"],
          ["British, Chief Commissioner's Province", "rgba(255,190,190,1)"],
          ["British, Chief Commissionership", "rgba(255,190,190,1)"],
          ["Carnatic", "rgba(250,243,142,1)"],
          ["CARNATIC", "rgba(127,138,55,1)"],
          ["CIS-SUTLEJ SIKHS", "rgba(209,109,186,1)"],
          ["Cochin", "rgba(187,237,157,1)"],
          ["COCHIN", "rgba(130,196,73,1)"],
          //
          //Crown Colony should have black outline:
          ["Crown Colony", "rgba(0,0,0,0)"],
          //
          ["Cutch", "rgba(91,148,240,1)"],
          ["CUTCH", "rgba(120,49,140,1)"],
          ["Denmark", "rgba(206,84,240,1)"],
          ["DUTCH", "rgba(140,49,96,1)"],
          ["FARRUKHABAD", "rgba(165,185,250,1)"],
          ["Feudatory State", "rgba(255,127,127,1)"],
          ["French", "rgba(130,230,126,1)"],
          ["Gorakhpur", "rgba(97,250,97,1)"],
          ["INDIA", "rgba(190,232,255,1)"],
          ["Jammu & Kashmir (Protection, Full Area)", "rgba(255,127,127,1)"],
          ["Jammu & Kashmir (Protection)", "rgba(255,127,127,1)"],
          ["Jats", "rgba(179,115,109,1)"],
          ["JATS", "rgba(189,75,179,1)"],
          ["Kalhoras", "rgba(121,60,128,1)"],
          ["Lahore", "rgba(124,101,173,1)"],
          ["Lower Doab", "rgba(117,250,107,1)"],
          ["Malabar", "rgba(204,119,98,1)"],
          ["MALABAR", "rgba(204,119,98,1)"],
          //
          //Marathas or MARATHA should not have a border:
          ["MARATHA", "rgba(163,255,115,1)"],
          //
          ["Marathas", "rgba(163,255,115,1)"],
          ["Mughals", "rgba(0,169,230,1)"],
          ["MUGHALS", "rgba(0,169,230,1)"],
          ["Mysore", "rgba(91,185,240,1)"],
          ["MYSORE", "rgba(166,81,78,1)"],
          ["NEPAL", "rgba(255,190,232,1)"],
          ["Nizam", "rgba(112,168,0,1)"],
          ["NIZAM", "rgba(112,168,0,1)"],
          ["Northern Circars, Masulipatam", "rgba(140,50,76,1)"],
          ["Oudh", "rgba(132,0,168,1)"],
          ["OUDH", "rgba(132,0,168,1)"],
          ["PAKISTAN", "rgba(233,255,190,1)"],
          ["Portuguese", "rgba(191,164,96,1)"],
          ["PORTUGUESE", "rgba(132,196,169,1)"],
          ["Portuguese India", "rgba(68,165,173,1)"],
          //
          //Presidency should be dashed:
          ["Presidency", "rgba(0,0,0,0)"],
          //
          ["Princely Area", "rgba(255,127,127,1)"],
          ["Princely_State", "rgba(255,127,127,1)"],
          ["PROTECED_COMPLETE", "rgba(255,127,127,1)"],
          ["PROTECTED", "rgba(255,127,127,1)"],
          ["PROTECTED_ANNEXED", "rgba(255,127,127,1)"],
          ["PROTECTED_COMPLETE", "rgba(255,127,127,1)"],
          ["PROTECTED_TWICE", "rgba(255,127,127,1)"],
          //
          //Province should have black outline:
          ["Province", "rgba(0,0,0,0)"],
          //
          ["Province (British)", "rgba(255,190,190,1)"],
          ["Province (Princely)", "rgba(255,127,127,1)"],
          ["Province, British Portion", "rgba(255,190,190,1)"],
          ["RAJPUTANA", "rgba(255,255,190,1)"],
          ["Rajputs", "rgba(255,255,190,1)"],
          ["Rohilkhand", "rgba(161,63,126,1)"],
          ["Rohillas", "rgba(81,196,142,1)"],
          ["SAVANTVADI", "rgba(203,212,78,1)"],
          ["SINDHIA", "rgba(163,255,115,1)"],
          ["SIROHI", "rgba(163,83,158,1)"],
          ["TANJORE", "rgba(201,133,147,1)"],
          ["TRAVANCORE", "rgba(114,79,179,1)"],
          ["Unlabeled", "rgba(130,130,130,1)"],
          ["UNLABELED", "rgba(130,130,130,1)"],
          ["NULL", "rgba(239,245,191,1)"]
        ]
      }
    },

    filter: ["all", ["<=", "YearStart", yr], [">=", "YearEnd", yr]]
  });

  /////////////////////////////////////////////////////////////
  //Add Major Boundaries Layer
  //Indian Subcontinent
  //Lines
  /////////////////////////////////////////////////////////////

  map.addLayer({
    id: "Indian_Subcontinent_Major_Bou-5gq491",
    source: {
      type: "vector",
      url: "mapbox://nittyjee.aozn7vub"
    },
    "source-layer": "Indian_Subcontinent_Major_Boundaries_Linesgeojson",
    type: "line",
    maxzoom: 6,
    paint: {
      //		'line-offset': 1,
      //		'line-width': 1.5,
      "line-color": {
        property: "TYPE",
        type: "categorical",
        stops: [
          ["Afghans", "rgba(0,0,0,1)"],
          //Agency should be dashed:
          ["Agency", "rgba(0,0,0,1)"],
          ["Agency (Princely)", "rgba(0,0,0,1)"],
          ["Agency, British Portion", "rgba(0,0,0,1)"],
          ["ANEX_COMPLETE", "rgba(0,0,0,1)"],
          ["ANNEX_COMPLET", "rgba(0,0,0,1)"],
          ["ANNEX_COMPLETE", "rgba(0,0,0,1)"],
          ["ANNEXED_COMPLETE", "rgba(0,0,0,1)"],
          ["ANNEXED_PROTECTED", "rgba(0,0,0,1)"],
          ["ANNEXED_TWICE", "rgba(0,0,0,1)"],
          ["Autonomous Area", "rgba(0,0,0,1)"],
          ["Bangash", "rgba(0,0,0,1)"],
          ["BANGLADESH", "rgba(0,0,0,1)"],
          ["Benares", "rgba(0,0,0,1)"],
          ["Bengal", "rgba(0,0,0,1)"],
          ["British", "rgba(0,0,0,1)"],
          ["British (administration)", "rgba(0,0,0,1)"],
          ["British (direct relations)", "rgba(0,0,0,1)"],
          ["British (feudatory)", "rgba(0,0,0,1)"],
          ["British (leased)", "rgba(0,0,0,1)"],
          ["British (Partial)", "rgba(0,0,0,1)"],
          ["British (protectorate)", "rgba(0,0,0,1)"],
          ["British (Province)", "rgba(0,0,0,1)"],
          ["British (Special)", "rgba(0,0,0,1)"],
          ["British (subordinate ally)", "rgba(0,0,0,1)"],
          ["British (Temporary)", "rgba(0,0,0,1)"],
          ["British special treaty", "rgba(0,0,0,1)"],
          //["British, Chief Commissioner's Province", 'rgba(0,0,0,1)'],
          ["British, Chief Commissionership", "rgba(0,0,0,1)"],
          ["Carnatic", "rgba(0,0,0,1)"],
          ["CARNATIC", "rgba(0,0,0,1)"],
          ["CIS-SUTLEJ SIKHS", "rgba(0,0,0,1)"],
          ["Cochin", "rgba(0,0,0,1)"],
          ["COCHIN", "rgba(0,0,0,1)"],
          //Crown Colony should have black outline:
          ["Crown Colony", "rgba(0,0,0,1)"],
          ["Cutch", "rgba(0,0,0,1)"],
          ["CUTCH", "rgba(0,0,0,1)"],
          ["Denmark", "rgba(0,0,0,1)"],
          ["DUTCH", "rgba(0,0,0,1)"],
          ["FARRUKHABAD", "rgba(0,0,0,1)"],
          ["Feudatory State", "rgba(0,0,0,1)"],
          ["French", "rgba(0,0,0,1)"],
          ["Gorakhpur", "rgba(0,0,0,1)"],
          ["INDIA", "rgba(0,0,0,1)"],
          ["Jammu & Kashmir (Protection", "rgba(0,0,0,1)"],
          //['Jammu & Kashmir (Protection)', 'rgba(0,0,0,1)'],
          ["Jats", "rgba(0,0,0,1)"],
          ["JATS", "rgba(0,0,0,1)"],
          ["Kalhoras", "rgba(0,0,0,1)"],
          ["Lahore", "rgba(0,0,0,1)"],
          ["Lower Doab", "rgba(0,0,0,1)"],
          ["Malabar", "rgba(0,0,0,1)"],
          ["MALABAR", "rgba(0,0,0,1)"],
          //Marathas or MARATHA should not have a border:
          ["MARATHA", "rgba(0,0,0,0)"],
          ["Marathas", "rgba(0,0,0,0)"],
          ["Mughals", "rgba(0,0,0,1)"],
          ["MUGHALS", "rgba(0,0,0,1)"],
          ["Mysore", "rgba(0,0,0,1)"],
          ["MYSORE", "rgba(0,0,0,1)"],
          ["NEPAL", "rgba(0,0,0,1)"],
          ["Nizam", "rgba(0,0,0,1)"],
          ["NIZAM", "rgba(0,0,0,1)"],
          ["Northern Circars", "rgba(0,0,0,1)"],
          ["Oudh", "rgba(0,0,0,1)"],
          ["OUDH", "rgba(0,0,0,1)"],
          ["PAKISTAN", "rgba(0,0,0,1)"],
          ["Portuguese", "rgba(0,0,0,1)"],
          ["PORTUGUESE", "rgba(0,0,0,1)"],
          ["Portuguese India", "rgba(0,0,0,1)"],
          //Presidency should be dashed:
          ["Presidency", "rgba(0,0,0,1)"],
          //
          ["Princely Area", "rgba(0,0,0,1)"],
          ["Princely_State", "rgba(0,0,0,1)"],
          ["PROTECED_COMPLETE", "rgba(0,0,0,1)"],
          ["PROTECTED", "rgba(0,0,0,1)"],
          ["PROTECTED_ANNEXED", "rgba(0,0,0,1)"],
          ["PROTECTED_COMPLETE", "rgba(0,0,0,1)"],
          ["PROTECTED_TWICE", "rgba(0,0,0,1)"],
          //
          //Province should have black outline:
          ["Province", "rgba(0,0,0,1)"],
          //
          ["Province (British)", "rgba(0,0,0,1)"],
          ["Province (Princely)", "rgba(0,0,0,1)"],
          ["RAJPUTANA", "rgba(0,0,0,1)"],
          ["Rajputs", "rgba(0,0,0,1)"],
          ["Rohilkhand", "rgba(0,0,0,1)"],
          ["Rohillas", "rgba(0,0,0,1)"],
          ["SAVANTVADI", "rgba(0,0,0,1)"],
          ["SINDHIA", "rgba(0,0,0,1)"],
          ["SIROHI", "rgba(0,0,0,1)"],
          ["TANJORE", "rgba(0,0,0,1)"],
          ["TRAVANCORE", "rgba(0,0,0,1)"],
          ["Unlabeled", "rgba(0,0,0,1)"],
          ["UNLABELED", "rgba(0,0,0,1)"],
          ["NULL", "rgba(0,0,0,1)"]
        ]
      }
    },

    filter: ["all", ["<=", "YearStart", yr], [">=", "YearEnd", yr]]
  });

  /////////////////////////////////////////////////////////////
  //Add Settlements Layer
  //Points
  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  //Global Settlements
  /////////////////////////////////////////////////////////////

  map.addLayer({
    id: "population",
    type: "circle",
    source: {
      type: "vector",
      url: "mapbox://nittyjee.c9okffto"
    },
    "source-layer": "shp-2lsmbo",
    paint: {
      //      'circle-radius': 4,

      "circle-radius": {
        property: "pop",
        stops: [
          [0, 1],
          [10000, 2],
          [50000, 3],
          [250000, 4],
          [1000000, 5],
          [2500000, 6],
          [5000000, 7],
          [10000000, 8],
          [30000000, 9]
        ]
      }

      /*
				'circle-color': {
                property: 'pop',
                stops: [
                    [0, '#F2F12D'],
                    [10000, '#EED322'],
                    [50000, '#E6B71E'],
                    [250000, '#DA9C20'],
                    [1000000, '#CA8323'],
                    [2500000, '#B86B25'],
                    [5000000, '#A25626'],
                    [10000000, '#8B4225'],
                    [30000000, '#723122']
                ]
				}
 */
    },
    filter: ["all", ["<=", "YearStart", yr], [">=", "YearEnd", yr]]
  });

  // Trying to add a single point

  /*
  
      map.addLayer({
		  "geojson-marker": {
			  "type": "geojson",
			  "data": {
				  "type": "Feature",
				  "geometry": {
					  "type": "Point",
					  "coordinates": [-77.0323, 38.9131]
					  },
					  "properties": {
						  "title": "Mapbox DC",
						  "marker-symbol": "monument"
						  }
						  }
						  }
						  });
	
*/

  /*Map events*/
  map.on("click", "buildings", function(e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<b>Year Built:</b>" +
          e.features[0].properties.YearStart +
          "<br>" +
          "<b>Year Demolished:</b>" +
          e.features[0].properties.YearEnd
      )
      .addTo(map);
  });

  map.on("mouseenter", "buildings", function() {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "buildings", function() {
    map.getCanvas().style.cursor = "";
  });

  map.on("moveend", function() {
    urlHash = window.location.hash + "/" + $("#year").val();
    // document.location.href = 'raster-version.html' + urlHash;
    // console.log(document.location.href)
    console.log(urlHash);
  });
});

map.on("error", function(e) {
  // Hide those annoying non-error errors
  if (e && e.error !== "Error") console.log(e);
});

function changeDate(unixDate) {
  var year = parseInt(moment.unix(unixDate).format("YYYY"));
  var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));

  var sv = $("#year");
  if (year < 1700) {
    sv
      .removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1600");
  }
  if (year >= 1700 && year < 1800) {
    sv
      .removeClass("y1600")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1700");
  }
  if (year >= 1800 && year < 1850) {
    sv
      .removeClass("y1700")
      .removeClass("y1600")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1800");
  }
  if (year >= 1850 && year < 1900) {
    sv
      .removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1600")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1850");
  }
  if (year >= 1900 && year < 1950) {
    sv
      .removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1600")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1900");
  }
  if (year >= 1950 && year < 2000) {
    sv
      .removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1600")
      .removeClass("y2000")
      .addClass("y1950");
  }
  if (year >= 2000) {
    sv
      .removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y1600")
      .addClass("y2000");
  }

  var yrFilter = ["all", ["<=", "YearStart", year], [">=", "YearEnd", year]];

  var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

  /*
  var dateFilter = ['all',
    ['<=', 'start_n', date],
    ['>=', 'end_n', date]
  ];
  
*/

  //Ames Buildings
  map.setFilter("buildings", yrFilter);

  //Netherlands Buildings
  map.setFilter("netherlands_buildings-6wkgma", yrFilter);

  //US State Boundaries
  //  map.setFilter('US_State_Boundaries-7edz8s', yrFilter);

  //US Major Boundaries - polygons
  //  map.setFilter('Major_Boundaries-4abmlj', yrFilter);

  //US Major Boundaries - lines
  //  map.setFilter('US_Major_Boundaries_Lines-aceyhz', dateFilter);
  map.setFilter("US_Major_Boundaries_Lines-2706lh", dateFilter);

  //US Major Boundaries - earlier
  //map.setFilter('us_major_boundaries', dateFilter);

  //US Minor Boundaries - polygons
  map.setFilter("US_Minor_Boundaries-1lyzcs", yrFilter);

  //Indian Subcontinent Major Boundaries - polygons
  map.setFilter("Indian_Subcontinent_Major_Bou-dpiee3", yrFilter);

  //US Major Boundaries- Labels
  map.setFilter("us_major_boundary_labels", dateFilter);

  //Indian Subcontinent Major Boundaries - lines
  map.setFilter("Indian_Subcontinent_Major_Bou-5gq491", yrFilter);

  //Global Settlements - points
  map.setFilter("population", yrFilter);
} //end map load

/* CODE FOR LAYER LIST/LEGEND */
var toggleableLayerIds = [
  "buildings",
  "netherlands_buildings-6wkgma",
  "US_Major_Boundaries_Lines-2706lh",
  "US_Minor_Boundaries-1lyzcs",
  "Indian_Subcontinent_Major_Bou-dpiee3",
  "us_major_boundary_labels",
  "Indian_Subcontinent_Major_Bou-5gq491",
  "population"
];

var legend = document.getElementById("legend");

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  // Add checkbox and label elements for the layer.
  var input = document.createElement("input");
  input.type = "checkbox";
  input.id = id;
  input.checked = true;
  // legend.appendChild(input);

  var label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = id;
  // legend.appendChild(label);

  // When the checkbox changes, update the visibility of the layer.
  input.addEventListener("change", function(e) {
    map.setLayoutProperty(
      id,
      "visibility",
      e.target.checked ? "visible" : "none"
    );
  });

  var layers = document.getElementById("legend");
  layers.appendChild(input);
  layers.appendChild(label);
  layers.appendChild(document.createElement("br"));

  // var link = document.createElement("a");
  // link.href = "#";
  // link.className = "active";
  // link.textContent = id;

  // link.onclick = function(e) {
  //   var clickedLayer = this.textContent;
  //   e.preventDefault();
  //   e.stopPropagation();

  //   var visibility = map.getLayoutProperty(clickedLayer, "visibility");

  //   if (visibility === "visible") {
  //     map.setLayoutProperty(clickedLayer, "visibility", "none");
  //     this.className = "";
  //   } else {
  //     this.className = "active";
  //     map.setLayoutProperty(clickedLayer, "visibility", "visible");
  //   }
  // };

  // var layers = document.getElementById("legend");
  // layers.appendChild(link);
}

mapboxgl.accessToken = 'pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
//  style: 'mapbox://styles/mapbox/satellite-v9',
  hash: true,
  center: [-93.6135, 42.0256],
  zoom: 15,
  pitchWithRotate: false,
})

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

urlHash = window.location.hash;

map.on('load', function(){
  var sliderVal = $('#date').val();
  // var yr = parseInt($('#date').val());
  var yr = parseInt(moment.unix(sliderVal).format('YYYY'));

  var date = parseInt(moment.unix(sliderVal).format('YYYYMMDD'));

  $('#linkButton').on('click',function(){
    document.location.href = 'raster-version.html' + urlHash;
  })

  
  
  
/////////////////////////////////////////////////////////////
//Add buildings layers
/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////
//Ames, IA
//Buildings
/////////////////////////////////////////////////////////////


  map.addLayer({
    'id': 'buildings',
    'type': 'fill',
    'source': {
      'type': 'vector',
      'url': 'mapbox://nittyjee.058256b7'
    },
    'source-layer': 'buildings',
    'paint': {
        'fill-outline-color': 'rgba(0,0,0,0)',
        'fill-color': {
          'property': 'YearStart',
          'type': 'interval',
          'stops': [
            [0, '#2e3436'],
            [1600, '#888a85'],
            [1700, '#5c3566'],
            [1800, '#75507b'],
            [1850, '#a40000'],
            [1900, '#cc0000'],
            [1950, '#f57900'],
            [2000, '#edd400'],
          ]
        }
    },
    'filter': ['all',
      ['<=', 'YearStart', yr],
      ['>=', 'YearEnd', yr]
    ]
  });

  
  
  
/////////////////////////////////////////////////////////////
//Netherlands
//Buildings
/////////////////////////////////////////////////////////////

  map.addLayer({
    'id': 'netherlands_buildings-6wkgma',
    'type': 'fill',
    'source': {
      'type': 'vector',
      'url': 'mapbox://nittyjee.d4hvz40x'
    },
    'source-layer': 'Netherlands_Buildingsgeojson',
    'paint': {
        'fill-outline-color': 'rgba(0,0,0,0)',
        'fill-color': {
          'property': 'YearStart',
          'type': 'interval',
          'stops': [
            [0, '#2e3436'],
            [1600, '#888a85'],
            [1700, '#5c3566'],
            [1800, '#75507b'],
            [1850, '#a40000'],
            [1900, '#cc0000'],
            [1950, '#f57900'],
            [2000, '#edd400'],
          ]
        }
    },
    'filter': ['all',
      ['<=', 'YearStart', yr],
      ['>=', 'YearEnd', yr]
    ]
  });
  
  

  
  
/////////////////////////////////////////////////////////////
//Add boundaries layers
/////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////
//Add Minor Boundaries Layer
//USA
/////////////////////////////////////////////////////////////

  map.addLayer({
    'id': 'US_Minor_Boundaries-1lyzcs',
    'source': {
      'type': 'vector',
      'url': 'mapbox://nittyjee.az4itfz9',
    },
    'source-layer': 'US_Minor_Boundariesgeojson',
    'type': 'fill',
	'maxzoom': 6,

//-------------------------------------------
    'paint': {
//		'line-color': '#000000'
		'fill-outline-color': 'rgba(0, 0, 0, 0.15)',
        'fill-color': 'rgba(0, 0, 0, 0)'
    },
//-------------------------------------------
    'filter': ['all',
      ['<=', 'YearStart', yr],
      ['>=', 'YearEnd', yr]
    ]
//------------------------------------------------
  });




  
/////////////////////////////////////////////////////////////
//Add Major Boundaries Layer
//USA
/////////////////////////////////////////////////////////////




  map.addLayer({
    'id': 'us_major_boundaries',
    'source': {
      'type': 'vector',
      'url': 'mapbox://nittyjee.8jivy8b',
    },
    'source-layer': 'US_Major_Boundariesgeojson',
    'type': 'fill',
	'maxzoom': 6,
	


//------------------------------------------------
    'paint': {
		'fill-outline-color': {
          'property': 'TERR_TYPE',
          'type': 'categorical',
          'stops': [
		//Bright Blue
		['Colony', '#0000ee'],
		//Orange
		['Unorganized Territory', '#ff9900'],
		//Dark Red
		['Territory', '#cc3300'],
		//Bright Red
		['State', '#cd0000'],
		//Bright Green
		['Other', '#009933'],
		//Black
		['District of Columbia', '#000000'],
          ]
        },
		'fill-color': 'rgba(255,0,0,0)'
		
		/*
        'fill-color': {
          'property': 'TERR_TYPE',
          'type': 'categorical',
          'stops': [
		['Colony', 'rgba(255,0,0,0)'],
		['Unorganized Territory', 'rgba(255,0,0,0)'],
		['Territory', 'rgba(255,0,0,0)'],
		['State', 'rgba(255,0,0,0)'],
		['Other', 'rgba(255,0,0,0)'],
		['District of Columbia', 'rgba(255,0,0,0)'],
          ]
        }
		*/
    },

	
//------------------------------------------------
    'filter': ['all',
      ['<=', 'start_n', date],
      ['>=', 'end_n', date]
    ]
//------------------------------------------------
  });
  

  
  
/////////////////////////////////////////////////////////////
//Add Labels Layer
//Major Boundaries
//USA
/////////////////////////////////////////////////////////////

map.addSource('us_major_boundary_labels',{
    'type': 'vector',
    'url': 'mapbox://nittyjee.biuuelz7',
});

/* labels for US Major Boundaries */
map.addLayer({
'id': 'US_Major_Boundaries_Labels-2hsz5k',
'source': 'us_major_boundary_labels',
'source-layer': 'shapefile_export-4f28wr',
'type': 'symbol',
'maxzoom': 6,

//------------------------------------------------
'layout': {
  'text-field': '{name}',
},
'paint': {
  'text-color': 'red'
},

//------------------------------------------------
'filter': ['all',
  ['<=', 'YearStart', yr],
  ['>=', 'YearEnd', yr]
]
});
  


  
  
/////////////////////////////////////////////////////////////
//Add Major Boundaries Layer
//Indian Subcontinent
/////////////////////////////////////////////////////////////


  map.addLayer({
      'id': 'Indian_Subcontinent-abr9su',
    'source': {
      'type': 'vector',
      'url': 'mapbox://nittyjee.2uzywtfo',
    },
      'source-layer': 'Indian_Subcontinent_Major_Boundariesgeojson',
    'type': 'fill',
	'maxzoom': 6,
//		'fill-color': 'rgba(255,0,0,0)',

// /*
	
//------------------------------------------------
    'paint': {
        'fill-outline-color': 'rgba(0,0,0,1)',
        'fill-color': {
          'property': 'TYPE',
          'type': 'categorical',
          'stops': [
['Afghans', 'rgba(184,199,101,1)'],
//
//Agency should be dashed:
['Agency', 'rgba(0,0,0,0)'],
//
['Agency (Princely)', 'rgba(255,127,127,1)'],
['Agency, British Portion', 'rgba(255,190,190,1)'],
['ANEX_COMPLETE', 'rgba(255,190,190,1)'],
['ANNEX_COMPLET', 'rgba(255,190,190,1)'],
['ANNEX_COMPLETE', 'rgba(255,190,190,1)'],
['ANNEXED_COMPLETE', 'rgba(255,190,190,1)'],
['ANNEXED_PROTECTED', 'rgba(255,190,190,1)'],
['ANNEXED_TWICE', 'rgba(255,190,190,1)'],
['Autonomous Area', 'rgba(255,127,127,1)'],
['Bangash', 'rgba(164,114,173,1)'],
['BANGLADESH', 'rgba(255,190,232,1)'],
['Benares', 'rgba(223,115,255,1)'],
['Bengal', 'rgba(76,115,0,1)'],
['British', 'rgba(255,190,190,1)'],
['British (administration)', 'rgba(255,190,190,1)'],
['British (direct relations)', 'rgba(255,190,190,1)'],
['British (feudatory)', 'rgba(255,127,127,1)'],
['British (leased)', 'rgba(255,190,190,1)'],
['British (Partial)', 'rgba(255,190,190,1)'],
['British (protectorate)', 'rgba(255,190,190,1)'],
['British (Province)', 'rgba(255,190,190,1)'],
['British (Special)', 'rgba(255,127,127,1)'],
['British (subordinate ally)', 'rgba(255,190,190,1)'],
['British (Temporary)', 'rgba(255,190,190,1)'],
['British special treaty', 'rgba(255,190,190,1)'],
["British, Chief Commissioner's Province", 'rgba(255,190,190,1)'],
['British, Chief Commissionership', 'rgba(255,190,190,1)'],
['Carnatic', 'rgba(250,243,142,1)'],
['CARNATIC', 'rgba(127,138,55,1)'],
['CIS-SUTLEJ SIKHS', 'rgba(209,109,186,1)'],
['Cochin', 'rgba(187,237,157,1)'],
['COCHIN', 'rgba(130,196,73,1)'],
//
//Crown Colony should have black outline:
['Crown Colony', 'rgba(0,0,0,0)'],
//
['Cutch', 'rgba(91,148,240,1)'],
['CUTCH', 'rgba(120,49,140,1)'],
['Denmark', 'rgba(206,84,240,1)'],
['DUTCH', 'rgba(140,49,96,1)'],
['FARRUKHABAD', 'rgba(165,185,250,1)'],
['Feudatory State', 'rgba(255,127,127,1)'],
['French', 'rgba(130,230,126,1)'],
['Gorakhpur', 'rgba(97,250,97,1)'],
['INDIA', 'rgba(190,232,255,1)'],
['Jammu & Kashmir (Protection, Full Area)', 'rgba(255,127,127,1)'],
['Jammu & Kashmir (Protection)', 'rgba(255,127,127,1)'],
['Jats', 'rgba(179,115,109,1)'],
['JATS', 'rgba(189,75,179,1)'],
['Kalhoras', 'rgba(121,60,128,1)'],
['Lahore', 'rgba(124,101,173,1)'],
['Lower Doab', 'rgba(117,250,107,1)'],
['Malabar', 'rgba(204,119,98,1)'],
['MALABAR', 'rgba(204,119,98,1)'],
//
//Marathas or MARATHA should not have a border:
['MARATHA', 'rgba(163,255,115,1)'],
//
['Marathas', 'rgba(163,255,115,1)'],
['Mughals', 'rgba(0,169,230,1)'],
['MUGHALS', 'rgba(0,169,230,1)'],
['Mysore', 'rgba(91,185,240,1)'],
['MYSORE', 'rgba(166,81,78,1)'],
['NEPAL', 'rgba(255,190,232,1)'],
['Nizam', 'rgba(112,168,0,1)'],
['NIZAM', 'rgba(112,168,0,1)'],
['Northern Circars, Masulipatam', 'rgba(140,50,76,1)'],
['Oudh', 'rgba(132,0,168,1)'],
['OUDH', 'rgba(132,0,168,1)'],
['PAKISTAN', 'rgba(233,255,190,1)'],
['Portuguese', 'rgba(191,164,96,1)'],
['PORTUGUESE', 'rgba(132,196,169,1)'],
['Portuguese India', 'rgba(68,165,173,1)'],
//
//Presidency should be dashed:
['Presidency', 'rgba(0,0,0,0)'],
//
['Princely Area', 'rgba(255,127,127,1)'],
['Princely_State', 'rgba(255,127,127,1)'],
['PROTECED_COMPLETE', 'rgba(255,127,127,1)'],
['PROTECTED', 'rgba(255,127,127,1)'],
['PROTECTED_ANNEXED', 'rgba(255,127,127,1)'],
['PROTECTED_COMPLETE', 'rgba(255,127,127,1)'],
['PROTECTED_TWICE', 'rgba(255,127,127,1)'],
//
//Province should have black outline:
['Province', 'rgba(0,0,0,0)'],
//
['Province (British)', 'rgba(255,190,190,1)'],
['Province (Princely)', 'rgba(255,127,127,1)'],
['Province, British Portion', 'rgba(255,190,190,1)'],
['RAJPUTANA', 'rgba(255,255,190,1)'],
['Rajputs', 'rgba(255,255,190,1)'],
['Rohilkhand', 'rgba(161,63,126,1)'],
['Rohillas', 'rgba(81,196,142,1)'],
['SAVANTVADI', 'rgba(203,212,78,1)'],
['SINDHIA', 'rgba(163,255,115,1)'],
['SIROHI', 'rgba(163,83,158,1)'],
['TANJORE', 'rgba(201,133,147,1)'],
['TRAVANCORE', 'rgba(114,79,179,1)'],
['Unlabeled', 'rgba(130,130,130,1)'],
['UNLABELED', 'rgba(130,130,130,1)'],
['NULL', 'rgba(239,245,191,1)']
          ]
        }
    },
	
//------------------------------------------------
    'filter': ['all',
      ['<=', 'YearStart', yr],
      ['>=', 'YearEnd', yr]
    ]

  });
  
  /*Map events*/
  map.on('click', 'buildings', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<b>Year Built:</b>' + e.features[0].properties.YearStart + '<br>' + '<b>Year Demolished:</b>' + e.features[0].properties.YearEnd)
        .addTo(map);
  });

  map.on('mouseenter', 'buildings', function () {
      map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'buildings', function () {
      map.getCanvas().style.cursor = '';
  });

  map.on('moveend', function(){
    urlHash = window.location.hash +  '/' + $('#year').val();
    // document.location.href = 'raster-version.html' + urlHash;
    // console.log(document.location.href)
    console.log(urlHash);
  })
})

map.on('error', function(e) {
  // Hide those annoying non-error errors
  if (e && e.error !== 'Error')
      console.log(e);
});

function changeDate(unixDate){

  var year = parseInt(moment.unix(unixDate).format('YYYY'));
  var date = parseInt(moment.unix(unixDate).format('YYYYMMDD'));

  var sv = $( "#year" );
  if(year<1700) {
  sv.removeClass('y1700').removeClass('y1800').removeClass('y1850').removeClass('y1900').removeClass('y1950').removeClass('y2000').addClass('y1600');
  
  }
  if(year>=1700 && year< 1800) {
  sv.removeClass('y1600').removeClass('y1800').removeClass('y1850').removeClass('y1900').removeClass('y1950').removeClass('y2000').addClass('y1700');
      }
  if(year>=1800 && year< 1850) {
      sv.removeClass('y1700').removeClass('y1600').removeClass('y1850').removeClass('y1900').removeClass('y1950').removeClass('y2000').addClass('y1800');
  }
  if(year>=1850 && year< 1900) {
      sv.removeClass('y1700').removeClass('y1800').removeClass('y1600').removeClass('y1900').removeClass('y1950').removeClass('y2000').addClass('y1850');
  }
  if(year>=1900 && year< 1950) {
      sv.removeClass('y1700').removeClass('y1800').removeClass('y1850').removeClass('y1600').removeClass('y1950').removeClass('y2000').addClass('y1900');
  }
  if(year>=1950 && year< 2000) {
      sv.removeClass('y1700').removeClass('y1800').removeClass('y1850').removeClass('y1900').removeClass('y1600').removeClass('y2000').addClass('y1950');
  }
  if(year>=2000) {
      sv.removeClass('y1700').removeClass('y1800').removeClass('y1850').removeClass('y1900').removeClass('y1950').removeClass('y1600').addClass('y2000');
  }

  var yrFilter = ['all',
      ['<=', 'YearStart', year],
      ['>=', 'YearEnd', year]
    ];
  
  var dateFilter = ['all',
    ['<=', 'start_n', year],
    ['>=', 'end_n', year]
  ];

  map.setFilter('buildings', yrFilter);
  map.setFilter('netherlands_buildings-6wkgma', yrFilter);  
//  map.setFilter('US_State_Boundaries-7edz8s', yrFilter);
//  map.setFilter('Major_Boundaries-4abmlj', yrFilter);
  map.setFilter('us_major_boundaries', dateFilter);
  map.setFilter('US_Minor_Boundaries-1lyzcs', yrFilter);
  map.setFilter('Indian_Subcontinent-abr9su', yrFilter);
  map.setFilter('US_Major_Boundaries_Labels-2hsz5k', yrFilter);
}

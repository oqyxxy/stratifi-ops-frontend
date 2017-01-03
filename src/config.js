const hostname = window.location.hostname;

const api = {
  'localhost': 'https://robo-pm-dev.stratifi.com/api/',
  'robo-pm-frontend.netlify.com': 'https://robo-pm-production.stratifi.com/api/'
};

const authTokens = {
  'localhost': 'WyIyIiwiNjU4ZGMyZjA5ZGJiNGRkMzZkMTNjZmMzNjBlMTk5ZTEiXQ.Cm66yQ.7J671CvhSZtT8mX9ZFD6yLs96K8',
  'robo-pm-frontend.netlify.com': 'WyIyIiwiNjU4ZGMyZjA5ZGJiNGRkMzZkMTNjZmMzNjBlMTk5ZTEiXQ.Cm66yQ.7J671CvhSZtT8mX9ZFD6yLs96K8'
};


export const API_BASE_URL = api[hostname];
export const BACKTESTER_BASE_URL = 'http://127.0.0.1:5000';
const AUTH_TOKEN = authTokens[hostname];


export const HEADERS = {
  'Authorization': AUTH_TOKEN,
  'Content-Type': 'application/json'
};


export const INTL_CONFIG = {
  locale: 'en',
  formats: {
    date: {
      date: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      },
      dateMonthYear: {
        month: 'short',
        year: 'numeric',
      },
      dateYear: {
        year: 'numeric',
      },
    },
    number: {
      currency: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      },
      percentTenth: {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      },
      percentHundredth: {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    }
  },
};

export default {
  strategy: {
    value: 1000000,
  },
  chart: {
    common: {
      'default': {
        addClassNames: true, // experimental
        fontFamily: 'acumin-pro',
        fontSize: 12, // sass: bootstrap: ~ $font-size-xs
        color: '#373a3c', // sass: bootstrap: $gray-dark
        marginTop: 0,
        marginBottom: 0,
        marginRight: 0,
        marginLeft: 0,
        autoMargins: false,
        autoMarginOffset: 0,
        balloon: {
          fontSize: 16, // sass: bootstrap: ~ $font-size-md
          color: '#eceeef', // sass: bootsrap: $gray-lighter
          fillColor: '#394346', // sass: $graphite-dark
          fillAlpha: 1,
          shadowAlpha: 0,
          borderThickness: 0,
          borderAlpha: 0,
          adjustBorderColor: true,
          horizontalPadding: 12,
          verticalPadding: 8
          //maxWidth: 400,
          //cornerRadius: 3, // pointer works for cornerRadius 0 only
        }
      }
    },
    serial: {
      'default': {
        type: 'serial',
        valueAxes: [{
          inside: true, // Specifies whether values should be placed inside or outside plot area.
          axisAlpha: 0,
          position: 'right',
          ignoreAxisWidth: true,
          showFirstLabel: false, // Whether to show first axis label (and grid line) or not.
          showLastLabel: false, // Whether to show last axis label (and grid line) or not.
          gridAlpha: 0.075, // experimental
          balloon: {
            enabled: true
          }
        }],
        categoryAxis: {
          gridThickness: 0
        },
        zoomOutText: '' // to hide it
      },
      'timeseries': {
        categoryField: 'date',
        categoryAxis: {
          parseDates: true,
          axisThickness: 0,
          gridThickness: 0,
          inside: true
        }
      },
      'returnsCumulative': {
        pathToImages: "http://www.amcharts.com/lib/3/images/",
        precision: 2,
        graphs: [
          {
            id: 'overlayed',
            valueField: '0',
            type: 'smoothedLine',
            lineThickness: 2,
            fillAlphas: 1
          },
          {
            id: 'base',
            valueField: '1',
            type: 'line',
            lineThickness: 2,
            dashLengthField: 'dashLength'
          }
          // {
          //   id: 'parity',
          //   valueField: '2',
          //   type: 'smoothedLine',
          //   lineThickness: 2,
          //   dashLengthField: 'dashLength',
          // }
        ],
        chartCursor: {
            pan: true,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            cursorAlpha:1,
            cursorColor: "#258cbb",
            limitToGraph: "g1",
            valueLineAlpha: 0.2,
            valueZoomable: true
        },
        colors: [
          '#a4def9', // sass: $brand-primary-muted // backup: brand-danger-muted
          '#09adf9' // sass: $brand-primary
        ],
        chartScrollbar: {
          enabled: false
        },
        balloon: {
          borderThickness: 1,
          shadowAlpha: 0
        },
      },
      'returnsBarchart': {
        type: "serial",
        theme: 'light',
        categoryField: "date",
        categoryAxis: {
          gridPosition: "start",
          position: "left"
        },
        trendLines: [],
        graphs: [{
            fillAlphas: 0.8,
            id: "AmGraph-1",
            lineAlpha: 0.2,
            title: "Income",
            type: "column",
            valueField: 0
        }],
        guides: [],
        valueAxes: [{
            id: "ValueAxis-1",
            position: "top",
            axisAlpha: 0
        }],
        chartCursor: {
            pan: true,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            cursorAlpha:1,
            cursorColor: "#258cbb",
            limitToGraph: "g1",
            valueLineAlpha: 0.2,
            valueZoomable: true
        },
        colors: [
          '#a4def9', // sass: $brand-primary-muted // backup: brand-danger-muted
          '#09adf9' // sass: $brand-primary
        ],
        allLabels: [],
        balloon: {},
        titles: [],
      },
      'returnsRisk': {
        pathToImages: "http://www.amcharts.com/lib/3/images/",
        precision: 2,
        graphs: [
          {
            id: 'overlayed',
            valueField: '0',
            type: 'smoothedLine',
            lineThickness: 4,
          },
          {
            id: 'base',
            valueField: '1',
            type: 'line',
            lineThickness: 4,
          },
        ],
        colors: [
          '#09adf9',
          '#a4def9',
        ],
      },
      // TODO: @andrew, please specify the options (i've just cloned them)
      'returnsDownside': {
        type: 'serial',
        marginTop: 20,
        marginLeft: 50,
        marginBottom: 50,
        precision: 2,
        valueAxes: [{
          axisAlpha: 0,
          position: 'left',
          ignoreAxisWidth: true,
          showFirstLabel: false, // Whether to show first axis label (and grid line) or not.
          showLastLabel: false, // Whether to show last axis label (and grid line) or not.
          gridAlpha: 0.075 // experimental
        }],
        graphs: [{
          id: 'overlayed',
          valueField: '0',
          type: 'smoothedLine',
          lineThickness: 2,
          fillAlphas: 1,
          fillToAxis: 'y'
        }, {
          id: 'base',
          valueField: '1',
          type: 'line',
          lineThickness: 2,
          dashLengthField: 'dashLength'
        }],
        colors: [
          '#a4def9', // sass: $brand-primary-muted // backup: brand-danger-muted
          '#09adf9' // sass: $brand-primary
        ],
        categoryField: 'date',
        categoryAxis: {
          parseDates: true,
          axisColor: '#eeeeee'
        }
      },
      'returnsMonthly': {
        precision: 2,
        graphs: [
          {
            type: 'column',
            valueField: '0',
          },
          {
            type: 'column',
            valueField: '1',
          },
          {
            type: 'column',
            valueField: '2',
          }
        ],
        colors: [
          '#c3e9fe', // sass: $brand-primary-muted // backup: brand-danger-muted
          '#3d99Fc', // sass: $brand-primary
          '#8fddc6', // sass: $brand-success-muted
        ],
        chartScrollbar: {
            // don't use "lines" (only fills), cause it's not possible to set width for lines
            graph: 'base',
            oppositeAxis: false,
            scrollbarHeight: 80,
            offset: 10,
            gridAlpha: 0,
            backgroundAlpha: 0,
            color: '#373a3c', // sass: bootstrap: $gray-dark
            graphFillColor: '#eceeef', // sass: $gray-lighter
            selectedGraphFillColor: '#c3ebfd', // sass: $brand-success-muted
            selectedBackgroundColor: '#f7f7f9', // sass: bootstrap: $gray-lightest
            autoGridCount: true,
        },
      },
      'returnsBurndownBullAndBear': {
        balloon: {
            color: '#fff',
            borderThickness: 0,
            cornerRadius: 3,
            fillAlpha: 1,
            fillColor: '#45595f',
            shadowAlpha: 0.08,
            shadowColor: '#000'
        },
        chartCursor: {
          cursorColor: '#09ADF9',
          cursorPosition: "mouse"
        },
        graphs: [
          {
            type: 'smoothedLine',
            lineThickness: 2,
            fillAlphas: 1,
            valueField: '0',
            balloonText: "$[[value]]"
          },
          {
            type: 'line',
            lineThickness: 2,
            valueField: '1',
            balloonText: "$[[value]]"
          },
          // {
          //   type: 'line',
          //   lineThickness: 2,
          //   valueField: '2',
          //   lineAlpha: 0,
          //   bullet: "round",
          //   bulletSize: 0.5,
          //   balloonText: "$[[value]]"
          // }
        ],
        categoryField: '2',
        categoryAxis: {
          axisThickness: 0,
          gridThickness: 0,
          inside: true,
          autoGridCount: false,
          gridCount: 8,
          showFirstLabel: false
        },
        colors: [
          '#a4def9', // sass: $brand-primary-muted // backup: brand-danger-muted
          '#09adf9', // sass: $brand-primary
          '#09adf9', // sass: $brand-primary
        ],
        chartScrollbar: {
          enabled: false
        },
      },
      'burndown': {
        precision: 2,
        graphs: [
          {
            type: 'column',
            valueField: '0',
          },
          {
            type: 'column',
            valueField: '1',
          },
          {
            type: 'column',
            valueField: '2',
          }
        ],
        colors: [
          '#c3e9fe', // sass: $brand-primary-muted // backup: brand-danger-muted
          '#3d99Fc', // sass: $brand-primary
          '#8fddc6', // sass: $brand-success-muted
        ],
      },
      'benchmarks': {
        fontSize: 14,
        categoryField: 'type',
        precision: 1,
        categoryAxis: {
          axisThickness: 0,
          gridThickness: 0,
          labelsEnabled: false
        },
        valueAxes: [{
          maximum: 50,
          minimum: -50, // to fix zero ruler position (to middle)
          labelsEnabled: false,
          totalTextColor: '#818a91', // sass: $gray-light
          axisColor: '#e0e6e8',
          axisThickness: 0,
          gridThickness: 0,
          stackType: 'regular',
          gridCount: 0,
          zeroGridAlpha: .1,
        }],
        balloon: { enabled: false },
        graphs: [
          {
            type: 'column',
            valueField: 'valueBase',
            fillAlphas: 1,
            lineColor: '#c3e9fe', // sass: $brand-primary-muted // backup: brand-danger-muted
            labelText: '[[value]]%',
            labelPosition: 'top',
            columnWidth: 0.5,
          },
          {
            type: 'column',
            valueField: 'valueOverlay',
            clustered: false,
            fillAlphas: 1,
            lineColor: '#3d99fc', // sass: $brand-primary
            labelText: '[[value]]%',
            labelPosition: 'top',
            columnWidth: 0.5,
          }
        ],
      },
      'benchmarksMirrow': {
        graphs: [
          {
            type: 'column',
            valueField: 'valueBasePositive',
            fillAlphas: 1,
            lineColor: '#c3e9fe', // sass: $brand-primary-muted // backup: brand-danger-muted
            labelText: '[[value]]%',
            labelPosition: 'top',
            columnWidth: 0.5,
          },
          {
            type: 'column',
            valueField: 'valueOverlayPositive',
            fillAlphas: 1,
            lineColor: '#3d99Fc', // sass: $brand-primary
            labelText: '[[value]]%',
            labelPosition: 'top',
            columnWidth: 0.5,
          },
          {
            type: 'column',
            valueField: 'valueBaseNegative',
            fillAlphas: 1,
            clustered: false,
            lineColor: '#c3e9fe', // sass: $brand-primary-muted // backup: brand-danger-muted
            labelText: '[[value]]%',
            labelPosition: 'top',
            columnWidth: 0.5,
          },
          {
            type: 'column',
            valueField: 'valueOverlayNegative',
            fillAlphas: 1,
            clustered: false,
            lineColor: '#3d99Fc', // sass: $brand-primary
            labelText: '[[value]]%',
            labelPosition: 'top',
            columnWidth: 0.5,
          }
        ],
      },
      'benchmarksScenarios': {
        columnSpacing: 100,
        valueAxes: [{
          maximum: 0,
          labelsEnabled: false,
          totalTextColor: '#818a91', // sass: $gray-light
          axisColor: 'rgba(0, 0, 0, .1)',
          zeroGridAlpha: .1,
          axisThickness: 0,
          gridThickness: 0,
          stackType: 'regular',
          gridCount: 0,
        }],
        balloon: { enabled: false },
        graphs: [
          {
            type: 'column',
            valueField: 'valueBase',
            fillAlphas: 1,
            lineColor: '#c3e9fe', // sass: $brand-primary-muted // backup: brand-danger-muted
            columnWidth: 0.5,
            labelText: '[[value]]%',
            labelPosition: 'top',
          },
          {
            type: 'column',
            valueField: 'valueOverlay',
            clustered: false,
            fillAlphas: 1,
            lineColor: '#3d99Fc', // sass: $brand-primary
            columnWidth: 0.5,
            labelText: '[[value]]%',
            labelPosition: 'top',
          },
          {
            type: 'column',
            valueField: 'maximum',
            clustered: false,
            fillAlphas: 0,
            lineAlpha: 0,
            bulletAlpha: 0,
            balloonText: '[[value]]%',
          }
        ],
      },
    },
    bubble: {
      'default': {
        type: 'xy', // aka bubble chart
        "theme": "light",
      },
      'scenarios': {
        graphs: [
          {
            // base graph (aka underline)
            // these values should go before overlayed, as it's supposed to be bigger
            // (to not overlap overlayed values)
            bullet: 'round',
            xField: 'xField',
            yField: 'yField',
            valueField: '0',
            lineAlpha: 0,
            lineColor: '#c3e9fe', // sass: $brand-primary-muted // backup: brand-danger-muted
            minBulletSize: 30,
            maxBulletSize: 150,
            showBalloon: false,
          },
          {
            // overlayed graph
            bullet: 'round',
            xField: 'xField',
            yField: 'yField',
            valueField: '1',
            lineAlpha: 0,
            lineColor: '#3d99Fc', // sass: $brand-primary
            minBulletSize: 30,
            maxBulletSize: 150,
            showBalloon: false,
          },
          {
            // fake graph // for max fields
            bullet: 'round',
            xField: 'xField',
            yField: 'yField',
            valueField: 'maximum',
            lineAlpha: 0,
            bulletAlpha: 0,
            fillAlphas: 0,
            minBulletSize: 30,
            maxBulletSize: 150,
            showBalloon: false,
          },
          /*
          {
            // fake graph
            // (to display labels, balloons and adjust labels offset)
            bullet: 'round',
            xField: 'date',
            yField: 'yField', // don't rename // in use in ChartTimeline component
            valueField: '_max',
            lineThickness: 0,
            lineColor: 'rgba(0,0,0,0)', // transparent
            labelText: '[[label]]',
            labelOffset: 20,
            labelPosition: 'bottom',
            balloonFunction: (data) => (
              '<div style="font-size: 11px; font-weight: 300 !important; line-height: 150% !important">'
              + '<div style="margin: 0 -12px"><table style="width: 100%;" cellpadding="10">' // see horizontalPadding
              + '<thead>'
              + '<th style="font-weight: 300; text-align: center; padding: 5px 10px">Underline</th>'
              + '<th style="font-weight: 300; text-align: center; padding: 5px 10px">Overlay</th>'
              + '</thead>'
              + '<tbody style="border: 1px solid rgba(255, 255, 255, 0.2); border-left: none; border-right: none"><tr>'
              + '<td style="font-size: 16px; text-align: center; padding: 10px">-' + (data.dataContext['0'] * 100).toFixed(1) + '%</td>'
              + '<td style="font-size: 16px; text-align: center; padding: 10px">-' + (data.dataContext['1'] * 100).toFixed(1) + '%</td>'
              + '</tr></tbody>'
              + '</table></div>'
              + '<div style="margin-top: 1em">' + data.dataContext.description + '</div>'
              + '</div>'
            ),
            minBulletSize: 10,
            maxBulletSize: 200,
          },
          */
        ],
        valueAxes: [{
          minimum: -1, // to center chart
          maximum: 1, // to center chart
          axisAlpha: 0,
          gridThickness: 0,
          zeroGridAlpha: 0,
          labelsEnabled: false,
        },
        {
          position: 'bottom', // don't remove to not to be ignored
          minimum: -1, // to center chart
          maximum: 1, // to center chart
          axisAlpha: 0,
          gridThickness: 0,
          zeroGridAlpha: 0,
          labelsEnabled: false,
        }],
      },
      'returnsRisk': {
        marginTop: 20,
        marginLeft: 70,
        marginBottom: 50,
        graphs: [
          {
            // base graph (aka underline)
            // these values should go before overlayed, as it's supposed to be bigger
            // (to not overlap overlayed values)
            bullet: 'round',
            xField: 'x0',
            yField: 'y0',
            valueField: '0',
            lineAlpha: 0,
            lineColor: '#c3e9fe', // sass: $brand-primary-muted // backup: brand-danger-muted
            minBulletSize: 30,
            maxBulletSize: 30,
            showBalloon: false,
          },
          {
            // overlayed graph
            bullet: 'round',
            xField: 'x1',
            yField: 'y1',
            valueField: '1',
            lineAlpha: 0,
            lineColor: '#3d99Fc', // sass: $brand-primary
            minBulletSize: 30,
            maxBulletSize: 30,
            showBalloon: false,
          },
        ],
        valueAxes: [{
          position: 'left',
          axisAlpha: 0,
          zeroGridAlpha: 0,
          minMaxMultiplier: 1.5
        },
        {
          position: 'bottom', // don't remove to not to be ignored
          axisAlpha: 0,
          zeroGridAlpha: 0,
          fontSize: 14,
          minMaxMultiplier: 1.5
        }],
        allLabels: [{
          text: 'Annualized Return',
          x: '2%',
          y: '50%',
          bold: true,
          align: 'middle',
          rotation: -90,
        }, {
          text: 'Annualized Volatility',
          x: '50%',
          y: '95%',
          bold: true,
          align: 'middle',
        }],
      },
    },
    pie: {
      'default': {
        type: 'pie',
        valueField: 'value',
        titleField: 'title',
        pullOutDuration: 0,
        pullOutRadius: 0,
        startDuration: 0,
        labelsEnabled: false,
        precision: 0,
        radius: '49%', // 50% doesn't work
      },

      // TODO: refactor asap
      'orderedAssetClasses': ['equity', 'fixed income', 'cash', 'real assets', 'alternatives', 'other'],
      'orderedAssetClassColors': ['#31e3ff', '#b2b2b2', '#c1c1c1', '#d1d1d1', '#e0e0e0', '#efefef'],

      'positions': {
        balloonText: '[[title]]<br>[[percents]]%',
        colors: [
          '#31e3ff', // sass: $brand-info
          '#a2b0b7',
          '#bdc9d0',
          '#e6ebee',

          /* OBSOLETED
          '#00b2cc',
          '#77e4ce',
          '#c3ffcf',
          '#f9ead3',
          '#d1dcd3',
          '#b0d0d3',
          '#84bfd1',
          */
        ],
      },
      'positionsDonut': {
        innerRadius: '70%',
        /*
        "allLabels": [{
            "text": "This is chart title",
            "align": "center",
            "bold": true,
            "y": 250
        },{
            "text": "Ans here's the subtitle as well",
            "align": "center",
            "bold": false,
            "y": 250
        }],
        */
      },
      'positionsOverlay': {
        balloon: {
          enabled: false,
        },
        colors: [
          '#3d99fc', // sass: $brand-primary
          'rgba(0, 0, 0, 0)',
        ],
      },
      'positionsTypeAsset': {
        showBalloon: false,
        colorField: 'color',
      },
      'assetColors': {
        colorField: 'color',
      },
      'positionsType': {
        showBalloon: false,
        colors: [
          '#31e3ff', // sass: $brand-info
          'rgba(189, 201, 208, 0.2)',
          '#bdc9d0',
          '#e6ebee',
        ],
      },
      'positionsTypeOverlay': {
        radius: '47%', // 49% doesn't work
        innerRadius: '75%',
        showBalloon: false,
        colors: [
          '#09adf9', // sass: $brand-primary
          '#eceeef', // sass: $gray-lighter
          '#bdc9d0',
          '#e6ebee',
        ],
      },
      'proposals': {
        radius: '47%', // 49% doesn't work
        innerRadius: '75%',
        balloonText: '[[title]]<br>[[percents]]%',
        colors: [
          '#31e3ff', // sass: $brand-info
          '#a2b0b7',
          '#bdc9d0',
          '#e6ebee',
        ],
      },
    },
    partials: {
      guide: {
        fillAlpha: 0.2,
        fillColor: '#394346', // sass: $graphite-dark
        lineThickness: 0,
      }
    }
  },
};

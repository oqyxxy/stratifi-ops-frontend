export const AUTOSUGGEST_THEME = {
  container: 'dropdown react-autosuggest__container',
  containerOpen: 'open react-autosuggest__container--open',
  input: 'form-control react-autosuggest__input',
  suggestionsContainer: 'dropdown-menu dropdown-menu-scale react-autosuggest__suggestions-container',
  suggestion: 'dropdown-item react-autosuggest__suggestion',
  suggestionFocused: 'react-autosuggest__suggestion--focused',
};

export const CHART_THEMES = {
  common: {
    'default': {
      addClassNames: true,
      fontFamily: 'acumin-pro,Helvetica Neue,Helvetica,Arial,sans-serif',
      fontSize: 12,
      color: '#373a3c',
      marginTop: 0,
      marginBottom: 0,
      marginRight: 0,
      marginLeft: 0,
      autoMargins: false,
      autoMarginOffset: 0,
      balloon: {
        fontSize: 16,
        color: '#eceeef',
        fillColor: '#394346',
        fillAlpha: 1,
        shadowAlpha: 0,
        borderThickness: 0,
        borderAlpha: 0,
        adjustBorderColor: true,
        horizontalPadding: 12,
        verticalPadding: 8
      }
    }
  },
  serial: {
    'default': {
      type: 'serial',
      valueAxes: [{
        inside: true,
        axisAlpha: 0,
        position: 'left',
        ignoreAxisWidth: true,
        showFirstLabel: false,
        showLastLabel: false,
        gridAlpha: 0.075
      }],
      categoryAxis: {
        gridThickness: 0
      },
      zoomOutText: ''
    },
    'timeseries': {
      categoryField: 'date',
      categoryAxis: {
        parseDates: true,
        axisThickness: 1,
        gridThickness: 1,
        inside: true
      }
    },
    'optionsChart': {
      pathToImages: "http://www.amcharts.com/lib/3/images/",
      precision: 2,
      valueAxes: [{
        axisThickness: 1,
        gridThickness: 1,
        inside: true
      }],
      graphs: [
        {
          id: 'options',
          valueField: 'options',
          type: 'smoothedLine',
          lineThickness: 2
        }
      ],
      colors: [
        '#a4def9',
        '#09adf9'
      ],
      chartScrollbar: {
        enabled: false
      }
    },
  }
};

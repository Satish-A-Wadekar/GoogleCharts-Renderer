google.charts.load('current', { packages: ['annotationchart', 'calendar', 'corechart', 'charteditor', 'gantt', 'gauge', 'geochart', 'map', 'orgchart', 'sankey', 'table', 'timeline', 'treemap', 'wordtree'], "callback": GoogleCharts });
google.charts.setOnLoadCallback(GoogleCharts);

var Enums = {
    ChartType: {
        AnnotationChart: 'AnnotationChart',
        AreaChart: 'AreaChart',
        BarChart: 'BarChart',
        BubbleChart: 'BubbleChart',
        CalendarChart: 'CalendarChart',
        CandleStickChart: 'CandleStickChart',
        ColumnChart: 'ColumnChart',
        DonutChart: 'DonutChart',
        //DiffChart: 'DiffChart',
        GanttChart: 'GanttChart',
        GaugeChart: 'GaugeChart',
        GeoChart: 'GeoChart',
        HistogramChart: 'HistogramChart',
        //IntervalsChart: 'IntervalsChart',
        LineChart: 'LineChart',
        MapChart: 'MapChart',
        OrganizationChart: 'OrganizationChart',
        PieChart: 'PieChart',
        SankeyDiagramChart: 'SankeyDiagramChart',
        ScatterChart: 'ScatterChart',
        SteppedAreaChart: 'SteppedAreaChart',
        TableChart: 'TableChart',
        TimelinesChart: 'TimelinesChart',
        TreemapsChart: 'TreemapsChart',
        //TrendlinesChart: 'TrendlinesChart',
        WaterfallChart: 'WaterfallChart',
        WordTreeChart: 'WordTreeChart'
    }
}

function GoogleCharts() {
    /// <summary>
    /// this class has all basic Google charts drawing functionality.
    /// </summary>

    var $this = this;

    // these settings use while Draw Chart
    $this.oSetting = function () {
        /// <summary>
        /// this class has all basic properties <br />
        /// which will be use while building Google Chart.
        /// </summary>

        var _Scope = this;

        /// <field name='options' type='Object'>
        ///This will contains Settings for Chart.<br />
        ///Default: {};
        ///</field>
        _Scope.options = null;

        /// <field name='data' type='Object'>
        ///This will contains your raw JSON Data of key-value pair.<br />
        ///Default: {};
        ///</field>
        _Scope.data = null;

        /// <field name='DataTable' type='Object'>
        ///This will contains google Visualization DataTable data.<br />
        ///Default: {};
        ///</field>
        _Scope.DataTable = null;

        /// <field name='ByPassConvertToDataTable' type='Object'>
        ///This will contains google Visualization DataTable data.<br />
        ///Default: {};
        ///</field>
        _Scope.ByPassConvertToDataTable = null;

        /// <field name='title' type='String'>
        ///This will contains title for google chart.<br />
        ///Default: null;
        ///</field>
        _Scope.title = "";

        /// <field name='subtitle' type='String'>
        ///This will contains subtitle for google chart.<br />
        ///Default: null;
        ///</field>
        _Scope.subtitle = "";

        /// <field name='type' type='String'>
        ///This will contains chart type.<br />
        ///(Chose from "ChartType" Enum).<br />
        ///Default: ChartType.Table;
        ///</field>
        _Scope.type = "";

        /// <field name='height' type='String'>
        ///This will contains height in Number or String format.<br />
        ///e.g. Number 300 will appear 300px height <br />
        /// String '30%' will appear 30% height<br />
        ///Default: 500px;
        ///</field>
        _Scope.height = "";

        /// <field name='width' type='Number'>
        ///This will contains height in Number or String format.<br />
        ///e.g. Number 300 will appear 300px width <br />
        /// String '30%' will appear 30% width<br />
        ///Default: 500px;
        ///</field>
        _Scope.width = "";

        /// <field name='pieHole' type='Number'>
        ///corresponding to the ratio of radii between the hole and the chart<br />
        ///Default: 0.5;
        ///</field>
        _Scope.pieHole = "";

        /// <field name='is3D' type='Boolean'>
        ///This will contains choice of 3D Effect 
        ///Default: false;
        ///</field>
        _Scope.is3D = "";

        /// <field name='isStacked' type='Boolean'>
        ///This will contains choice of 3D Effect 
        ///Default: false;
        ///</field>
        _Scope.isStacked = "";

        /// <field name='BarDirection' type='String'>
        ///This will contains choice Bar Direction
        ///Default: false;
        ///</field>
        _Scope.BarDirection = "";

        /// <field name='LegendPosition' type='String'>
        ///This will contains Legend Position
        ///Default: false;
        ///</field>
        _Scope.LegendPosition = "";

        /// <field name='LegendAlignment' type='String'>
        ///This will contains Bar Direction
        ///Default: false;
        ///</field>
        _Scope.LegendAlignment = "";

        /// <field name='HTMLElementId' type='String'>
        ///This will contains Id of targeted HTML Element 
        ///Default: body;
        ///</field>
        _Scope.HTMLElementId = "";

        /// <field name='StaticTitle' type='String'>
        ///This will contains title which will be use anywhere  
        ///Default: '';
        ///</field>
        _Scope.StaticTitle = "";

        /// <field name='SelectColumns' type='Object'>
        ///This will contains Array of Column Names <br />
        ///which will be use from your raw JSON data<br />
        ///to draw google chart. 
        ///Default: [];
        ///</field>
        _Scope.SelectColumns = [];

        /// <field name='ReturnColumnsOnSelect' type='Object'>
        ///This will contains Array of Column Names <br />
        ///which will return from your chart data <br />
        ///on selection of any Item by user
        ///Default: [];
        ///</field>
        _Scope.ReturnColumnsOnSelect = [];
        
        /// <field name='fnCallBackAfterDraw' type='Object'>
        ///This will contains callback function which will call after draw chart <br />
        ///Default: null;
        ///</field>
        _Scope.fnCallBackAfterDraw = null;
    }

    //#region public function 
    $this.fnCreateGoogleDataTable = function (data, SelectColumns) {
        //Initialize Google DataTable API
        var MakeDataTable = new google.visualization.DataTable(),
            //if only chosen columns need to convert from raw data to Google DataTable.
            ColumnSegrigation = fnIsNotEmptyORNull(SelectColumns) ? true : false;

        //Segregate raw data with Select columns
        if (ColumnSegrigation) {
            // create new array of objects from old one
            data = $.map(data, function (element, index) {
                var oEntity = {};
                for (var i = 0; i < SelectColumns.length; i++) {
                    oEntity[SelectColumns[i]] = element[SelectColumns[i]];
                }
                return oEntity;
            });
        }

        if (fnIsNotEmptyORNull(data)) {
            //Single loop only for Adding Column Names
            var Content = data[0];
            for (var k in Content) {
                if (Content.hasOwnProperty(k)) {
                    if (typeof Content[k] == Object) {
                        if (Content[k] instanceof Date)
                            MakeDataTable.addColumn(typeof Content[k], k);
                        else
                            MakeDataTable.addColumn('string', k);
                    } else {
                        MakeDataTable.addColumn(typeof Content[k], k);
                    }
                }
            }
            //Add Rows
            MakeDataTable.addRows(data.length);
            //Add Data
            for (var i = 0; i < data.length; i++) {
                var count = 0;
                for (var k in data[i]) {
                    if (data[i].hasOwnProperty(k)) {
                        MakeDataTable.setValue(i, count, data[i][k]);
                    }
                    count++;
                }
                count = 0;
            }
        }
        return MakeDataTable;
    }

    $this.fnDrawChart = function (oSetting) {

        //if user want to bypass Conversion of raw data into datatable
        if (!fnIsNotEmptyORNull(oSetting.ByPassConvertToDataTable) && (!fnIsNotEmptyORNull(oSetting.DataTable))) {
            // Convert Raw JSON Data to Google DataTable
            oSetting.DataTable = $this.fnCreateGoogleDataTable(oSetting.data, oSetting.SelectColumns);
        }

        switch (oSetting.type) {
            case Enums.ChartType.AnnotationChart: {
                fnAnnotationChart(oSetting);
            } break;
            case Enums.ChartType.AreaChart: {
                fnAreaChart(oSetting);
            } break;
            case Enums.ChartType.BarChart: {
                fnBarChart(oSetting);
            } break;
            case Enums.ChartType.BubbleChart: {
                fnBubbleChart(oSetting);
            } break;
            case Enums.ChartType.CalendarChart: {
                fnCalendarChart(oSetting);
            } break;
            case Enums.ChartType.CandleStickChart: {
                fnCandleStickChart(oSetting);
            } break;
            case Enums.ChartType.ColumnChart: {
                fnColumnChart(oSetting);
            } break;
            //case Enums.ChartType.: {
            //    fnDiffCharts(oSetting);
            //} break;
            case Enums.ChartType.DonutChart: {
                fnDonutChart(oSetting);
            } break;
            case Enums.ChartType.GanttChart: {
                fnGanttCharts(oSetting);
            } break;
            case Enums.ChartType.GaugeChart: {
                fnGaugeChart(oSetting);
            } break;
            case Enums.ChartType.GeoChart: {
                fnGeoChart(oSetting);
            } break;
            case Enums.ChartType.HistogramChart: {
                fnHistogramChart(oSetting);
            } break;
            //case Enums.ChartType.IntervalsChart: {
            //    fnIntervalsChart(oSetting);
            //} break;
            case Enums.ChartType.LineChart: {
                fnLineChart(oSetting);
            } break;
            case Enums.ChartType.MapChart: {
                fnMapChart(oSetting);
            } break;
            case Enums.ChartType.OrganizationChart: {
                fnOrganizationChart(oSetting);
            } break;
            case Enums.ChartType.PieChart: {
                fnPieChart(oSetting);
            } break;
            case Enums.ChartType.SankeyDiagramChart: {
                fnSankeyDiagram(oSetting);
            } break;
            case Enums.ChartType.ScatterChart: {
                fnScatterChart(oSetting);
            } break;
            case Enums.ChartType.SteppedAreaChart: {
                fnSteppedAreaChart(oSetting);
            } break;
            case Enums.ChartType.TableChart: {
                fnTableChart(oSetting);
            } break;
            case Enums.ChartType.TimelinesChart: {
                fnTimelinesChart(oSetting);
            } break;
            case Enums.ChartType.TreemapsChart: {
                fnTreemapsChart(oSetting);
            } break;
            //case Enums.ChartType.Trendlines: {
            //    fnTrendlinesChart(oSetting);
            //} break;
            case Enums.ChartType.WaterfallChart: {
                fnWaterfallCharts(oSetting);
            } break;
            case Enums.ChartType.WordTreeChart: {
                fnWordTreeCharts(oSetting);
            } break;
        }

    }
    //#endregion Public Functions

    //#region Private Functions to Draw respective Charts
    function fnAnnotationChart(oSetting) {

        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.AnnotationChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnAreaChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.AreaChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnBarChart(oSetting) {
        // Set chart options
        var options = {
            chart: {
                title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
                subtitle: ((fnIsNotEmptyORNull(oSetting.subtitle)) ? oSetting.subtitle : ''),
            },
            //title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
            bars: ((oSetting.BarDirection) ? oSetting.BarDirection : 'vertical'),
            legend: ((oSetting.LegendPosition) ? oSetting.LegendPosition : 'top'),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnBubbleChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.BubbleChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnCalendarChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.Calendar(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnCandleStickChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.CandlestickChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnColumnChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnDiffCharts(oSetting) {
        // Another Implementation
    }

    function fnDonutChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            //is3D: ((oSetting.is3D) ? oSetting.is3D : false),/* 3d not applicable for Donut Chart */
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
            pieHole: 0.4,//((fnIsNotEmptyORNull(oSetting.pieHole)) ? oSetting.pieHole : 0.4),
        };
        console.log(options);
        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnGanttCharts(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500)
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.Gantt(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnGaugeChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.Gauge(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnGeoChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.GeoChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnHistogramChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.Histogram(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnIntervalsChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnLineChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnMapChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.Map(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnOrganizationChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.OrgChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnPieChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),

            //legend: { position: 'top'},
            animation: {
                startup: true,
                duration: 1000,
                easing: 'inAndOut',
            },
            vAxis: {
                minValue: 0,
                maxValue: 1000
            }
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnSankeyDiagram(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.Sankey(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnScatterChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.ScatterChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnSteppedAreaChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.SteppedAreaChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnTableChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            showRowNumber: true,
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : '100%'),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : '100%'),
        }
        // Instantiate and draw Table chart, passing in some options.
        var chart = new google.visualization.Table(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnTimelinesChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.Timeline(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnTreemapsChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.TreeMap(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnTrendlinesChart(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.ScatterChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnWaterfallCharts(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.CandlestickChart(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }

    function fnWordTreeCharts(oSetting) {
        // Set chart options
        var options = {
            title: ((fnIsNotEmptyORNull(oSetting.title)) ? oSetting.title : oSetting.type),
            is3D: ((oSetting.is3D) ? oSetting.is3D : false),
            width: ((fnIsNotEmptyORNull(oSetting.width)) ? oSetting.width : 500),
            height: ((fnIsNotEmptyORNull(oSetting.height)) ? oSetting.height : 500),
            isStacked: ((oSetting.isStacked) ? oSetting.isStacked : false),
        };

        // Instantiate and draw pie chart, passing in some options.
        var chart = new google.visualization.WordTree(document.getElementById(oSetting.HTMLElementId));
        chart.draw(oSetting.DataTable, (fnIsNotEmptyORNull(oSetting.options) ? oSetting.options : options));

        // Call fnCallBackAfterDraw
        if ((oSetting.fnCallBackAfterDraw != undefined && oSetting.fnCallBackAfterDraw != null) && $.isFunction(oSetting.fnCallBackAfterDraw)) {
            return oSetting.fnCallBackAfterDraw.call(this);
        }
    }
    //#endregion Private Functions 

    //#region Private Functions for commonly use.
    function fnIsNotEmptyORNull(data) {
        /// <field name='fnIsNotEmptyORNull' type='Object'>
        ///check parameter is Null/Undefined/Empty string
        ///Default: null;
        ///</field>
        if ((typeof data !== 'undefined') && (data !== null) && (data.length != 0)) {
            return true;
        } else {
            return false;
        }
    }

    function fnIsCallBackFunction(fnName) {
        /// <field name='fnIsCallBackFunction' type='Object'>
        /// check parameter is JavaScript function of not.
        /// Default: null;
        /// /field>
        if ((fnName != undefined && fnName != null) && $.isFunction(fnName))
            return true;
        else
            return false;
    }
    //#endregion

}
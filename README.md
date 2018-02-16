# GoogleCharts-Renderer
Implement google charts with some easy steps.

## Objective & scope of module.
Google has developed a very powefull tool for charts which has around 28 chart types included in it. but to implement those charts in your application you need to understand the coding standards and follow the same in your application code, but lets suppose if you have multiple charts to be implement on your page then you will have to rewrite same lines of code for count of charts.<br /> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google charts work with <a target="_blank" href="https://developers.google.com/chart/interactive/docs/datatables_dataviews">DaTaTable Format</a> so we need to provide data is same formate and that is mandatory, but what if you want to pass your data as it is, without any variation ? so for easy development and implementation purpose i have developed one library module where we just need set some options and we are done.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apart from this, i have developed one more module where we can generate configuration settings for any chart among available charts from <a target="_blank" href="http://googlecharts-configuration-generator.com/">Google charts gallery</a>. So with few clicks we can play and fine tune the chart settings and make our chart very customizable.

## Key Features
- Easy to implement google charts
- No need to go through google charts all javascript code.
- Implement google chart with some easy steps
- Switch your chart by just changing options.
- Convert your raw JSON data into google chart DataTable*

## How it works
This library module internaly follows all steps of google chart javascript code, so its nothing but one javascript wrapper library which has encapsulated all complex code and gives you very simple options to implement complex code easily.
  
### Properties and functions:

> Google chart draw charts on the basis of options which we passes along with data. where data can be either in JSON format or google <a target="_blank" href="https://developers.google.com/chart/interactive/docs/datatables_dataviews">DaTaTable Format</a>, but configuration settings are in the form of JSON only. 
(@Note: here's my <a target="_blank" href="http://googlecharts-configuration-generator.com/">GoogleChart Configuration generator</a> comes into the picture. just copy configuration which you have generated from my configuration generator module and pass it to this property, and thats it. )
```
/// <field name='options' type='Object'>
/// This will contains Settings for Chart.<br />
/// Default: {};
/// </field>
_Scope.options = null;
```

> any Google Chart needs data in their own <a target="_blank" href="https://developers.google.com/chart/interactive/docs/datatables_dataviews">DaTaTable Format</a>, we usually have our own customised JSON format either in case of returning from any API or from any Method. so in this case we dont need to concirn about what our JSON data format is, just pass it to this option, it has been handled inside plugin .
```
/// <field name='data' type='Object'>
/// This will contains your raw JSON Data of key-value pair.<br />
/// Default: {};
/// </field>
_Scope.data = null;
```

> among your RAW JSON data if your have huge numbers of key-value paire JSON, but among those if you want to use only some pairs to be include while drawing the chart then you just need to pass those columns names or Key names in array format to this option. this option will segregate only mentioned columns names or key names from your RAW JSON data and convert it into <a target="_blank" href="https://developers.google.com/chart/interactive/docs/datatables_dataviews">Google DaTaTable Format</a>.
```
/// <field name='SelectColumns' type='Object'>
/// This will contains Array of Column Names <br />
/// which will be use from your raw JSON data<br />
/// to draw google chart. 
/// Default: [];
/// </field>
_Scope.SelectColumns = [];
```

> sometimes if you want to pass Google Datatable Format directly, you can pass it here. if you will pass RAW JSON data then its automatically convert into DataTables inside plugin.
```
/// <field name='DataTable' type='Object'>
/// This will contains google Visualization DataTable data.<br />
/// Default: {};
/// </field>
_Scope.DataTable = null;
```

> plugin always expect RAW JSON data. so every time it convert raw json data into Google Datatables Format. but if in case you are passing Google Datatables directly then you need to tell the plugin explicitly to By-Pass convertion process, as require data formate is going to pass directly.
```
/// <field name='ByPassConvertToDataTable' type='Object'>
/// This will contains google Visualization DataTable data.<br />
/// Default: {};
/// </field>
_Scope.ByPassConvertToDataTable = null;
```

> there are more than 20 diffrent types of google charts, among those which chart you want to draw, this you need to specify here.
```
/// <field name='type' type='String'>
/// This will contains chart type.<br />
/// (Chose from "ChartType" Enum).<br />
/// Default: ChartType.Table;
/// </field>
_Scope.type = "";
```

> in google chart we need to pass HTMLElement ID inside which, google chart tool will render the chart or draw the chart, so we need to specify any existing HTML Element ID from our page where chart will be drawn. 
```
/// <field name='HTMLElementId' type='String'>
/// This will contains Id of targeted HTML Element 
/// Default: body;
/// </field>
_Scope.HTMLElementId = "";
```

> if you want to call any callback function after chart gets drawn then you just need to pass your callback function name in this option. your function gets call as soon as your chart gets drawn.
```
/// <field name='fnCallBackAfterDraw' type='Object'>
/// This will contains callback function which will call after draw chart <br />
/// Default: null;
/// </field>
_Scope.fnCallBackAfterDraw = null;
```

> this is very basic nonmandetory option (its allredy there in Google charts settings generatore),but still you can use it if you not going to pass any customised configuration settings and if you want to draw default google chart.
```
/// <field name='height' type='String'>
/// This will contains height in Number or String format.<br />
/// e.g. Number 300 will appear 300px height <br />
/// String '30%' will appear 30% height<br />
/// Default: 500px;
/// </field>
_Scope.height = "";
```

>this is very basic nonmandetory option (its allredy there in Google charts settings generatore),but still you can use it if you not going to pass any customised configuration settings and if you want to draw default google chart.
```
/// <field name='width' type='Number'>
/// This will contains height in Number or String format.<br />
/// e.g. Number 300 will appear 300px width <br />
/// String '30%' will appear 30% width<br />
/// Default: 500px;
/// </field>
_Scope.width = "";
```

## How to install this library in your page.
1. Add <a href="https://www.gstatic.com/charts/loader.js" target="_blank">GoogleChart Loader</a> Script in your page
```
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
```
2. Add my GoogleChart.js in your page 
```
<script type="text/javascript" src="js/GoogleChart.js"></script>
```
3. Add following code
```
// Initialize Google chart class
var ObjGoogleCharts = new GoogleCharts(); //mandatory

// create an object of class settings
var Settings = new ObjGoogleCharts.oSetting(); //mandatory

// Set your chart type
Settings.type = 'PieChart';//mandatory

// your RAW Json Data
Settings.data = data;//mandatory

// if u are passing Google Datatable directly then bypass google Datatables Convertion process
Settings.ByPassConvertToDataTable = true; //optional

// pass google Datatable format Directly
Settings.DataTable = data; //optional

// Chart going to Draw inside this HTML element
Settings.HTMLElementId = 'Your-HTML-Element-Id'; //mandatory

// pass your settings to this public function fnDrawChart to Draw Google Chart
ObjGoogleCharts.fnDrawChart(Settings); //mandatory

```
and its done. hurrayyyyyy...

## Some features are on road map.
- Drill down functionality.
- Callback feature on drill down events.
- Return data to drill down event from selected chart area.    

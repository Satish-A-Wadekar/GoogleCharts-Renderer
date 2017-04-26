# GoogleChartsRenderer
Implement google charts with some easy steps.

# Objective & Scope of GoogleChartsRenderer.
Google has developed a very powefull tool for chart which has more than 20 charts type included in it. but to implement those charts in your application you need to go through their all settings and understand each and every option, if you want try some options on charts like how does it look after apply on chart then either you need to go on JSFiddler and do your RND or follow the same on your local environment. google has given so many options in every chart which we can not go through it very quickly so its quite tedious and time consuming to test all these option on our chart. so how we can achieve this with some easy steps ?

for this purpose i have developed one plugin where we can just set some options. apart from that i have developed one small project where i have assembled all configuration options of all google charts and put it in one customised JSON format. so now we can generate our any google chart settings and make our google chart very customizable.

# Key Features of GoogleChart renderer plugin
- no need to go through google js code.
- implement google chart with some easy steps
- switch your chart with just changing your chart type.


# How it works
I have developed one easy plugin which take cares about all google chart related javascript code which includes creating appropriate chart object,convert our RAW JSON data to google DataTable data, pass DataTable data to chart. we just need to pass appropriate settings.
  
## Properties
Some public properties and functions which are as follows

> google chart tool draw charts on the basis of options which we passes along with data. where data can be either in JSON format or google <a target="_blank" href="https://developers.google.com/chart/interactive/docs/datatables_dataviews">DaTaTable Format</a>, but configuration settings are in the form of JSON only. 
( @Note: here my GoogleChart Configuration generator comes into the picture. just copy your google settings which you have generated from my settings generatore and pass it to this property, and thats it. )
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

> among your RAW JSON data if your have both wanted and unwanted columns, but you want to use only some columns to be include and consider while drawing the chart then you just need to pass those columns names in array format to this option. this option will segregate only mentioned columns from your RAW JSON data and convert it into <a target="_blank" href="https://developers.google.com/chart/interactive/docs/datatables_dataviews">Google DaTaTable Format</a>.
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

> plugin always expect RAW JSON data. so every time it convert raw json data into Google Datatables Format. but if in case you are passing Google Datatables directly then you need to tell the plugin explicitly to By-Pass convertion process as require data formate is going to pass directly.
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

> in google chart we need to pass HTMLElement ID where google chart tool will render chart or draw chart we need to specify any existing HTML Element ID from our page where our chart will draw. 
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

> this is very basic nonmandetory option (its allredy there in Google charts settings generatore), this you can use if you not going to pass any customised settings and want to draw very basic google chart.
```
/// <field name='height' type='String'>
/// This will contains height in Number or String format.<br />
/// e.g. Number 300 will appear 300px height <br />
/// String '30%' will appear 30% height<br />
/// Default: 500px;
/// </field>
_Scope.height = "";
```

>this is very basic nonmandetory option (its allredy there in Google charts settings generatore), this you can use if you not going to pass any customised settings and want to draw very basic google chart.
```
/// <field name='width' type='Number'>
/// This will contains height in Number or String format.<br />
/// e.g. Number 300 will appear 300px width <br />
/// String '30%' will appear 30% width<br />
/// Default: 500px;
/// </field>
_Scope.width = "";
```

## how to use Google chart Plugin in your page
1. Add <a href="" target="_blank">GoogleChart Loader</a> Script in your page
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
Settings.ByPassConvertToDataTable = true; //non-mandatory

// pass google Datatable format Directly
Settings.DataTable = data; //Non-mandatory

// Chart going to Draw inside this HTML element
Settings.HTMLElementId = 'Your-HTML-Element-Id'; //mandatory

// pass your settings to this public function fnDrawChart to Draw Google Chart
ObjGoogleCharts.fnDrawChart(Settings); //mandatory

```
and its done. 

### some feature which are comming soon.
- chart drill down option.
- callback on drill down.
- return data of selected area on drill down.    

import { Component, OnInit, ViewEncapsulation, OnChanges, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { DashboardService } from '../services/dashboard.service';
declare var $: any;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit, OnChanges {
  @ViewChild('linechart') private chartContainer: ElementRef;
  @Input() private data: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    if (this.data) {
      this.createChart(this.data);
    }
  }

  ngOnChanges(changes) {
    if (this.data && changes.data.previousValue) {
      this.createChart(this.data);
    }
  }

  createChart(data) {
    let tempThis =this;
    let el = this.chartContainer.nativeElement;
    d3.select(el).selectAll("*").remove();
    var margin = {
      top: 20,
      right: 15,
      bottom: 60,
      left: 50
    };
    if($(window).width() > 565){
     var width = 380;
    }else {
     var width = $(window).width()-100;
    }
    if (el.clientWidth > 565){
      var height = 220 - margin.top - margin.bottom;
    }
    else{
      var height = 200 - margin.top - margin.bottom;
    }
    var x = d3.scaleBand().range([0, width], 1.0);
    var y = d3.scaleLinear().rangeRound(
      [height, 0]);

    var xAxis = d3.axisBottom().scale(x).ticks(5);
    var yAxis = d3.axisLeft().scale(y)
      .ticks(5);

    var dataNest = d3.nest().key(function (d) {
      return d.key;
    }).entries(data);

    var lineFunctionCardinal = d3.line()
      .defined(function (d) { return d && d.value != null; })
      .x(function (d) {
        return x(d.date) + width / data.length * dataNest.length / 2;
      }).y(function (d) {
        return y(d.value);
      }).curve(d3.curveMonotoneX);

    y.domain([0, 100]);

    // Adds the svg canvas
    var svg = d3.select(el).append("svg").attr("id",
      "trendsvg").attr("width",
        width + margin.left + margin.right).attr(
          "height",
          height + margin.top + margin.bottom + 200)
      .append("g").attr(
        "transform",
        "translate(" + margin.left + ","
        + (margin.top + 50) + ")").style(
          "fill", "#fff");

    x.domain(data.map(function (d) {
      return d.date;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    var color = d3.scaleOrdinal().range(
      ["#1a9641"]);

    svg.append("g").attr("class", "xaxis")
      .attr(
        "transform", "translate(0," + height + ")")
      .call(xAxis).append("text").attr("x",
        width).attr("y",
          "65").attr("dx", ".71em");
    d3.selectAll(".xaxis .tick text").attr("dx", "-3em").attr("dy",
      "0").attr("transform", function (d) {
        return "rotate(-50)";
      }).style({
        "text-anchor":
          "end", "font-size": "8px"
      });

    svg.selectAll("text");
    svg.append("g").attr("class", "yaxis").call(yAxis)
      .append("text").attr("transform",
        "rotate(-90)").attr("y", -50).attr("x", -height / 2).attr(
          "dy", ".51em");
    // adding multiple lines in Line chart
    for (var index = 0; index < dataNest.length; index++) {

      var series = svg.append(
        "g").attr("class", "series tag" + dataNest[index].key.split(" ")[0]).attr("id",
          "tag" + dataNest[index].key.split(" ")[0]);

      var path = svg.selectAll(".series#tag" + dataNest[index].key.split(" ")[0])
        .append("path")
        .attr("class", "line tag" + dataNest[index].key.split(" ")[0])
        .attr("id", "tag" + dataNest[index].key.split(" ")[0])
        .attr(
          "d",
          function (d) {
            return lineFunctionCardinal(dataNest[index].values);
          }).style("stroke", function (d) {
            return color(dataNest[index].key);
          }).style("stroke-width", "2px").style(
            "fill", "none").style("cursor", function (d) {
              return "default";
            }).on("mouseover",
              function (d) {
                if ($(this).attr("id") == "tagP-Average")
                  showPopover.call(this, dataNest[3].values[0]);
              }).on("mouseout", function (d) {
                removePopovers();
              });;

      svg.selectAll(".series#tag" + dataNest[index].key.split(" ")[0]).select(".point").data(function () {
        return dataNest[index].values;
      }).enter().append("circle").attr("id",
        "tag" + dataNest[index].key.split(" ")[0]).attr(
          "class", function (d) {
            return dataNest[index].key.split(" ")[0]
          }).attr("cx",
            function (d) {
              return x(d.date) + width / data.length * dataNest.length / 2;
            }).attr("cy", function (d) {
              return y(d.value);
            }).attr("r", function (d) {
              if (d.value != null && d.key == "CL")
                return "3px";
              else
                return "3px";
            }).style("fill", function (d) {
              return "#fff";
            }).style("stroke", "none").style(
              "stroke-width", "2px").style("cursor", "pointer").on("mouseover",
                function (d) {
                  showPopover.call(this, d);
                }).on("mouseout", function (d) {
                  removePopovers();
                });

    }

    svg.append("text").attr("x", width / 2)
      .attr("y", height + 70).attr("dy", ".3em")
      .text("Date")
      .style("font-size", "12px")
      .style("text-anchor", "middle");

    svg.append("text")
      .attr("transform", "rotate(-90)").attr("x", -height / 2)
      .attr("y", -45).attr("dy", ".51em")
      .text(this.dashboardService.selectedIndicator)
      .style("font-size", "12px")
      .style("text-anchor", "middle")

    d3.selectAll(".tick line").style({ "fill": "none", "stroke": "#fff" });
    function removePopovers() {
      $('.popover').each(function () {
        $(this).remove();
      });
    }
    function showPopover(d) {
      let areaLevel: string;
      if (d.areaLevelId == 4) {
        areaLevel = "Block"
      } else {
        areaLevel = "District"
      }
      $(this).popover(
        {
          title: '',
          placement: 'top',
          container: 'body',
          trigger: 'manual',
          html: true,
          animation: false,
          content: () => {
            return "Date: <span class='navy-text'>" + d.date
              + "</span><br/>" + tempThis.dashboardService.selectedIndicator + ": <span class='navy-text'>"
              + d.value + "</span><br/>" + areaLevel + ": <span class='navy-text'>"
              + d.name + "</span>";
          }
        });
      $(this).popover('show');
    }

    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };
    d3.selectAll(".domain, .y.axis .tick line").style({ "fill": "none", "stroke": "#000" });
    d3.selectAll("circle.point").moveToFront();
  }
}

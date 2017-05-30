/**
 * Created by Administrator on 2017/5/26 0026.
 */

var  chartConfig = {
    1:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50,
            dataType: 1,
            chartId:0
        },
        chart: {
            type: 'line',
            borderColor:'#ffffff',
            borderWidth: 1,
            backgroundColor:'rba(0,0,0,.3)',
            style:{ 'background-color':'rba(0,0,0,0)' }
        },
        title: {
            text: '不同城市的月平均气温',
            x: -20,
            style:{ color:'#fff' }
        },
        xAxis: {
            categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            style:{ color:'#fff' }
        },
        yAxis: {
            title: {
                text: '温度 (°C)'
            },
            style:{ color:'#fff' },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '东京',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '纽约',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: '柏林',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: '伦敦',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    },
    2:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'line',
            borderColor:'#ffffff',
            borderWidth: 1,
            backgroundColor:'#ffffff',
            style:{ 'background-color':'rba(255,255,255,.3)' }
        },
        title: {
            text: '月平均气温'
        },
        subtitle: {
            text: '数据来源: WorldClimate.com'
        },
        xAxis: {
            categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            title: {
                text: '气温 (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true          // 开启数据标签
                },
                enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            }
        },
        series: [{
            name: '东京',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '伦敦',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    },
    4:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'spline',
            inverted: true,
            borderColor:'#ffffff',
            borderWidth: 1,
            backgroundColor:'#ffffff',
            style:{ 'background-color':'rba(255,255,255,.3)' }
        },
        title: {
            text: '大气温度和海拔高度关系'
        },
        subtitle: {
            text: '根据标准大气模型绘制'
        },
        xAxis: {
            reversed: false,
            title: {
                enabled: true,
                text: '海拔高度'
            },
            labels: {
                formatter: function () {
                    return this.value + 'km';
                }
            },
            maxPadding: 0.05,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: '温度'
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            },
            lineWidth: 2
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x} km: {point.y}°C'
        },
        plotOptions: {
            spline: {
                marker: {
                    enable: false
                }
            }
        },
        series: [{
            name: '温度',
            data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
        }]
    },
    5:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'spline',
            borderColor:'#ffffff',
            borderWidth: 1,
            backgroundColor:'#ffffff',
            style:{ 'background-color':'rba(255,255,255,.3)' }
        },
        title: {
            text: '两地月平均温度'
        },
        subtitle: {
            text: '数据来源: WorldClimate.com'
        },
        xAxis: {
            categories: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            title: {
                text: '温度'
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: '东京',
            marker: {
                symbol: 'square'
            },
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                y: 26.5,
                marker: {
                    symbol: 'url(https://www.highcharts.com/demo/gfx/sun.png)'
                }
            }, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '伦敦',
            marker: {
                symbol: 'diamond'
            },
            data: [{
                y: 3.9,
                marker: {
                    symbol: 'url(https://www.highcharts.com/demo/gfx/snow.png)'
                }
            }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    },
    6:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'spline',
            borderColor:'#ffffff',
            borderWidth: 1,
            backgroundColor:'#ffffff',
            style:{ 'background-color':'rba(255,255,255,.3)' }
        },
        title: {
            text: '风速变化趋势图'
        },
        subtitle: {
            text: '2009年10月6日和7日两地风速情况'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            title: {
                text: '风 速 (m/s)'
            },
            min: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: [{ // Light air
                from: 0.3,
                to: 1.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: '轻空气',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 1.5,
                to: 3.3,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: '微风',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Gentle breeze
                from: 3.3,
                to: 5.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: '柔和风',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Moderate breeze
                from: 5.5,
                to: 8,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: '温和风',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Fresh breeze
                from: 8,
                to: 11,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: '清新风',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Strong breeze
                from: 11,
                to: 14,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: '强风',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // High wind
                from: 14,
                to: 15,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: '狂风',
                    style: {
                        color: '#606060'
                    }
                }
            }]
        },
        tooltip: {
            valueSuffix: ' m/s'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
            }
        },
        series: [{
            name: 'Hestavollane',
            data: [4.3, 5.1, 4.3, 5.2, 5.4, 4.7, 3.5, 4.1, 5.6, 7.4, 6.9, 7.1,
                7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4,
                8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5,
                7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3, 4.4, 4.2,
                3.0, 3.0]
        }, {
            name: 'Voll',
            data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0,
                0.0, 0.4, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                0.0, 0.6, 1.2, 1.7, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3,
                3.0, 3.3, 4.8, 5.0, 4.8, 5.0, 3.2, 2.0, 0.9, 0.4, 0.3, 0.5, 0.4]
        }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    },
    7:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'spline',
            borderColor:'#ffffff',
            borderWidth: 1,
            backgroundColor:'#ffffff'
        },
        title: {
            text: '某地积雪厚度监测'
        },
        subtitle: {
            text: '非规律性时间内的变化'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                text: '积雪 厚度 (m)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        series: [{
            name: '2007-2008 冬',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: [
                [Date.UTC(1970,  9, 27), 0   ],
                [Date.UTC(1970, 10, 10), 0.6 ],
                [Date.UTC(1970, 10, 18), 0.7 ],
                [Date.UTC(1970, 11,  2), 0.8 ],
                [Date.UTC(1970, 11,  9), 0.6 ],
                [Date.UTC(1970, 11, 16), 0.6 ],
                [Date.UTC(1970, 11, 28), 0.67],
                [Date.UTC(1971,  0,  1), 0.81],
                [Date.UTC(1971,  0,  8), 0.78],
                [Date.UTC(1971,  0, 12), 0.98],
                [Date.UTC(1971,  0, 27), 1.84],
                [Date.UTC(1971,  1, 10), 1.80],
                [Date.UTC(1971,  1, 18), 1.80],
                [Date.UTC(1971,  1, 24), 1.92],
                [Date.UTC(1971,  2,  4), 2.49],
                [Date.UTC(1971,  2, 11), 2.79],
                [Date.UTC(1971,  2, 15), 2.73],
                [Date.UTC(1971,  2, 25), 2.61],
                [Date.UTC(1971,  3,  2), 2.76],
                [Date.UTC(1971,  3,  6), 2.82],
                [Date.UTC(1971,  3, 13), 2.8 ],
                [Date.UTC(1971,  4,  3), 2.1 ],
                [Date.UTC(1971,  4, 26), 1.1 ],
                [Date.UTC(1971,  5,  9), 0.25],
                [Date.UTC(1971,  5, 12), 0   ]
            ]
        }, {
            name: '2008-2009 冬',
            data: [
                [Date.UTC(1970,  9, 18), 0   ],
                [Date.UTC(1970,  9, 26), 0.2 ],
                [Date.UTC(1970, 11,  1), 0.47],
                [Date.UTC(1970, 11, 11), 0.55],
                [Date.UTC(1970, 11, 25), 1.38],
                [Date.UTC(1971,  0,  8), 1.38],
                [Date.UTC(1971,  0, 15), 1.38],
                [Date.UTC(1971,  1,  1), 1.38],
                [Date.UTC(1971,  1,  8), 1.48],
                [Date.UTC(1971,  1, 21), 1.5 ],
                [Date.UTC(1971,  2, 12), 1.89],
                [Date.UTC(1971,  2, 25), 2.0 ],
                [Date.UTC(1971,  3,  4), 1.94],
                [Date.UTC(1971,  3,  9), 1.91],
                [Date.UTC(1971,  3, 13), 1.75],
                [Date.UTC(1971,  3, 19), 1.6 ],
                [Date.UTC(1971,  4, 25), 0.6 ],
                [Date.UTC(1971,  4, 31), 0.35],
                [Date.UTC(1971,  5,  7), 0   ]
            ]
        }, {
            name: '2009-2010 冬',
            data: [
                [Date.UTC(1970,  9,  9), 0   ],
                [Date.UTC(1970,  9, 14), 0.15],
                [Date.UTC(1970, 10, 28), 0.35],
                [Date.UTC(1970, 11, 12), 0.46],
                [Date.UTC(1971,  0,  1), 0.59],
                [Date.UTC(1971,  0, 24), 0.58],
                [Date.UTC(1971,  1,  1), 0.62],
                [Date.UTC(1971,  1,  7), 0.65],
                [Date.UTC(1971,  1, 23), 0.77],
                [Date.UTC(1971,  2,  8), 0.77],
                [Date.UTC(1971,  2, 14), 0.79],
                [Date.UTC(1971,  2, 24), 0.86],
                [Date.UTC(1971,  3,  4), 0.8 ],
                [Date.UTC(1971,  3, 18), 0.94],
                [Date.UTC(1971,  3, 24), 0.9 ],
                [Date.UTC(1971,  4, 16), 0.39],
                [Date.UTC(1971,  4, 21), 0   ]
            ]
        }]
    },
    8:{
        chart:{
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        title: {
            text: '对数折线图'
        },
        xAxis: {
            tickInterval: 1
        },
        yAxis: {
            type: 'logarithmic',
            minorTickInterval: 0.1
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: 'x = {point.x}, y = {point.y}'
        },
        series: [{
            data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
            pointStart: 1
        }]
    },
    9:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'area',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '美苏核武器库存量'
        },
        subtitle: {
            text: '数据来源: <a href="https://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
            'thebulletin.metapress.com</a>'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: '核武库国家'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
        },
        plotOptions: {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: '美国',
            data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
        }, {
            name: '苏联/俄罗斯',
            data: [null, null, null, null, null, null, null, null, null, null,
                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                21000, 20000, 19000, 18000, 18000, 17000, 16000]
        }]
    },
    10:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'area',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '包含负值的面积图'
        },
        xAxis: {
            categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '小张',
            data: [5, 3, 4, 7, 2]
        }, {
            name: '小彭',
            data: [2, -2, -3, 2, 1]
        }, {
            name: '小潘',
            data: [3, 4, 4, -2, 5]
        }]
    },
    11:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'area',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '全球各大洲人口增长历史及预测'
        },
        subtitle: {
            text: '数据来源: Wikipedia.org'
        },
        xAxis: {
            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: '十亿'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            split: true,
            valueSuffix: ' 百万'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: '亚洲',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: '非洲',
            data: [106, 107, 111, 133, 221, 767, 1766]
        }, {
            name: '欧洲',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: '美洲',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }, {
            name: '大洋洲',
            data: [2, 2, 2, 6, 13, 30, 46]
        }]
    },
    12:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'area',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '全球各大洲人口占比'
        },
        subtitle: {
            text: '数据来源: Wikipedia.org'
        },
        xAxis: {
            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: '百分比'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} 百万)<br/>',
            shared: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                }
            }
        },
        series: [{
            name: '亚洲',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: '非洲',
            data: [106, 107, 111, 133, 221, 767, 1766]
        }, {
            name: '欧洲',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: '美洲',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }, {
            name: '大洋洲',
            data: [2, 2, 2, 6, 13, 30, 46]
        }]
    },
    13:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'area',
            spacingBottom: 30,
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '小张和小潘家水果的消费情况 *'
        },
        subtitle: {
            text: '* 小潘家的香蕉消费未知',
            floating: true,
            align: 'right',
            verticalAlign: 'bottom',
            y: 15
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF'
        },
        xAxis: {
            categories: ['苹果', '梨', '橘子', '香蕉', '葡萄', '李子', '草莓', '树莓']
        },
        yAxis: {
            title: {
                text: 'Y-Axis'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.x + ': ' + this.y;
            }
        },
        plotOptions: {
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '小张',
            data: [0, 1, 4, 4, 5, 2, 3, 7]
        }, {
            name: '小潘',
            data: [1, 0, 3, null, 3, 1, 2, 1]
        }]
    },
    14:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'area',
            inverted: true,
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '不同家庭一周水果平均消费面积图'
        },
        subtitle: {
            style: {
                position: 'absolute',
                right: '0px',
                bottom: '10px'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF'
        },
        xAxis: {
            categories: [
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六',
                '周日'
            ]
        },
        yAxis: {
            title: {
                text: '单位数量'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            min: 0
        },
        plotOptions: {
            area: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: '小张',
            data: [3, 4, 3, 5, 4, 10, 12]
        }, {
            name: '小潘',
            data: [1, 3, 4, 3, 3, 5, 4]
        }]
    },
    15:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'areaspline',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '不同家庭一周水果消费情况'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF'
        },
        xAxis: {
            categories: [
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六',
                '周日'
            ],
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: '水果 单位'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' 单位'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: '小张',
            data: [3, 4, 3, 5, 4, 10, 12]
        }, {
            name: '小潘',
            data: [1, 3, 4, 3, 3, 5, 4]
        }]
    },
    16:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'arearange',
            zoomType: 'x',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '某地白天温度变化'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: '°C'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: '气温',
            data: [[1388538000000, 1.1, 4.7]]
        }]
    },
    17:{
        chart:{
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        title: {
            text: '某地7月份气温范围及平均值'
        },
        xAxis: {
            type: 'datetime',
            //tickInterval: 7 * 24 * 60 * 60 * 1000,
            dateTimeLabelFormats: {
                week: '%Y-%m-%d'
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: '°C',
            dateTimeLabelFormats: {
                day: '%Y-%m-%d'
            }
        },
        legend: {
        },
        series: [{
            name: '气温',
            data: [],
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2
                // lineColor: Highcharts.getOptions().colors[0]
            }
        }, {
            name: '范围',
            data: [],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            // color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0
        }]
    },
    // 18:{},
    19:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'bar',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '各洲不同时间的人口条形图'
        },
        subtitle: {
            text: '数据来源: Wikipedia.org'
        },
        xAxis: {
            categories: ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '人口总量 (百万)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' 百万'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    allowOverlap: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '1800 年',
            data: [107, 31, 635, 203, 2]
        }, {
            name: '1900 年',
            data: [133, 156, 947, 408, 6]
        }, {
            name: '2008 年',
            data: [973, 914, 4054, 732, 34]
        }]
    },
    20:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'bar',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '堆叠条形图'
        },
        xAxis: {
            categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
        },
        yAxis: {
            min: 0,
            title: {
                text: '水果消费总量'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: '小张',
            data: [5, 3, 4, 7, 2]
        }, {
            name: '小彭',
            data: [2, 2, 3, 2, 1]
        }, {
            name: '小潘',
            data: [3, 4, 4, 2, 5]
        }]
    },
    21:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'bar',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '2015 年德国人口金字塔'
        },
        subtitle: {
            useHTML: true,
            text: '数据来源: <a href="http://populationpyramid.net/germany/2015/">1950 ~ 2100 年世界人口金字塔</a>'
        },
        xAxis: [{
            categories: ['0-4', '5-9', '10-14', '15-19',
                '20-24', '25-29', '30-34', '35-39', '40-44',
                '45-49', '50-54', '55-59', '60-64', '65-69',
                '70-74', '75-79', '80-84', '85-89', '90-94',
                '95-99', '100 + '],
            reversed: false,
            labels: {
                step: 1
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: ['0-4', '5-9', '10-14', '15-19',
                '20-24', '25-29', '30-34', '35-39', '40-44',
                '45-49', '50-54', '55-59', '60-64', '65-69',
                '70-74', '75-79', '80-84', '85-89', '90-94',
                '95-99', '100 + '],
            linkedTo: 0,
            labels: {
                step: 1
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return (Math.abs(this.value) / 1000000) + 'M';
                }
            },
            min: -4000000,
            max: 4000000
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                    '人口: ' + Math.abs(this.point.y);
            }
        },
        series: [{
            name: '男',
            data: [-1746181, -1884428, -2089758, -2222362, -2537431, -2507081, -2443179,
                -2664537, -3556505, -3680231, -3143062, -2721122, -2229181, -2227768,
                -2176300, -1329968, -836804, -354784, -90569, -28367, -3878]
        }, {
            name: '女',
            data: [1656154, 1787564, 1981671, 2108575, 2403438, 2366003, 2301402, 2519874,
                3360596, 3493473, 3050775, 2759560, 2304444, 2426504, 2568938, 1785638,
                1447162, 1005011, 330870, 130632, 21208]
        }]
    },
    22:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'column',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '月平均降雨量'
        },
        subtitle: {
            text: '数据来源: WorldClimate.com'
        },
        xAxis: {
            categories: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '降雨量 (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '东京',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }, {
            name: '纽约',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        }, {
            name: '伦敦',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        }, {
            name: '柏林',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        }]
    },
    23:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'column',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '包含负值的柱形图'
        },
        xAxis: {
            categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '小张',
            data: [5, 3, 4, 7, 2]
        }, {
            name: '小彭',
            data: [2, -2, -3, 2, 1]
        }, {
            name: '小潘',
            data: [3, 4, 4, -2, 5]
        }]
    },
    24:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'column',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '堆叠柱形图'
        },
        xAxis: {
            categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
        },
        yAxis: {
            min: 0,
            title: {
                text: '水果消费总量'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    '总量: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: '小张',
            data: [5, 3, 4, 7, 2]
        }, {
            name: '小彭',
            data: [2, 2, 3, 2, 1]
        }, {
            name: '小潘',
            data: [3, 4, 4, 2, 5]
        }]
    },
    25:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'column',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '按性别划分的水果消费总量'
        },
        xAxis: {
            categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: '水果数量'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    '总量: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: '小张',
            data: [5, 3, 4, 7, 2],
            stack: 'male'
        }, {
            name: '小潘',
            data: [3, 4, 4, 2, 5],
            stack: 'male'
        }, {
            name: '小彭',
            data: [2, 5, 6, 2, 1],
            stack: 'female'
        }, {
            name: '小王',
            data: [3, 0, 4, 4, 3],
            stack: 'female'
        }]
    },
    26:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'column',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '百分比堆叠柱形图'
        },
        xAxis: {
            categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
        },
        yAxis: {
            min: 0,
            title: {
                text: '水果消费总量'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: '小张',
            data: [5, 3, 4, 7, 2]
        }, {
            name: '小彭',
            data: [2, 2, 3, 2, 1]
        }, {
            name: '小潘',
            data: [3, 4, 4, 2, 5]
        }]
    },
    27:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'column',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '全球各大城市人口排行'
        },
        subtitle: {
            text: '数据截止 2017-03，来源: <a href="https://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '人口 (百万)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '人口总量: <b>{point.y:.1f} 百万</b>'
        },
        series: [{
            name: '总人口',
            data: [
                ['上海', 24.25],
                ['卡拉奇', 23.50],
                ['北京', 21.51],
                ['德里', 16.78],
                ['拉各斯', 16.06],
                ['天津', 15.20],
                ['伊斯坦布尔', 14.16],
                ['东京', 13.51],
                ['广州', 13.08],
                ['孟买', 12.44],
                ['莫斯科', 12.19],
                ['圣保罗', 12.03],
                ['深圳', 10.46],
                ['雅加达', 10.07],
                ['拉合尔', 10.05],
                ['首尔', 9.99],
                ['武汉', 9.78],
                ['金沙萨', 9.73],
                ['开罗', 9.27],
                ['墨西哥', 8.87]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    },
    28:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'column',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '2015年1月-5月，各浏览器的市场份额'
        },
        subtitle: {
            text: '点击可查看具体的版本数据，数据来源: <a href="https://netmarketshare.com">netmarketshare.com</a>.'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: '总的市场份额'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [{
            name: '浏览器品牌',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33,
                drilldown: 'Microsoft Internet Explorer'
            }, {
                name: 'Chrome',
                y: 24.03,
                drilldown: 'Chrome'
            }, {
                name: 'Firefox',
                y: 10.38,
                drilldown: 'Firefox'
            }, {
                name: 'Safari',
                y: 4.77,
                drilldown: 'Safari'
            }, {
                name: 'Opera',
                y: 0.91,
                drilldown: 'Opera'
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2,
                drilldown: null
            }]
        }],
        drilldown: {
            series: [{
                name: 'Microsoft Internet Explorer',
                id: 'Microsoft Internet Explorer',
                data: [
                    [
                        'v11.0',
                        24.13
                    ],
                    [
                        'v8.0',
                        17.2
                    ],
                    [
                        'v9.0',
                        8.11
                    ],
                    [
                        'v10.0',
                        5.33
                    ],
                    [
                        'v6.0',
                        1.06
                    ],
                    [
                        'v7.0',
                        0.5
                    ]
                ]
            }, {
                name: 'Chrome',
                id: 'Chrome',
                data: [
                    [
                        'v40.0',
                        5
                    ],
                    [
                        'v41.0',
                        4.32
                    ],
                    [
                        'v42.0',
                        3.68
                    ],
                    [
                        'v39.0',
                        2.96
                    ],
                    [
                        'v36.0',
                        2.53
                    ],
                    [
                        'v43.0',
                        1.45
                    ],
                    [
                        'v31.0',
                        1.24
                    ],
                    [
                        'v35.0',
                        0.85
                    ],
                    [
                        'v38.0',
                        0.6
                    ],
                    [
                        'v32.0',
                        0.55
                    ],
                    [
                        'v37.0',
                        0.38
                    ],
                    [
                        'v33.0',
                        0.19
                    ],
                    [
                        'v34.0',
                        0.14
                    ],
                    [
                        'v30.0',
                        0.14
                    ]
                ]
            }, {
                name: 'Firefox',
                id: 'Firefox',
                data: [
                    [
                        'v35',
                        2.76
                    ],
                    [
                        'v36',
                        2.32
                    ],
                    [
                        'v37',
                        2.31
                    ],
                    [
                        'v34',
                        1.27
                    ],
                    [
                        'v38',
                        1.02
                    ],
                    [
                        'v31',
                        0.33
                    ],
                    [
                        'v33',
                        0.22
                    ],
                    [
                        'v32',
                        0.15
                    ]
                ]
            }, {
                name: 'Safari',
                id: 'Safari',
                data: [
                    [
                        'v8.0',
                        2.56
                    ],
                    [
                        'v7.1',
                        0.77
                    ],
                    [
                        'v5.1',
                        0.42
                    ],
                    [
                        'v5.0',
                        0.3
                    ],
                    [
                        'v6.1',
                        0.29
                    ],
                    [
                        'v7.0',
                        0.26
                    ],
                    [
                        'v6.2',
                        0.17
                    ]
                ]
            }, {
                name: 'Opera',
                id: 'Opera',
                data: [
                    [
                        'v12.x',
                        0.34
                    ],
                    [
                        'v28',
                        0.24
                    ],
                    [
                        'v27',
                        0.17
                    ],
                    [
                        'v29',
                        0.16
                    ]
                ]
            }]
        }
    },
    29:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'column',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '分公司效率优化嵌套图'
        },
        xAxis: {
            categories: [
                '杭州总部',
                '上海分部',
                '北京分部'
            ]
        },
        yAxis: [{
            min: 0,
            title: {
                text: '雇员'
            }
        }, {
            title: {
                text: '利润 (millions)'
            },
            opposite: true
        }],
        legend: {
            shadow: false
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0
            }
        },
        series: [{
            name: '雇员',
            color: 'rgba(165,170,217,1)',
            data: [150, 73, 20],
            pointPadding: 0.3,
            pointPlacement: -0.2
        }, {
            name: '优化的员工',
            color: 'rgba(126,86,134,.9)',
            data: [140, 90, 40],
            pointPadding: 0.4,
            pointPlacement: -0.2
        }, {
            name: '利润',
            color: 'rgba(248,161,63,1)',
            data: [183.6, 178.8, 198.5],
            tooltip: {
                valuePrefix: '$',
                valueSuffix: ' M'
            },
            pointPadding: 0.3,
            pointPlacement: 0.2,
            yAxis: 1
        }, {
            name: '优化的利润',
            color: 'rgba(186,60,61,.9)',
            data: [203.6, 198.8, 208.5],
            tooltip: {
                valuePrefix: '$',
                valueSuffix: ' M'
            },
            pointPadding: 0.4,
            pointPlacement: 0.2,
            yAxis: 1
        }]
    },
    // 30:{},
    // 31:{},
    32:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '2014 某网站各浏览器浏览量占比'
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '浏览器访问量占比',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['其他',   0.7]
            ]
        }]
    },
    33:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '2014 某网站上各个浏览器的访问量占比'
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: '浏览器访问量占比',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['其他',   0.7]
            ]
        }]
    },
    34:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'pie',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '2011年4月浏览器市场份额'
        },
        subtitle: {
            text: '内环为浏览器品牌占比，外环为具体的版本'
        },
        yAxis: {
            title: {
                text: '总百分比市场份额'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: '浏览器',
            data: [
                {color:"#7cb5ec",name:"IE",y:55.11},
                {color:"#434348",name:"Firefox",y:21.63},
                {color:"#90ed7d",name:"Chrome",y:11.94},
                {color:"#f7a35c",name:"Safari",y:7.15},
                {color:"#8085e9",name:"Opera",y: 2.14}
            ],
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -30
            }
        }, {
            name: '版本',
            data: [
                {color:"rgb(175,232,255)",name:"IE 6.0",y:10.85}
            ],
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // 大于1则显示
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
                }
            }
        }]
    },
    35:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '浏览器<br>占比',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: '浏览器占比',
            innerSize: '50%',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                ['Chrome', 12.8],
                ['Safari',    8.5],
                ['Opera',     6.2],
                {
                    name: '其他',
                    y: 0.7,
                    dataLabels: {
                        // 数据比较少，没有空间显示数据标签，所以将其关闭
                        enabled: false
                    }
                }
            ]
        }]
    },
    36:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            type: 'pie',
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '2013年11月浏览器市场份额'
        },
        subtitle: {
            text: '单击每个浏览器品牌不同版本的具体信息，数据来源: netmarketshare.com.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [{
            name: '品牌',
            colorByPoint: true,
            data: [
                {drilldown:"Microsoft Internet Explorer ",name:"Microsoft Internet Explorer ",y:53.61},
                {drilldown:"Microsoft Internet Explorer ",name:"Microsoft Internet Explorer ",y:53.61},
                {drilldown:"Microsoft Internet Explorer ",name:"Microsoft Internet Explorer ",y:53.61},
                {drilldown:"Microsoft Internet Explorer ",name:"Microsoft Internet Explorer ",y:53.61},
                {drilldown:"Microsoft Internet Explorer ",name:"Microsoft Internet Explorer ",y:53.61},
                {drilldown:"Microsoft Internet Explorer ",name:"Microsoft Internet Explorer ",y:53.61}
            ]
        }],
        drilldown: {
            series: [
                {
                    name:'Microsoft Internet Explorer',
                    id:'Microsoft Internet Explorer',
                    data:[1,26.61]
                }
            ]
        }
    },
    37:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '2014年某网站各浏览器的访问量占比'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '浏览器占比',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['其他',   0.7]
            ]
        }]
    },
    38:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '2014 年某网站各浏览器访问量占比'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color:'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '浏览器占比',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['其他',   0.7]
            ]
        }]
    },
    39:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacing : [100, 0 , 40, 0],
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            floating:true,
            text: '圆心显示的标题'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: 'black'
                    }
                },
                point: {
                    events: {
                        mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                            // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                            chart.setTitle({
                                text: e.target.name+ '\t'+ e.target.y + ' %'
                            });
                        }
                        //,
                        // click: function(e) { // 同样的可以在点击事件里处理
                        //     chart.setTitle({
                        //         text: e.point.name+ '\t'+ e.point.y + ' %'
                        //     });
                        // }
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            innerSize: '80%',
            name: '市场份额',
            data: [
                {name:'Firefox',   y: 45.0, url : 'http://bbs.hcharts.cn'},
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true,
                    url: 'http://www.hcharts.cn'
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['其他',   0.7]
            ]
        }]
    },
    // 40:{},
    // 41:{},
    // 43:{},
    // 44:{},
    // 45:{},
    // 46:{},
    // 47:{},
    // 48:{},
    // 49:{},
    // 50:{},
    // 51:{},
    // 52:{},
    // 53:{},
    // 54:{},
    // 55:{},
    // 56:{},
    // 57:{},
    58:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        }
    },
    // 59:{
    // },
    60:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '我是文本'
        }
    },
    61:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '圆心显示的标题'
        }
    },
    62:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: '圆心显示的标题'
        }
    },
    63:{
        pluginLJH:{
            width: 600,
            height: 400,
            left: 100,
            top: 50
        },
        chart: {
            borderColor:'#fff',
            borderWidth: 1,
            backgroundColor:'#fff'
        },
        title: {
            text: ''
        }
    }
};



/*
* Width          +宽度         container.width
* Height         +高度         container.height
* BackImage      -背景图片
* BackColor      +背景颜色      data.backgroundColor
* FontSize       +字体大小      data.fontSize
* FontColor      +字体颜色      data.fontColor
* DataType       +数据类型      data.type
* Content        +内容         data.inner
* Left           +左值         container.left
* Right          +高值         container.top
* Position
* Align          +标题        title.text
*/
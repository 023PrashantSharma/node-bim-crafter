var admin=$("#admin").val();
'use strict';
$(function() {
    mainProfitableChart();
    chartBids();
    chartAmt();

    starProfitableChart();
    StarChartBids();
    StarChartAmt();

    galiProfitableChart();
    GaliChartBids();
    GaliChartAmt();
});


function mainProfitableChart() {
    $.ajax({ 
        url: `${admin}/get-top-profitable-games`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("mainProfitableChart");
            if(window.myChartmain != undefined) 
            window.myChartmain.destroy(); 
            window.myChartmain = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}

function getMonthWiseChart(val){
    if(val == ""){
        mainProfitableChart();
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-top-profitable-games`,
            type: 'POST',
            data: {month:val},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("mainProfitableChart");
                if(window.myChartmain != undefined) 
                window.myChartmain.destroy(); 
                window.myChartmain = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }	
}

function chartBids() {
    $.ajax({ 
        url: `${admin}/get-most-played-games-bids`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("chartBids");
            if(window.bar != undefined) 
            window.bar.destroy(); 
            window.bar = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}

function getMonthWiseMostPlayedGamesBidChart(val){
    if(val == ""){
        chartBids();
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-most-played-games-bids`,
            type: 'POST',
            data: {month:val},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("chartBids");
                if(window.bar != undefined) 
                window.bar.destroy(); 
                window.bar = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}

function chartAmt() {
    $.ajax({ 
        url: `${admin}/get-most-played-games-amount`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("chartAmt");
            if(window.myChart != undefined) 
                window.myChart.destroy(); 
                window.myChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}

function getMonthWiseMostPlayedGamesAmountChart(val){
    if(val == ""){
        chartAmt();
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-most-played-games-amount`,
            type: 'POST',
            data: {month:val},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("chartAmt");
                if(window.myChart != undefined) 
                window.myChart.destroy(); 
                window.myChart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}


function starProfitableChart() {
    $.ajax({ 
        url: `${admin}/get-top-profitable-games-starline`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("starProfitableChart");
            if(window.myChartStar != undefined) 
            window.myChartStar.destroy(); 
            window.myChartStar = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}

function starProfitableChartMontwise(val) {
    if(val == ""){
        starProfitableChart()
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-top-profitable-games-starline`,
            type: 'POST',
            data: {},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("starProfitableChart");
                if(window.myChartStar != undefined) 
                window.myChartStar.destroy(); 
                window.myChartStar = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}


function StarChartBids() {
    $.ajax({ 
        url: `${admin}/get-most-played-games-bids-starline`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("StarChartBids");
            if(window.myChartStarBids != undefined) 
            window.myChartStarBids.destroy(); 
            window.myChartStarBids = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}



function getMonthWiseMostPlayedStarBidChart(val) {
    if(val == ""){
        StarChartBids();
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-most-played-games-bids-starline`,
            type: 'POST',
            data: {month:val},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("StarChartBids");
                if(window.myChartStarBids != undefined) 
                window.myChartStarBids.destroy(); 
                window.myChartStarBids = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}


function StarChartAmt() {
    $.ajax({ 
        url: `${admin}/get-most-played-games-amount-starline`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("StarChartAmt");
            if(window.myChartStarAmt != undefined) 
            window.myChartStarAmt.destroy(); 
            window.myChartStarAmt = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}

function getMonthWiseMostPlayedStarAmountChart(val) {
    if(val == ""){
        StarChartAmt();
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-most-played-games-amount-starline`,
            type: 'POST',
            data: {month:val},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("StarChartAmt");
                if(window.myChartStarAmt != undefined) 
                window.myChartStarAmt.destroy(); 
                window.myChartStarAmt = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}


function galiProfitableChart() {
    $.ajax({ 
        url: `${admin}/get-top-profitable-games-gali`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("galiProfitableChart");
            if(window.myChartGali != undefined) 
            window.myChartGali.destroy(); 
            window.myChartGali = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}


function galiProfitableChartMontwise(val) {
    if(val == ""){
        galiProfitableChart();
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-top-profitable-games-gali`,
            type: 'POST',
            data: {month:val},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("galiProfitableChart");
                if(window.myChartGali != undefined) 
                window.myChartGali.destroy(); 
                window.myChartGali = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}


function GaliChartBids() {
    $.ajax({ 
        url: `${admin}/get-most-played-games-bids-gali`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("GaliChartBids");
            if(window.myChartGaliBids != undefined) 
            window.myChartGaliBids.destroy(); 
            window.myChartGaliBids = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}

function getMonthWiseMostPlayedGaliBidChart(val) {
    if(val == ""){
        GaliChartBids();
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-most-played-games-bids-gali`,
            type: 'POST',
            data: {},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("GaliChartBids");
                if(window.myChartGaliBids != undefined) 
                window.myChartGaliBids.destroy(); 
                window.myChartGaliBids = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}


function GaliChartAmt() {
    $.ajax({ 
        url: `${admin}/get-most-played-games-amount-gali`,
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (data)
        {	
            var ctx = document.getElementById("GaliChartAmt");
            if(window.myChartGaliAmt != undefined) 
            window.myChartGaliAmt.destroy(); 
            window.myChartGaliAmt = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: data.gamesName,
                    datasets: [
                        { 
                            labels: data.gamesResult,
                            data: data.gamePercent,
                            backgroundColor :[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                        },            
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                            }
                        }
                    }
                }
            });
        }
    });
}

function getMonthWiseMostPlayedGaliAmountChart(val) {
    if(val == ""){
        GaliChartAmt();
    }else{
        $.ajax({ 
            url: `${admin}/get-monthwise-most-played-games-amount-gali`,
            type: 'POST',
            data: {month:val},
            dataType: "json",
            success: function (data)
            {	
                var ctx = document.getElementById("GaliChartAmt");
                if(window.myChartGaliAmt != undefined) 
                window.myChartGaliAmt.destroy(); 
                window.myChartGaliAmt = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: data.gamesName,
                        datasets: [
                            { 
                                labels: data.gamesResult,
                                data: data.gamePercent,
                                backgroundColor :[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                            },            
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ' ₹ : ' + dataset.data[index] +'%';
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}
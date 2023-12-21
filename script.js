// function changeText() {
//     var textElement = document.getElementById('team1');
//     textElement.textContent = 'The text has been changed!';
// }

// var button = document.getElementById('change-btn');
// button.addEventListener('click', changeText);

document.addEventListener('DOMContentLoaded', function () {
    // control menu
    const toggleButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.circle-menu');

    toggleButton.addEventListener('click', function () {
        menu.classList.toggle('menu-active');
    });

    let data = localStorage.getItem("data");
    if (data) {
        const names = document.querySelectorAll('td[id^="team"] span');
        const scores = document.getElementsByClassName("scores");
        data = JSON.parse(data);
        for (let i = 0; i < 6; i++) {
            names[i].innerHTML = data[i].name;
            scores[i].textContent = data[i].scores[8];
        }
        graph(data);
    } else {
        data = [];
        const names = document.querySelectorAll('td[id^="team"]');
        for (let i = 0; i < 6; i++) {
            let team = { name: names[i].textContent.trim(), scores: [...Array(8).fill(-1), 100] }
            data.push(team);
        }
        localStorage.setItem("data", JSON.stringify(data));
        graph(data);
    }

    function rename(event) {
        let span = event.target.closest('td').querySelector('span');
        let currentName = span.textContent;
        let input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.className = 'rename-input';
        input.placeholder = "請輸入新的隊伍名";
        span.textContent = '';
        span.appendChild(input);
        input.focus();

        input.addEventListener('blur', function () {
            let newName = input.value.trim();
            newName = newName || currentName; // Avoid blank names
            span.removeChild(input);
            span.textContent = newName;

            // Update the name in localStorage
            let teamId = span.closest('td').id;
            let index = parseInt(teamId.replace('team', ''), 10) - 1;
            data[index].name = newName;
            localStorage.setItem('data', JSON.stringify(data));
        });

        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                input.blur(); // Trigger the blur event to save the name
            }
        });
    }

    // Attach the renameTeam function to all rename buttons
    const renameButtons = document.querySelectorAll('.rename-btn');
    renameButtons.forEach(btn => {
        btn.addEventListener('click', rename);
    });
});

function graph(data) {
    for (let i = 0; i < 6; i++) {
        let myChart = echarts.init(document.getElementById(`main${i + 1}`));
        let dataAxis = [''];
        let score = [data[i].scores[8]];
        let xMax = 5000;

        option = {
            title: {},
            yAxis: {
                data: dataAxis,
                axisLabel: {
                    show: true,
                    color: 'black'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            xAxis: {
                max: xMax,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(144, 144, 144, 0.8)'
                    },
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                        ])
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ])
                        }
                    },
                    barWidth: '50%', // 控制条形宽度
                    data: score
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}

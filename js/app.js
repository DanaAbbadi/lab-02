'use strict'
Imgs.all = [];
Imgs.title = [];
Imgs.horn = [];
let path1 = './data/page-1.json';
let path2 = './data/page-2.json';

ajaxFunction(path1);

// creat the constructor, methods and helper fxns 
function Imgs(imgurl, title, desc, keyword, horns) {

    this.imgurl = imgurl;
    this.title = title;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    Imgs.all.push(this);
    Imgs.title.push(title);
    Imgs.horn.push(horns);
}
Imgs.prototype.render = function () {
    let musTemplate = $('#Imgs-template').html();
    let newObj = Mustache.render(musTemplate, this);
    $('.cont').append(newObj);
}
function creatOption(select) {

    let noDuplicates = [];
    select.forEach(item => {
        if (!noDuplicates.includes(item.keyword)) {
            let selTemplate = $('#select-template').html();
            let newObj1 = Mustache.render(selTemplate, item);
            $('.select').append(newObj1);
            noDuplicates.push(item.keyword);
        }
    })
}
// Get the data from .JSON file by using ajax
const ajaxSettings = {
    method: 'get',
    datatype: 'json'
}
function ajaxFunction(path) {
    $.ajax(path, 'ajaxSettings').then(data => {
        data.forEach(item => {
            let newImg = new Imgs(item.image_url, item.title, item.description, item.keyword, item.horns);
            newImg.render();
        })
        $('.select').text("");
        $('.select').append("<option class='opt' value='all' >all</option>");
        creatOption(Imgs.all);
        err();
    })
}
// Show the selected option 
$('.select').change(function (event) {
    let value = $(".select option:selected").html();
    Imgs.all.forEach(item => {
        if (item.keyword !== value && value !== 'all') {
            $('.' + item.keyword).hide();
        }
        if (value === 'all' || item.keyword === value) {
            $('.' + item.keyword).show();
        }
    })
});
$('#btn2').click(() => {
    Imgs.all = [];
    $('.cont').text('');
    ajaxFunction(path2);
})
$('#btn1').click(() => {
    Imgs.all = [];
    $('.cont').text('');
    ajaxFunction(path1);
})
$('.sort').change(function (event) {
    let value = $(".sort option:selected").html();

    if (value == 'title') {
        var xx = 'title';
        sorting(Imgs.all, xx);
        $('.cont').text('');
        Imgs.all.forEach(item => {
            item.render();
        })
    }
    if (value == 'horn') {
        var xxr = 'horns';
        sorting(Imgs.all, xxr);
        $('.cont').text('');
        Imgs.all.forEach(item => {
            item.render();
        })

    }
});
function sorting(arr, x) {
    if (x === 'title') {
        arr.sort((a, b) => {
            if (a.title > b.title) return 1;
            // return a>b;
            if (a.title < b.title) return -1;
            if (a.title == b.title) return 0;
        })
    }
    else {
        arr.sort((a, b) => {
            if (a.horns > b.horns) return 1;
            // return a>b;
            if (a.horns < b.horns) return -1;
            if (a.horns == b.horns) return 0;
        })
    }
}

function err() {
    $('section').on('click', function (event) {
        let selected = this.className;
        $('.cont').children().hide();
        $(`.${selected}`).attr('id', 'showAlone');
        $(this).show();
    })
}

$('#searching').submit(function () {
    console.log('hi');
    event.preventDefault();
    let fining = $("input").first().val();
    Imgs.all.forEach(item => {
        if (item.keyword === fining || item.title === fining) {
            $('.cont').children().hide();

            switch (fining) {
                case item.keyword:
                    $(`.${item.keyword}`).show();
                    break;
                case item.title:
                    $(`.${item.keyword}`).show();
                    break;
                default:
                    break;


            }


        }
    })


})
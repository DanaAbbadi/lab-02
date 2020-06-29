'use strict'
Imgs.all = [];

// creat the constructor, methods and helper fxns 
function Imgs(imgurl, title, desc, keyword, horns) {

    this.imgurl = imgurl;
    this.title = title;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    Imgs.all.push(this);
}

Imgs.prototype.render = function () {

    let photo = $('.photo-template').clone();
    photo.attr('class',this.keyword);

    photo.find('h2').text(this.title);
    photo.find('img').attr('src', this.imgurl);
    photo.find('img').attr('alt', this.title);
    photo.find('p').text(this.desc);
    $('.cont').append(photo);
    photo.removeClass('photo-template');

}

function creatOption(select) {
    let noDuplicates = [];
    noDuplicates.push(select[0].keyword);

    select.forEach(item => {
        // noDuplicates.push(item.keyword);
        if (!noDuplicates.includes(item.keyword)) {
            let opt = $('.opt').clone();
            opt.text(item.keyword);
            $('.select').append(opt);
            opt.removeClass('opt');
            noDuplicates.push(item.keyword);
        }
    })
    console.log(noDuplicates);

}

// Get the data from .JSON file by using ajax
const ajaxSettings = {
    method: 'get',
    datatype: 'json'
}

$.ajax('./data/page-1.json', 'ajaxSettings').then(data => {
    data.forEach(item => {
        let newImg = new Imgs(item.image_url, item.title, item.description, item.keyword, item.horns);
        newImg.render();
    })
    creatOption(Imgs.all);
}

)


// Show the selected option 

// $('.select').select(function(){
$('select').change(function (event) {

    let value = $("select option:selected").html();
    console.log(value);
    
    Imgs.all.forEach(item =>{
        if (item.keyword !== value && value !=='all' ){
            $('.'+ item.keyword).hide();
        }

        if(value=== 'all' || item.keyword === value){
            $('.'+ item.keyword).show();


        }

    })

});



// $( "#myselect option:selected" ).text();








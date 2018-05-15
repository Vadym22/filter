$(document).ready(function(){

    'use strict';

    var dataUrl = "https://api.punkapi.com/v2/beers",
        dataArr,
        prodContainer = $('.grid'),
        qsRegex;

    (function(){
        $.ajax({
            url: dataUrl,
            success: function(result){
console.log(result);
                dataArr = result;
                $.each(dataArr, function (index, value) {
                    prodContainer.append(
                    '<div class="card mb-3 grid-item" data-img="' + value.image_url + '" data-id="' + value.id + '" data-name="' + value.name + '" data-description="' + value.description + '">' +
                        '<div class="card-img" style="background-image: url(' + value.image_url + '")></div>' +
                        '<div class="card-body">' +
                            '<h5 class="card-title">' + value.name + '</h5>' +
                            '<h6 class="card-subtitle mb-2 text-muted">ID: ' + value.id + '</h6>' +
                            '<p class="card-text">' + value.description + '</p>' +
                            '<button class="badge badge-info detail" data-toggle="modal" data-target="#modalProd">Detail</button>' +
                        '</div>' +
                    '</div>'
                    );
                });

                // init Isotope
                var $grid = $('.grid').isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'fitRows',
                    getSortData: {
                        id: function(elem){
                            return parseInt($(elem).attr('data-id'), 10);
                        },
                        name: function(elem){
                            return $(elem).attr('data-name');
                        },
                        description: function(elem){
                            return $(elem).attr('data-description');
                        }
                    },
                    sortAscending: true,
                    filter: function() {
                        return qsRegex ? $(this).attr('data-name').match( qsRegex ) : true;
                    }
                });

                // use value of search field to filter
                var $quicksearch = $('.quicksearch').keyup(  function() {
                    qsRegex = new RegExp( $quicksearch.val(), 'gi' );
                    $grid.isotope();
                } );

                // debounce so filtering doesn't happen every millisecond
                function debounce( fn, threshold ) {
                    var timeout;
                    threshold = threshold || 100;
                    return function debounced() {
                        clearTimeout( timeout );
                        var args = arguments;
                        var _this = this;
                        function delayed() {
                            fn.apply( _this, args );
                        }
                        timeout = setTimeout( delayed, threshold );
                    };
                }

                // bind sort button click
                $('#sorts').on( 'click', 'button', function() {
                    var sortByValue = $(this).attr('data-sort-by');
                    $grid.isotope({ sortBy: sortByValue });
                });

                // bind asc(desc) button click
                $('#ascDesc').on( 'click', 'button', function() {
                    var direction = $(this).attr('data-sort-direction');
                    var isAsc = (direction === 'asc');
                    $grid.isotope({ sortAscending: isAsc });
                });


                // change is-checked class on buttons
                $('.btn-group').each( function( i, buttonGroup ) {
                    var $buttonGroup = $( buttonGroup );
                    $buttonGroup.on( 'click', 'button', function() {
                        $buttonGroup.find('.badge-success').removeClass('badge-success').addClass('badge-secondary');
                        $( this ).addClass('badge-success').removeClass('badge-secondary');
                    });
                });

                // modal
                $('.card').on( 'click', '.detail', function() {
                    $('.modal-title').text($(this).closest('.card').attr('data-name'));
                    $('.modal-description').text($(this).closest('.card').attr('data-description'));
                    var imgUrl = $(this).closest('.card').attr('data-img');
                    $('.modal-img').css("background-image", "url(" + imgUrl + ")");
                });

            }}); //end success
    })();


});




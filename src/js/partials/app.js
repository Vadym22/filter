$(document).ready(function(){

    'use strict';

    var dataUrl = "https://api.punkapi.com/v2/beers";
    var dataArr;
    var prodContainer = $('.grid');
    var qsRegex;



    (function(){
        $.ajax({
            url: dataUrl,
            success: function(result){

                dataArr = result;
                $.each(dataArr, function (index, value) {
                    prodContainer.append(
                    '<div class="card mb-3 grid-item" data-id="' + value.id + '" data-name="' + value.name + '" data-description="' + value.description + '">' +
                        '<div class="card-header text-white bg-dark">ID: ' + value.id + '</div>' +
                        '<div class="card-body">' +
                            '<h5 class="card-title">' + value.name + '</h5>' +
                            '<p class="card-text text-truncate">' + value.description + '</p>' +
                            '<a href="#" class="badge badge-info">Detail</a>' +
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


                // change is-checked class on buttons
                $('.btn-group').each( function( i, buttonGroup ) {
                    var $buttonGroup = $( buttonGroup );
                    $buttonGroup.on( 'click', 'button', function() {
                        $buttonGroup.find('.badge-success').removeClass('badge-success').addClass('badge-secondary');
                        $( this ).addClass('badge-success').removeClass('badge-secondary');
                    });
                });

            }});
    })();


});




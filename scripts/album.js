var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26'},
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    +   '   <td class="song-item-title">'+ songName + '</td>'
    +   '   <td class="song-item-duration">' + songLength +'</td>'
    +   '</tr>'
    ;
    var $row = $(template);

    //My implementation of clickHandler
    var clickHandler = function() {
        var songItemNumber = $(this).attr('data-song-number');
        if (currentlyPlayingSong === null) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songItemNumber;
        } else if (currentlyPlayingSong === songItemNumber){
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== songItemNumber) {
            var lastSong  = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            lastSong.html(currentlyPlayingSong);
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songItemNumber;
        }
    };

    /*//Bloc's implementation of clickHandler
    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
    };*/

    var onHover = function(event) {
        //if ($(event.target).find('.song-item-number')
        //we don't need above line; we already put 'hover' listener to 'row'
        //...so we know the listener will def see 'song-item-number'

        if ($(this).find('.song-item-number').attr('data-song-number') !== currentlyPlayingSong) {
            $(this).find('.song-item-number').html(playButtonTemplate);
        }

    };
    var offHover = function(event) {
        var songItemNumber = $(this).find('.song-item-number').attr('data-song-number');
        //if ($(event.target).find('.song-item-number')) {
        if (songItemNumber !== currentlyPlayingSong) {
            $(this).find('.song-item-number').html(songItemNumber);
        }

    };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function(album){
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' '+album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (var i = 0; i< album.songs.length; i++){
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

/*
var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};
*/

/*var getSongItem = function(element){
    switch (element.className){
        case 'ion-play':
        case 'ion-pause':
        case 'album-song-button':
            return findParentByClassName(element, 'song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        default:
            return;
    }
}*/

/*var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = $pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};*/

/*
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
*/
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

window.onload = function() {
    setCurrentAlbum(albumPicasso);

    /*  songListContainer.addEventListener('mouseover', function(event){
        if (event.target.parentElement.className === 'album-view-song-item') {
            var songItem = getSongItem(event.target);
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong){
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });*/

    /*for (var i = 0 ; i < songRows.length; i++){
        songRows[i].addEventListener('mouseleave', function(event){
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');

            if (songItemNumber !== currentlyPlayingSong){

                songItem.innerHTML = songItemNumber;
            }
        });
        songRows[i].addEventListener('click', function(event){
            clickHandler(event.target);
        });
    }*/
}
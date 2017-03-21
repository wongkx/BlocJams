var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    +   '   <td class="song-item-title">'+ songName + '</td>'
    +   '   <td class="song-item-duration">' + songLength +'</td>'
    +   '</tr>'
    ;
    var $row = $(template);

    /*//My implementation of clickHandler
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
    };*/

    //Bloc's implementation of clickHandler
    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));
        currentlyPlayingSongNumber = parseInt(currentlyPlayingSongNumber);
        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);    
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            setSong(null);    
        }                
    };

    var onHover = function(event) {
        //if ($(event.target).find('.song-item-number')
        //we don't need above line; we already put 'hover' listener to 'row'
        //...so we know the listener will def see 'song-item-number'
        var songItemNumber = parseInt($(this).find('.song-item-number').attr('data-song-number'));
        currentlyPlayingSongNumber = parseInt(currentlyPlayingSongNumber);
        if (songItemNumber !== currentlyPlayingSongNumber) {
            $(this).find('.song-item-number').html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songItemNumber = parseInt($(this).find('.song-item-number').attr('data-song-number'));
        currentlyPlayingSongNumber = parseInt(currentlyPlayingSongNumber);
        if (songItemNumber !== currentlyPlayingSongNumber) {
            $(this).find('.song-item-number').html(songItemNumber);
        }
    };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var updatePlayerBarSong = function() { 
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
     $('.main-controls .play-pause').html(playerBarPauseButton);
};

var setCurrentAlbum = function(album){
    currentAlbum = album;
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

var trackIndex = function(album,song){ 
    return parseInt(album.songs.indexOf(song));
};

//Bloc's version and my version of nextSong()/previousSong()
var nextSong = function() {
    
    var index = trackIndex(currentAlbum,currentSongFromAlbum) +1;
    var lastSongNumber = index;
    //if index starts out as NULL; it'll become 0 at this point
    
    if (index >= currentAlbum.songs.length) {
        index = 0;
        lastSongNumber = 5
    }
    setSong(index+1);
    
    index = index+1;
    updatePlayerBarSong();
    
    var $nextSongNumberCell = getSongNumberCell(index);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function(){
    
    var index = trackIndex(currentAlbum,currentSongFromAlbum);
    var lastSongNumber = index;
    if (index <= 0){
        index = 5;
        lastSongNumber = 0;
    }
    setSong(index);
    index = index-1;
    
    updatePlayerBarSong();
    
    var $nextSongNumberCell = getSongNumberCell(index+1);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber+1);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber+1);
 
};

var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber-1];
};
var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number +'"]');
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
var playerBarPlayButton = '<span class = "ion-play"></span>';
var playerBarPauseButton = '<span class = "ion-pause"></span>';
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
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
});
var socket;
function createSocket() {
    socket = io.connect();
    socket.on('update', function (data) {
        console.log(data.data);
    });
    socket.on('socketsActive', function(data) {
        var ts = " users online";
        if(data.data == 1) {
            ts = " user online"
        }
        $('#socketCount').html(data.data + ts);
    })
}

function endSocket() {
    socket.disconnect();
}
tracking = {
    create_userid: function() {
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            
            for( var i=0; i < 32; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            
            return text;
        }
    },
    set_userid: function(userid) {
        document.cookie = "userid=" + userid + ";";
        return userid;
    },
    get_userid: function() {
        return getCookie('userid');
    },
    send: function(event, category, action, label, value) {
        userid = this.get_userid();
        if (!userid) {
            var userid = this.set_userid(this.create_userid());
        }
        
        return $.ajax(
            (window.location.origin ? window.location.origin : window.location.protocol+window.location.host) + ':444/events/',
            {
                dataType: 'json',
                type: 'POST',
                data: {
                    user_id: userid,
                    event_type: event,
                    category: category,
                    action: action,
                    label: label,
                    value: value,
                    datetime: null,
                },
                error: function(xhr, status, err) {
                    console.log("tracking ("+status+" "+err+ "): " + xhr.responseText);
                },
                success: function(data, status, xhr) {
                    console.log("tracking ("+status+" Success)");
                }
            }
        );
    },
}

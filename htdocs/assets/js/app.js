var form = new Vue({
  el: "#app",
  data: {
    templates: [
      {
        method: "session/login",
        params: JSON.stringify({
          email: 'test@test.com',
          password: 'testtest'
        }, null, 2),
      },
      {
        method: "session/logout",
        params: JSON.stringify({}, null, 2),
      },
      {
        method: "conf/s3/credential",
        params: JSON.stringify({}, null, 2),
      },
      {
        method: "user/register",
        params: JSON.stringify({
          name: "myoji namae",
          nickname: "nick_name",
          email: "test@test.com",
          password: "testtest"
        }, null, 2),
      },
      {
        method: "user/me",
        params: JSON.stringify({}, null, 2),
      },
      {
        method: "user/get",
        params: JSON.stringify({id: 1}, null, 2),
      },
      {
        method: "image/upload/convert",
        params: JSON.stringify({
          tmp_key: "fate0267.jpg"
        }, null, 2),
      },
      {
        method: "image/upload/commit",
        params: JSON.stringify({
          tmp_key: "fate0267.jpg",
          name: "image name",
          description: "descdescdesc"
        }, null, 2),
      }
    ],
    selected: 0,
    host: "http://dev.localhost:3000",
    id: "1234567890",
    jsonrpc: "2.0",
    errorMessage: "",
    response: "",
    headertable: "",
    responsetable: ""
  },
  methods: {
    changeTemplate: function(e) {
      this._data.selected = $("#templates")[0].selectedIndex
    },
    submit: function(e) {
      e.preventDefault();

      var self = this;
      var params;
      var selected = self.$get('selected');

      try {
        params = JSON.parse(self.$get('templates')[selected]['params']);
      } catch (e) {
        self.$set('errorMessage', "Invalid json syntax");
        self.$set('response', "");
        self.$set('responsetable', "");
        return;
      }

      $.ajax({
        url: self._data.host,
        type: 'POST',
        xhrFields: { withCredentials: true },
        data: {
          payload: {
            id: self.$get('id'),
            jsonrpc: self.$get('jsonrpc'),
            method: self.$get('templates')[selected]['method'],
            params: params
          }
        }
      }).done(function(data, textStatus, jqXHR) {
        var header = {
            status: jqXHR.status,
            statusText: jqXHR.statusText
        };
        self.$set('errorMessage', "");
        self.$set('response', JSON.stringify(data, null, 2));
        self.$set('responsetable', JsonHuman.format(data).outerHTML);
        self.$set('headertable', JsonHuman.format(header).outerHTML);

      }).fail(function(data) {
        self.$set('errorMessage', "Failed to send request");
        self.$set('response', "");
        self.$set('responsetable', "");
        self.$set('headertable', "");
      });
    }
  }
})

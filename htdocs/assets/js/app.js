var form = new Vue({
  el: "#app",
  data: {
    host: "http://dev.localhost:3000",
    id: "1234567890",
    jsonrpc: "2.0",
    method: "user/get",
    params: JSON.stringify({id: 1}, null, 2),
    errorMessage: "",
    response: "",
    responsetable: ""
  },
  methods: {
    submit: function(e) {
      e.preventDefault();

      var self = this;
      var params;
      try {
        params = JSON.parse(self._data.params);
      } catch (e) {
        self._data.errorMessage = "Invalid json syntax";
        return;
      }

      $.ajax({
        url: self._data.host,
        type: 'POST',
        data: {
          payload: {
            id: self._data.id,
            jsonrpc: self._data.jsonrpc,
            method: self._data.method,
            params: params
          }
        }
      }).done(function(data) {
        self._data.errorMessage = "";
        self._data.response = JSON.stringify(data, null, 2);
        self._data.responsetable = JsonHuman.format(data).outerHTML

      }).fail(function(data) {
        self._data.errorMessage = "Failed to send request";
      });
    }
  }
})

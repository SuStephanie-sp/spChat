let data = {
  loading: false,
  chat: [
    { name: "Owner", theme: "darkTheme", say: "" },
    { name: "Customer", theme: "whiteTheme", say: "" }
  ],
  msg: []
};

let vm = new Vue({
  el: "#app",
  data: data,

  mounted() {
    this.loading = true;

    axios
      .get("http://localhost:8888/msg")
      .then(response => {
        this.msg = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    another(index) {
      return this.chat[index == 0 ? 1 : 0].name;
    },
    getTime() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date + " " + time;
    },
    msgHandler(index) {
      if (this.chat[index].say == "") {
        return;
      }
      let temp = {
        timestamp: this.getTime(),
        sender: this.chat[index].name,
        reciver: this.another(),
        message: this.chat[index].say,
        isRead: false
      };

      axios
        .post("http://localhost:8888/msg", temp)
        .then(response => {
          this.msg.push(response.data);
          this.chat[index].say = "";
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});

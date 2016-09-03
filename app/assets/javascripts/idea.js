window.onload = () => {
  let Idea = new Vue ({
    el: '#ideas',
    data: {
      ideas: []
    },
    ready: () => {
      let that;
      that = this;
      $.ajax({
        url: '/api/v1/ideas.json',
        success: (response) => {
          that.ideas = response;
        }
      })
    }
  })
}
